"use client";

import { getApiUrl } from "@/lib/api";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

interface AdminNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadLeadsCount?: number;
}

export default function AdminNavbar({ activeTab, onTabChange, unreadLeadsCount = 0 }: AdminNavbarProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [jamaicaTime, setJamaicaTime] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Jamaica",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(new Date());
      setJamaicaTime(timeStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch(getApiUrl("/api/admin/auth/logout"), { method: "POST" });
      showToast("Logged out successfully.", "info");
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "promotions", label: "Promotions & Offers", icon: "🔥" },
    { id: "enquiries", label: "Leads & Enquiries", icon: "📥", badge: unreadLeadsCount },
    { id: "subscribers", label: "Subscribers", icon: "📬" },
    { id: "broadcast", label: "Email Broadcast", icon: "📢" },
    { id: "settings", label: "Settings & Security", icon: "⚙️" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-amber-400/40 shadow-sm group-hover:border-amber-500 transition-colors bg-[#000C1C]">
                <Image
                  src="/images/logo.webp"
                  alt="DT's Vacation"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 font-heading font-black text-lg tracking-tight">
                    DT&apos;s Vacation
                  </span>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300/80 shadow-xs">
                    Agency Suite
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  VIP Travel &amp; Campaign Control Center
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Jamaica Local Clock */}
          <div className="hidden lg:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-xs shadow-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-500 font-medium">Jamaica HQ Time:</span>
            <span className="text-amber-800 font-mono font-bold">{jamaicaTime || "Connecting..."}</span>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 shadow-xs transition-all cursor-pointer"
            >
              <span>View Website</span>
              <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-900">Agency Manager</p>
                <p className="text-[11px] text-emerald-600 font-mono font-semibold">● Online &amp; Secure</p>
              </div>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                title="Logout"
              >
                <span>{isLoggingOut ? "..." : "Logout"}</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>

          </div>

        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2.5 border-t border-slate-100">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy font-extrabold shadow-md shadow-amber-500/20 scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/90"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                      isActive ? "bg-deep-navy text-tropical-gold" : "bg-rose-500 text-white shadow-xs"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
