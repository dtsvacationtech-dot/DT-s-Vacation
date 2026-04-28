"use client";

import { useState, useRef, useEffect } from "react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

export default function CruiseEnquiryForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formHeight, setFormHeight] = useState<number | "auto">("auto");
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      const refs = { 1: step1Ref, 2: step2Ref, 3: step3Ref };
      const currentRef = refs[step as keyof typeof refs];
      if (currentRef?.current) {
        setFormHeight(currentRef.current.offsetHeight);
      }
    };
    
    // Measure on mount and when step changes
    updateHeight();
    // Tiny delay to ensure browser has rendered layout
    const timeout = setTimeout(updateHeight, 30);
    
    // Also update if window resizes
    window.addEventListener("resize", updateHeight);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateHeight);
    };
  }, [step]);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    adults: number | string;
    children: number | string;
    duration: string;
    departurePort: string;
    destinations: string[];
    date: string;
    message: string;
  }>({
    name: "",
    email: "",
    phone: "",
    adults: 2,
    children: 0,
    duration: "7 Nights",
    departurePort: "",
    destinations: [],
    date: "",
    message: "",
  });

  const [destOpen, setDestOpen] = useState(false);

  const toggleDestination = (value: string) => {
    setFormData(prev => {
      const current = prev.destinations;
      const exists = current.includes(value);
      return {
        ...prev,
        destinations: exists
          ? current.filter(d => d !== value)
          : [...current, value],
      };
    });
  };

  const removeDestination = (value: string) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.filter(d => d !== value),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setPillValue = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleStepper = (field: "adults" | "children", increment: boolean) => {
    setFormData(prev => {
      const current = prev[field] === "" ? 0 : Number(prev[field]);
      const next = increment ? current + 1 : current - 1;
      if (next < 0) return prev;
      if (field === "adults" && next < 1) return prev; // min 1 adult
      return { ...prev, [field]: next };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct email body
    const subject = encodeURIComponent(`New Cruise Enquiry from ${formData.name}`);
    const body = encodeURIComponent(`
Hi DT's Vacation & Travel Team,

I am interested in booking a cruise. Here are my details:

--- Traveler Info ---
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

--- Party Size ---
Adults: ${formData.adults}
Children: ${formData.children}

--- Voyage Details ---
Duration: ${formData.duration}
Preferred Destination: ${formData.destinations.length > 0 ? formData.destinations.join(", ") : "Open to any"}
Preferred Departure Port: ${formData.departurePort}
Target Travel Date: ${formData.date || "Not specified"}

--- Additional Notes ---
${formData.message || "None"}

Looking forward to hearing from you!
    `);

    // In a real app this would call an API, here we use mailto for static export
    window.location.href = `mailto:dtvacationandtravel@gmail.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(1); // Reset
    }, 1500);
  };

  const isStep1Valid = formData.name.length > 2 && formData.email.includes("@") && formData.phone.length > 5;
  const isStep3Valid = !!formData.date; // Require date for demo purposes

  return (
    <section className="pt-12 md:pt-20 pb-24 md:pb-32 bg-[#faf9f8]" id="cruise-enquiry">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        
        <div className="bg-white rounded-[2.5rem] lg:rounded-[3rem] shadow-[0_30px_60px_rgba(0,10,40,0.08)] flex flex-col lg:flex-row border border-gray-100 relative">
          
          {/* Left Side: Form Area */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            
            <div className="mb-10">
              <p className="text-tropical-gold text-[10px] font-bold uppercase tracking-[0.35em] mb-4">
                Smart Enquiry
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-deep-navy tracking-tight mb-4">
                Let's Plan Your Voyage
              </h2>
              <p className="text-gray-500 font-light text-sm md:text-base">
                Tell us what you're looking for, and our cruise specialists will craft the perfect itinerary.
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-12 relative max-w-[280px]">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-100 z-0" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-deep-navy z-0 transition-all duration-500 ease-out" 
                style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
              />
              
              {[1, 2, 3].map((num) => (
                <div 
                  key={num}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold relative z-10 transition-all duration-300 ${
                    step >= num 
                      ? "bg-deep-navy text-white shadow-[0_0_10px_rgba(0,45,98,0.3)]" 
                      : "bg-white text-gray-400 border-2 border-gray-100"
                  }`}
                >
                  {step > num ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  ) : num}
                </div>
              ))}
            </div>

            {/* Form Steps */}
            <form 
              onSubmit={handleSubmit} 
              className="relative w-full transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[height]"
              style={{ height: formHeight === "auto" ? "auto" : `${formHeight}px` }}
            >
              
              {/* STEP 1 */}
              <div ref={step1Ref} className={`transition-all duration-500 absolute top-0 left-0 w-full ${step === 1 ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-10 pointer-events-none"}`}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider mb-2">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-deep-navy focus:bg-white transition-all text-sm" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider mb-2">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-deep-navy focus:bg-white transition-all text-sm" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider mb-2">Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-deep-navy focus:bg-white transition-all text-sm" placeholder="(123) 456-7890" />
                  </div>
                </div>
                <div className="mt-10 flex justify-end">
                  <button type="button" disabled={!isStep1Valid} onClick={() => setStep(2)} className="bg-deep-navy text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-tropical-gold hover:text-deep-navy cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-deep-navy disabled:hover:text-white flex items-center gap-2">
                    Next Step
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>

              {/* STEP 2 */}
              <div ref={step2Ref} className={`transition-all duration-500 absolute top-0 left-0 w-full ${step === 2 ? "opacity-100 translate-x-0 pointer-events-auto" : step < 2 ? "opacity-0 translate-x-10 pointer-events-none" : "opacity-0 -translate-x-10 pointer-events-none"}`}>
                <div className="space-y-8">
                  
                  {/* Party Size Steppers */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider mb-4 text-center">Adults</label>
                      <div className="flex items-center justify-between">
                        <button type="button" onClick={() => handleStepper("adults", false)} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-deep-navy cursor-pointer hover:border-deep-navy transition-colors shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                        </button>
                        <input
                          type="number"
                          name="adults"
                          min="1"
                          value={formData.adults}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (val.length > 1 && val.startsWith('0')) val = val.replace(/^0+/, '');
                            setFormData(prev => ({ 
                              ...prev, 
                              adults: val === "" ? "" : Math.max(1, parseInt(val, 10) || 1)
                            }));
                          }}
                          className="w-16 text-center text-2xl font-heading font-bold text-deep-navy bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button type="button" onClick={() => handleStepper("adults", true)} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-deep-navy cursor-pointer hover:border-deep-navy transition-colors shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider mb-4 text-center">Children</label>
                      <div className="flex items-center justify-between">
                        <button type="button" onClick={() => handleStepper("children", false)} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-deep-navy cursor-pointer hover:border-deep-navy transition-colors shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                        </button>
                        <input
                          type="number"
                          name="children"
                          min="0"
                          value={formData.children}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (val.length > 1 && val.startsWith('0')) val = val.replace(/^0+/, '');
                            setFormData(prev => ({ 
                              ...prev, 
                              children: val === "" ? "" : Math.max(0, parseInt(val, 10))
                            }));
                          }}
                          className="w-16 text-center text-2xl font-heading font-bold text-deep-navy bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button type="button" onClick={() => handleStepper("children", true)} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-deep-navy cursor-pointer hover:border-deep-navy transition-colors shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Duration Selector */}
                  <div>
                    <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider mb-3">Preferred Duration</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["1 to 4 Nights", "5 to 6 Nights", "7 Nights", "8 to 13 Nights", "14+ Nights"].map((opt, idx) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setPillValue("duration", opt)}
                          className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                            idx === 4 ? "col-span-2" : ""
                          } ${
                            formData.duration === opt 
                              ? "bg-deep-navy border-deep-navy text-white shadow-[0_5px_15px_-5px_rgba(0,45,98,0.5)] scale-[1.02]"
                              : "bg-white border-gray-200 text-gray-400 hover:border-deep-navy hover:text-deep-navy"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
                <div className="mt-10 flex justify-between items-center">
                  <button type="button" onClick={() => setStep(1)} className="text-sm font-bold text-gray-400 hover:text-deep-navy cursor-pointer transition-colors uppercase tracking-wider">
                    Back
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="bg-deep-navy text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider cursor-pointer hover:bg-tropical-gold hover:text-deep-navy transition-colors flex items-center gap-2">
                    Next Step
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>

              {/* STEP 3 */}
              <div ref={step3Ref} className={`transition-all duration-500 absolute top-0 left-0 w-full ${step === 3 ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-10 pointer-events-none"}`}>
                <div className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider mb-2">Departure Port / City</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="departurePort"
                          value={formData.departurePort}
                          onChange={handleChange}
                          placeholder="e.g. Bangkok, Dubai, Miami, London..."
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-5 pr-12 py-4 outline-none focus:border-deep-navy focus:bg-white transition-all text-sm"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1.5 ml-1">Type any city or port — we operate worldwide</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider mb-2">Ideal Travel Date *</label>
                      <input 
                        type="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        min={new Date().toISOString().split('T')[0]}
                        required 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-deep-navy focus:bg-white transition-all text-sm cursor-text" 
                      />
                    </div>
                  </div>

                  {/* Target Destination — Expedia-style multi-select */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider mb-3">Target Destination</label>

                    {/* Trigger Input */}
                    <button
                      type="button"
                      onClick={() => setDestOpen(prev => !prev)}
                      className={`cursor-pointer w-full text-left bg-gray-50 border rounded-xl px-5 py-4 transition-all text-sm flex items-center justify-between gap-3 ${
                        destOpen ? "border-deep-navy bg-white" : "border-gray-200"
                      }`}
                    >
                      <span className={`flex-1 text-left truncate pr-2 ${formData.destinations.length === 0 ? "text-gray-400" : "text-deep-navy font-bold"}`}>
                        {formData.destinations.length === 0
                          ? "Any destination (worldwide)"
                          : formData.destinations.join(", ")}
                      </span>
                      <svg width="16" height="16" className={`text-gray-400 transition-transform duration-300 shrink-0 ${destOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Panel */}
                    {destOpen && (
                      <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-[0_20px_40px_rgba(0,10,40,0.12)] z-50 overflow-hidden">

                        {/* Selected Tags */}
                        {formData.destinations.length > 0 && (
                          <div className="px-5 pt-4 pb-3 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold text-deep-navy uppercase tracking-widest">Selected</span>
                              <button type="button" onClick={() => setFormData(prev => ({ ...prev, destinations: [] }))} className="cursor-pointer text-[10px] text-red-400 hover:text-red-500 font-medium uppercase tracking-wider transition-colors">Clear all</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {formData.destinations.map(d => (
                                <span key={d} className="inline-flex items-center gap-1.5 bg-deep-navy text-white text-xs font-medium pl-3 pr-2 py-1.5 rounded-full">
                                  {d}
                                  <button type="button" onClick={() => removeDestination(d)} className="cursor-pointer w-4 h-4 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors">
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Scrollable List */}
                        <div className="max-h-64 overflow-y-auto px-2 py-3 space-y-0.5">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 pb-2">Popular Destinations</p>
                          {["Alaska", "Caribbean", "Europe", "Mexico", "The Bahamas"].map(dest => (
                            <button
                              key={dest}
                              type="button"
                              onClick={() => toggleDestination(dest)}
                              className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                                formData.destinations.includes(dest)
                                  ? "bg-deep-navy/5 text-deep-navy font-semibold"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <div className={`flex-[0_0_16px] w-[16px] h-[16px] rounded-[4px] border-2 flex items-center justify-center transition-all ${
                                formData.destinations.includes(dest) ? "bg-tropical-gold border-tropical-gold" : "border-gray-300"
                              }`}>
                                {formData.destinations.includes(dest) && (
                                  <svg width="10" height="10" className="text-deep-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                )}
                              </div>
                              <svg width="14" height="14" className="text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              {dest}
                            </button>
                          ))}

                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 pt-3 pb-2">Other Destinations</p>
                          {["Africa", "Arctic / Antarctic", "Asia", "Australia / New Zealand", "Bermuda", "Canada / New England", "Central America", "Galapagos", "Hawaii", "Japan & East Asia", "Middle East", "Pacific Coastal", "Panama Canal", "South America", "South Pacific", "Southeast Asia", "Transpacific"].map(dest => (
                            <button
                              key={dest}
                              type="button"
                              onClick={() => toggleDestination(dest)}
                              className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                                formData.destinations.includes(dest)
                                  ? "bg-deep-navy/5 text-deep-navy font-semibold"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <div className={`flex-[0_0_16px] w-[16px] h-[16px] rounded-[4px] border-2 flex items-center justify-center transition-all ${
                                formData.destinations.includes(dest) ? "bg-tropical-gold border-tropical-gold" : "border-gray-300"
                              }`}>
                                {formData.destinations.includes(dest) && (
                                  <svg width="10" height="10" className="text-deep-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                )}
                              </div>
                              <svg width="14" height="14" className="text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              {dest}
                            </button>
                          ))}
                        </div>

                        {/* Done button */}
                        <div className="px-5 py-4 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => setDestOpen(false)}
                            className="cursor-pointer w-full bg-deep-navy text-white font-bold py-3 rounded-full text-sm uppercase tracking-wider hover:bg-tropical-gold hover:text-deep-navy transition-all duration-300"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-deep-navy uppercase tracking-wider mb-2">Special Requests (Optional)</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-deep-navy focus:bg-white transition-all text-sm resize-none" placeholder="E.g., celebrating an anniversary, wheelchair accessible cabin needed..."></textarea>
                  </div>

                </div>
                
                <div className="mt-8 flex justify-between items-center">
                  <button type="button" onClick={() => setStep(2)} className="text-sm font-bold text-gray-400 hover:text-deep-navy cursor-pointer transition-colors uppercase tracking-wider">
                    Back
                  </button>
                  <button type="submit" disabled={!isStep3Valid || isSubmitting} className="cursor-pointer bg-tropical-gold text-deep-navy px-10 py-5 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:bg-yellow-300 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3">
                    {isSubmitting ? "Generating..." : "Submit Enquiry"}
                    {!isSubmitting && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                  </button>
                </div>
              </div>

            </form>
          </div>

          {/* Right Side: Image/Context (Hidden on Mobile) */}
          <div className="hidden lg:block w-1/2 relative bg-deep-navy overflow-hidden rounded-r-[2.5rem] lg:rounded-r-[3rem] min-h-[400px]">
            <ImageWithSkeleton
              src="/images/luxury_cruise_top_1776115596156.webp"
              alt="Luxury Cruise ship sailing crystal clear waters"
              fill
              skeletonClassName="skeleton-shimmer-dark"
              className="object-cover"
              sizes="50vw"
            />
            {/* Elegant gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f8] to-transparent w-32" />
            
            {/* Trust badge */}
            <div className="absolute bottom-16 right-16 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl max-w-sm">
              <div className="flex gap-2 mb-4">
                {[1,2,3,4,5].map(star => (
                   <svg key={star} className="w-5 h-5 text-tropical-gold" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                   </svg>
                ))}
              </div>
              <p className="text-white font-medium italic mb-4">"DT's Vacation perfectly coordinated our family cruise for 12 people. Every detail was flawless."</p>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">— The Robinson Family</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
