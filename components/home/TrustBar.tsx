"use client";

import { useEffect, useState, useRef } from "react";
import { trustStats } from "@/lib/mockData";

export default function TrustBar() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white relative z-20 shadow-[-10px_-20px_30px_rgba(0,0,0,0.05)] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {trustStats.map((stat, index) => (
            <div 
              key={stat.id} 
              className={`pt-8 md:pt-0 transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="font-heading font-extrabold text-5xl lg:text-6xl text-deep-navy mb-2 flex justify-center items-end">
                <span>{isVisible ? stat.value : "0"}</span>
                <span className="text-3xl text-tropical-gold">{stat.suffix}</span>
              </div>
              <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Official Credentials Strip ── */}
        <div className={`mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-500 font-semibold uppercase tracking-wider transform transition-all duration-1000 delay-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-base">🇯🇲</span>
            <span className="text-deep-navy font-bold">Jamaica Ministry of Tourism</span> Licensed
          </div>
          <span className="text-gray-300 hidden sm:inline">&bull;</span>
          <div className="flex items-center gap-2">
            <span className="text-base">🏨</span>
            <span className="text-deep-navy font-bold">Expedia TAAP</span> Global Partner
          </div>
          <span className="text-gray-300 hidden sm:inline">&bull;</span>
          <div className="flex items-center gap-2">
            <span className="text-base">🛡️</span>
            <span className="text-deep-navy font-bold">Verified Travel Governance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
