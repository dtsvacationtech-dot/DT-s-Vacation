"use client";
import React, { useState, useEffect } from "react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

const mainImages = [
  "/images/wedding_jamaica_main_1776112259228.webp",
  "/images/wedding_main_yacht_1776112796350.webp",
  "/images/wedding_main_waterfall_1776112811885.webp",
];

const detailImages = [
  "/images/wedding_jamaica_details_1776112271584.webp",
  "/images/wedding_details_cake_1776112826404.webp",
  "/images/wedding_details_champagne_1776112839714.webp",
];

const peopleImages = [
  "/images/wedding_jamaica_people_1776112285009.webp",
  "/images/wedding_people_dancing_1776112855256.webp",
  "/images/wedding_people_bouquet_1776112867462.webp",
];

export default function WeddingShowcase() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#faf9f8] relative overflow-hidden" id="weddings">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Typography */}
          <div className="w-full lg:w-5/12">
            <h2 className="text-[11px] font-bold text-tropical-gold tracking-[0.3em] uppercase mb-4">
              Timeless Romance
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-deep-navy mb-8 leading-[1.1] tracking-tight">
              Celebrate<br/>Unforgettable Love.
            </h3>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-light max-w-md">
              Say &apos;I do&apos; on pristine white sand beaches at golden hour. Let us orchestrate your breathtaking destination wedding with elegant floral designs, premium hospitality, and flawless coordination. Over the years, we have brought hundreds of unique luxury weddings to life across the Caribbean.
            </p>
            <div className="flex items-center gap-6">
              <button className="bg-deep-navy text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-deep-navy/20 hover:scale-105 transition-transform duration-300">
                Start Planning
              </button>
              <button className="text-deep-navy font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:text-tropical-gold transition-colors">
                View Gallery
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex gap-2 mt-12">
              {[0, 1, 2].map((idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-700 ${current === idx ? "w-12 bg-tropical-gold" : "w-4 bg-gray-300"}`}
                ></div>
              ))}
            </div>
          </div>

          {/* Right Column: Bento Grid Layout */}
          <div className="w-full lg:w-7/12 h-[500px] md:h-[650px] grid grid-cols-2 gap-4 md:gap-6 relative">
            
            {/* Background Accent Element */}
            <div className="absolute -inset-10 bg-tropical-gold/10 blur-[100px] rounded-full -z-10 mix-blend-multiply"></div>

            {/* Main Tall Image (Left) */}
            <div className="col-span-1 row-span-2 relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl bg-gray-200">
              {mainImages.map((src, idx) => (
                <ImageWithSkeleton 
                  key={src}
                  src={src} 
                  alt={`Luxury Wedding ${idx + 1}`} 
                  fill 
                  className={`object-cover transition-opacity duration-1000 ease-in-out scale-[1.03] group-hover:scale-110 ${current === idx ? "opacity-100" : "opacity-0"}`}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  priority={idx === 0}
                />
              ))}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
            </div>

            {/* Top Square Image (Right) */}
            <div className="col-span-1 row-span-1 relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-xl bg-gray-200">
              {detailImages.map((src, idx) => (
                <ImageWithSkeleton 
                  key={src}
                  src={src} 
                  alt={`Wedding Detail ${idx + 1}`} 
                  fill 
                  className={`object-cover transition-opacity duration-1000 ease-in-out scale-[1.03] group-hover:scale-110 ${current === idx ? "opacity-100" : "opacity-0"}`}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ))}
            </div>

            {/* Bottom Square Image (Right) */}
            <div className="col-span-1 row-span-1 relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-xl bg-gray-200">
              {peopleImages.map((src, idx) => (
                <ImageWithSkeleton 
                  key={src}
                  src={src} 
                  alt={`Wedding Reception ${idx + 1}`} 
                  fill 
                  className={`object-cover transition-opacity duration-1000 ease-in-out scale-[1.03] group-hover:scale-110 ${current === idx ? "opacity-100" : "opacity-0"}`}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
