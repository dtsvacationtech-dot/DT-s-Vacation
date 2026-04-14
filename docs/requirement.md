# DT's Vacation & Travel - Requirement Document

## Project Overview
"DT’s Vacation & Travel" is an intentional travel agency focusing on bringing rigorous logistical planning to extraordinary destinations. The MVP 1 website will establish the brand's digital presence with a premium "Jamaica iOS" design style emphasizing high-end visual appeal, smooth interactions, and 3 specific client pathways.

## Scope (MVP Phase 1)
- **8 Core Pages:**
  1. Home
  2. About the Heart
  3. Services Overview
  4. Corporate Logistics
  5. The Wedding Suite
  6. Stories from the Journey (Reviews)
  7. Let's Connect Intentionally (Contact)
  8. Travel Resources
- **Targeted Navigation:** Prominent CTAs for:
  - "Plan a Wedding"
  - "Organize a Retreat"
  - "Start an Adventure"
- **Communication Features:**
  - Live Chat floating widget (UI implementation)
  - "Let's Chat" button in top-nav
  - Automated Newsletter pop-up triggered by time (15s) or scroll (50%)
- **Media & Content:** 
  - Welcome video integration with captions
  - Downloadable PDF checklists for specific journeys
- **Interactive Elements:**
  - "Service Discovery" Quiz to recommend travel packages based on user feelings/goals
  - Immersive Full-screen Hero Carousel on the Home Page
- **Forms & Maps:**
  - Custom contact/review forms with image upload capabilities
  - Custom-styled Google Map on the contact page (gray/navy tone with gold pins)
- **Email Automation (MVP 1 Scope Addition):**
  - Export form submission data to the PostgreSQL database
  - Trigger "Welcome/Thank You" automated email to the user upon submission

## Tech Stack
- Frontend: Next.js 14, TypeScript, Tailwind CSS v3
- Backend/DB: PostgreSQL (Supabase/AWS)
- File Storage: AWS S3
- Email: SendGrid
- Hosting: Vercel (Frontend), Vercel Edge Cache/CDN
