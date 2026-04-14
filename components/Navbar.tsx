"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { label: 'Hotels', href: '/#hotels' },
    { label: 'Corporate', href: '/#corporate' },
    { label: 'Weddings', href: '/#weddings' },
    { label: 'Cruises', href: '/#cruises' },
    { label: 'Tours', href: '/#tours' },
    { label: 'About', href: '/about' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 pointer-events-none ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/85 backdrop-blur-xl py-3 md:py-4 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.1)] border-b border-black/5" 
            : "bg-gradient-to-b from-black/50 to-transparent py-5 md:py-8"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-16 flex items-center justify-between pointer-events-auto">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group">
            <span className={`font-heading font-normal text-xl md:text-2xl tracking-[0.2em] transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? "text-deep-navy" : "text-white"}`}>
              DT&apos;S <span className="font-bold">VACATION</span>
            </span>
          </Link>

          {/* Center Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((item) => (
              <Link 
                key={item.label}
                href={item.href} 
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? "text-gray-500 hover:text-deep-navy" 
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button aria-label="Search" className={`transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "text-deep-navy hover:text-tropical-gold" : "text-white hover:text-tropical-gold"}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button aria-label="User Account" className={`hidden md:block transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "text-deep-navy hover:text-tropical-gold" : "text-white hover:text-tropical-gold"}`}>
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

      {/* Mobile Menu Overlay (iOS-style full-screen slide-down) */}
      <div 
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] lg:hidden ${
          isMobileMenuOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
          {navLinks.map((item, index) => (
            <Link 
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-deep-navy text-3xl font-heading font-bold tracking-wider hover:text-tropical-gold transition-all duration-300"
              style={{ 
                animationDelay: isMobileMenuOpen ? `${index * 80}ms` : '0ms',
              }}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="mt-8 flex items-center gap-6">
            <a href="tel:8768569812" className="flex items-center gap-2 text-gray-500 hover:text-tropical-gold transition-colors">
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
