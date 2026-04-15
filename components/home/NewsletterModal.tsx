"use client";

import { useState, useEffect } from "react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop (Dark Frost) */}
      <div 
        className="absolute inset-0 bg-[#000c1c]/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Luxury iOS-style Modal Content */}
      <div className="relative bg-deep-navy border border-white/10 rounded-[2rem] w-full max-w-[28rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] animate-fade-in-up">
        
        {/* Glass Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/50 hover:text-tropical-gold z-20 transition-all duration-300"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Cinematic Image Banner Header */}
        <div className="relative h-48 w-full">
          <ImageWithSkeleton
            src="/images/hero_weddings.webp"
            alt="Premium Travel Invitation"
            fill
            skeletonClassName="skeleton-shimmer-dark"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
          {/* Gradients to blend into the navy background */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 via-transparent to-transparent" />
          
          {/* Header Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 pb-4">
            <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-1 drop-shadow-md">
              Exclusive Access
            </p>
            <h3 className="font-heading font-bold text-3xl text-white drop-shadow-lg">
              Join the Journey
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-8 pb-8 pt-2 relative z-10 bg-deep-navy">
          {submitted ? (
            <div className="py-6 text-center space-y-4 animate-fade-in-up">
              <div className="w-16 h-16 bg-tropical-gold/20 text-tropical-gold rounded-full flex items-center justify-center mx-auto mb-4 border border-tropical-gold/30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-heading font-bold text-xl text-white">You&apos;re on the list!</h4>
              <p className="text-gray-300 text-sm font-light leading-relaxed">
                Expect intentional inspiration and unmatched luxury features in your inbox soon.
              </p>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-6 text-tropical-gold hover:text-white transition-colors duration-300 text-sm font-medium border-b border-transparent hover:border-white"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <p className="text-gray-300 text-[15px] font-light leading-relaxed mb-6">
                Receive meticulous planning tips and bold destination features tailored for the intentional traveler.
              </p>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col space-y-4"
              >
                {/* iOS Glass Input Field */}
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email address"
                    className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:bg-white/10 focus:border-tropical-gold focus:ring-1 focus:ring-tropical-gold transition-all backdrop-blur-sm text-[15px]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                {/* Premium Action Button */}
                <button 
                  type="submit"
                  className="w-full bg-tropical-gold hover:bg-white text-deep-navy font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(235,180,0,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 flex justify-center items-center gap-2 group"
                >
                  <span>Subscribe to the Journey</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
