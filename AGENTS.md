<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# 🌴 DT's Vacation & Travel Ltd. — Project Intelligence File

> **READ THIS FIRST before writing any code.** This file is the single source of truth for AI assistants working on this project. All architectural decisions, deployment targets, and pending features are documented here.

---

## 🚀 Deployment Stack

| Service | Role | Details |
|---|---|---|
| **Vercel** | Hosting & CI/CD | Connected to GitHub repo. Every `git push origin main` triggers an automatic deploy. **Do NOT use DigitalOcean or Docker.** |
| **GitHub** | Source Control | Repo: `tanapatsriau-lang/DT-s-Travel` |
| **Supabase** | Database | For storing newsletter subscribers & enquiry data. Project to be linked — see below. |

### ⚠️ CRITICAL: Next.js Runtime Mode
- This project runs as a **standard Next.js SSR/SSG app on Vercel** — NOT as a static export.
- `output: 'export'` has been **removed** from `next.config.ts`. Do NOT add it back.
- This enables **API Routes** (`app/api/...`) which are required for email sending and Supabase integration.
- Images use `unoptimized: true` because we serve local `/public/images/*.webp` assets.

---

## 📧 Email System (In Progress — Awaiting Sender Account)

### Enquiry Flow
When a customer fills out the Global Enquiry Modal or any page enquiry form, the system should:
1. Send an **email notification** to the agency: `dtvacationandtravel@gmail.com`
2. Send a **confirmation email** to the customer (using the email they provided in the form)
3. Store the enquiry data in Supabase `enquiries` table

### Sender Email
- **Receiver (Agency):** `dtvacationandtravel@gmail.com`
- **Sender Account:** ⏳ **PENDING — Owner is currently signing up for a sender email service.**
  - When ready, configure as `RESEND_API_KEY` (preferred) or `SMTP_*` variables in Vercel environment.
  - The API Route for sending email should be: `app/api/send-enquiry/route.ts`

### Data Collected in Enquiry Forms
The forms collect: `firstName`, `lastName`, `email`, `phone (WhatsApp)`, `destination`, `travelDateStart`, `travelDateEnd`, `adults`, `children`, `message`, `serviceType` (Hotels/Cruises/Tours/Wedding/Corporate).

---

## 🗄️ Supabase Integration (In Progress)

### Purpose
- Store **newsletter subscribers** from the Footer and NewsletterModal forms
- Store **enquiry submissions** from customers
- Future: Store booking requests

### Tables to Create
```sql
-- Subscribers table
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enquiries table
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  destination TEXT,
  travel_date_start DATE,
  travel_date_end DATE,
  adults INT,
  children INT,
  message TEXT,
  service_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Environment Variables Required
Add these to Vercel Project Settings → Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=       # From Supabase project → Settings → API
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # From Supabase project → Settings → API
RESEND_API_KEY=                 # From resend.com (sender email service) — PENDING
```

### API Routes to Build
| Route | Purpose |
|---|---|
| `app/api/subscribe/route.ts` | Save email to Supabase `subscribers` table |
| `app/api/send-enquiry/route.ts` | Save to `enquiries` table + send email via Resend |

---

## 🗂️ Project Structure

```
app/
├── page.tsx              # Home
├── hotels/page.tsx       # Hotels page
├── cruises/page.tsx      # Cruises page
├── tours/page.tsx        # Tours page
├── weddings/page.tsx     # Weddings page
├── corporate/page.tsx    # Corporate page
├── about/page.tsx        # About page
├── privacy/page.tsx      # Privacy Policy (Jamaica JDPA + South America LGPD)
├── terms/page.tsx        # Terms of Service (Governed by Jamaica law)
├── api/                  # 🚧 To be built — Email & Supabase API routes
├── layout.tsx            # Root layout with Navbar, Footer, GlobalEnquiryModal
└── globals.css           # Tailwind v4 + custom design tokens

components/
├── Navbar.tsx            # Fixed top bar (mobile-responsive) + sliding gold indicator
├── Footer.tsx            # Newsletter form + links to /privacy & /terms
├── home/                 # HeroCarousel, ServiceCards, ToursShowcase, etc.
├── hotels/               # HotelsFeaturedGrid, HotelsHandpicked, HotelsSearch
├── cruise/               # CruiseHero, CruiseEnquiryForm, etc.
├── tours/                # ToursHero, ToursCTA, etc.
├── wedding/              # Wedding-specific components
├── corporate/            # Corporate-specific components
├── ui/
│   ├── GlobalEnquiryModal.tsx   # 3-step slide modal (Contact → Travel Details → Message)
│   └── DateRangePicker.tsx      # Custom inline date picker (use inline prop inside modals)

lib/
├── mockData.ts           # heroSlides data (5 slides), tour cards — ALL images must be local /public/images/*.webp
└── expedia.ts            # Expedia affiliate URL builder

context/
└── EnquiryContext.tsx    # Global state for opening/closing GlobalEnquiryModal
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
- **No external image URLs** (Unsplash, etc.) — static export / Vercel CDN caches break them
- Preferred format: **WebP** at `quality=88`, width `≥ 3000px` for hero images
- Key images: `hero_tours.webp`, `hero_cruises.webp`, `hotel_iberostar.webp`, `logo.webp`

---

## 📋 Pending Tasks

- [ ] Owner signing up for sender email service (Resend.com recommended)
- [ ] Link Supabase project → get `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- [ ] Build `app/api/subscribe/route.ts` (newsletter signup)
- [ ] Build `app/api/send-enquiry/route.ts` (enquiry email + DB save)
- [ ] Wire Footer newsletter form to `/api/subscribe`
- [ ] Wire `GlobalEnquiryModal` step 3 submit to `/api/send-enquiry`
- [ ] Enable RLS policies on Supabase `subscribers` and `enquiries` tables
- [ ] Add Vercel environment variables once Supabase & Resend are ready
