"use client";

import { getApiUrl, setAdminToken, getAuthHeaders } from "@/lib/api";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/admin/Toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Check if already authenticated on mount
  useEffect(() => {
    fetch(getApiUrl("/api/admin/auth/me"), {
      credentials: "include",
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = "/admin/";
        }
      })
      .catch(() => {});
  }, []);

  // Lockout Countdown Timer
  useEffect(() => {
    if (remainingSeconds <= 0) {
      if (isLocked) {
        setIsLocked(false);
        setAttemptsLeft(5);
      }
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsLocked(false);
          setAttemptsLeft(5);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds, isLocked]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) {
      showToast(`Account is temporarily locked. Please wait ${remainingSeconds}s.`, "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(getApiUrl("/api/admin/auth/login"), {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        if (json.token) {
          setAdminToken(json.token);
        }
        showToast("Authentication successful! Welcome to Agency Suite.", "success");
        setTimeout(() => {
          window.location.href = "/admin/";
        }, 150);
      } else {
        // Trigger shake effect
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);

        if (res.status === 429 || json.isLocked) {
          setIsLocked(true);
          setRemainingSeconds(json.remainingSeconds || 900);
          showToast(json.error || "Too many failed attempts. Account locked.", "error", 6000);
        } else {
          setAttemptsLeft(json.attemptsLeft);
          showToast(json.error || "Invalid username or password.", "error");
        }
      }
    } catch {
      showToast("Network error during login. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const formatLockoutTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#F8FAFC]">
      
      {/* Luxury Ambient Atmospheric Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-200/30 via-sky-100/40 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-[130px] pointer-events-none" />

      {/* Login Card */}
      <div
        className={`relative w-full max-w-md bg-white/95 border border-slate-200/90 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,12,28,0.07)] p-8 sm:p-10 backdrop-blur-xl z-10 space-y-8 transition-transform duration-200 ${
          isShaking ? "animate-shake" : ""
        }`}
      >
        {/* Top Gold Accent Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-gradient-to-r from-transparent via-tropical-gold to-transparent rounded-full" />

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 mx-auto rounded-2xl overflow-hidden border border-amber-200/80 shadow-md shadow-amber-500/10 bg-[#000C1C] flex items-center justify-center p-2.5">
            <Image
              src="/images/logo.webp"
              alt="DT's Vacation"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest border border-amber-200/80 mb-2 shadow-2xs">
              <span>👑 Agency Suite</span>
            </div>
            <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
              Administrator Login
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              DT&apos;s Vacation &amp; Travel Ltd. Management Portal
            </p>
          </div>
        </div>

        {/* Lockout Banner (When Brute Force Triggered) */}
        {isLocked && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-center animate-scale-in">
            <div className="flex items-center justify-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
              <span>⚠️ Security Lockout Active</span>
            </div>
            <p className="text-xs text-rose-600">
              Maximum failed login attempts exceeded. Temporary lockout in progress:
            </p>
            <div className="text-2xl font-mono font-black text-rose-700 tracking-wider">
              {formatLockoutTime(remainingSeconds)}
            </div>
            <p className="text-[11px] text-rose-500 font-medium">
              Please wait until countdown finishes before trying again.
            </p>
          </div>
        )}

        {/* Failed Attempt Warning (When 1-4 fails) */}
        {!isLocked && attemptsLeft !== null && attemptsLeft < 5 && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center text-xs text-amber-800 font-medium">
            <span>⚠️ {attemptsLeft} attempt{attemptsLeft === 1 ? "" : "s"} remaining before temporary 15-min lockout.</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Administrator Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                disabled={isLocked}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-tropical-gold focus:ring-4 focus:ring-amber-400/10 focus:outline-none transition-all disabled:opacity-50"
              />
              <span className="absolute left-4 top-3.5 text-slate-400">👤</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={isLocked}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl pl-11 pr-16 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-tropical-gold focus:ring-4 focus:ring-amber-400/10 focus:outline-none transition-all disabled:opacity-50"
              />
              <span className="absolute left-4 top-3.5 text-slate-400">🔒</span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isLocked}
            className="w-full bg-gradient-to-r from-amber-400 via-tropical-gold to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-deep-navy font-black py-4 px-6 rounded-2xl text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all duration-300 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying Credentials..." : isLocked ? "🔒 Locked (Wait for timer)" : "Sign In to Agency Suite →"}
          </button>
        </form>

        {/* Security Shield Badges */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <span className="text-emerald-600">🛡️</span> PBKDF2 100k
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <span className="text-amber-600">⚡</span> Anti-Brute Force
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <span className="text-sky-600">🔒</span> HttpOnly Signed
            </span>
          </div>

          <div className="text-center pt-1">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-amber-700 transition-colors"
            >
              ← Back to Main Website
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
