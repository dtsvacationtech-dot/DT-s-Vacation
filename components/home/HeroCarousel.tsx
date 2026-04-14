"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { heroSlides } from "@/lib/mockData";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  const length = heroSlides.length;

  const handleSetCurrent = (newIndex: number) => {
    setPrevious(current);
    setCurrent(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleSetCurrent(current === length - 1 ? 0 : current + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [current, length]);

  const nextSlide = () => handleSetCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => handleSetCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-deep-navy font-body">
      {/* Background Layer */}
      {heroSlides.map((slide, index) => {
        const isActiveBg = index === current;
        const isPreviousBg = index === previous;
        
        return (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            isActiveBg ? "opacity-100 z-10" : isPreviousBg ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              quality={100}
              unoptimized
              className={`object-cover object-center transform transition-transform ease-out duration-[20000ms] ${
                index === current ? "scale-100" : "scale-110"
              }`}
              priority={index === 0}
            />
          </div>
          {/* Intense Cinematic Dual Gradients for Premium Lighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000c1c]/95 via-[#000c1c]/50 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#000c1c] via-transparent to-transparent pointer-events-none opacity-90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,45,98,0.2)_0%,transparent_60%)] pointer-events-none"></div>
        </div>
        );
      })}

      {/* Main Content Layout */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-32 md:pb-24">
        <div className="max-w-[1600px] mx-auto w-full px-5 md:px-8 lg:px-16 flex flex-col xl:flex-row justify-between items-end gap-8 xl:gap-8">
          
          {/* Left Column: Typography & Intent */}
          <div className="w-full xl:w-5/12 text-white relative mb-4">
            <div
               key={`content-${current}`}
               className="animate-fade-in-up"
            >
              <p className="text-tropical-gold font-bold tracking-[0.2em] mb-4 uppercase text-[11px] drop-shadow-md">
                {heroSlides[current].locationTag}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.15] mb-5 tracking-tight drop-shadow-xl text-white">
                {heroSlides[current].title}
              </h1>
              <p className="text-gray-200 text-base md:text-lg font-light mb-10 max-w-lg leading-relaxed drop-shadow-md">
                {heroSlides[current].description}
              </p>
              
              <div className="flex items-center gap-5">
                <button aria-label="Favorite" className="group p-2.5 border border-tropical-gold/30 rounded-full hover:bg-tropical-gold/10 hover:border-tropical-gold transition-all duration-300 backdrop-blur-md">
                  <svg className="w-6 h-6 text-tropical-gold group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="bg-white/10 hover:bg-white text-white hover:text-[#000c1c] shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] backdrop-blur-md border border-white/20 font-bold py-3 px-8 rounded-full transition-all duration-500 text-base">
                  {heroSlides[current].ctaText}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Carousel Selection Cards */}
          <div className="w-full xl:w-7/12 flex gap-3 md:gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
            {heroSlides.map((slide, index) => {
              const isActive = index === current;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSetCurrent(index)}
                  className={`relative flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-[1rem] md:rounded-[1.5rem] cursor-pointer group snap-start shadow-2xl ${
                    isActive 
                      ? "w-36 h-[200px] md:w-60 md:h-[380px] shadow-[0_20px_40px_rgba(0,0,0,0.5)]" 
                      : "w-28 h-[170px] md:w-44 md:h-[320px] brightness-75 hover:brightness-100 mt-4 md:mt-8 hover:-translate-y-2"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.cardTitle}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${isActive ? "from-[#000c1c]/90 via-[#000c1c]/10 to-transparent" : "from-[#000c1c]/80 via-black/30 to-transparent"}`}></div>
                  <div className={`absolute left-3 md:left-6 text-left transition-all duration-500 ease-out ${isActive ? "bottom-4 md:bottom-8" : "bottom-3 md:bottom-6"}`}>
                    <p className="text-tropical-gold text-[10px] font-bold uppercase mb-[2px] tracking-[0.2em] drop-shadow-md">
                      Jamaica
                    </p>
                    <h3 className={`text-white font-bold leading-tight drop-shadow-lg ${isActive ? "text-base md:text-2xl" : "text-sm md:text-lg text-gray-200"}`}>
                      {slide.cardTitle}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Bottom Navigation Controls */}
      <div className="absolute bottom-0 w-full h-20 md:h-32 flex items-center bg-transparent z-20">
        <div className="max-w-[1600px] mx-auto w-full px-5 md:px-8 lg:px-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/50 text-white flex items-center justify-center hover:bg-white hover:text-deep-navy transition-all backdrop-blur-sm"
              aria-label="Previous Slide"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/50 text-white flex items-center justify-center hover:bg-white hover:text-deep-navy transition-all backdrop-blur-sm"
              aria-label="Next Slide"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="flex-1 px-4 md:px-12 flex items-center">
            {/* Real Progress Bar */}
            <div className="w-full h-[2px] bg-white/20 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out"
                style={{ width: `${((current + 1) / length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="text-4xl md:text-7xl font-light text-white tracking-tighter">
            0{current + 1}
          </div>
        </div>
      </div>

      {/* Hide Scrollbar Style Inject */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
