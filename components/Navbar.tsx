"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement | null>>(new Map());
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Hotels", href: "/hotels" },
    { label: "Corporate", href: "/corporate" },
    { label: "Weddings", href: "/weddings" },
    { label: "Cruises", href: "/cruises" },
    { label: "Tours", href: "/tours" },
    { label: "About", href: "/about" },
  ];

  // Determine active link key
  const getActiveHref = () => {
    // pathname might have a trailing slash due to next.config.ts trailingSlash: true
    if (pathname.startsWith("/hotels")) return "/hotels";
    if (pathname.startsWith("/corporate")) return "/corporate";
    if (pathname.startsWith("/weddings")) return "/weddings";
    if (pathname.startsWith("/cruises")) return "/cruises";
    if (pathname.startsWith("/tours")) return "/tours";
    if (pathname.startsWith("/about")) return "/about";
    if (pathname.startsWith("/contact")) return "/contact";
    return "/";
  };
  const activeHref = getActiveHref();

  // Update sliding indicator whenever active link or scroll state changes
  const updateIndicator = useCallback(() => {
    const el = linkRefs.current.get(activeHref);
    const container = navContainerRef.current;
    if (el && container) {
      const parentRect = container.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeHref]);

  useEffect(() => {
    // Run immediately and also after a frame to handle layout shifts
    updateIndicator();
    const raf = requestAnimationFrame(updateIndicator);
    return () => cancelAnimationFrame(raf);
  }, [updateIndicator, isScrolled]);

  // Recalculate on resize
  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_2px_30px_-10px_rgba(0,0,0,0.12)] border-b border-black/5"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent"
        }`}
      >
        {/* === Top Bar (Contact & Socials) — visible on ALL sizes === */}
        <div className={`w-full pointer-events-auto transition-all duration-500 overflow-hidden ${
          isScrolled || isMobileMenuOpen
            ? "bg-deep-navy text-white h-7 md:h-9"
            : "border-b border-white/10 text-white/90 h-7 md:h-9"
        }`}>
          <div className="max-w-[1600px] h-full mx-auto px-3 md:px-8 lg:px-16 flex items-center justify-between text-[9px] md:text-[11px] font-bold tracking-widest uppercase">
            <div className="flex items-center gap-3 md:gap-6 h-full">
              {/* Brand name — desktop only */}
              <span className="opacity-60 hidden lg:inline-block">DT&apos;s Vacation &amp; Travel Ltd.</span>

              {/* Instagram */}
              <a href="https://www.instagram.com/dtvacationandtravel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 md:gap-2 hover:text-tropical-gold transition-colors">
                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                {/* Text label — hidden on mobile */}
                <span className="hidden md:inline">Instagram</span>
              </a>

              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61560585715323" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 md:gap-2 hover:text-tropical-gold transition-colors">
                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
                <span className="hidden md:inline">Facebook</span>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/18768569812" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 md:gap-2 hover:text-tropical-gold transition-colors">
                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span className="hidden md:inline">WhatsApp</span>
              </a>
            </div>

            {/* Phone CTA — right side */}
            <a href="https://wa.me/18768569812" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 md:gap-2 hover:text-tropical-gold transition-colors bg-white/10 px-2.5 md:px-4 h-full">
              <svg className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              {/* Short number on mobile, full on desktop */}
              <span className="md:hidden">876-856-9812</span>
              <span className="hidden md:inline">(876) 856-9812</span>
            </a>
          </div>
        </div>


        {/* === Main Navbar === */}
        <div className={`max-w-[1600px] w-full mx-auto px-5 md:px-8 lg:px-16 flex items-center justify-between pointer-events-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen ? "py-2 md:py-3" : "py-3 md:py-5"
        }`}>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center group ml-2 md:ml-6 lg:ml-10 shrink-0">
            <Image
              src="/images/logo.webp"
              alt="DT's Vacation & Travel Ltd."
              width={240}
              height={240}
              className={`w-auto object-contain transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] max-w-full drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] ${
                isScrolled || isMobileMenuOpen
                  ? "h-8 md:h-12 lg:h-14 drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]"
                  : "h-14 md:h-24 lg:h-28"
              }`}
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <div ref={navContainerRef} className="hidden lg:flex items-center space-x-10 relative">
            {/* Animated gold underline — slides smoothly between nav items */}
            <span
              aria-hidden
              className="absolute -bottom-1.5 h-[2px] bg-tropical-gold rounded-full pointer-events-none"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
                transition: "left 500ms cubic-bezier(0.22, 1, 0.36, 1), width 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease",
              }}
            />

            {navLinks.map((item) => {
              const isActive = item.href === activeHref;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  ref={(el) => { linkRefs.current.set(item.href, el); }}
                  className={`relative text-sm tracking-wide transition-all duration-300 pb-1.5 ${
                    isActive
                      ? isScrolled
                        ? "text-deep-navy font-bold"
                        : "text-white font-bold"
                      : isScrolled
                        ? "text-gray-500 hover:text-deep-navy font-medium"
                        : "text-white/70 hover:text-white font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Area (Hamburger is mobile only, desktop is empty now) */}
          <div className="flex items-center">

            {/* Hamburger (Mobile) */}
            <button
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? "text-deep-navy" : "text-white"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-3 pt-20 px-8">
          {navLinks.map((item, index) => {
            const isActive = item.href === activeHref;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full max-w-sm text-center py-4 rounded-2xl transition-all duration-300 text-2xl font-heading font-bold tracking-wider ${
                  isActive
                    ? "text-tropical-gold bg-deep-navy/5"
                    : "text-deep-navy hover:text-tropical-gold hover:bg-gray-50"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 60}ms` : "0ms",
                }}
              >
                <span className="flex items-center justify-center gap-3">
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-tropical-gold inline-block" />
                  )}
                  {item.label}
                </span>
              </Link>
            );
          })}

          <div className="mt-8 pt-8 border-t border-gray-100 w-full max-w-sm flex flex-col items-center gap-6">
            <a
              href="https://wa.me/18768569812"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-deep-navy font-bold hover:text-tropical-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 (876) 856-9812</span>
            </a>
            
            <div className="flex items-center gap-6 text-gray-400">
              <a href="https://www.instagram.com/dtvacationandtravel" target="_blank" rel="noopener noreferrer" className="hover:text-tropical-gold transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61560585715323" target="_blank" rel="noopener noreferrer" className="hover:text-tropical-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
              </a>
              <a href="https://wa.me/18768569812" target="_blank" rel="noopener noreferrer" className="hover:text-tropical-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
