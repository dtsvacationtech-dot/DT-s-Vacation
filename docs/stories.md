# Stories: Sprint 1

## Epic: Foundational App Setup & Base Navigation
**Story 1.1:** As a Dev, I want to initialize the Next.js 14 App with Tailwind CSS so that we have a standard development baseline.
- **AC:** App boots at `localhost:3000`. Global CSS variables for 60-30-10 palette are implemented.

**Story 1.2:** As a User, I want a top-level iOS-style glassmorphism Navbar so that I can discover pages easily.
- **AC:** Navbar is fixed, blurs background, and contains 3 path CTAs and a "Let's Chat" button. Has mobile hamburger menu.

## Epic: Home Page Immersive Experience
**Story 2.1:** As a User, I want to see a full-screen image carousel when I land on the Home page, to feel inspired.
- **AC:** Carousel displays 4-5 mock images (Unsplash). Large text overlay exists. Dark gradient on the left side ensures text readability. Auto-plays every 5s. Includes interactive dot indicators.

**Story 2.2:** As a User, I can scroll down to see Trust factors and a scrolling manifesto, to understand the brand.
- **AC:** "Trust Bar" shows 3 animated stats with scroll-reveal. Manifesto text scrolls infinitely horizontally.

**Story 2.3:** As a User, I receive a newsletter pop-up prompt if I scroll halfway or wait 15 seconds.
- **AC:** Pop-up renders correctly on time (15s) or depth (50%), only triggers once per session.

**Story 2.4:** As an intentional shopper, I want to see the 3 tier service cards and take a "Service Quiz" so I know which package fits me.
- **AC:** Service Cards (Discovery, Union, Synergy) layout rendered. Service Quiz 3-card toggle UI implemented correctly with mock results.

## Epic: Contact & Connectivity
**Story 3.1:** As a User, I can view the Contact Page to see the custom styled Google Map and Inquiry form.
- **AC:** Page has 2 columns (Desktop): Map on left, Form on right. Google map is navy/gray stylized (UI mock iframe). Form has fields and logs to console on mock submit.
