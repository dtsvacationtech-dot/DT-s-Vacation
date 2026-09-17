"use client";

import { getApiUrl } from "@/lib/api";

import { useState } from "react";
import { EnquiryRecord, ExtendedPromotion } from "@/lib/types";
import EmailReplyModal from "./EmailReplyModal";
import { useToast } from "./Toast";

interface AdminEnquiriesTabProps {
  enquiries: EnquiryRecord[];
  promotions: ExtendedPromotion[];
  onRefresh: () => void;
}

export default function AdminEnquiriesTab({ enquiries, promotions, onRefresh }: AdminEnquiriesTabProps) {
  const { showToast } = useToast();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [internalNotes, setInternalNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Filter enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    const matchesService =
      serviceFilter === "all" || e.serviceType?.toLowerCase() === serviceFilter.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (e.name || "").toLowerCase().includes(query) ||
      (e.firstName || "").toLowerCase().includes(query) ||
      (e.lastName || "").toLowerCase().includes(query) ||
      (e.email || "").toLowerCase().includes(query) ||
      (e.phone || "").toLowerCase().includes(query) ||
      (e.destination || "").toLowerCase().includes(query);

    return matchesStatus && matchesService && matchesSearch;
  });

  // Change Status
  const handleStatusChange = async (id: string, newStatus: EnquiryRecord["status"]) => {
    try {
      const res = await fetch(getApiUrl("/api/admin/enquiries"), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        showToast(`Lead status updated to "${newStatus.toUpperCase()}".`, "success");
        onRefresh();
      } else {
        showToast("Failed to update status.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    }
  };

  // Save Internal Notes
  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setIsSavingNotes(true);
    try {
      const res = await fetch(getApiUrl("/api/admin/enquiries"), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedEnquiry.id, notes: internalNotes }),
      });

      if (res.ok) {
        showToast("Internal notes saved successfully.", "success");
        onRefresh();
        setIsDetailsOpen(false);
      } else {
        showToast("Failed to save notes.", "error");
      }
    } catch {
      showToast("Network error saving notes.", "error");
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Delete Enquiry
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete inquiry from ${name}?`)) return;

    try {
      const res = await fetch(getApiUrl(`/api/admin/enquiries?id=${id}`), {
        method: "DELETE",
      });

      if (res.ok) {
        showToast("Lead record deleted.", "success");
        onRefresh();
      } else {
        showToast("Failed to delete lead.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredEnquiries.length === 0) {
      showToast("No records to export.", "warning");
      return;
    }

    const headers = ["ID", "Name", "Email", "Phone", "Service", "Destination", "Dates", "Travelers", "Status", "Created At", "Message"];
    const rows = filteredEnquiries.map((e) => [
      `"${e.id}"`,
      `"${e.firstName || e.name || ""}"`,
      `"${e.email}"`,
      `"${e.phone}"`,
      `"${e.serviceType || "General"}"`,
      `"${e.destination || ""}"`,
      `"${e.travelDateStart || ""} - ${e.travelDateEnd || ""}"`,
      `"${e.adults || e.guests || 1} adults, ${e.children || 0} kids"`,
      `"${e.status}"`,
      `"${new Date(e.createdAt).toLocaleString()}"`,
      `"${(e.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DT_Vacation_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Leads CSV exported successfully!", "success");
  };

  const getStatusBadge = (status: EnquiryRecord["status"]) => {
    switch (status) {
      case "new":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "contacted":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "quoted":
        return "bg-sky-50 text-sky-800 border-sky-200";
      case "booked":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "archived":
        return "bg-slate-100 text-slate-600 border-slate-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
        
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "all", label: "All Leads" },
            { id: "new", label: "🚨 New" },
            { id: "contacted", label: "🟡 Contacted" },
            { id: "quoted", label: "🔵 Quoted" },
            { id: "booked", label: "🟢 Booked" },
            { id: "archived", label: "⚪ Archived" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                statusFilter === tab.id
                  ? "bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy font-bold border-amber-400 shadow-sm"
                  : "bg-slate-100/80 text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-200/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search, Category Filter & Export */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Service Dropdown */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:border-tropical-gold focus:bg-white focus:outline-none transition-all cursor-pointer"
          >
            <option value="all">All Services</option>
            <option value="hotels">Hotels</option>
            <option value="cruises">Cruises</option>
            <option value="tours">Tours</option>
            <option value="wedding">Weddings</option>
            <option value="corporate">Corporate</option>
          </select>

          {/* Search Input */}
          <div className="relative flex-1 sm:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-tropical-gold focus:bg-white focus:outline-none transition-all"
            />
            <svg className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* CSV Export Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50/80 hover:bg-amber-100 text-amber-900 border border-amber-300/80 transition-all cursor-pointer whitespace-nowrap shadow-2xs"
            title="Download CSV for Excel"
          >
            <span>📥 Export CSV</span>
          </button>
        </div>

      </div>

      {/* Leads Table Container */}
      <div className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xs">
        {filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">📭</p>
            <h4 className="text-lg font-bold text-slate-900 mb-1">No Leads Found</h4>
            <p className="text-xs text-slate-500">
              {searchQuery || statusFilter !== "all" || serviceFilter !== "all"
                ? "No customer inquiries match your current filters."
                : "Customer contact submissions will automatically appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-5">Customer</th>
                  <th className="py-4 px-4">Service &amp; Destination</th>
                  <th className="py-4 px-4">Travel Dates &amp; Guests</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Received</th>
                  <th className="py-4 px-5 text-right">Quick Agency Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredEnquiries.map((enquiry) => {
                  const customerName = enquiry.firstName || enquiry.name || "Traveler";
                  const cleanPhone = (enquiry.phone || "").replace(/\D/g, "");
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    enquiry.promotionTitle
                      ? `Hi ${customerName}, thank you for contacting DT's Vacation & Travel regarding the ${enquiry.promotionTitle} special promotion! Denis here, how can we assist you with your booking?`
                      : `Hi ${customerName}, thank you for contacting DT's Vacation & Travel regarding your ${enquiry.serviceType || "travel"} inquiry. Denis here, how can we assist you with your dates?`
                  )}`;

                  return (
                    <tr
                      key={enquiry.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Customer Info */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold border border-amber-200">
                            {customerName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                              {customerName} {enquiry.lastName || ""}
                            </p>
                            <p className="text-[11px] text-slate-500 font-mono">{enquiry.email}</p>
                            {enquiry.phone && (
                              <p className="text-[11px] text-emerald-600 font-mono font-medium">{enquiry.phone}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Service & Destination */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                            {enquiry.serviceType || "General"}
                          </span>
                          {enquiry.promotionTitle && (
                            <div className="block">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                                🔥 {enquiry.promotionTitle}
                              </span>
                            </div>
                          )}
                          <p className="text-slate-800 font-medium line-clamp-1">
                            {enquiry.destination || "Jamaica / Flexible"}
                          </p>
                        </div>
                      </td>

                      {/* Travel Dates & Guests */}
                      <td className="py-4 px-4">
                        <p className="text-slate-900 font-semibold">
                          {enquiry.travelDateStart
                            ? `${enquiry.travelDateStart} ${enquiry.travelDateEnd ? `→ ${enquiry.travelDateEnd}` : ""}`
                            : "Flexible Dates"}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {enquiry.adults || enquiry.guests || 1} Adult{Number(enquiry.adults || enquiry.guests || 1) > 1 ? "s" : ""}
                          {Boolean(enquiry.children && enquiry.children > 0) && `, ${enquiry.children} Children`}
                        </p>
                      </td>

                      {/* Status Selector */}
                      <td className="py-4 px-4">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusChange(enquiry.id, e.target.value as any)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer focus:outline-none ${getStatusBadge(
                            enquiry.status
                          )}`}
                        >
                          <option value="new" className="bg-white text-slate-900">🚨 New</option>
                          <option value="contacted" className="bg-white text-slate-900">🟡 Contacted</option>
                          <option value="quoted" className="bg-white text-slate-900">🔵 Quoted</option>
                          <option value="booked" className="bg-white text-slate-900">🟢 Booked</option>
                          <option value="archived" className="bg-white text-slate-900">⚪ Archived</option>
                        </select>
                      </td>

                      {/* Received Date */}
                      <td className="py-4 px-4 text-[11px] text-slate-500 whitespace-nowrap">
                        {new Date(enquiry.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp Direct Chat */}
                          {enquiry.phone && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                              title="Chat on WhatsApp"
                            >
                              <span>💬 WhatsApp</span>
                            </a>
                          )}

                          {/* Reply by Email */}
                          <button
                            onClick={() => {
                              setSelectedEnquiry(enquiry);
                              setIsReplyOpen(true);
                            }}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300 transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                            title="Direct Email Reply"
                          >
                            <span>✉️ Reply</span>
                          </button>

                          {/* Details / Notes Modal */}
                          <button
                            onClick={() => {
                              setSelectedEnquiry(enquiry);
                              setInternalNotes(enquiry.notes || "");
                              setIsDetailsOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-xs text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer shadow-2xs"
                            title="View Full Details & Notes"
                          >
                            👁️
                          </button>

                          {/* Delete Lead */}
                          <button
                            onClick={() => handleDelete(enquiry.id, customerName)}
                            className="p-1.5 rounded-lg text-xs text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer shadow-2xs"
                            title="Delete Lead"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details & Notes Drawer Modal */}
      {isDetailsOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsDetailsOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl z-10 animate-scale-in text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Lead Details &bull; {selectedEnquiry.firstName || selectedEnquiry.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedEnquiry.email} &bull; {selectedEnquiry.phone}</p>
              </div>
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Target Special Promotion (if applicable) */}
            {selectedEnquiry.promotionTitle && (
              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 shadow-2xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">🔥</span>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                    Target Special Promotion
                  </p>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {selectedEnquiry.promotionTitle}
                </p>
              </div>
            )}

            {/* Customer Message */}
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                Customer Message
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
                {selectedEnquiry.message || "No specific message provided."}
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Internal Agency Notes &amp; Activity Log
              </p>
              <textarea
                rows={4}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Add follow-up notes, phone call logs, special budget requests..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setIsDetailsOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy shadow cursor-pointer disabled:opacity-50"
              >
                {isSavingNotes ? "Saving..." : "💾 Save Notes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct Email Reply Modal */}
      {isReplyOpen && selectedEnquiry && (
        <EmailReplyModal
          isOpen={isReplyOpen}
          enquiry={selectedEnquiry}
          promotions={promotions}
          onClose={() => {
            setIsReplyOpen(false);
            setSelectedEnquiry(null);
          }}
          onReplied={() => {
            onRefresh();
          }}
        />
      )}
    </div>
  );
}
