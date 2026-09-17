"use client";

import { getApiUrl, getAuthHeaders, clearAdminToken } from "@/lib/api";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
    try {
      // 1. Verify session
      const authRes = await fetch(getApiUrl("/api/admin/auth/me"), {
        credentials: "include",
        headers: getAuthHeaders(),
      });
      if (!authRes.ok) {
        clearAdminToken();
        window.location.href = "/admin/login/";
        return;
      }
      setIsAuthenticated(true);

      // 2. Fetch promotions, enquiries, subscribers, and audit logs in parallel with no-store
      const headers = getAuthHeaders();
      const [promoRes, enqRes, subRes, auditRes] = await Promise.all([
        fetch(getApiUrl(`/api/admin/promotions?_t=${Date.now()}`), { cache: "no-store", credentials: "include", headers }),
        fetch(getApiUrl(`/api/admin/enquiries?_t=${Date.now()}`), { cache: "no-store", credentials: "include", headers }),
        fetch(getApiUrl(`/api/admin/subscribers?_t=${Date.now()}`), { cache: "no-store", credentials: "include", headers }),
        fetch(getApiUrl(`/api/admin/audit?_t=${Date.now()}`), { cache: "no-store", credentials: "include", headers }),
      ]);

      if (promoRes.ok) {
        const pJson = await promoRes.json();
        setPromotions(pJson.promotions || []);
      }

      if (enqRes.ok) {
        const eJson = await enqRes.json();
        setEnquiries(eJson.enquiries || []);
      }

      if (subRes.ok) {
        const sJson = await subRes.json();
        setSubscribers(sJson.subscribers || []);
      }

      if (auditRes.ok) {
        const aJson = await auditRes.json();
        setAuditLogs(aJson.auditLogs || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      showToast("Error loading dashboard data.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [router, showToast]);

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

  if (!isAuthenticated) return null;

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
