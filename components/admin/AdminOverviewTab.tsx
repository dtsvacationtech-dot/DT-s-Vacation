"use client";

import { ExtendedPromotion, EnquiryRecord, SubscriberRecord } from "@/lib/types";

interface AdminOverviewTabProps {
  promotions: ExtendedPromotion[];
  enquiries: EnquiryRecord[];
  subscribers: SubscriberRecord[];
  onNavigateTab: (tabId: string) => void;
  onOpenNewPromo: () => void;
}

export default function AdminOverviewTab({
  promotions,
  enquiries,
  subscribers,
  onNavigateTab,
  onOpenNewPromo,
}: AdminOverviewTabProps) {
  const activePromosCount = promotions.filter((p) => p.active).length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;
  const bookedCount = enquiries.filter((e) => e.status === "booked").length;

  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#000C1C] via-[#001D40] to-[#002D62] border border-amber-400/30 p-6 sm:p-8 shadow-xl shadow-slate-900/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-widest border border-amber-400/40">
              <span>👑 VIP Agency Suite</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Welcome back, Denis &amp; DT&apos;s Travel Team
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
              Manage client inquiries, update seasonal specials, send direct customer replies, and launch targeted promotional broadcasts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenNewPromo}
              className="px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-tropical-gold to-yellow-400 text-deep-navy shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              + New Special Offer
            </button>
            <button
              onClick={() => onNavigateTab("broadcast")}
              className="px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
            >
              📢 Email Broadcast
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: New Leads */}
        <div
          onClick={() => onNavigateTab("enquiries")}
          className="group p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-amber-400/60 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Inquiries</span>
            <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-lg border border-rose-200 group-hover:scale-110 transition-transform">
              🚨
            </div>
          </div>
          <h3 className="text-3xl font-heading font-black text-slate-900 mt-3">{newEnquiriesCount}</h3>
          <p className="text-xs text-rose-600 font-semibold mt-1">
            {newEnquiriesCount > 0 ? "Requires attention" : "All caught up"}
          </p>
        </div>

        {/* Card 2: Total Enquiries */}
        <div
          onClick={() => onNavigateTab("enquiries")}
          className="group p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-amber-400/60 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Leads</span>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center text-lg border border-sky-200 group-hover:scale-110 transition-transform">
              📥
            </div>
          </div>
          <h3 className="text-3xl font-heading font-black text-slate-900 mt-3">{enquiries.length}</h3>
          <p className="text-xs text-slate-500 mt-1">{bookedCount} confirmed bookings</p>
        </div>

        {/* Card 3: Active Promotions */}
        <div
          onClick={() => onNavigateTab("promotions")}
          className="group p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-amber-400/60 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Promotions</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-lg border border-amber-200 group-hover:scale-110 transition-transform">
              🔥
            </div>
          </div>
          <h3 className="text-3xl font-heading font-black text-amber-600 mt-3">{activePromosCount}</h3>
          <p className="text-xs text-slate-500 mt-1">{promotions.length} total campaigns</p>
        </div>

        {/* Card 4: Subscribers */}
        <div
          onClick={() => onNavigateTab("subscribers")}
          className="group p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-amber-400/60 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Newsletter Subs</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-lg border border-emerald-200 group-hover:scale-110 transition-transform">
              📬
            </div>
          </div>
          <h3 className="text-3xl font-heading font-black text-emerald-700 mt-3">{subscribers.length}</h3>
          <p className="text-xs text-slate-500 mt-1">Ready for broadcast</p>
        </div>

      </div>

      {/* Two Column Section: Recent Leads & Active Promotions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Inquiries List (7 cols) */}
        <div className="lg:col-span-7 space-y-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-heading font-black text-slate-900">Recent Customer Inquiries</h4>
              <p className="text-xs text-slate-500">Latest travel and booking requests</p>
            </div>
            <button
              onClick={() => onNavigateTab("enquiries")}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline cursor-pointer"
            >
              View All ({enquiries.length}) →
            </button>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No recent inquiries yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:border-amber-300 hover:bg-amber-50/20 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100/70 flex items-center justify-center text-amber-800 font-bold border border-amber-200">
                      {(enquiry.firstName || enquiry.name || "T").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {enquiry.firstName || enquiry.name} {enquiry.lastName || ""}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {enquiry.serviceType} &bull; {enquiry.destination || "Jamaica"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        enquiry.status === "new"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : enquiry.status === "contacted"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      {enquiry.status}
                    </span>
                    <button
                      onClick={() => onNavigateTab("enquiries")}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200/80 hover:bg-slate-100 text-slate-700 transition-all cursor-pointer shadow-2xs"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Promotions Glance (5 cols) */}
        <div className="lg:col-span-5 space-y-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-heading font-black text-slate-900">Active Promotions</h4>
              <p className="text-xs text-slate-500">Featured deals currently shown on website</p>
            </div>
            <button
              onClick={() => onNavigateTab("promotions")}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline cursor-pointer"
            >
              Manage →
            </button>
          </div>

          <div className="space-y-3">
            {promotions
              .filter((p) => p.active)
              .slice(0, 3)
              .map((promo) => (
                <div
                  key={promo.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:border-amber-300 hover:bg-amber-50/20 transition-all flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[9px] uppercase font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded border border-amber-200">
                      {promo.badge}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">{promo.title}</h5>
                    <p className="text-[11px] text-slate-500">{promo.discountTag}</p>
                  </div>

                  <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 whitespace-nowrap">
                    ● Live
                  </span>
                </div>
              ))}
          </div>

          <button
            onClick={onOpenNewPromo}
            className="w-full py-3 rounded-2xl text-xs font-bold bg-amber-50/60 hover:bg-amber-100/70 text-amber-800 border border-amber-300/80 hover:border-amber-400 transition-all cursor-pointer text-center block shadow-2xs"
          >
            + Create Another Promotion
          </button>
        </div>

      </div>
    </div>
  );
}
