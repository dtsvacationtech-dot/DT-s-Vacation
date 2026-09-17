"use client";

import { adminFetch } from "@/lib/api";

import { useState, useEffect } from "react";
import { EnquiryRecord, ExtendedPromotion } from "@/lib/types";
import { useToast } from "./Toast";

interface EmailReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiry: EnquiryRecord | null;
  promotions: ExtendedPromotion[];
  onReplied: () => void;
}

const TEMPLATES: Record<string, { subject: string; body: string }> = {
  quote: {
    subject: "Your Custom Travel Proposal & VIP Itinerary — DT's Vacation & Travel",
    body: `Thank you for reaching out to DT's Vacation & Travel Ltd. We are delighted to assist you in designing an unforgettable Caribbean journey.

Based on your travel preferences, we have put together tailored luxury recommendations and exclusive partner tier rates for your dates.

Please find our highlighted recommendations and package details below. Our team is at your complete disposal to customize any aspect of this itinerary.`,
  },
  consultation: {
    subject: "Following Up on Your Travel Enquiry — DT's Vacation Concierge",
    body: `Thank you for contacting DT's Vacation & Travel Ltd. regarding your upcoming travel plans.

We have reviewed your request and would love to connect with you for a brief 10-minute consultation call or WhatsApp chat to finalize your preferences, suite selection, and private transfer arrangements.

What time works best for you this week?`,
  },
  cruise: {
    subject: "Your Luxury Cruise Itinerary & Stateroom Options — DT's Vacation",
    body: `Thank you for your interest in our premium ocean cruise packages!

We have checked live cabin availability and secured exclusive onboard spending credits and specialty dining passes for your requested sailing dates.

Please review the promotion flyer attached below. Let us know if you would like us to place a complimentary 48-hour hold on your preferred stateroom.`,
  },
  wedding: {
    subject: "Congratulations! Your Destination Wedding Inquiry — DT's Vacation",
    body: `Congratulations on your upcoming celebration! We are truly honored that you are considering DT's Vacation & Travel to coordinate your dream destination wedding in Jamaica.

We specialize in full-service guest travel coordination, private beachfront ceremony venues, and VIP airport charter logistics for wedding parties.

We would love to schedule a dedicated video or phone consultation with Denis and our wedding specialist team.`,
  },
};

