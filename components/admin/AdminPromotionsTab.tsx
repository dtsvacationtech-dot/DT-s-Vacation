"use client";

import { getApiUrl } from "@/lib/api";

import { useState } from "react";
import Image from "next/image";
import { ExtendedPromotion } from "@/lib/types";
import PromotionEditorModal, { formatDateDisplay } from "./PromotionEditorModal";
import { isDateExpired } from "@/lib/dateUtils";
import { useToast } from "./Toast";

interface AdminPromotionsTabProps {
  promotions: ExtendedPromotion[];
  onRefresh: () => void;
}

export default function AdminPromotionsTab({ promotions, onRefresh }: AdminPromotionsTabProps) {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingPromo, setEditingPromo] = useState<ExtendedPromotion | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter promotions
  const filteredPromos = promotions.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.serviceType === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.discountTag?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.promoCode?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Toggle Active Status
  const handleToggle = async (promo: ExtendedPromotion) => {
    const newStatus = !promo.active;
    try {
      const res = await fetch(getApiUrl("/api/admin/promotions"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: promo.id, action: "toggle", active: newStatus }),
      });

      if (res.ok) {
        showToast(
          `Promotion "${promo.title}" is now ${newStatus ? "ACTIVE & LIVE on site" : "HIDDEN"}.`,
          newStatus ? "success" : "info"
        );
        onRefresh();
      } else {
        showToast("Failed to update status.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    }
  };

  // Delete Promotion
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(getApiUrl(`/api/admin/promotions?id=${id}`), {
        method: "DELETE",
      });

      if (res.ok) {
        showToast(`Promotion "${title}" deleted successfully.`, "success");
        onRefresh();
      } else {
        showToast("Failed to delete promotion.", "error");
      }
    } catch {
      showToast("Network error deleting promotion.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // Check Expiration
  const getExpirationStatus = (promo: ExtendedPromotion) => {
    if (!promo.active) return { label: "Draft / Hidden", color: "bg-slate-100 text-slate-600 border-slate-200" };
    if (isDateExpired(promo.validUntil)) {
      return { label: "Expired", color: "bg-rose-50 text-rose-700 border-rose-200" };
    }
    return { label: "Live & Active", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {["all", "hotels", "cruises", "tours", "wedding", "corporate"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy font-bold border-amber-400 shadow-sm"
                  : "bg-slate-100/80 text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-200/60"
              }`}
            >
              {cat === "all" ? "🌟 All Deals" : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search promotions..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-tropical-gold focus:bg-white focus:outline-none transition-all"
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* New Promotion Button */}
          <button
            onClick={() => {
              setEditingPromo(null);
              setIsEditorOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-tropical-gold to-yellow-400 text-deep-navy shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>+ Create Offer</span>
          </button>
        </div>
      </div>

      {/* Promotions Cards Grid */}
      {filteredPromos.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-4xl mb-3">🌴</p>
          <h4 className="text-lg font-bold text-slate-900 mb-1">No Promotions Found</h4>
          <p className="text-xs text-slate-500 mb-4">
            {searchQuery ? "Try changing your search query or category." : "Start by creating your first special promotional offer."}
          </p>
          <button
            onClick={() => {
              setEditingPromo(null);
              setIsEditorOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy shadow-sm cursor-pointer"
          >
            + Create New Offer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromos.map((promo) => {
            const status = getExpirationStatus(promo);
            return (
              <div
                key={promo.id}
                className="group relative rounded-3xl bg-white border border-slate-200/80 hover:border-amber-400/60 hover:shadow-lg transition-all duration-300 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Flyer Image Header */}
                  <div className="relative w-full h-48 bg-slate-100">
                    <Image
                      src={promo.image || "/images/hero_hotels.webp"}
                      alt={promo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-deep-navy border border-slate-200/80 backdrop-blur-md shadow-xs">
                        {promo.serviceType}
                      </span>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border backdrop-blur-md ${status.color}`}>
                        ● {status.label}
                      </span>
                    </div>

                    {/* Bottom Flyer Info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <span className="bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy px-2.5 py-0.5 rounded-md text-xs font-black tracking-wide uppercase shadow-xs">
                        {promo.discountTag}
                      </span>
                      {promo.validUntil && (
                        <span className="text-[11px] text-slate-900 bg-white/95 px-2 py-0.5 rounded font-semibold backdrop-blur-sm border border-slate-200/80">
                          Until: {formatDateDisplay(promo.validUntil)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="text-slate-900 font-heading font-bold text-base line-clamp-1 group-hover:text-amber-700 transition-colors">
                        {promo.title}
                      </h4>
                      <p className="text-slate-500 text-xs line-clamp-1 mt-0.5 font-medium">
                        {promo.subtitle}
                      </p>
                    </div>

                    <p className="text-slate-600 text-xs line-clamp-2 font-normal leading-relaxed">
                      {promo.description}
                    </p>

                    {promo.promoCode && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50/80 border border-amber-200/80 text-xs font-mono text-amber-900 font-semibold">
                        <span>Code:</span>
                        <span className="font-bold">{promo.promoCode}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom Controls */}
                <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-2">
                  {/* Quick Toggle Switch */}
                  <button
                    onClick={() => handleToggle(promo)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      promo.active
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    <span>{promo.active ? "🟢 Live" : "⚪ Hidden"}</span>
                  </button>

                  {/* Edit & Delete Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingPromo(promo);
                        setIsEditorOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer shadow-2xs"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => handleDelete(promo.id, promo.title)}
                      disabled={deletingId === promo.id}
                      className="p-1.5 rounded-xl text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
                      title="Delete promotion"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Editor Modal */}
      {isEditorOpen && (
        <PromotionEditorModal
          isOpen={isEditorOpen}
          initialPromotion={editingPromo}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingPromo(null);
          }}
          onSaved={() => {
            onRefresh();
          }}
        />
      )}
    </div>
  );
}
