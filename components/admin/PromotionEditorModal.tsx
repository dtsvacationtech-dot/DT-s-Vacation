"use client";

import { getApiUrl } from "@/lib/api";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ExtendedPromotion } from "@/lib/types";
import { VIPPerk } from "@/lib/promotionsData";
import { useToast } from "./Toast";

interface PromotionEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (savedPromo: ExtendedPromotion) => void;
  initialPromotion?: ExtendedPromotion | null;
}

const PRESET_IMAGES = [
  { label: "Luxury Hotels", url: "/images/hero_hotels.webp" },
  { label: "Ocean Cruise", url: "/images/hero_cruises.webp" },
  { label: "Island Tours", url: "/images/hero_tours.webp" },
  { label: "Weddings", url: "/images/hero_weddings.webp" },
  { label: "Corporate", url: "/images/hero_corporate.webp" },
];

export const PERK_ICONS = [
  { value: "gift", label: "🎁 Gift / Shipboard Credit" },
  { value: "champagne", label: "🍾 Champagne / Dining Pass" },
  { value: "clock", label: "⏱️ Priority Port / Fast Check-in" },
  { value: "hotel", label: "🏨 Hotel / Suite Upgrade" },
  { value: "car", label: "🚗 VIP Fast-Track / Airport Transfer" },
  { value: "shield", label: "🛡️ Flexible Guarantee / Protection" },
  { value: "users", label: "👥 Group Coordinator / Concierge" },
  { value: "compass", label: "🧭 Excursion / Guided Tour" },
] as const;

export function getPerkEmoji(icon?: string): string {
  switch (icon) {
    case "hotel":
      return "🏨";
    case "gift":
      return "🎁";
    case "car":
      return "🚗";
    case "shield":
      return "🛡️";
    case "champagne":
      return "🍾";
    case "clock":
      return "⏱️";
    case "users":
      return "👥";
    case "compass":
      return "🧭";
    default:
      return "✨";
  }
}

import { toISODateString, formatDateDisplay, isDateExpired } from "@/lib/dateUtils";
export { toISODateString, formatDateDisplay, isDateExpired };

