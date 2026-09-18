"use client";

import { adminFetch, clearAdminToken, getAdminToken } from "@/lib/api";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminOverviewTab from "@/components/admin/AdminOverviewTab";
import AdminPromotionsTab from "@/components/admin/AdminPromotionsTab";
import AdminEnquiriesTab from "@/components/admin/AdminEnquiriesTab";
import AdminSubscribersTab from "@/components/admin/AdminSubscribersTab";
import AdminBroadcastTab from "@/components/admin/AdminBroadcastTab";
import AdminSettingsTab from "@/components/admin/AdminSettingsTab";
import PromotionEditorModal from "@/components/admin/PromotionEditorModal";
import { ExtendedPromotion, EnquiryRecord, SubscriberRecord, BroadcastLogRecord, SecurityAuditRecord } from "@/lib/types";
import { useToast } from "@/components/admin/Toast";

export default function AdminDashboardPage() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Data Store States
  const [promotions, setPromotions] = useState<ExtendedPromotion[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>([]);
  const [broadcastLogs, setBroadcastLogs] = useState<BroadcastLogRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<SecurityAuditRecord[]>([]);

  // Quick Modal State
  const [isQuickPromoOpen, setIsQuickPromoOpen] = useState(false);

  // Fetch all admin data
  const fetchData = useCallback(async () => {
    // 0. Immediate check: If no token exists in browser, redirect to login immediately
    const token = getAdminToken();
    if (!token && typeof window !== "undefined") {
      window.location.href = "/admin/login/";
      return;
    }

    try {
      // 1. Verify session with backend (automatic failover if DNS issue occurs)
      const authRes = await adminFetch("/api/admin/auth/me");
      if (!authRes.ok) {
        clearAdminToken();
        window.location.href = "/admin/login/";
        return;
      }
      setIsAuthenticated(true);

      // 2. Fetch promotions, enquiries, subscribers, audit logs, and broadcast logs in parallel
      const [promoRes, enqRes, subRes, auditRes, broadcastRes] = await Promise.all([
        adminFetch(`/api/admin/promotions?_t=${Date.now()}`, { cache: "no-store" }),
        adminFetch(`/api/admin/enquiries?_t=${Date.now()}`, { cache: "no-store" }),
        adminFetch(`/api/admin/subscribers?_t=${Date.now()}`, { cache: "no-store" }),
        adminFetch(`/api/admin/audit?_t=${Date.now()}`, { cache: "no-store" }),
        adminFetch(`/api/admin/broadcast?_t=${Date.now()}`, { cache: "no-store" }),
      ]);

      if (promoRes && promoRes.ok) {
        const pJson = await promoRes.json();
        setPromotions(pJson.promotions || []);
      }

      if (enqRes && enqRes.ok) {
        const eJson = await enqRes.json();
        setEnquiries(eJson.enquiries || []);
      }

      if (subRes && subRes.ok) {
        const sJson = await subRes.json();
        setSubscribers(sJson.subscribers || []);
      }

      if (auditRes && auditRes.ok) {
        const aJson = await auditRes.json();
        setAuditLogs(aJson.auditLogs || []);
      }

      if (broadcastRes && broadcastRes.ok) {
        const bJson = await broadcastRes.json();
        setBroadcastLogs(bJson.logs || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      const token = getAdminToken();
      if (!token) {
        window.location.href = "/admin/login/";
        return;
      }
      showToast("Error connecting to Agency Suite. Retrying or check connection.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const unreadLeadsCount = enquiries.filter((e) => e.status === "new").length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-slate-800 p-4">
        <div className="relative w-14 h-14 mb-4">
          <div className="w-14 h-14 rounded-full border-4 border-amber-200 border-t-tropical-gold animate-spin shadow-md" />
        </div>
        <p className="text-xs font-bold text-deep-navy tracking-widest uppercase">
          Loading DT&apos;s Agency Suite...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-slate-800 p-6 text-center">
        <div className="w-16 h-16 mb-4 rounded-2xl bg-[#000C1C] border border-amber-300/40 flex items-center justify-center shadow-lg p-2.5">
          <Image
            src="/images/logo.webp"
            alt="DT's Vacation"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <h2 className="text-xl font-heading font-black text-slate-900 mb-2">
          Administrator Authentication Required
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mb-6">
          You must be signed in to access DT&apos;s Vacation Agency Suite.
        </p>
        <a
          href="/admin/login/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-tropical-gold text-deep-navy font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
        >
          <span>Go to Administrator Login →</span>
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900">
      {/* Admin Navbar */}
      <AdminNavbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        unreadLeadsCount={unreadLeadsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {activeTab === "overview" && (
          <AdminOverviewTab
            promotions={promotions}
            enquiries={enquiries}
            subscribers={subscribers}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenNewPromo={() => setIsQuickPromoOpen(true)}
          />
        )}

        {activeTab === "promotions" && (
          <AdminPromotionsTab
            promotions={promotions}
            onRefresh={fetchData}
          />
        )}

        {activeTab === "enquiries" && (
          <AdminEnquiriesTab
            enquiries={enquiries}
            promotions={promotions}
            onRefresh={fetchData}
          />
        )}

        {activeTab === "subscribers" && (
          <AdminSubscribersTab
            subscribers={subscribers}
            onRefresh={fetchData}
            onNavigateToBroadcast={() => setActiveTab("broadcast")}
          />
        )}

        {activeTab === "broadcast" && (
          <AdminBroadcastTab
            promotions={promotions}
            subscribers={subscribers}
            enquiries={enquiries}
            broadcastLogs={broadcastLogs}
            onRefresh={fetchData}
          />
        )}

        {activeTab === "settings" && (
          <AdminSettingsTab
            auditLogs={auditLogs}
            onRefresh={fetchData}
          />
        )}
      </main>

      {/* Quick Promotion Creator Modal */}
      {isQuickPromoOpen && (
        <PromotionEditorModal
          isOpen={isQuickPromoOpen}
          onClose={() => setIsQuickPromoOpen(false)}
          onSaved={() => {
            fetchData();
            setActiveTab("promotions");
          }}
        />
      )}
    </div>
  );
}
