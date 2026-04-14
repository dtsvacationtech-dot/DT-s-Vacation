"use client";

import { useState, useEffect } from "react";

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    // Trigger on time (15s)
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    }, 15000);

    // Trigger on scroll (50%)
    const handleScroll = () => {
      if (hasTriggered) return;
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (scrolled > maxScroll * 0.5) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasTriggered]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-deep-navy/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white hover:text-tropical-gold z-10 p-2"
        >
          &times;
        </button>

        {/* Brand Banner Top */}
        <div className="h-40 bg-[linear-gradient(135deg,#002D62_0%,#00AEEF_100%)] relative flex items-center justify-center">
            <h3 className="font-heading font-bold text-2xl text-white text-center">
              Join the Journey
            </h3>
        </div>

        <div className="p-8 text-center -mt-6 relative z-10 bg-white rounded-t-3xl">
          {submitted ? (
            <div className="py-8 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-heading font-bold text-xl text-deep-navy">You&apos;re on the list!</h4>
              <p className="text-gray-500 text-sm">Expect intentional inspiration in your inbox soon.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-6 text-gray-500 hover:text-deep-navy underline text-sm"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h4 className="font-heading font-semibold text-lg text-deep-navy mb-2">Curated Inspiration.</h4>
              <p className="text-gray-500 text-sm mb-6">
                Receive meticulous planning tips and bold destination features tailored for the intentional traveler.
              </p>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col space-y-4"
              >
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-tropical-gold focus:border-transparent text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit"
                  className="w-full bg-deep-navy hover:bg-tropical-gold text-white font-bold py-3 rounded-lg shadow-navy transition-colors duration-300"
                >
                  Subscribe to the Journey
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