export default function PromotionEditorModal({
  isOpen,
  onClose,
  onSaved,
  initialPromotion,
}: PromotionEditorModalProps) {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ExtendedPromotion>>({
    title: "",
    subtitle: "",
    badge: "Limited Time Flash Deal",
    discountTag: "UP TO 30% OFF",
    promoCode: "",
    urgencyTag: "⚡ Limited availability for upcoming season",
    savingsEstimate: "Save up to $500 on full package bookings",
    validFrom: new Date().toISOString().split("T")[0],
    validUntil: "",
    image: "/images/hero_hotels.webp",
    description: "",
    highlights: ["VIP Airport Fast-Track Arrival", "Dedicated 24/7 Concierge Coordinator"],
    vipPerks: [
      { title: "VIP Fast-Track", desc: "Skip immigration queues at Montego Bay airport", icon: "car" },
      { title: "Resort Credit", desc: "Complimentary dinner & spa voucher included", icon: "gift" },
    ],
    ctaText: "Claim Offer on WhatsApp",
    actionType: "whatsapp",
    actionTarget: "Hi DT's Vacation, I would like to claim this special promotion. Please check availability for my dates!",
    serviceType: "hotels",
    active: true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    if (initialPromotion) {
      let initHighlights: string[] = [];
      if (Array.isArray(initialPromotion.highlights)) {
        initHighlights = initialPromotion.highlights;
      } else if (typeof initialPromotion.highlights === "string") {
        try {
          const parsed = JSON.parse(initialPromotion.highlights);
          initHighlights = Array.isArray(parsed) ? parsed : [];
        } catch {
          initHighlights = [];
        }
      }

      let initVipPerks: VIPPerk[] = [];
      if (Array.isArray(initialPromotion.vipPerks)) {
        initVipPerks = initialPromotion.vipPerks;
      } else if (typeof initialPromotion.vipPerks === "string") {
        try {
          const parsed = JSON.parse(initialPromotion.vipPerks);
          initVipPerks = Array.isArray(parsed) ? parsed : [];
        } catch {
          initVipPerks = [];
        }
      }

      setFormData({
        ...initialPromotion,
        validFrom: toISODateString(initialPromotion.validFrom) || (initialPromotion.validFrom ?? ""),
        validUntil: toISODateString(initialPromotion.validUntil) || (initialPromotion.validUntil ?? ""),
        highlights: initHighlights,
        vipPerks: initVipPerks,
        description: initialPromotion.description || "",
      });
    } else {
      setFormData({
        title: "",
        subtitle: "",
        badge: "Limited Time Flash Deal",
        discountTag: "UP TO 30% OFF",
        promoCode: `DEAL-${new Date().getFullYear()}`,
        urgencyTag: "⚡ Limited availability for upcoming dates",
        savingsEstimate: "Save up to $500 on packages",
        validFrom: new Date().toISOString().split("T")[0],
        validUntil: "",
        image: "/images/hero_hotels.webp",
        description: "",
        highlights: ["VIP Airport Fast-Track Arrival", "Dedicated 24/7 Concierge Coordinator"],
        vipPerks: [
          { title: "VIP Fast-Track", desc: "Skip immigration queues at airport", icon: "car" },
          { title: "Resort Perk", desc: "Complimentary specialty dining upgrade", icon: "gift" },
        ],
        ctaText: "Claim Offer on WhatsApp",
        actionType: "whatsapp",
        actionTarget: "Hi DT's Vacation, I would like to inquire about this promotion!",
        serviceType: "hotels",
        active: true,
      });
    }
  }, [initialPromotion, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof ExtendedPromotion, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [...(prev.highlights || []), ""],
    }));
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: (prev.highlights || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddPerk = () => {
    const newPerk: VIPPerk = {
      title: "New VIP Benefit",
      desc: "Benefit description details",
      icon: "gift",
    };
    setFormData((prev) => ({
      ...prev,
      vipPerks: [...(prev.vipPerks || []), newPerk],
    }));
  };

  const handleUpdatePerk = (index: number, field: keyof VIPPerk, val: any) => {
    setFormData((prev) => {
      const perks = [...(prev.vipPerks || [])];
      perks[index] = { ...perks[index], [field]: val };
      return { ...prev, vipPerks: perks };
    });
  };

  const handleRemovePerk = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      vipPerks: (prev.vipPerks || []).filter((_, i) => i !== index),
    }));
  };

  // Image Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch(getApiUrl("/api/admin/upload"), {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (res.ok && json.url) {
        setFormData((prev) => ({ ...prev, image: json.url }));
        showToast("Image uploaded successfully!", "success");
      } else {
        showToast(json.error || "Failed to upload image.", "error");
      }
    } catch {
      showToast("Network error uploading image.", "error");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Submit Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || formData.title.trim() === "") {
      showToast("Please enter a promotion title.", "warning");
      return;
    }

    setIsSaving(true);
    try {
      const cleanHighlights = (formData.highlights || [])
        .map((h) => (typeof h === "string" ? h.trim() : String(h).trim()))
        .filter(Boolean);

      // Clean VIP perks
      const cleanVipPerks = (formData.vipPerks || [])
        .filter((p) => p && (p.title?.trim() || p.desc?.trim()))
        .map((p) => ({
          title: (p.title || "").trim(),
          desc: (p.desc || "").trim(),
          icon: p.icon || "gift",
        }));

      const payload = {
        ...formData,
        description: (formData.description || "").trim(),
        highlights: cleanHighlights,
        vipPerks: cleanVipPerks,
      };

      const method = formData.id ? "PUT" : "POST";
      const res = await fetch(getApiUrl("/api/admin/promotions"), {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.promotion) {
        showToast(
          formData.id ? "Promotion updated successfully!" : "New promotion created!",
          "success"
        );
        onSaved(json.promotion);
        onClose();
      } else {
        showToast(json.error || "Failed to save promotion.", "error");
      }
    } catch {
      showToast("Network error saving promotion.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-white border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] animate-scale-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-200/60 shadow-xs">
              <span className="text-tropical-gold text-lg">🔥</span>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-heading font-black text-slate-900">
                {formData.id ? "Edit Special Promotion" : "Create New Special Promotion"}
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Configure offer details, validity dates, imagery &amp; VIP perks
              </p>
            </div>
          </div>

          {/* Tab Switcher & Close */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "edit"
                    ? "bg-gradient-to-r from-amber-400 via-tropical-gold to-yellow-400 text-deep-navy shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ✏️ Editor
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
                👁️ Live Preview
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

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {activeTab === "edit" ? (
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Top Row: Category, Active Status & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Service Category
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => handleInputChange("serviceType", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="hotels">🏨 Luxury Hotels &amp; Resorts</option>
                    <option value="cruises">🚢 Ocean Cruises</option>
                    <option value="tours">🌴 Island &amp; Global Tours</option>
                    <option value="wedding">💍 Destination Weddings</option>
                    <option value="corporate">👔 Corporate &amp; Group Travel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ""}
                    onChange={(e) => handleInputChange("badge", e.target.value)}
                    placeholder="e.g. Limited Time Flash Deal"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Publish Status
                  </label>
                  <div className="flex items-center gap-3 h-10 px-4 rounded-xl bg-slate-50 border border-slate-200">
                    <input
                      type="checkbox"
                      id="promo-active"
                      checked={formData.active}
                      onChange={(e) => handleInputChange("active", e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                    <label htmlFor="promo-active" className="text-sm font-semibold text-slate-800 cursor-pointer">
                      {formData.active ? "🟢 Active & Visible on Website" : "⚪ Draft / Hidden"}
                    </label>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Promotion Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g. Easter & Spring Caribbean Getaway"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none font-bold transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Subtitle / Catchphrase
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle || ""}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                    placeholder="e.g. All-Inclusive 5-Star Luxury Beachfront Special"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Discount Tag, Promo Code, Urgency & Savings */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                    Discount / Offer Tag
                  </label>
                  <input
                    type="text"
                    value={formData.discountTag || ""}
                    onChange={(e) => handleInputChange("discountTag", e.target.value)}
                    placeholder="e.g. UP TO 35% OFF"
                    className="w-full bg-amber-50/50 border border-amber-300 rounded-xl px-4 py-2.5 text-sm text-amber-900 font-black focus:bg-white focus:border-tropical-gold focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Promo Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.promoCode || ""}
                    onChange={(e) => handleInputChange("promoCode", e.target.value)}
                    placeholder="e.g. SPRING-35"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:bg-white focus:border-tropical-gold focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Urgency Tag
                  </label>
                  <input
                    type="text"
                    value={formData.urgencyTag || ""}
                    onChange={(e) => handleInputChange("urgencyTag", e.target.value)}
                    placeholder="e.g. ⚡ Only 3 Suites Left"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Savings Estimate
                  </label>
                  <input
                    type="text"
                    value={formData.savingsEstimate || ""}
                    onChange={(e) => handleInputChange("savingsEstimate", e.target.value)}
                    placeholder="e.g. Save up to $650 per stay"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Validity Dates: Start & End */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    📅 Start Date (Valid From)
                  </label>
                  <input
                    type="date"
                    value={formData.validFrom || ""}
                    onChange={(e) => handleInputChange("validFrom", e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-tropical-gold focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Leave empty to activate immediately</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      ⏳ End Date / Expiry (Valid Until)
                    </label>
                    {formData.validUntil && (
                      <button
                        type="button"
                        onClick={() => handleInputChange("validUntil", "")}
                        className="text-[11px] text-amber-700 hover:text-amber-800 font-bold cursor-pointer"
                      >
                        ✕ Clear (Set Ongoing)
                      </button>
                    )}
                  </div>
                  <input
                    type="date"
                    value={toISODateString(formData.validUntil)}
                    onChange={(e) => handleInputChange("validUntil", e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-tropical-gold focus:outline-none transition-all cursor-pointer"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-1 mt-1.5 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-medium ${isDateExpired(formData.validUntil) ? "text-rose-600 font-bold" : "text-slate-500"}`}>
                        {formData.validUntil
                          ? `Displayed as: ${formatDateDisplay(formData.validUntil)}`
                          : "Ongoing deal (no expiration deadline)"}
                      </span>
                      {isDateExpired(formData.validUntil) && (
                        <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-rose-200 animate-pulse">
                          ⚠️ Expired (Hidden)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[7, 30, 60].map((days) => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => {
                            const base = new Date();
                            base.setDate(base.getDate() + days);
                            const y = base.getFullYear();
                            const m = String(base.getMonth() + 1).padStart(2, "0");
                            const d = String(base.getDate()).padStart(2, "0");
                            handleInputChange("validUntil", `${y}-${m}-${d}`);
                          }}
                          className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-[10px] font-semibold cursor-pointer border border-slate-200"
                        >
                          +{days}d
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload & Preset Gallery */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  🖼️ Promotion Flyer Image
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Current Image Thumbnail */}
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100 shadow-xs">
                    {formData.image ? (
                      <Image
                        src={formData.image}
                        alt="Promo Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={formData.image || ""}
                      onChange={(e) => handleInputChange("image", e.target.value)}
                      placeholder="/images/hero_hotels.webp or custom image path"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:border-tropical-gold focus:outline-none placeholder:text-slate-400"
                    />

                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isUploading ? "⏳ Uploading..." : "📤 Upload New Photo"}
                      </button>
                      <span className="text-xs text-slate-500">JPG, PNG, WebP up to 10MB</span>
                    </div>
                  </div>
                </div>

                {/* Preset Fast Selection */}
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold mb-2">Or choose from library presets:</p>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => handleInputChange("image", preset.url)}
                        className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer border ${
                          formData.image === preset.url
                            ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-deep-navy font-bold border-amber-400 shadow-xs"
                            : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Promotion Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Detailed description of what makes this offer unforgettable..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:bg-white focus:border-tropical-gold focus:outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Key Inclusions / Highlights */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-amber-700 uppercase tracking-wider">
                      ✨ What&apos;s Included (Checklist Points)
                    </label>
                    <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                      Click &quot;+ Add Point&quot; to instantly add a new inclusion row
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80 transition-all cursor-pointer shadow-2xs hover:scale-[1.02] active:scale-[0.98]"
                  >
                    + Add Point
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.highlights || []).map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-amber-600 text-xs font-bold shrink-0">✓</span>
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => {
                          const list = [...(formData.highlights || [])];
                          list[index] = e.target.value;
                          handleInputChange("highlights", list);
                        }}
                        placeholder="e.g. Free VIP Airport Transfers, Complimentary Spa Access..."
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-tropical-gold focus:outline-none placeholder:text-slate-400"
                        autoFocus={highlight === ""}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(index)}
                        title="Remove Inclusion"
                        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-200 transition-all cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {(!formData.highlights || formData.highlights.length === 0) && (
                    <div className="py-4 px-3 rounded-xl bg-white border border-dashed border-slate-200 text-center">
                      <p className="text-xs text-slate-400 italic mb-2">
                        No inclusion points added yet.
                      </p>
                      <button
                        type="button"
                        onClick={handleAddHighlight}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80 transition-all cursor-pointer"
                      >
                        + Add Your First Point
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-dashed border-slate-300 hover:border-amber-400 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>+ Add New Inclusion Point</span>
                </button>
              </div>

              {/* VIP Perks */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-amber-700 uppercase tracking-wider">
                    👑 VIP Concierge Perks
                  </label>
                  <button
                    type="button"
                    onClick={handleAddPerk}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80 transition-all cursor-pointer"
                  >
                    + Add Perk
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(formData.vipPerks || []).map((perk, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-2 shadow-2xs hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <select
                          value={perk.icon}
                          onChange={(e) => handleUpdatePerk(index, "icon", e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-800 focus:border-tropical-gold focus:outline-none cursor-pointer"
                        >
                          {PERK_ICONS.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          value={perk.title}
                          onChange={(e) => handleUpdatePerk(index, "title", e.target.value)}
                          placeholder="Perk Title"
                          className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-bold focus:border-tropical-gold focus:outline-none placeholder:text-slate-400"
                        />

                        <button
                          type="button"
                          onClick={() => handleRemovePerk(index)}
                          title="Remove Perk"
                          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-200 transition-all cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <input
                        type="text"
                        value={perk.desc}
                        onChange={(e) => handleUpdatePerk(index, "desc", e.target.value)}
                        placeholder="Perk details"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 focus:border-tropical-gold focus:outline-none placeholder:text-slate-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action / Call to Action Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Action Type
                  </label>
                  <select
                    value={formData.actionType}
                    onChange={(e) => handleInputChange("actionType", e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-tropical-gold focus:outline-none"
                  >
                    <option value="whatsapp">💬 WhatsApp Instant Message</option>
                    <option value="enquiry">📝 Open Booking Modal</option>
                    <option value="link">🔗 Direct Website Link</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.ctaText || ""}
                    onChange={(e) => handleInputChange("ctaText", e.target.value)}
                    placeholder="Claim 35% Off on WhatsApp"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-tropical-gold focus:outline-none placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    WhatsApp Message / Target
                  </label>
                  <input
                    type="text"
                    value={formData.actionTarget || ""}
                    onChange={(e) => handleInputChange("actionTarget", e.target.value)}
                    placeholder="Default message when clicked"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-tropical-gold focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

            </form>
          ) : (
            /* LIVE PREVIEW PANE */
            <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xl space-y-6">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt={formData.title || "Preview"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-amber-300 text-amber-800 text-xs font-bold shadow-xs">
                    {formData.badge}
                  </span>
                  <span className="text-white text-xs bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    Valid: {formatDateDisplay(formData.validUntil)}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-amber-700 font-black text-sm tracking-wider uppercase">
                  {formData.discountTag} {formData.promoCode ? `• Code: ${formData.promoCode}` : ""}
                </span>
                <h2 className="text-2xl font-heading font-black text-slate-900 mt-1">
                  {formData.title || "Your Promotion Title"}
                </h2>
                <p className="text-slate-600 text-sm font-semibold mt-0.5">
                  {formData.subtitle || "Promotion subtitle highlights"}
                </p>
                <p className="text-slate-500 text-sm font-normal mt-3 leading-relaxed">
                  {formData.description || "Description preview will appear here..."}
                </p>
              </div>

              {formData.highlights && formData.highlights.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">✨ What&apos;s Included:</p>
                  <ul className="space-y-1.5">
                    {formData.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                        <span className="text-amber-600 font-bold">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.vipPerks && formData.vipPerks.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-2.5">
                  <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">👑 VIP Concierge Perks:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {formData.vipPerks.map((perk, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white border border-amber-200/60 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-deep-navy">
                          <span>{getPerkEmoji(perk.icon)}</span>
                          <span>{perk.title}</span>
                        </div>
                        {perk.desc && (
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{perk.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                className="w-full bg-gradient-to-r from-amber-400 via-tropical-gold to-yellow-400 text-deep-navy font-black py-3.5 px-6 rounded-full text-sm uppercase tracking-wider shadow-md shadow-amber-500/20"
              >
                {formData.ctaText || "Claim Offer"}
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
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
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-tropical-gold to-yellow-400 hover:from-amber-300 text-deep-navy shadow-md shadow-amber-500/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? "⏳ Saving..." : formData.id ? "💾 Save Changes" : "✨ Publish Promotion"}
          </button>
        </div>

      </div>
    </div>
  );
}