export default function EmailReplyModal({
  isOpen,
  onClose,
  enquiry,
  promotions,
  onReplied,
}: EmailReplyModalProps) {
  const { showToast } = useToast();

  const [to, setTo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [subject, setSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [selectedPromoId, setSelectedPromoId] = useState<string>("");
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>("quote");
  const [statusUpdate, setStatusUpdate] = useState<"contacted" | "quoted" | "booked">("contacted");
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState<"compose" | "preview">("compose");

  useEffect(() => {
    if (enquiry) {
      setTo(enquiry.email);
      const name = enquiry.firstName || enquiry.name || "Valued Traveler";
      setCustomerName(name);

      const defaultTemplate =
        enquiry.serviceType?.toLowerCase().includes("cruise")
          ? "cruise"
          : enquiry.serviceType?.toLowerCase().includes("wedding")
          ? "wedding"
          : "quote";

      setSelectedTemplateKey(defaultTemplate);
      setSubject(TEMPLATES[defaultTemplate]?.subject || `Regarding Your ${enquiry.serviceType || "Travel"} Request — DT's Vacation`);
      setMessageBody(TEMPLATES[defaultTemplate]?.body || "");

      // Auto-select matching active promotion if any
      const matchingPromo = promotions.find(
        (p) => p.active && p.serviceType?.toLowerCase() === enquiry.serviceType?.toLowerCase()
      );
      if (matchingPromo) {
        setSelectedPromoId(matchingPromo.id);
      } else {
        setSelectedPromoId("");
      }
    }
  }, [enquiry, promotions, isOpen]);

  if (!isOpen || !enquiry) return null;

  const handleTemplateChange = (key: string) => {
    setSelectedTemplateKey(key);
    if (TEMPLATES[key]) {
      setSubject(TEMPLATES[key].subject);
      setMessageBody(TEMPLATES[key].body);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !to.includes("@")) {
      showToast("Valid recipient email is required.", "warning");
      return;
    }
    if (!messageBody.trim()) {
      showToast("Please enter message content.", "warning");
      return;
    }

    setIsSending(true);
    try {
      const res = await adminFetch("/api/admin/reply-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryId: enquiry.id,
          to,
          customerName,
          subject,
          messageBody,
          serviceType: enquiry.serviceType,
          promotionId: selectedPromoId || undefined,
          statusUpdate,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast(`Reply email delivered successfully to ${to}!`, "success");
        onReplied();
        onClose();
      } else {
        showToast(json.error || "Failed to send email.", "error");
      }
    } catch {
      showToast("Network error sending email.", "error");
    } finally {
      setIsSending(false);
    }
  };

  const selectedPromo = promotions.find((p) => p.id === selectedPromoId);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] animate-scale-in">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-200/60 shadow-xs">
              <span className="text-amber-600 text-lg">✉️</span>
            </div>
            <div>
              <h3 className="text-lg font-heading font-black text-slate-900">
                Direct Reply to {customerName}
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Dispatches branded luxury HTML email via Agency SMTP ({enquiry.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => setActiveTab("compose")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "compose"
                    ? "bg-gradient-to-r from-amber-400 via-tropical-gold to-yellow-400 text-deep-navy shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ✏️ Compose
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "preview"
                    ? "bg-gradient-to-r from-amber-400 via-tropical-gold to-yellow-400 text-deep-navy shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                👁️ Email Preview
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === "compose" ? (
            <form onSubmit={handleSend} className="space-y-5">
              
              {/* Top Meta: Recipient & Template Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    To (Customer Email)
                  </label>
                  <input
                    type="email"
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:bg-white focus:border-tropical-gold focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    ⚡ Quick Template Snippet
                  </label>
                  <select
                    value={selectedTemplateKey}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="quote">Custom Itinerary &amp; Quote Offer</option>
                    <option value="consultation">Consultation Call / WhatsApp Follow-up</option>
                    <option value="cruise">Cruise Stateroom &amp; Onboard Credit</option>
                    <option value="wedding">Destination Wedding Proposal</option>
                  </select>
                </div>
              </div>

              {/* Subject Line */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Subject Line
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:bg-white focus:border-tropical-gold focus:outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Message Body */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Message Content
                  </label>
                  <span className="text-[11px] text-slate-400">Markdown and paragraph breaks supported</span>
                </div>
                <textarea
                  rows={8}
                  required
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Type your response to the client..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none leading-relaxed transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Attach Promotion Flyer & Status Update */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div>
                  <label className="block text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                    🌟 Attach Special Promotion Flyer (Optional)
                  </label>
                  <select
                    value={selectedPromoId}
                    onChange={(e) => setSelectedPromoId(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:border-tropical-gold focus:outline-none"
                  >
                    <option value="">-- None (Plain Response) --</option>
                    {promotions
                      .filter((p) => p.active)
                      .map((promo) => (
                        <option key={promo.id} value={promo.id}>
                          {promo.title} ({promo.discountTag})
                        </option>
                      ))}
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">Embeds a luxury offer card inside the customer email</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Lead Status After Sending
                  </label>
                  <select
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:border-tropical-gold focus:outline-none"
                  >
                    <option value="contacted">🟡 Contacted (In Discussion)</option>
                    <option value="quoted">🔵 Quoted (Proposal Sent)</option>
                    <option value="booked">🟢 Booked (Confirmed)</option>
                  </select>
                </div>
              </div>

            </form>
          ) : (
            /* PREVIEW OF EMAIL */
            <div className="max-w-2xl mx-auto rounded-2xl bg-white text-slate-800 p-6 shadow-xs space-y-4 border border-slate-200">
              <div className="border-b border-slate-100 pb-4">
                <div className="bg-gradient-to-r from-[#000C1C] to-[#002D62] p-4 rounded-xl text-white text-center shadow-xs">
                  <p className="text-tropical-gold text-xs font-bold tracking-widest uppercase">DT&apos;s Vacation &amp; Travel Ltd.</p>
                  <h4 className="text-base font-bold mt-1">{subject}</h4>
                </div>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-slate-700">
                <p className="font-bold text-deep-navy">Dear {customerName || "Valued Traveler"},</p>
                {messageBody.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {selectedPromo && (
                <div className="p-4 rounded-xl bg-slate-900 text-white border border-tropical-gold/40 space-y-2 shadow-xs">
                  <span className="text-[10px] uppercase font-bold bg-gradient-to-r from-amber-400 to-yellow-400 text-deep-navy px-2 py-0.5 rounded">
                    {selectedPromo.badge}
                  </span>
                  <h5 className="font-bold text-base text-white">{selectedPromo.title}</h5>
                  <p className="text-xs text-tropical-gold font-semibold">{selectedPromo.discountTag}</p>
                  <p className="text-xs text-gray-300 line-clamp-2">{selectedPromo.description}</p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                <p className="font-bold text-deep-navy">Denis &amp; DT&apos;s Vacation Travel Concierge</p>
                <p>📞 +1 (876) 856-9812 | ✉️ dtvacationandtravel@gmail.com</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/60">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={isSending}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-tropical-gold to-yellow-400 hover:from-amber-300 text-deep-navy shadow-md shadow-amber-500/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <span>{isSending ? "⏳ Dispatching Email..." : "🚀 Send Email Reply"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
