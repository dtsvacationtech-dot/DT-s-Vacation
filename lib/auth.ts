import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// --- Configuration Constants ---
const SESSION_COOKIE_NAME = "dt_admin_session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout
const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || process.env.SESSION_SECRET || "dts-vacation-luxury-travel-admin-secret-2026";

// Default admin credentials (override via environment variables or settings)
export const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "DtsVacation2026!#";

// --- In-Memory Rate Limiting & Lockout Store ---
interface AttemptRecord {
  count: number;
  firstAttemptAt: number;
  lastAttemptAt: number;
  lockedUntil: number | null;
}

const loginAttempts = new Map<string, AttemptRecord>();

// Clean up old attempts periodically
function cleanupAttempts() {
  const now = Date.now();
  for (const [key, record] of loginAttempts.entries()) {
    if (record.lockedUntil && record.lockedUntil < now) {
      loginAttempts.delete(key);
    } else if (!record.lockedUntil && now - record.lastAttemptAt > LOCKOUT_DURATION_MS) {
      loginAttempts.delete(key);
    }
  }
}

// --- Cryptographic Password Hashing (PBKDF2) ---
export function hashPassword(password: string, salt?: string): string {
  const generatedSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, generatedSalt, 100000, 64, "sha512").toString("hex");
  return `${generatedSalt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, originalHash] = storedHash.split(":");
    if (!salt || !originalHash) return false;
    const computedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    return crypto.timingSafeEqual(Buffer.from(computedHash, "hex"), Buffer.from(originalHash, "hex"));
  } catch {
    return false;
  }
}

// --- Anti-Brute Force Rate Limiting ---
export function checkRateLimit(identifier: string): { allowed: boolean; remainingSeconds: number; attemptsLeft: number } {
  cleanupAttempts();
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (!record) {
    return { allowed: true, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }

  if (record.lockedUntil && record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingSeconds, attemptsLeft: 0 };
  }

  // Reset if lockout expired
  if (record.lockedUntil && record.lockedUntil <= now) {
    loginAttempts.delete(identifier);
    return { allowed: true, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }

  const attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - record.count);
  return { allowed: true, remainingSeconds: 0, attemptsLeft };
}

export function recordFailedAttempt(identifier: string): { isLocked: boolean; remainingSeconds: number; attemptsLeft: number; delayMs: number } {
  cleanupAttempts();
  const now = Date.now();
  const record = loginAttempts.get(identifier) || {
    count: 0,
    firstAttemptAt: now,
    lastAttemptAt: now,
    lockedUntil: null,
  };

  record.count += 1;
  record.lastAttemptAt = now;

  let isLocked = false;
  let remainingSeconds = 0;
  let delayMs = 0;

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    isLocked = true;
    remainingSeconds = Math.ceil(LOCKOUT_DURATION_MS / 1000);
  } else {
    // Exponential delay for repeated failures: 2nd attempt -> 1000ms, 3rd -> 2000ms, 4th -> 3000ms
    delayMs = Math.min(3000, (record.count - 1) * 1000);
  }

  loginAttempts.set(identifier, record);
  const attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - record.count);

  return { isLocked, remainingSeconds, attemptsLeft, delayMs };
}

export function recordSuccessfulLogin(identifier: string) {
  loginAttempts.delete(identifier);
}

// --- HMAC-SHA256 Signed Session Token ---
interface SessionPayload {
  username: string;
  role: "admin";
  iat: number;
  exp: number;
}

export function createSessionToken(username: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload: SessionPayload = {
    username,
    role: "admin",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const data = `${header}.${encodedPayload}`;
  const signature = crypto.createHmac("sha256", SECRET_KEY).update(data).digest("base64url");
  return `${data}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, encodedPayload, signature] = parts;
    const data = `${header}.${encodedPayload}`;
    const expectedSignature = crypto.createHmac("sha256", SECRET_KEY).update(data).digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf-8"));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return null;

    return payload;
  } catch {
    return null;
  }
}

// --- Request & Cookie Helpers ---
export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie?.value) return null;
  return verifySessionToken(sessionCookie.value);
}

export function getAdminSessionFromRequest(req: NextRequest): SessionPayload | null {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value || req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  return verifySessionToken(token);
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS };
