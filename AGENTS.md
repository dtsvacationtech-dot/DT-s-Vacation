<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# 🌴 DT's Vacation & Travel Ltd. — Project Intelligence File

> **READ THIS FIRST before writing any code.** This file is the single source of truth for AI assistants working on this project. All architectural decisions, deployment targets, and pending features are documented here.

---

## 🚀 Deployment Stack (Digital Gateway / VPS / Self-Hosted)

| Service | Role | Details |
|---|---|---|
| **Digital Gateway / VPS** | Hosting & Runtime | Full-stack Next.js Standalone server running on port 3000 via Docker or PM2 behind Nginx. **Supabase and Vercel are NOT used** to minimize costs. |
| **GitHub** | Source Control | Repo: `tanapatsriau-lang/DT-s-Travel` |
| **SQLite (WAL Mode)** | Database | Local persistent database at `data/dtvacation.sqlite`. Zero cloud fees, ACID transactions, auto-migrates from JSON. |
| **Nginx** | Reverse Proxy & SSL | Manages HTTPS, Let's Encrypt certificates, gzip, and client body size. |

### ⚠️ CRITICAL: Next.js Runtime Mode
- This project runs as a **Next.js Standalone application** (`output: "standalone"` in `next.config.ts`).
- Bundles both Frontend SSR and Backend API Routes into `.next/standalone/server.js`.
- Native packages like `better-sqlite3` and `nodemailer` are listed in `serverExternalPackages`.
- Images use `unoptimized: true` because we serve local `/public/images/*.webp` assets.

---

## 📧 Email System (Active — Direct Gmail SMTP)

### Enquiry Flow
When a customer fills out the Global Enquiry Modal or any page enquiry form, the system automatically:
1. Sends an **internal email notification** with full lead details to the agency: `dtvacationandtravel@gmail.com`
2. Sends an **instant luxury confirmation email** to the customer
3. Stores the enquiry data in SQLite `enquiries` table immediately

### Email Credentials (100% Free via Nodemailer)
- **Email Dispatcher:** `lib/emailSender.ts` (supports Gmail SMTP & fallback)
- **Agency & Sender:** `dtvacationandtravel@gmail.com`
- **Environment Variables Required:**
  ```env
  GMAIL_USER=dtvacationandtravel@gmail.com
  GMAIL_APP_PASSWORD=xrlhjcqspqkonhmv
  ADMIN_SESSION_SECRET=dts-vacation-luxury-travel-admin-secret-2026
  ```

---

## 🗄️ Database Architecture (SQLite with WAL Mode)

### Database Path
`data/dtvacation.sqlite` (mounted via `./data:/app/data` in Docker)

### Tables
- `admin_settings`: Key-value configuration including PBKDF2 hashed admin password
- `promotions`: Seasonal flash deals, perks, badges, valid dates, discounts
- `enquiries`: Customer leads, contact details, travel preferences, lead status (new, contacted, booked)
- `subscribers`: Newsletter subscribers with active status
- `broadcast_logs`: History of email broadcasts sent to leads or subscribers
- `security_audit_logs`: Timestamped administrative authentication and security events (login success, failures, lockout, password changes)

---

## 🗂️ Project Structure

```
app/
├── page.tsx              # Home (Special Offers, Hero, Services)
├── hotels/page.tsx       # Hotels page
├── cruises/page.tsx      # Cruises page
├── tours/page.tsx        # Tours page
├── weddings/page.tsx     # Weddings page
├── corporate/page.tsx    # Corporate page
├── about/page.tsx        # About page
├── contact/page.tsx      # Contact page
├── privacy/page.tsx      # Privacy Policy
├── terms/page.tsx        # Terms of Service
├── admin/                # VIP Agency Suite (Overview, Promotions, Leads, Subs, Broadcast, Security)
├── api/                  # Full-stack backend API routes
│   ├── admin/auth/       # Login, Logout, Session check, Change password
│   ├── admin/audit/      # Security audit logs retrieval
│   ├── admin/promotions/ # Admin promotions CRUD
│   ├── admin/enquiries/  # Admin leads management
│   ├── admin/subscribers/# Admin subscribers management
│   ├── admin/broadcast/  # Mass email broadcast dispatch
│   ├── send-enquiry/     # Customer enquiry submission + email dispatch + DB save
│   ├── subscribe/        # Newsletter subscription + DB save
│   └── promotions/       # Public active promotions endpoint
├── layout.tsx            # Root layout with Navbar, Footer, GlobalEnquiryModal
└── globals.css           # Tailwind v4 + custom design tokens

deploy/
├── nginx.conf            # Reverse Proxy configuration for Digital Gateway / VPS
└── README.md             # Complete step-by-step deployment instructions

lib/
├── db.ts                 # SQLite database engine (better-sqlite3, WAL mode, migrations)
├── auth.ts               # PBKDF2 password hashing, anti-brute force, HMAC-SHA256 sessions
├── emailSender.ts        # Direct Gmail SMTP / Nodemailer dispatcher
├── emailTemplates.ts     # Customer reply and broadcast email templates
└── promotionsData.ts     # Default promotion templates

data/
└── dtvacation.sqlite     # Real SQLite Database file
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| **Brand Primary** | `deep-navy` (#000C1C) |
| **Brand Accent** | `tropical-gold` (#D4A017) |
| **Font Heading** | Montserrat (--font-montserrat) |
| **Font Body** | Open Sans (--font-open-sans) |
| **Style** | Jamaica iOS — Glassmorphism, smooth animations, premium dark aesthetic |

---

## 🖼️ Image Rules

- **ALL images MUST be local files** in `/public/images/*.webp`
- **No external image URLs** (Unsplash, etc.)
- Preferred format: **WebP** at `quality=88`, width `≥ 3000px` for hero images
- Key images: `hero_tours.webp`, `hero_cruises.webp`, `hotel_iberostar.webp`, `logo.webp`
