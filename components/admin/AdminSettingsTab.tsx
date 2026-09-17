"use client";

import { adminFetch } from "@/lib/api";

import { useState } from "react";
import { SecurityAuditRecord } from "@/lib/types";
import { useToast } from "./Toast";

interface AdminSettingsTabProps {
  auditLogs?: SecurityAuditRecord[];
  onRefresh: () => void;
}

export default function AdminSettingsTab({ auditLogs = [], onRefresh }: AdminSettingsTabProps) {
  const { showToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanging, setIsChanging] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      showToast("Please fill in all password fields.", "warning");
      return;
    }

    if (newPassword.length < 8) {
      showToast("New password must be at least 8 characters long.", "warning");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("New passwords do not match.", "warning");
      return;
    }

    setIsChanging(true);
    try {
      const res = await adminFetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast("Admin password updated successfully!", "success");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onRefresh();
      } else {
        showToast(json.error || "Failed to change password.", "error");
      }
    } catch {
      showToast("Network error updating password.", "error");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Password Change Form (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 text-lg border border-amber-200/60 shadow-xs">
              🔑
            </div>
            <div>
              <h3 className="text-base font-heading font-black text-slate-900">
                Change Admin Password
              </h3>
              <p className="text-xs text-slate-500">
                Update your agency administrator access credentials
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                New Secure Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters with numbers & symbols"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={isChanging}
              className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 via-tropical-gold to-yellow-400 hover:from-amber-300 text-deep-navy shadow-md shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isChanging ? "⏳ Updating..." : "💾 Update Password"}
            </button>
          </form>
        </div>

        {/* Right Column: Security Architecture & Brute-Force Defense (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Security Shield Card */}
          <div className="bg-white border border-emerald-200/80 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-lg border border-emerald-200/60 shadow-xs">
                🛡️
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Anti-Brute Force Protection Active</h4>
                <p className="text-xs text-emerald-600 font-semibold">● High Security Shield Enabled</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                <span className="text-emerald-600 font-bold">✓</span>
                <div>
                  <p className="font-bold text-slate-900">5-Attempt Lockout Rule</p>
                  <p className="text-slate-500 text-[11px]">Locks IP for 15 minutes upon 5 failed login attempts with live UI countdown</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                <span className="text-emerald-600 font-bold">✓</span>
                <div>
                  <p className="font-bold text-slate-900">Exponential Response Throttling</p>
                  <p className="text-slate-500 text-[11px]">Applies progressive delay (1s-3s) after consecutive failures to neutralize automated bots</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                <span className="text-emerald-600 font-bold">✓</span>
                <div>
                  <p className="font-bold text-slate-900">PBKDF2 Hashing &amp; Timing-Safe Match</p>
                  <p className="text-slate-500 text-[11px]">100,000 iterations with cryptographic salt preventing rainbow table &amp; timing attacks</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                <span className="text-emerald-600 font-bold">✓</span>
                <div>
                  <p className="font-bold text-slate-900">HttpOnly &amp; SameSite Session Cookie</p>
                  <p className="text-slate-500 text-[11px]">HMAC-SHA256 signed token inaccessible to malicious client-side JavaScript (XSS)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Agency Details Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Agency Dispatch Credentials
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <p className="text-slate-500 text-[10px] uppercase font-semibold">Email Dispatcher</p>
                <p className="font-mono text-slate-900 font-bold truncate">dtvacationandtravel@gmail.com</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <p className="text-slate-500 text-[10px] uppercase font-semibold">WhatsApp Support</p>
                <p className="font-mono text-emerald-600 font-bold">+1 (876) 856-9812</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Security Audit Logs Table */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-heading font-black text-slate-900">Security Audit Log</h4>
            <p className="text-xs text-slate-500">Timestamped record of administrative authentication events</p>
          </div>
          <span className="text-xs font-mono text-slate-400">Showing recent activity</span>
        </div>

        {auditLogs.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-slate-100">
            No recent security alerts recorded. System is secure.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-200 pb-2">
                  <th className="py-2.5 font-bold uppercase tracking-wider text-[11px]">Event</th>
                  <th className="py-2.5 font-bold uppercase tracking-wider text-[11px]">Client IP</th>
                  <th className="py-2.5 font-bold uppercase tracking-wider text-[11px]">User / Account</th>
                  <th className="py-2.5 text-right font-bold uppercase tracking-wider text-[11px]">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="text-slate-700 hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          log.event === "login_success"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : log.event === "lockout"
                            ? "bg-rose-50 text-rose-700 border-rose-200 font-black"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {log.event.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-2.5 font-mono text-slate-500">{log.ip}</td>
                    <td className="py-2.5 font-semibold text-slate-900">{log.username || "admin"}</td>
                    <td className="py-2.5 text-right text-slate-400 font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
