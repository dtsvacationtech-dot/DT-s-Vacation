import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { SPECIAL_PROMOTIONS, PromotionOffer, VIPPerk } from "./promotionsData";
import { hashPassword, DEFAULT_ADMIN_PASSWORD } from "./auth";
import { isDateExpired } from "./dateUtils";

export interface ExtendedPromotion extends PromotionOffer {
  validFrom?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryRecord {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone: string;
  serviceType: string;
  destination?: string;
  travelDateStart?: string | null;
  travelDateEnd?: string | null;
  adults?: number;
  children?: number;
  guests?: number;
  duration?: string;
  departurePort?: string;
  message?: string;
  promotionId?: string;
  promotionTitle?: string;
  status: "new" | "contacted" | "quoted" | "booked" | "archived";
  notes?: string;
  repliedAt?: string;
  createdAt: string;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  source: string;
  status: "active" | "unsubscribed";
  createdAt: string;
}

export interface BroadcastLogRecord {
  id: string;
  subject: string;
  targetAudience: string;
  recipientCount: number;
  successCount: number;
  failedCount: number;
  promotionId?: string;
  promotionTitle?: string;
  sentAt: string;
}

export interface SecurityAuditRecord {
  id: string;
  event: "login_success" | "login_failed" | "lockout" | "password_change";
  ip: string;
  username?: string;
  userAgent?: string;
  timestamp: string;
}

// ── Database Singleton & Initialization ──
declare global {
  // eslint-disable-next-line no-var
  var __dt_sqlite_db: Database.Database | undefined;
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE_PATH = process.env.DATABASE_PATH || path.join(DB_DIR, "dtvacation.sqlite");
const LEGACY_JSON_PATH = path.join(DB_DIR, "admin-store.json");

function getDatabase(): Database.Database {
  if (global.__dt_sqlite_db) {
    return global.__dt_sqlite_db;
  }

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const db = new Database(DB_FILE_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = NORMAL");
  db.pragma("foreign_keys = ON");

  initSchema(db);
  migrateLegacyJsonIfAvailable(db);

  global.__dt_sqlite_db = db;
  return db;
}

function initSchema(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS promotions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      badge TEXT,
      discount_tag TEXT,
      promo_code TEXT,
      urgency_tag TEXT,
      savings_estimate TEXT,
      valid_from TEXT,
      valid_until TEXT,
      image TEXT,
      description TEXT,
      highlights TEXT,
      vip_perks TEXT,
      cta_text TEXT,
      action_type TEXT,
      action_target TEXT,
      service_type TEXT,
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      name TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      service_type TEXT,
      destination TEXT,
      travel_date_start TEXT,
      travel_date_end TEXT,
      adults INTEGER DEFAULT 1,
      children INTEGER DEFAULT 0,
      guests INTEGER,
      duration TEXT,
      departure_port TEXT,
      message TEXT,
      promotion_id TEXT,
      promotion_title TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      notes TEXT,
      replied_at TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS subscribers (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      source TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS broadcast_logs (
      id TEXT PRIMARY KEY,
      subject TEXT NOT NULL,
      target_audience TEXT NOT NULL,
      recipient_count INTEGER NOT NULL,
      success_count INTEGER NOT NULL,
      failed_count INTEGER NOT NULL,
      promotion_id TEXT,
      promotion_title TEXT,
      sent_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS security_audit_logs (
      id TEXT PRIMARY KEY,
      event TEXT NOT NULL,
      ip TEXT NOT NULL,
      username TEXT,
      user_agent TEXT,
      timestamp TEXT NOT NULL
    );
  `);

  // Idempotent column migrations for existing SQLite databases
  try {
    db.exec("ALTER TABLE enquiries ADD COLUMN promotion_id TEXT;");
  } catch {}
  try {
    db.exec("ALTER TABLE enquiries ADD COLUMN promotion_title TEXT;");
  } catch {}
}

function migrateLegacyJsonIfAvailable(db: Database.Database): void {
  try {
    let legacyData: any = null;
    if (fs.existsSync(LEGACY_JSON_PATH)) {
      const raw = fs.readFileSync(LEGACY_JSON_PATH, "utf-8");
      legacyData = JSON.parse(raw);
    }

    // 1. Migrate Admin Password
    const hasPassword = db.prepare("SELECT key FROM admin_settings WHERE key = 'admin_password_hash'").get();
    if (!hasPassword) {
      const passwordHash = legacyData?.adminPasswordHash || hashPassword(DEFAULT_ADMIN_PASSWORD);
      db.prepare(
        "INSERT INTO admin_settings (key, value, updated_at) VALUES ('admin_password_hash', ?, ?)"
      ).run(passwordHash, new Date().toISOString());
    }

    // 2. Migrate Promotions
    const promoCount = (db.prepare("SELECT COUNT(*) as count FROM promotions").get() as { count: number }).count;
    if (promoCount === 0) {
      const insertPromo = db.prepare(`
        INSERT INTO promotions (
          id, title, subtitle, badge, discount_tag, promo_code, urgency_tag,
          savings_estimate, valid_from, valid_until, image, description,
          highlights, vip_perks, cta_text, action_type, action_target,
          service_type, active, created_at, updated_at
        ) VALUES (
          @id, @title, @subtitle, @badge, @discountTag, @promoCode, @urgencyTag,
          @savingsEstimate, @validFrom, @validUntil, @image, @description,
          @highlights, @vipPerks, @ctaText, @actionType, @actionTarget,
          @serviceType, @active, @createdAt, @updatedAt
        )
      `);

      const initialPromos: ExtendedPromotion[] =
        legacyData?.promotions && legacyData.promotions.length > 0
          ? legacyData.promotions
          : SPECIAL_PROMOTIONS.map((p) => ({
              ...p,
              validFrom: "2026-01-01",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }));

      const insertMany = db.transaction((promos: ExtendedPromotion[]) => {
        for (const p of promos) {
          insertPromo.run({
            id: p.id,
            title: p.title,
            subtitle: p.subtitle || "",
            badge: p.badge || "Special Deal",
            discountTag: p.discountTag || "SPECIAL OFFER",
            promoCode: p.promoCode || "",
            urgencyTag: p.urgencyTag || "",
            savingsEstimate: p.savingsEstimate || "",
            validFrom: p.validFrom || "2026-01-01",
            validUntil: p.validUntil || "",
            image: p.image || "/images/hero_hotels.webp",
            description: p.description || "",
            highlights: JSON.stringify(p.highlights || []),
            vipPerks: JSON.stringify(p.vipPerks || []),
            ctaText: p.ctaText || "Claim Offer",
            actionType: p.actionType || "whatsapp",
            actionTarget: p.actionTarget || "",
            serviceType: p.serviceType || "hotels",
            active: p.active !== false ? 1 : 0,
            createdAt: p.createdAt || new Date().toISOString(),
            updatedAt: p.updatedAt || new Date().toISOString(),
          });
        }
      });
      insertMany(initialPromos);
    }

    // 3. Migrate Enquiries
    const enqCount = (db.prepare("SELECT COUNT(*) as count FROM enquiries").get() as { count: number }).count;
    if (enqCount === 0 && legacyData?.enquiries?.length > 0) {
      const insertEnq = db.prepare(`
        INSERT INTO enquiries (
          id, first_name, last_name, name, email, phone, service_type,
          destination, travel_date_start, travel_date_end, adults, children,
          guests, duration, departure_port, message, status, notes, replied_at, created_at
        ) VALUES (
          @id, @firstName, @lastName, @name, @email, @phone, @serviceType,
          @destination, @travelDateStart, @travelDateEnd, @adults, @children,
          @guests, @duration, @departurePort, @message, @status, @notes, @repliedAt, @createdAt
        )
      `);

      const insertManyEnq = db.transaction((enqs: EnquiryRecord[]) => {
        for (const e of enqs) {
          insertEnq.run({
            id: e.id,
            firstName: e.firstName || "",
            lastName: e.lastName || "",
            name: e.name || `${e.firstName || ""} ${e.lastName || ""}`.trim() || "Traveler",
            email: e.email,
            phone: e.phone || "",
            serviceType: e.serviceType || "General",
            destination: e.destination || "",
            travelDateStart: e.travelDateStart || null,
            travelDateEnd: e.travelDateEnd || null,
            adults: e.adults || 1,
            children: e.children || 0,
            guests: e.guests || null,
            duration: e.duration || null,
            departurePort: e.departurePort || null,
            message: e.message || "",
            status: e.status || "new",
            notes: e.notes || null,
            repliedAt: e.repliedAt || null,
            createdAt: e.createdAt || new Date().toISOString(),
          });
        }
      });
      insertManyEnq(legacyData.enquiries);
    }

    // 4. Migrate Subscribers
    const subCount = (db.prepare("SELECT COUNT(*) as count FROM subscribers").get() as { count: number }).count;
    if (subCount === 0 && legacyData?.subscribers?.length > 0) {
      const insertSub = db.prepare(`
        INSERT OR IGNORE INTO subscribers (id, email, source, status, created_at)
        VALUES (@id, @email, @source, @status, @createdAt)
      `);
      const insertManySub = db.transaction((subs: SubscriberRecord[]) => {
        for (const s of subs) {
          insertSub.run({
            id: s.id,
            email: s.email,
            source: s.source || "Website",
            status: s.status || "active",
            createdAt: s.createdAt || new Date().toISOString(),
          });
        }
      });
      insertManySub(legacyData.subscribers);
    }

    // 5. Migrate Security Audit Logs
    const auditCount = (db.prepare("SELECT COUNT(*) as count FROM security_audit_logs").get() as { count: number }).count;
    if (auditCount === 0 && legacyData?.auditLogs?.length > 0) {
      const insertAudit = db.prepare(`
        INSERT INTO security_audit_logs (id, event, ip, username, user_agent, timestamp)
        VALUES (@id, @event, @ip, @username, @userAgent, @timestamp)
      `);
      const insertManyAudit = db.transaction((logs: SecurityAuditRecord[]) => {
        for (const l of logs) {
          insertAudit.run({
            id: l.id,
            event: l.event,
            ip: l.ip || "127.0.0.1",
            username: l.username || "admin",
            userAgent: l.userAgent || "",
            timestamp: l.timestamp || new Date().toISOString(),
          });
        }
      });
      insertManyAudit(legacyData.auditLogs);
    }

    // 6. Migrate Broadcast Logs
    const bcCount = (db.prepare("SELECT COUNT(*) as count FROM broadcast_logs").get() as { count: number }).count;
    if (bcCount === 0 && legacyData?.broadcastLogs?.length > 0) {
      const insertBc = db.prepare(`
        INSERT INTO broadcast_logs (
          id, subject, target_audience, recipient_count, success_count, failed_count, promotion_id, promotion_title, sent_at
        ) VALUES (
          @id, @subject, @targetAudience, @recipientCount, @successCount, @failedCount, @promotionId, @promotionTitle, @sentAt
        )
      `);
      const insertManyBc = db.transaction((bcs: BroadcastLogRecord[]) => {
        for (const b of bcs) {
          insertBc.run({
            id: b.id,
            subject: b.subject,
            targetAudience: b.targetAudience,
            recipientCount: b.recipientCount || 0,
            successCount: b.successCount || 0,
            failedCount: b.failedCount || 0,
            promotionId: b.promotionId || null,
            promotionTitle: b.promotionTitle || null,
            sentAt: b.sentAt || new Date().toISOString(),
          });
        }
      });
      insertManyBc(legacyData.broadcastLogs);
    }
  } catch (err) {
    console.error("Database migration error:", err);
  }
}

function safeParseJsonArray<T = any>(val: any): T[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
      if (typeof parsed === "string") {
        const secondParse = JSON.parse(parsed);
        if (Array.isArray(secondParse)) return secondParse;
      }
    } catch {
      const lines = val.split("\n").map((s) => s.trim()).filter(Boolean);
      if (lines.length > 0) return lines as unknown as T[];
    }
  }
  return [];
}

function syncLegacyJsonStore(db: Database.Database): void {
  try {
    if (!fs.existsSync(LEGACY_JSON_PATH)) return;
    const raw = fs.readFileSync(LEGACY_JSON_PATH, "utf-8");
    const json = JSON.parse(raw);
    const allPromos = db.prepare("SELECT * FROM promotions ORDER BY created_at DESC").all().map(mapPromotionRow);
    json.promotions = allPromos;
    fs.writeFileSync(LEGACY_JSON_PATH, JSON.stringify(json, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to sync legacy json store:", err);
  }
}

// ── Row Mapping Helper ──
function mapPromotionRow(row: any): ExtendedPromotion {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle || "",
    badge: row.badge || "Special Deal",
    discountTag: row.discount_tag || "SPECIAL OFFER",
    promoCode: row.promo_code || "",
    urgencyTag: row.urgency_tag || "",
    savingsEstimate: row.savings_estimate || "",
    validFrom: row.valid_from || "",
    validUntil: row.valid_until || "",
    image: row.image || "/images/hero_hotels.webp",
    description: row.description || "",
    highlights: safeParseJsonArray<string>(row.highlights),
    vipPerks: safeParseJsonArray<VIPPerk>(row.vip_perks),
    ctaText: row.cta_text || "Claim Offer",
    actionType: row.action_type || "whatsapp",
    actionTarget: row.action_target || "",
    serviceType: row.service_type || "hotels",
    active: Boolean(row.active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapEnquiryRow(row: any): EnquiryRecord {
  return {
    id: row.id,
    firstName: row.first_name || "",
    lastName: row.last_name || "",
    name: row.name || `${row.first_name || ""} ${row.last_name || ""}`.trim() || "Traveler",
    email: row.email,
    phone: row.phone || "",
    serviceType: row.service_type || "General",
    destination: row.destination || "",
    travelDateStart: row.travel_date_start || null,
    travelDateEnd: row.travel_date_end || null,
    adults: row.adults ?? 1,
    children: row.children ?? 0,
    guests: row.guests ?? undefined,
    duration: row.duration ?? undefined,
    departurePort: row.departure_port ?? undefined,
    message: row.message || "",
    promotionId: row.promotion_id || undefined,
    promotionTitle: row.promotion_title || undefined,
    status: row.status || "new",
    notes: row.notes || undefined,
    repliedAt: row.replied_at || undefined,
    createdAt: row.created_at,
  };
}

// ── PROMOTIONS ──
export async function getPromotions(): Promise<ExtendedPromotion[]> {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM promotions ORDER BY created_at DESC").all();
  return rows.map(mapPromotionRow);
}

export async function getActivePromotions(): Promise<ExtendedPromotion[]> {
  const allPromos = await getPromotions();
  const now = new Date();

  return allPromos.filter((promo) => {
    if (!promo.active) return false;

    if (promo.validFrom) {
      const fromDate = new Date(promo.validFrom);
      if (!isNaN(fromDate.getTime()) && fromDate > now) {
        return false;
      }
    }

    if (isDateExpired(promo.validUntil)) {
      return false;
    }

    return true;
  });
}

export async function savePromotion(promo: Partial<ExtendedPromotion> & { title: string }): Promise<ExtendedPromotion> {
  const db = getDatabase();
  const now = new Date().toISOString();
  const id = promo.id || `promo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  // Sanitize highlights
  let cleanHighlights: string[] = [];
  if (Array.isArray(promo.highlights)) {
    cleanHighlights = promo.highlights;
  } else if (typeof promo.highlights === "string") {
    cleanHighlights = safeParseJsonArray<string>(promo.highlights);
  }
  cleanHighlights = cleanHighlights
    .map((h) => (typeof h === "string" ? h.trim() : String(h).trim()))
    .filter(Boolean);

  // Sanitize VIP perks
  let cleanVipPerks: VIPPerk[] = [];
  if (Array.isArray(promo.vipPerks)) {
    cleanVipPerks = promo.vipPerks;
  } else if (typeof promo.vipPerks === "string") {
    cleanVipPerks = safeParseJsonArray<VIPPerk>(promo.vipPerks);
  }
  cleanVipPerks = cleanVipPerks
    .filter((p) => p && (p.title?.trim() || p.desc?.trim()))
    .map((p) => ({
      title: (p.title || "").trim(),
      desc: (p.desc || "").trim(),
      icon: (p.icon || "gift") as any,
    }));

  const descriptionText = typeof promo.description === "string" ? promo.description.trim() : "";

  const existing = db.prepare("SELECT id, created_at FROM promotions WHERE id = ?").get(id) as { id: string; created_at: string } | undefined;

  if (existing) {
    db.prepare(`
      UPDATE promotions SET
        title = @title,
        subtitle = @subtitle,
        badge = @badge,
        discount_tag = @discountTag,
        promo_code = @promoCode,
        urgency_tag = @urgencyTag,
        savings_estimate = @savingsEstimate,
        valid_from = @validFrom,
        valid_until = @validUntil,
        image = @image,
        description = @description,
        highlights = @highlights,
        vip_perks = @vipPerks,
        cta_text = @ctaText,
        action_type = @actionType,
        action_target = @actionTarget,
        service_type = @serviceType,
        active = @active,
        updated_at = @updatedAt
      WHERE id = @id
    `).run({
      id,
      title: promo.title,
      subtitle: promo.subtitle ?? "",
      badge: promo.badge ?? "Special Deal",
      discountTag: promo.discountTag ?? "SPECIAL OFFER",
      promoCode: promo.promoCode ?? "",
      urgencyTag: promo.urgencyTag ?? "",
      savingsEstimate: promo.savingsEstimate ?? "",
      validFrom: promo.validFrom ?? now.split("T")[0],
      validUntil: promo.validUntil ?? "",
      image: promo.image ?? "/images/hero_hotels.webp",
      description: descriptionText,
      highlights: JSON.stringify(cleanHighlights),
      vipPerks: JSON.stringify(cleanVipPerks),
      ctaText: promo.ctaText ?? "Claim Offer",
      actionType: promo.actionType ?? "whatsapp",
      actionTarget: promo.actionTarget ?? "",
      serviceType: promo.serviceType ?? "hotels",
      active: promo.active !== false ? 1 : 0,
      updatedAt: now,
    });
  } else {
    db.prepare(`
      INSERT INTO promotions (
        id, title, subtitle, badge, discount_tag, promo_code, urgency_tag,
        savings_estimate, valid_from, valid_until, image, description,
        highlights, vip_perks, cta_text, action_type, action_target,
        service_type, active, created_at, updated_at
      ) VALUES (
        @id, @title, @subtitle, @badge, @discountTag, @promoCode, @urgencyTag,
        @savingsEstimate, @validFrom, @validUntil, @image, @description,
        @highlights, @vipPerks, @ctaText, @actionType, @actionTarget,
        @serviceType, @active, @createdAt, @updatedAt
      )
    `).run({
      id,
      title: promo.title,
      subtitle: promo.subtitle ?? "",
      badge: promo.badge ?? "Special Deal",
      discountTag: promo.discountTag ?? "SPECIAL OFFER",
      promoCode: promo.promoCode ?? "",
      urgencyTag: promo.urgencyTag ?? "",
      savingsEstimate: promo.savingsEstimate ?? "",
      validFrom: promo.validFrom ?? now.split("T")[0],
      validUntil: promo.validUntil ?? "",
      image: promo.image ?? "/images/hero_hotels.webp",
      description: descriptionText,
      highlights: JSON.stringify(cleanHighlights),
      vipPerks: JSON.stringify(cleanVipPerks),
      ctaText: promo.ctaText ?? "Claim Offer",
      actionType: promo.actionType ?? "whatsapp",
      actionTarget: promo.actionTarget ?? "",
      serviceType: promo.serviceType ?? "hotels",
      active: promo.active !== false ? 1 : 0,
      createdAt: now,
      updatedAt: now,
    });
  }

  syncLegacyJsonStore(db);
  const updatedRow = db.prepare("SELECT * FROM promotions WHERE id = ?").get(id);
  return mapPromotionRow(updatedRow);
}

export async function deletePromotion(id: string): Promise<boolean> {
  const db = getDatabase();
  const info = db.prepare("DELETE FROM promotions WHERE id = ?").run(id);
  if (info.changes > 0) {
    syncLegacyJsonStore(db);
    return true;
  }
  return false;
}

export async function togglePromotion(id: string, active: boolean): Promise<ExtendedPromotion | null> {
  const db = getDatabase();
  const now = new Date().toISOString();
  db.prepare("UPDATE promotions SET active = ?, updated_at = ? WHERE id = ?").run(active ? 1 : 0, now, id);
  syncLegacyJsonStore(db);
  const row = db.prepare("SELECT * FROM promotions WHERE id = ?").get(id);
  return row ? mapPromotionRow(row) : null;
}

// ── ENQUIRIES (LEADS) ──
export async function getEnquiries(): Promise<EnquiryRecord[]> {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM enquiries ORDER BY created_at DESC").all();
  return rows.map(mapEnquiryRow);
}

export async function saveEnquiry(
  enquiry: Omit<EnquiryRecord, "id" | "createdAt" | "status"> & { id?: string; status?: EnquiryRecord["status"] }
): Promise<EnquiryRecord> {
  const db = getDatabase();
  const now = new Date().toISOString();
  const id = enquiry.id || `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const fullName = enquiry.name || `${enquiry.firstName || ""} ${enquiry.lastName || ""}`.trim() || "Traveler";

  db.prepare(`
    INSERT INTO enquiries (
      id, first_name, last_name, name, email, phone, service_type,
      destination, travel_date_start, travel_date_end, adults, children,
      guests, duration, departure_port, message, promotion_id, promotion_title, status, notes, created_at
    ) VALUES (
      @id, @firstName, @lastName, @name, @email, @phone, @serviceType,
      @destination, @travelDateStart, @travelDateEnd, @adults, @children,
      @guests, @duration, @departurePort, @message, @promotionId, @promotionTitle, @status, @notes, @createdAt
    )
  `).run({
    id,
    firstName: enquiry.firstName ?? "",
    lastName: enquiry.lastName ?? "",
    name: fullName,
    email: enquiry.email,
    phone: enquiry.phone ?? "",
    serviceType: enquiry.serviceType || "General",
    destination: enquiry.destination ?? "",
    travelDateStart: enquiry.travelDateStart ?? null,
    travelDateEnd: enquiry.travelDateEnd ?? null,
    adults: enquiry.adults ?? 1,
    children: enquiry.children ?? 0,
    guests: enquiry.guests ?? null,
    duration: enquiry.duration ?? null,
    departurePort: enquiry.departurePort ?? null,
    message: enquiry.message ?? "",
    promotionId: enquiry.promotionId ?? null,
    promotionTitle: enquiry.promotionTitle ?? null,
    status: enquiry.status || "new",
    notes: enquiry.notes ?? null,
    createdAt: now,
  });

  const row = db.prepare("SELECT * FROM enquiries WHERE id = ?").get(id);
  return mapEnquiryRow(row);
}

export async function updateEnquiryStatus(
  id: string,
  updates: { status?: EnquiryRecord["status"]; notes?: string; repliedAt?: string }
): Promise<EnquiryRecord | null> {
  const db = getDatabase();
  const existing = db.prepare("SELECT * FROM enquiries WHERE id = ?").get(id);
  if (!existing) return null;

  if (updates.status !== undefined) {
    db.prepare("UPDATE enquiries SET status = ? WHERE id = ?").run(updates.status, id);
  }
  if (updates.notes !== undefined) {
    db.prepare("UPDATE enquiries SET notes = ? WHERE id = ?").run(updates.notes, id);
  }
  if (updates.repliedAt !== undefined) {
    db.prepare("UPDATE enquiries SET replied_at = ? WHERE id = ?").run(updates.repliedAt, id);
  }

  const updated = db.prepare("SELECT * FROM enquiries WHERE id = ?").get(id);
  return updated ? mapEnquiryRow(updated) : null;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const db = getDatabase();
  const info = db.prepare("DELETE FROM enquiries WHERE id = ?").run(id);
  return info.changes > 0;
}

// ── SUBSCRIBERS ──
export async function getSubscribers(): Promise<SubscriberRecord[]> {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM subscribers ORDER BY created_at DESC").all();
  return rows.map((r: any) => ({
    id: r.id,
    email: r.email,
    source: r.source || "Website Subscriber",
    status: r.status as "active" | "unsubscribed",
    createdAt: r.created_at,
  }));
}

export async function saveSubscriber(email: string, source: string = "Footer Newsletter"): Promise<SubscriberRecord> {
  const db = getDatabase();
  const cleanEmail = email.trim().toLowerCase();
  const now = new Date().toISOString();

  const existing = db.prepare("SELECT * FROM subscribers WHERE email = ?").get(cleanEmail) as any;
  if (existing) {
    db.prepare("UPDATE subscribers SET status = 'active' WHERE id = ?").run(existing.id);
    return {
      id: existing.id,
      email: existing.email,
      source: existing.source,
      status: "active",
      createdAt: existing.created_at,
    };
  }

  const id = `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  db.prepare("INSERT INTO subscribers (id, email, source, status, created_at) VALUES (?, ?, ?, 'active', ?)").run(
    id,
    cleanEmail,
    source,
    now
  );

  return {
    id,
    email: cleanEmail,
    source,
    status: "active",
    createdAt: now,
  };
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  const db = getDatabase();
  const info = db.prepare("DELETE FROM subscribers WHERE id = ?").run(id);
  return info.changes > 0;
}

// ── BROADCAST LOGS ──
export async function getBroadcastLogs(): Promise<BroadcastLogRecord[]> {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM broadcast_logs ORDER BY sent_at DESC").all();
  return rows.map((r: any) => ({
    id: r.id,
    subject: r.subject,
    targetAudience: r.target_audience,
    recipientCount: r.recipient_count,
    successCount: r.success_count,
    failedCount: r.failed_count,
    promotionId: r.promotion_id || undefined,
    promotionTitle: r.promotion_title || undefined,
    sentAt: r.sent_at,
  }));
}

export async function saveBroadcastLog(log: Omit<BroadcastLogRecord, "id" | "sentAt">): Promise<BroadcastLogRecord> {
  const db = getDatabase();
  const id = `bc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const sentAt = new Date().toISOString();

  db.prepare(`
    INSERT INTO broadcast_logs (
      id, subject, target_audience, recipient_count, success_count, failed_count, promotion_id, promotion_title, sent_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    log.subject,
    log.targetAudience,
    log.recipientCount,
    log.successCount,
    log.failedCount,
    log.promotionId || null,
    log.promotionTitle || null,
    sentAt
  );

  return {
    id,
    ...log,
    sentAt,
  };
}

// ── SECURITY AUDIT LOGS ──
export async function getSecurityLogs(): Promise<SecurityAuditRecord[]> {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM security_audit_logs ORDER BY timestamp DESC LIMIT 50").all();
  return rows.map((r: any) => ({
    id: r.id,
    event: r.event as SecurityAuditRecord["event"],
    ip: r.ip,
    username: r.username || "admin",
    userAgent: r.user_agent || "",
    timestamp: r.timestamp,
  }));
}

export async function recordSecurityAudit(
  event: SecurityAuditRecord["event"],
  ip: string,
  username?: string,
  userAgent?: string
): Promise<void> {
  const db = getDatabase();
  const id = `sec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO security_audit_logs (id, event, ip, username, user_agent, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, event, ip, username || "admin", userAgent || "", now);

  // Keep last 100 entries
  db.prepare(`
    DELETE FROM security_audit_logs
    WHERE id NOT IN (
      SELECT id FROM security_audit_logs ORDER BY timestamp DESC LIMIT 100
    )
  `).run();
}

// ── ADMIN PASSWORD & SETTINGS ──
export async function getAdminPasswordHash(): Promise<string> {
  const db = getDatabase();
  const row = db.prepare("SELECT value FROM admin_settings WHERE key = 'admin_password_hash'").get() as { value: string } | undefined;
  if (row?.value) {
    return row.value;
  }
  const defaultHash = hashPassword(DEFAULT_ADMIN_PASSWORD);
  db.prepare(
    "INSERT INTO admin_settings (key, value, updated_at) VALUES ('admin_password_hash', ?, ?)"
  ).run(defaultHash, new Date().toISOString());
  return defaultHash;
}

export async function setAdminPasswordHash(newHash: string): Promise<void> {
  const db = getDatabase();
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO admin_settings (key, value, updated_at)
    VALUES ('admin_password_hash', ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `).run(newHash, now);
}
