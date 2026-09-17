"use client";

import { getApiUrl } from "@/lib/api";

import { useState } from "react";
import { SubscriberRecord } from "@/lib/types";
import { useToast } from "./Toast";

interface AdminSubscribersTabProps {
  subscribers: SubscriberRecord[];
  onRefresh: () => void;
  onNavigateToBroadcast?: () => void;
}

export default function AdminSubscribersTab({
  subscribers,
  onRefresh,
  onNavigateToBroadcast,
}: AdminSubscribersTabProps) {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Copy All Emails
  const handleCopyAll = () => {
    if (subscribers.length === 0) {
      showToast("No emails to copy.", "warning");
      return;
    }
    const allEmails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(allEmails);
    showToast(`Copied ${subscribers.length} subscriber emails to clipboard!`, "success");
  };

  // Export CSV
  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      showToast("No subscribers to export.", "warning");
      return;
    }

    const headers = ["ID", "Email", "Source", "Status", "Subscribed At"];
    const rows = subscribers.map((s) => [
      `"${s.id}"`,
      `"${s.email}"`,
      `"${s.source || "Website"}"`,
      `"${s.status}"`,
      `"${new Date(s.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DT_Vacation_Subscribers_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Subscribers CSV exported successfully!", "success");
  };

  // Delete Subscriber
  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to remove subscriber "${email}"?`)) return;

    try {
      const res = await fetch(getApiUrl(`/api/admin/subscribers?id=${id}`), {
        method: "DELETE",
      });

      if (res.ok) {
        showToast("Subscriber removed.", "success");
        onRefresh();
      } else {
        showToast("Failed to remove subscriber.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Stats & Action Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Subscribers</p>
            <h3 className="text-2xl font-heading font-black text-slate-900 mt-1">{subscribers.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-xl border border-amber-200">
            📬
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Status</p>
            <h3 className="text-2xl font-heading font-black text-emerald-700 mt-1">100% Verified</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-xl border border-emerald-200">
            ✨
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Newsletter Broadcast</p>
            <button
              onClick={onNavigateToBroadcast}
              className="mt-1 text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Launch Campaign →</span>
            </button>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-xl border border-sky-200">
            📢
          </div>
        </div>
      </div>

      {/* Search & Export Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 max-w-md w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subscribers by email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-tropical-gold focus:bg-white focus:outline-none transition-all"
          />
          <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopyAll}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 transition-all cursor-pointer whitespace-nowrap shadow-2xs"
          >
            📋 Copy All Emails
          </button>
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-amber-50/80 hover:bg-amber-100 text-amber-900 border border-amber-300/80 transition-all cursor-pointer whitespace-nowrap shadow-2xs"
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xs">
        {filteredSubscribers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">📬</p>
            <h4 className="text-lg font-bold text-slate-900 mb-1">No Subscribers Found</h4>
            <p className="text-xs text-slate-500">
              {searchQuery ? "No subscribers match your search query." : "Subscribers from the Footer and Newsletter modal will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-5">Subscriber Email</th>
                  <th className="py-4 px-4">Signup Source</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Subscribed Date</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 font-mono text-slate-900 font-semibold">
                      {sub.email}
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] text-slate-600 font-medium">
                        {sub.source || "Website Footer"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Active
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[11px] text-slate-500">
                      {new Date(sub.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleDelete(sub.id, sub.email)}
                        className="p-1.5 rounded-lg text-xs text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer shadow-2xs"
                        title="Remove Subscriber"
                      >
                        🗑️
                      </button>
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
