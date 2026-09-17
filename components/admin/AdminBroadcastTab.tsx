"use client";

import { getApiUrl } from "@/lib/api";

import { useState } from "react";
import { ExtendedPromotion, BroadcastLogRecord, SubscriberRecord, EnquiryRecord } from "@/lib/types";
import { formatDateDisplay } from "@/lib/dateUtils";
import { useToast } from "./Toast";

interface AdminBroadcastTabProps {
  promotions: ExtendedPromotion[];
  subscribers: SubscriberRecord[];
  enquiries: EnquiryRecord[];
  broadcastLogs: BroadcastLogRecord[];
  onRefresh: () => void;
}

export default function AdminBroadcastTab({
  promotions,
  subscribers,
  enquiries,
  broadcastLogs,
  onRefresh,
}: AdminBroadcastTabProps) {
  const { showToast } = useToast();

  const [headline, setHeadline] = useState("🌟 Exclusive Seasonal Special — Up to 35% Off Caribbean Luxury");
  const [previewText, setPreviewText] = useState("Limited-time partner rates and VIP airport perks for DT's Vacation members");
  const [targetAudience, setTargetAudience] = useState<"subscribers" | "leads" | "all" | "category">("subscribers");
  const [serviceCategory, setServiceCategory] = useState<string>("hotels");
  const [selectedPromoId, setSelectedPromoId] = useState<string>(promotions.find((p) => p.active)?.id || "");
  const [editorialMessage, setEditorialMessage] = useState(
    `Dear Traveler,

We are thrilled to share an exclusive flash opportunity curated especially for our VIP members. Whether you are seeking a serene beachfront resort, an unforgettable Caribbean cruise, or an executive group retreat, we have secured limited-availability preferred pricing.

Explore our featured special offer below or reply directly to connect with our concierge team.`
  );
  const [ctaText, setCtaText] = useState("Claim Special Offer on WhatsApp");
  const [ctaUrl, setCtaUrl] = useState("https://wa.me/18768569812");
  const [testEmail, setTestEmail] = useState("dtvacationandtravel@gmail.com");

  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [activeView, setActiveView] = useState<"composer" | "logs">("composer");

  // Calculate estimated audience size
  const getAudienceCount = () => {
    if (targetAudience === "subscribers") {
      return subscribers.filter((s) => s.status === "active").length;
    }
    if (targetAudience === "leads") {
      return new Set(enquiries.map((e) => e.email.toLowerCase())).size;
    }
    if (targetAudience === "category") {
      return new Set(
        enquiries
          .filter((e) => e.serviceType?.toLowerCase() === serviceCategory.toLowerCase())
          .map((e) => e.email.toLowerCase())
      ).size;
    }
    // all
    const all = new Set([
      ...subscribers.filter((s) => s.status === "active").map((s) => s.email.toLowerCase()),
      ...enquiries.map((e) => e.email.toLowerCase()),
    ]);
    return all.size;
  };

  const selectedPromo = promotions.find((p) => p.id === selectedPromoId);

  // Send Test Email
  const handleSendTest = async () => {
    if (!testEmail || !testEmail.includes("@")) {
      showToast("Please provide a valid test email address.", "warning");
      return;
    }

    setIsSendingTest(true);
    try {
      const res = await fetch(getApiUrl("/api/admin/broadcast"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline,
          previewText,
          editorialMessage,
          promotionId: selectedPromoId || undefined,
          targetAudience,
          ctaText,
          ctaUrl,
          isTest: true,
          testEmail,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast(`Test preview delivered to ${testEmail}! Check your inbox.`, "success");
      } else {
        showToast(json.error || "Failed to send test email.", "error");
      }
    } catch {
      showToast("Network error sending test.", "error");
    } finally {
      setIsSendingTest(false);
    }
  };

  // Send Broadcast
  const handleSendBroadcast = async () => {
    const audienceCount = getAudienceCount();
    if (audienceCount === 0) {
      showToast("No recipients found for this audience.", "warning");
      return;
    }

    if (
      !confirm(
        `Are you ready to send this broadcast campaign to ${audienceCount} recipients?\n\nSubject: "${headline}"`
      )
    ) {
      return;
    }

    setIsSendingBroadcast(true);
    try {
      const res = await fetch(getApiUrl("/api/admin/broadcast"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline,
          previewText,
          editorialMessage,
          promotionId: selectedPromoId || undefined,
          targetAudience,
          serviceCategory,
          ctaText,
          ctaUrl,
          isTest: false,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast(
          `Broadcast sent successfully! (${json.successCount} delivered, ${json.failedCount} failed)`,
          "success"
        );
        onRefresh();
        setActiveView("logs");
      } else {
        showToast(json.error || "Failed to launch broadcast.", "error");
      }
    } catch {
      showToast("Network error executing broadcast.", "error");
    } finally {
      setIsSendingBroadcast(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
        <div>
          <h3 className="text-lg font-heading font-black text-slate-900">
            Email Broadcast &amp; Campaign Center
          </h3>
          <p className="text-xs text-slate-500 font-normal">
            Dispatch luxury newsletter flyers &amp; seasonal offers to subscribers and leads
          </p>
        </div>

        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setActiveView("composer")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === "composer"
                ? "bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📢 Campaign Builder
          </button>
          <button
            onClick={() => setActiveView("logs")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === "logs"
                ? "bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📜 Past Logs ({broadcastLogs.length})
          </button>
        </div>
      </div>

      {activeView === "composer" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Campaign Configurator */}
          <div className="lg:col-span-7 space-y-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
            
            {/* Audience Selector */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-amber-800 uppercase tracking-wider">
                  👥 Target Audience Segment
                </label>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono border border-amber-300">
                  {getAudienceCount()} Recipients
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "subscribers", label: "Subscribers", count: subscribers.length },
                  { id: "leads", label: "All Leads", count: enquiries.length },
                  { id: "all", label: "Combined All", count: getAudienceCount() },
                  { id: "category", label: "By Service", count: "" },
                ].map((aud) => (
                  <button
                    key={aud.id}
                    type="button"
                    onClick={() => setTargetAudience(aud.id as any)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      targetAudience === aud.id
                        ? "bg-white border-amber-400 text-slate-900 font-bold shadow-xs"
                        : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
                    }`}
                  >
                    <p className="text-xs">{aud.label}</p>
                    {aud.count !== "" && <p className="text-[10px] text-amber-700 font-mono font-bold">{aud.count} contacts</p>}
                  </button>
                ))}
              </div>

              {targetAudience === "category" && (
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Select Service Category</label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:border-tropical-gold focus:outline-none cursor-pointer"
                  >
                    <option value="hotels">🏨 Hotel &amp; Resort Leads</option>
                    <option value="cruises">🚢 Cruise Leads</option>
                    <option value="tours">🌴 Tour Leads</option>
                    <option value="wedding">💍 Destination Wedding Leads</option>
                    <option value="corporate">👔 Corporate Group Leads</option>
                  </select>
                </div>
              )}
            </div>

            {/* Campaign Subject & Preheader */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Campaign Headline / Subject Line *
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. 🌴 Easter Flash Offer: 35% Off Caribbean Luxury Resorts"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:border-tropical-gold focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Inbox Preview Text (Preheader)
                </label>
                <input
                  type="text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="Brief preview line shown in email client list..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-tropical-gold focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Embed Active Promotion Dropdown */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
              <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider">
                🌟 1-Click Embed Active Special Promotion
              </label>
              <select
                value={selectedPromoId}
                onChange={(e) => setSelectedPromoId(e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-tropical-gold focus:outline-none font-bold cursor-pointer"
              >
                <option value="">-- No Promotion Card (Message Only) --</option>
                {promotions
                  .filter((p) => p.active)
                  .map((promo) => (
                    <option key={promo.id} value={promo.id}>
                      {promo.title} ({promo.discountTag} • {promo.badge})
                    </option>
                  ))}
              </select>
              <p className="text-[11px] text-slate-500">
                Automatically embeds the high-res flyer image, discount tag, promo code, and inclusion bullet points!
              </p>
            </div>

            {/* Editorial Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Editorial Message / Greeting Note
              </label>
              <textarea
                rows={5}
                value={editorialMessage}
                onChange={(e) => setEditorialMessage(e.target.value)}
                placeholder="Personal message from Denis and the agency..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 focus:border-tropical-gold focus:bg-white focus:outline-none font-normal leading-relaxed transition-all"
              />
            </div>

            {/* CTA Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-tropical-gold focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  CTA Link / WhatsApp Target
                </label>
                <input
                  type="text"
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-tropical-gold focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Test Send & Launch Controls */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              {/* Test Sender */}
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Test recipient email..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-tropical-gold focus:bg-white focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={handleSendTest}
                  disabled={isSendingTest}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap shadow-2xs"
                >
                  {isSendingTest ? "Sending..." : "🧪 Send Test Preview"}
                </button>
              </div>

              {/* Main Launch Button */}
              <button
                type="button"
                onClick={handleSendBroadcast}
                disabled={isSendingBroadcast || getAudienceCount() === 0}
                className="w-full bg-gradient-to-r from-amber-400 via-tropical-gold to-yellow-400 hover:from-amber-300 hover:to-yellow-400 text-deep-navy font-black py-4 px-6 rounded-2xl text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isSendingBroadcast
                  ? "⏳ Launching Batch Broadcast..."
                  : `🚀 Send Broadcast to ${getAudienceCount()} Recipients`}
              </button>
            </div>

          </div>

          {/* Right: Real-time Luxury Email Preview */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                👁️ Live Client Email Preview
              </span>
              <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Luxury Branded HTML</span>
            </div>

            <div className="rounded-3xl bg-slate-100/90 border border-slate-200 p-5 shadow-xs space-y-4 max-h-[750px] overflow-y-auto">
              
              {/* Preview Header */}
              <div className="bg-gradient-to-r from-[#000C1C] to-[#002D62] p-5 rounded-2xl text-center text-white border border-slate-300/40 shadow-sm">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
                  DT&apos;s Vacation &amp; Travel
                </span>
                <h4 className="text-base font-bold mt-1 text-white">{headline}</h4>
                <p className="text-[11px] text-white/70 mt-1">Exclusive Member Flash Offer</p>
              </div>

              {/* Promo Card Preview */}
              {selectedPromo && (
                <div className="bg-white border border-amber-300 rounded-2xl p-4 text-slate-900 space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-black bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy px-2 py-0.5 rounded">
                      {selectedPromo.badge}
                    </span>
                    <span className="text-[10px] text-slate-500">Valid: {formatDateDisplay(selectedPromo.validUntil)}</span>
                  </div>

                  <h5 className="font-heading font-black text-base text-slate-900">{selectedPromo.title}</h5>
                  <p className="text-xs text-amber-700 font-bold">{selectedPromo.discountTag}</p>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-3">
                    {selectedPromo.description}
                  </p>

                  {selectedPromo.highlights && selectedPromo.highlights.length > 0 && (
                    <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                      {selectedPromo.highlights.slice(0, 3).map((h, i) => (
                        <p key={i} className="flex items-center gap-1.5">
                          <span className="text-amber-600 font-bold">✓</span>
                          <span>{h}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Message */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed space-y-2 shadow-sm">
                {editorialMessage.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* CTA Preview */}
              <div className="text-center pt-2">
                <div className="inline-block bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy text-xs font-black uppercase py-3 px-6 rounded-full tracking-wider shadow-sm">
                  {ctaText} ✈️
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-[10px] text-slate-500 pt-3 border-t border-slate-200">
                <p className="text-slate-800 font-bold">DT&apos;s Vacation &amp; Travel Ltd.</p>
                <p>📞 +1 (876) 856-9812 | ✉️ dtvacationandtravel@gmail.com</p>
              </div>

            </div>
          </div>

        </div>
      ) : (
        /* BROADCAST LOGS TABLE */
        <div className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xs">
          {broadcastLogs.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-4xl mb-3">📜</p>
              <h4 className="text-lg font-bold text-slate-900 mb-1">No Broadcasts Sent Yet</h4>
              <p className="text-xs text-slate-500 mb-4">
                Your past email marketing campaigns and dispatch reports will appear here.
              </p>
              <button
                onClick={() => setActiveView("composer")}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy shadow-sm cursor-pointer"
              >
                + Create First Campaign
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-5">Campaign Subject</th>
                    <th className="py-4 px-4">Audience</th>
                    <th className="py-4 px-4">Recipients</th>
                    <th className="py-4 px-4">Success / Failed</th>
                    <th className="py-4 px-5 text-right">Sent Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {broadcastLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5">
                        <p className="font-bold text-slate-900">{log.subject}</p>
                        {log.promotionTitle && (
                          <p className="text-[11px] text-amber-700 font-semibold mt-0.5">
                            Promo: {log.promotionTitle}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-4 text-slate-500 capitalize">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] text-slate-600 font-medium">
                          {log.targetAudience}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-slate-900">
                        {log.recipientCount} contacts
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-emerald-700 font-bold">{log.successCount} sent</span>
                        {log.failedCount > 0 && (
                          <span className="text-rose-600 ml-1.5 font-medium">({log.failedCount} failed)</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-right text-[11px] text-slate-500">
                        {new Date(log.sentAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
