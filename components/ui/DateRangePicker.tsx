"use client";

import { useState, useRef, useEffect } from "react";

interface DateRangePickerProps {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  onChange: (start: string, end: string) => void;
  accentColor: string;
  theme?: "dark" | "light";
  /** Render the calendar inline (no absolute positioning) — use inside modals */
  inline?: boolean;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DateRangePicker({ startDate, endDate, onChange, accentColor, theme = "dark", inline = false }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // Controls the left month view
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  
  const [localStart, setLocalStart] = useState(startDate);
  const [localEnd, setLocalEnd] = useState(endDate);
  
  // Track selection state: 0 = none, 1 = start picked, 2 = both picked
  const [selectionStage, setSelectionStage] = useState(startDate && endDate ? 2 : startDate ? 1 : 0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync state when popup opens
  useEffect(() => {
    if (isOpen) {
      setLocalStart(startDate);
      setLocalEnd(endDate);
      setSelectionStage(startDate && endDate ? 2 : startDate ? 1 : 0);
    }
  }, [isOpen, startDate, endDate]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const formatDateLabel = (dateStr: string) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()].slice(0, 3)} ${d}`;
  };

  const getDaysArray = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const formatYMD = (d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const isBefore = (d1: string, d2: string) => new Date(d1) < new Date(d2);

  const handleDayClick = (dateStr: string) => {
    if (selectionStage === 0 || selectionStage === 2) {
      // Start fresh locally
      setLocalStart(dateStr);
      setLocalEnd("");
      setSelectionStage(1);
    } else if (selectionStage === 1) {
      if (isBefore(dateStr, localStart)) {
        // Picked a date before start date, treat as new start
        setLocalStart(dateStr);
      } else {
        setLocalEnd(dateStr);
        setSelectionStage(2);
        // Wait for user to click Done to finalize
      }
    }
  };

  const handleDoneClick = () => {
    onChange(localStart, localEnd);
    setIsOpen(false);
  };

  const renderMonth = (dateOffset: number) => {
    const year = new Date(currentDate.getFullYear(), currentDate.getMonth() + dateOffset, 1).getFullYear();
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth() + dateOffset, 1).getMonth();
    const todayStr = formatYMD(new Date());

    return (
      <div className="flex-1 w-full sm:w-64">
        <div className={`text-center font-bold mb-4 text-sm tracking-wide ${theme === "light" ? "text-deep-navy" : "text-white"}`}>
          {MONTHS[month]} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((d) => (
            <div key={d} className={`text-center text-xs font-medium ${theme === "light" ? "text-gray-400" : "text-white/50"}`}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {getDaysArray(year, month).map((d, i) => {
            if (!d) return <div key={`empty-${i}`} className="w-8 h-8" />;
            const dateStr = formatYMD(d);
            const isPast = isBefore(dateStr, todayStr);
            const isStart = localStart === dateStr;
            const isEnd = localEnd === dateStr;
            const isBetween = localStart && localEnd && isBefore(localStart, dateStr) && isBefore(dateStr, localEnd);
            const isHovering = selectionStage === 1 && hoverDate && isBefore(localStart, dateStr) && isBefore(dateStr, hoverDate);
            
            // Classes composition
            let baseClass = "w-full h-8 flex items-center justify-center text-sm rounded-full transition-colors cursor-pointer relative z-10 ";
            let wrapperClass = "w-full relative flex items-center justify-center ";
            
            if (isPast) {
              baseClass += theme === "light" ? "text-gray-300 cursor-not-allowed" : "text-white/20 cursor-not-allowed";
            } else if (isStart || isEnd) {
              baseClass += `font-bold ${theme === "light" ? "text-white shadow-md shadow-tropical-gold/30" : "text-deep-navy shadow-lg shadow-black/20"}`;
            } else if (isBetween || isHovering) {
              baseClass += theme === "light" ? "text-deep-navy" : "text-white";
            } else {
              baseClass += theme === "light" ? "text-deep-navy hover:bg-gray-100" : "text-white hover:bg-white/10";
            }

            // Connection bar logic
            if (isStart && localEnd) wrapperClass += theme === "light" ? "after:absolute after:right-0 after:top-0 after:bottom-0 after:w-1/2 after:bg-tropical-gold/10" : "after:absolute after:right-0 after:top-0 after:bottom-0 after:w-1/2 after:bg-white/10";
            if (isEnd && localStart) wrapperClass += theme === "light" ? "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1/2 before:bg-tropical-gold/10" : "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1/2 before:bg-white/10";
            if (isBetween || isHovering) wrapperClass += theme === "light" ? "bg-tropical-gold/10 " : "bg-white/10 ";

            return (
              <div key={dateStr} className={wrapperClass}>
                <button
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDayClick(dateStr)}
                  onMouseEnter={() => !isPast && setHoverDate(dateStr)}
                  className={baseClass}
                  style={isStart || isEnd ? { backgroundColor: accentColor } : {}}
                >
                  {d.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center rounded-xl px-4 py-3.5 text-sm outline-none transition-all text-left ${
          theme === "light" 
            ? "bg-white border border-transparent text-deep-navy font-medium shadow-inner focus:border-tropical-gold focus:ring-2 focus:ring-tropical-gold/20" 
            : "bg-white/10 border border-white/10 text-white focus:border-white/40 focus:bg-white/15"
        }`}
      >
        <svg className={`w-5 h-5 mr-3 shrink-0 ${theme === "light" ? "text-gray-400" : "text-white/50"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div className="flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {startDate ? (
             <span>
               <span className={`font-semibold ${theme === "light" ? "text-deep-navy" : "text-white"}`}>{formatDateLabel(startDate)}</span>
               <span className={`mx-2 ${theme === "light" ? "text-gray-400" : "text-white/40"}`}>→</span>
               <span className={`font-semibold ${theme === "light" ? "text-deep-navy" : "text-white"}`}>{endDate ? formatDateLabel(endDate) : "Check out"}</span>
             </span>
          ) : (
            <span className={theme === "light" ? "text-gray-400 font-normal" : "text-white/40"}>Select Check-in &rarr; Check-out...</span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className={`${
          inline
            ? "mt-2 w-full" 
            : "absolute top-full mt-2 left-0 z-50 w-[300px] sm:w-[350px] animate-scale-in origin-top"
        } p-4 sm:p-5 border rounded-2xl shadow-2xl backdrop-blur-xl ${
          theme === "light" 
            ? "bg-white border-gray-100" 
            : "bg-black/60 border-white/10"
        }`}>
          
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={handlePrevMonth} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${theme === "light" ? "hover:bg-gray-100 text-deep-navy" : "hover:bg-white/10 text-white"}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className={`${theme === "light" ? "text-gray-400" : "text-white/50"} text-xs uppercase tracking-wider font-bold`}>Select Dates</div>
            <button type="button" onClick={handleNextMonth} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${theme === "light" ? "hover:bg-gray-100 text-deep-navy" : "hover:bg-white/10 text-white"}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="flex justify-center">
            {renderMonth(0)}
          </div>

          <div className="mt-5 flex justify-end">
             <button type="button" onClick={handleDoneClick} className={`px-6 py-2 rounded-full font-bold text-sm transition-colors cursor-pointer ${theme === "light" ? "bg-deep-navy hover:bg-black text-white" : "bg-white/10 hover:bg-white/20 text-white"}`}>
               Done
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
