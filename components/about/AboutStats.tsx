"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { number: "500+", label: "Trips Planned", sub: "Across 30+ destinations" },
  { number: "98%", label: "Client Satisfaction", sub: "Returning & referred clients" },
  { number: "10+", label: "Years of Service", sub: "Trusted since our founding" },
  { number: "4", label: "Continents Served", sub: "Americas, Europe, Asia, Africa" },
];

export default function AboutStats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-white py-20 md:py-28 overflow-hidden">
      {/* Subtle decorative diagonal stripe */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'repeating-linear-gradient(-45deg, #000c1c 0, #000c1c 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px'}} />

      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((item, i) => (
            <div
              key={item.label}
              className={`text-center transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <p className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-deep-navy mb-2">
                {item.number}
              </p>
              <p className="font-bold text-deep-navy text-sm md:text-base mb-1">
                {item.label}
              </p>
              <p className="text-gray-400 text-xs md:text-sm font-light">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
