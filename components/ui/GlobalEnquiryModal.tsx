"use client";

import { useState, useRef, useEffect } from "react";
import { useEnquiry, ServiceType } from "@/context/EnquiryContext";
import DateRangePicker from "@/components/ui/DateRangePicker";

// ── Service metadata ────────────────────────────────────────────────────────
const SERVICE_META: Record<
  ServiceType,
  { label: string; color: string; accentColor: string; icon: React.ReactNode }
> = {
  wedding: {
    label: "Wedding Planning",
    color: "from-[#3d2314] via-[#5a3220] to-[#1a0a06]",
    accentColor: "#d4a87a",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  corporate: {
    label: "Corporate Travel",
    color: "from-[#0f1f38] via-[#002D62] to-[#050b14]",
    accentColor: "#EBB400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  tours: {
    label: "Tour Planning",
    color: "from-[#0a1628] via-[#0d2040] to-[#050b14]",
    accentColor: "#EBB400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  hotels: {
    label: "Hotel Stays",
    color: "from-[#0a1f11] via-[#0F3B20] to-[#040e08]",
    accentColor: "#D4AF37",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
};

interface FormData {
  name: string;
  phone: string;
  email: string;
  travelDateStart: string;
  travelDateEnd: string;
  guests: number | "";
  message: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  phone: "",
  email: "",
  travelDateStart: "",
  travelDateEnd: "",
  guests: 2,
  message: "",
};

export default function GlobalEnquiryModal() {
  const { isOpen, serviceType, closeModal } = useEnquiry();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const backdropRef = useRef<HTMLDivElement>(null);

  const meta = serviceType ? SERVICE_META[serviceType] : SERVICE_META.tours;

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setForm(INITIAL_FORM);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal]);

  const validateStep1 = () => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          serviceType: serviceType
            ? serviceType.charAt(0).toUpperCase() + serviceType.slice(1)
            : "General",
          travelDateStart: form.travelDateStart,
          travelDateEnd: form.travelDateEnd,
          guests: form.guests,
          message: form.message,
        }),
      });

      if (!res.ok) {
        // Graceful fallback — open mailto if API fails
        const subject = encodeURIComponent(`[${meta.label}] Enquiry from ${form.name}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "N/A"}\nService: ${meta.label}\nGuests: ${form.guests}\n\nMessage:\n${form.message || "None"}`
        );
        window.open(`mailto:dtvacationandtravel@gmail.com?subject=${subject}&body=${body}`, "_blank");
      }

      setStep(3);
    } catch {
      setStep(3); // Always advance to thank-you step
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!isOpen) return null;

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return null;
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return null;
    
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Invalid date range";
    if (diffDays === 0) return "Day Trip";
    return `${diffDays + 1} Days, ${diffDays} Nights`;
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
        aria-hidden
      />

      {/* Panel */}
      <div
        className={`
          relative z-10 w-full md:max-w-lg md:mx-4
          bg-gradient-to-br ${meta.color}
          rounded-t-[2rem] md:rounded-[2rem]
          border border-white/10
          shadow-[0_-20px_80px_rgba(0,0,0,0.5)] md:shadow-[0_40px_100px_rgba(0,0,0,0.5)]
          overflow-hidden
          animate-slide-up md:animate-scale-in
          max-h-[92dvh] overflow-y-auto
        `}
        style={{ "--accent": meta.accentColor } as React.CSSProperties}
      >
        {/* Ambient glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
          style={{ background: `${meta.accentColor}18` }} />

        {/* Top handle (mobile) */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 md:pt-7">
          <div className="flex items-center gap-2.5">
            <span style={{ color: meta.accentColor }}>{meta.icon}</span>
            <span className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: meta.accentColor }}>
              {meta.label}
            </span>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Step indicator ── */}
        <div className="px-6 pb-5">
           <div className="flex gap-1.5 transition-opacity duration-300" style={{ opacity: step < 3 ? 1 : 0 }}>
             {[1, 2].map((s) => (
               <div
                 key={s}
                 className="h-1 rounded-full flex-1 transition-all duration-500"
                 style={{
                   background: s <= step ? meta.accentColor : "rgba(255,255,255,0.15)",
                 }}
               />
             ))}
           </div>
        </div>

        {/* ── Slides Container ── */}
        <div className="overflow-x-hidden w-full relative">
          <div 
            className="flex w-[300%] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] items-start"
            style={{ transform: `translateX(-${(step - 1) * 33.333333}%)` }}
          >

            
            {/* ── Step 1: Contact ── */}
            <div className="w-1/3 shrink-0 px-6 pb-8 space-y-5 transition-opacity duration-300" 
                 style={{ opacity: step === 1 ? 1 : 0.4, pointerEvents: step === 1 ? "auto" : "none" }}>
              <div>
              <h2 className="text-white text-2xl font-heading font-bold leading-tight mb-1">
                Let&apos;s get started
              </h2>
              <p className="text-white/50 text-sm">
                Tell us how to reach you. An agent will be in touch shortly.
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                Full Name <span style={{ color: meta.accentColor }}>*</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                style={{ caretColor: meta.accentColor }}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs" style={{ color: meta.accentColor }}>{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                Phone Number <span style={{ color: meta.accentColor }}>*</span>
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-white/40 focus:bg-white/15 transition-all"
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs" style={{ color: meta.accentColor }}>{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                Email Address <span className="text-white/30 font-normal normal-case">(optional)</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-white/40 focus:bg-white/15 transition-all"
              />
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:opacity-90 cursor-pointer"
              style={{ background: meta.accentColor, color: "#0a0a0a" }}
            >
              Next →
            </button>
          </div>
            
            {/* ── Step 2: Trip Details ── */}
            <div className="w-1/3 shrink-0 px-6 pb-8 space-y-5 transition-opacity duration-300"
                 style={{ opacity: step === 2 ? 1 : 0.4, pointerEvents: step === 2 ? "auto" : "none" }}>
              <div>
              <h2 className="text-white text-2xl font-heading font-bold leading-tight mb-1">
                Tell us about your trip
              </h2>
              <p className="text-white/50 text-sm">
                A few details help us prepare the perfect options for you.
              </p>
            </div>

            {/* Travel Dates */}
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                Travel Dates <span className="text-white/30 font-normal normal-case">(optional)</span>
              </label>
              <DateRangePicker 
                startDate={form.travelDateStart}
                endDate={form.travelDateEnd}
                onChange={(start, end) => setForm({ ...form, travelDateStart: start, travelDateEnd: end })}
                accentColor={meta.accentColor}
                inline
              />
              
              {/* Duration Badge */}
              {form.travelDateStart && form.travelDateEnd && calculateDuration(form.travelDateStart, form.travelDateEnd) !== "Invalid date range" && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 animate-fade-in">
                  <svg className="w-4 h-4" fill="none" stroke={meta.accentColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-medium text-white/90 tracking-wide">
                    {calculateDuration(form.travelDateStart, form.travelDateEnd)}
                  </span>
                </div>
              )}
            </div>

            {/* Guests */}
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                Number of Travelers
              </label>
              <div className="flex items-center gap-4 bg-white/5 p-1 rounded-2xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, guests: Math.max(1, (Number(form.guests) || 1) - 1) })}
                  className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl font-bold transition-colors cursor-pointer shrink-0"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={form.guests}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm({ ...form, guests: val === "" ? "" : parseInt(val) || 1 });
                  }}
                  className="flex-1 w-full bg-transparent text-center text-white text-2xl font-bold tabular-nums outline-none min-w-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, guests: Math.min(999, (Number(form.guests) || 0) + 1) })}
                  className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl font-bold transition-colors cursor-pointer shrink-0"
                >
                  +
                </button>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                Additional Message <span className="text-white/30 font-normal normal-case">(optional)</span>
              </label>
              <textarea
                placeholder="Specify any special requests, interests, or destinations..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-white/40 focus:bg-white/15 transition-all resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white/80 transition-colors cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-60 cursor-pointer hover:opacity-90"
                style={{ background: meta.accentColor, color: "#0a0a0a" }}
              >
                {isSubmitting ? "Sending…" : "Send Enquiry"}
              </button>
            </div>
          </div>

            {/* ── Step 3: Success ── */}
            <div className="w-1/3 shrink-0 px-6 pb-10 flex flex-col items-center text-center gap-5 transition-opacity duration-300"
                 style={{ opacity: step === 3 ? 1 : 0.4, pointerEvents: step === 3 ? "auto" : "none" }}>
              {/* Animated checkmark */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mt-2"
              style={{ background: `${meta.accentColor}22`, border: `2px solid ${meta.accentColor}44` }}
            >
              <svg
                className="w-10 h-10 animate-[draw_0.5s_ease-out_forwards]"
                viewBox="0 0 24 24"
                fill="none"
                stroke={meta.accentColor}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h2 className="text-white text-2xl font-heading font-bold mb-2">
                Request Sent!
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Thank you <span className="text-white font-medium">{form.name}</span>!
                Our team has received your request and will contact you at
                <span className="text-white font-medium"> {form.phone}</span> shortly.
              </p>
            </div>

            {/* Summary card */}
            <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs" style={{ color: meta.accentColor }}>
                {meta.icon}
                <span className="font-bold uppercase tracking-wider">{meta.label}</span>
              </div>
              {form.travelDateStart && form.travelDateEnd && (
                <p className="text-white/50 text-xs">
                  📅 Travel Dates: <span className="text-white">{form.travelDateStart} to {form.travelDateEnd}</span>
                  <span className="ml-1 opacity-70">({calculateDuration(form.travelDateStart, form.travelDateEnd)})</span>
                </p>
              )}
              <p className="text-white/50 text-xs">
                👥 Travelers: <span className="text-white">{form.guests}</span>
              </p>
            </div>

            <button
              onClick={closeModal}
              className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:opacity-90 cursor-pointer"
              style={{ background: meta.accentColor, color: "#0a0a0a" }}
            >
              Close
            </button>
          </div>
          
          </div> {/* End Slider Track */}
        </div> {/* End Slider Viewport */}
      </div>
    </div>
  );
}
