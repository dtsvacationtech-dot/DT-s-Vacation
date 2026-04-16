"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Hotels", href: "/#hotels" },
    { label: "Corporate", href: "/corporate" },
    { label: "Weddings", href: "/#weddings" },
    { label: "Cruises", href: "/#cruises" },
    { label: "Tours", href: "/#tours" },
    { label: "About", href: "/about" },
  ];

  // Determine the active link based on pathname
  const getActivePath = () => {
    if (pathname === "/corporate") return "/corporate";
    if (pathname === "/about") return "/about";
    if (pathname === "/contact") return "/contact";
    return "/"; // Home and all anchor links map to Home
  };
  const activePath = getActivePath();

  // Slide the gold underline indicator to the active nav item
  useEffect(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector<HTMLElement>("[data-active='true']");
    if (activeEl) {
      const parentRect = navRef.current.getBoundingClientRect();
      const rect = activeEl.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [pathname, isScrolled]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/90 backdrop-blur-2xl py-2 md:py-3 shadow-[0_2px_30px_-10px_rgba(0,0,0,0.12)] border-b border-black/5"
            : "bg-gradient-to-b from-black/50 to-transparent py-5 md:py-8"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-16 flex items-center justify-between pointer-events-auto">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center group ml-2 md:ml-6 lg:ml-10 shrink-0">
            <Image
              src="/images/logo.webp"
              alt="DT's Vacation & Travel Ltd."
              width={240}
              height={240}
              className={`w-auto object-contain transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] max-w-full drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] ${
                isScrolled || isMobileMenuOpen
                  ? "h-10 md:h-12 lg:h-14 drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]"
                  : "h-20 md:h-24 lg:h-28"
              }`}
              priority
            />
          </Link>

          {/* Center Links (Desktop) — with sliding gold indicator */}
          <div ref={navRef} className="hidden lg:flex items-center space-x-10 relative">
            {/* Animated gold underline */}
            <span
              aria-hidden
              className="absolute bottom-[-6px] h-[2px] bg-tropical-gold rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />

            {navLinks.map((item) => {
              const isActive = item.href === activePath;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  data-active={isActive ? "true" : undefined}
                  className={`relative text-sm font-medium tracking-wide transition-all duration-300 pb-1.5 group ${
                    isActive
                      ? isScrolled
                        ? "text-deep-navy font-semibold"
                        : "text-white font-semibold"
                      : isScrolled
                        ? "text-gray-500 hover:text-deep-navy"
                        : "text-white/75 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              aria-label="Search"
              className={`transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "text-deep-navy hover:text-tropical-gold" : "text-white hover:text-tropical-gold"}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              aria-label="User Account"
              className={`hidden md:block transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "text-deep-navy hover:text-tropical-gold" : "text-white hover:text-tropical-gold"}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Hamburger Menu (Mobile) */}
            <button
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "text-deep-navy" : "text-white"}`}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 pt-20 px-8">
          {navLinks.map((item, index) => {
            const isActive = item.href === activePath;
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
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(16px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
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

          <div className="mt-8 pt-8 border-t border-gray-100 w-full max-w-sm flex items-center justify-center gap-6">
            <a
              href="tel:8768569812"
              className="flex items-center gap-2 text-gray-500 hover:text-tropical-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium">(876) 856-9812</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
