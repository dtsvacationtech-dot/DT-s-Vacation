"use client";

import { useState, useRef, useEffect } from "react";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { buildExpediaHotelUrl } from "@/lib/expedia";

export default function HotelsSearch() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [showGuests, setShowGuests] = useState(false);
  const [error, setError] = useState("");

  const guestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setShowGuests(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }
    
    if (!startDate || !endDate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    // Construct the Expedia URL
    const url = buildExpediaHotelUrl({
      destination: destination,
      checkIn: startDate,
      checkOut: endDate,
      adults: adults,
    });

    // Open in a new tab
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white/30 backdrop-blur-3xl border border-white/40 p-5 md:p-8 rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.3)] w-full max-w-6xl mx-auto transform translate-y-6 md:translate-y-12 relative">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">

        {/* Destination */}
        <div className="w-full md:flex-1 relative">
          <label className="block text-[10px] uppercase tracking-widest text-deep-navy/80 font-bold mb-2 ml-1">
            Where to?
          </label>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="e.g. Jamaica, Paris, Maldives"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-white border border-transparent text-deep-navy font-medium rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:border-tropical-gold focus:ring-2 focus:ring-tropical-gold/20 transition-all placeholder:text-gray-400 shadow-inner"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="w-full md:w-[320px]">
          <label className="block text-[10px] uppercase tracking-widest text-deep-navy/80 font-bold mb-2 ml-1">
            Dates
          </label>
          <div>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onChange={(s, e) => { setStartDate(s); setEndDate(e); }}
              accentColor="#D4AF37"
              theme="light"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="w-full md:w-[200px] relative" ref={guestRef}>
          <label className="block text-[10px] uppercase tracking-widest text-deep-navy/80 font-bold mb-2 ml-1">
            Guests
          </label>
          <button
            type="button"
            onClick={() => setShowGuests(!showGuests)}
            className="w-full flex items-center bg-white border border-transparent text-deep-navy font-medium rounded-xl px-4 py-3.5 text-sm outline-none focus:border-tropical-gold focus:ring-2 focus:ring-tropical-gold/20 transition-all text-left shadow-inner"
          >
            <svg className="w-5 h-5 text-gray-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{adults} {adults === 1 ? 'Adult' : 'Adults'}</span>
          </button>

          {/* Guest Dropdown */}
          {showGuests && (
            <div className="absolute top-full mt-2 right-0 md:-right-4 w-full md:w-[280px] bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.15)] z-50 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-deep-navy font-bold text-sm">Adults</div>
                  <div className="text-gray-400 text-xs mt-0.5">Age 18+</div>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-1.5 rounded-full border border-gray-100">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-deep-navy hover:border-tropical-gold hover:text-tropical-gold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  </button>
                  <span className="text-deep-navy font-bold w-4 text-center">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(Math.min(8, adults + 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-deep-navy hover:border-tropical-gold hover:text-tropical-gold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowGuests(false)}
                className="w-full mt-6 bg-deep-navy hover:bg-black text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="w-full md:w-auto self-end mt-4 md:mt-0">
          <button
            type="submit"
            className="w-full md:w-auto h-[50px] px-8 bg-tropical-gold text-deep-navy font-bold rounded-xl hover:bg-white transition-colors duration-300 shadow-lg shadow-tropical-gold/20 flex items-center justify-center gap-2"
          >
            Search Expedia
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>

      </form>

      {/* Validation Error Message */}
      {error && (
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 animate-fade-in-up w-full text-center">
          <span className="inline-block bg-red-500/90 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg backdrop-blur-md border border-red-400/50">
            {error}
          </span>
        </div>
      )}
    </div>
  );
}
