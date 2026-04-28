"use client";

import Image from "next/image";
import { useEnquiry } from "@/context/EnquiryContext";

export default function WeddingWhy() {
  const { openModal } = useEnquiry();
  return (
    <section className="bg-[#fdf9f5]">
      {/* ── Hero Intro Section ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-10 pb-20 lg:pt-16 lg:pb-28">
        
        {/* Top Label */}
        <div className="flex items-center gap-4 mb-12 lg:mb-16">
          <div className="w-10 h-[1px] bg-[#d4a87a]" />
          <p className="text-[#d4a87a] text-[11px] font-bold uppercase tracking-[0.35em]">
            The Wedding Suite
          </p>
          <div className="w-10 h-[1px] bg-[#d4a87a]" />
        </div>

        {/* Split Layout: Text + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div>
            <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-heading font-extrabold text-[#3d2314] tracking-[-0.02em] leading-[1.08] mb-8">
              A Journey as
              <br />
              Unique <span className="text-[#c07a40]">as Your</span>
              <br />
              <span className="text-[#c07a40]">Bond.</span>
            </h1>
            
            <p className="text-[#7a5c44]/80 text-[17px] leading-[1.8] mb-10 max-w-lg">
              Your wedding or honeymoon isn&apos;t just an event — it&apos;s the
              beginning of a lifelong adventure. You deserve a planner who is as
              passionate and loving as the occasion itself.
            </p>

            {/* Divider */}
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#d4a87a] to-[#f0c89a] rounded-full mb-10" />

            <h2 className="text-[22px] md:text-2xl font-heading font-bold text-[#3d2314] tracking-[-0.01em] mb-5">
              Why trust us with your Big Moment?
            </h2>
            <p className="text-[#7a5c44]/75 text-[16px] leading-[1.85] max-w-lg">
              At DT&apos;s Vacation &amp; Travel Ltd., we don&apos;t just book
              destinations — we curate the backdrop for your most cherished
              memories with a caring and gentle touch. From bold destination
              weddings to gentle, quiet honeymoon escapes, we are{" "}
              <span className="text-[#c07a40] font-semibold">
                persistent in our pursuit
              </span>{" "}
              of your perfection.
            </p>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_25px_60px_-12px_rgba(160,100,40,0.2)] aspect-[4/3]">
              <Image
                src="/images/wedding_rings.webp"
                alt="Wedding rings on a passport — travel and love intertwined"
                fill
                className="object-cover hover:scale-[1.03] transition-transform duration-[2500ms] ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-4 lg:-left-8 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-[0_12px_32px_-8px_rgba(160,100,40,0.18)] border border-[#f0ddc8]/60 hidden md:block">
              <p className="text-[#c07a40] text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5">
                Our Devotion
              </p>
              <p className="text-[#3d2314] text-[13px] font-medium leading-snug max-w-[180px]">
                Every detail chosen to reflect your story
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4 Pillars Section ── */}
      <div className="bg-[#faf6f1] border-t border-[#f0ddc8]/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-20 lg:py-28">

          {/* Section Header */}
          <div className="text-center mb-14 lg:mb-16">
            <p className="text-[#d4a87a] text-[11px] font-bold uppercase tracking-[0.35em] mb-4">
              Our Approach
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3d2314] tracking-[-0.01em]">
              Built on Care, Not Just Logistics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: "The Intentional Touch",
                description:
                  "Every detail — from the floral arrangements to the sunset view — is intentionally chosen to reflect your unique story.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                ),
              },
              {
                title: "Inclusive Celebrations",
                description:
                  "Every guest feels welcomed and every family tradition is respected, no matter where in the world you choose to say, \"I do\".",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                ),
              },
              {
                title: "Meticulous Peace of Mind",
                description:
                  "You should be focused on each other, not the logistics. We handle the no-nonsense details so you can stay in the moment.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
              },
              {
                title: "A Joyful Partnership",
                description:
                  "With a jovial spirit and a positive outlook, we turn the potentially stressful planning process into a celebratory experience.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ),
              },
            ].map((p, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-[1.5rem] p-7 lg:p-9 border border-[#f0ddc8]/50 shadow-[0_6px_24px_-8px_rgba(180,120,60,0.06)] hover:shadow-[0_20px_48px_-12px_rgba(180,120,60,0.14)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start gap-5">
                  {/* Icon Circle */}
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-[#fdf0e0] to-[#f5e1c8] border border-[#e8cfa8]/60 flex items-center justify-center text-[#c07a40] group-hover:scale-110 transition-transform duration-500">
                    {p.icon}
                  </div>
                  
                  <div className="pt-0.5">
                    <h3 className="text-lg md:text-xl font-heading font-bold text-[#3d2314] mb-2 tracking-[-0.01em] group-hover:text-[#c07a40] transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="text-[#7a5c44]/75 leading-[1.75] text-[15px]">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Destination Image Strip ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-16 lg:py-24">
        <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-12px_rgba(80,40,10,0.2)]">
          <div className="relative h-[380px] md:h-[480px]">
            <Image
              src="/images/wedding_group.webp"
              alt="Elegant outdoor wedding ceremony aisle with floral arrangements and golden chairs"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a06]/75 via-[#1a0a06]/10 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <p className="text-[#d4a87a] text-[10px] font-bold uppercase tracking-[0.35em] mb-4">
                Your Dream, Our Devotion
              </p>
              <p className="text-white text-2xl md:text-3xl lg:text-[2rem] font-heading font-light leading-[1.4] max-w-lg italic">
                &ldquo;Let us help you Explore, Dream, and Discover the perfect
                start to your forever.&rdquo;
              </p>
            </div>
            <button
              onClick={() => openModal("wedding")}
              className="cursor-pointer flex-shrink-0 inline-flex items-center gap-3 bg-[#d4a87a] text-[#1a0a06] font-bold px-7 py-4 rounded-full hover:bg-[#f0c89a] transition-all duration-300 shadow-xl text-sm uppercase tracking-wider whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="16" r="5" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5l-2.5 4h5l-2.5-4zM12 4.5v-2m-3 3l-1.5-1.5m7.5 1.5l1.5-1.5" />
              </svg>
              Start Planning
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
