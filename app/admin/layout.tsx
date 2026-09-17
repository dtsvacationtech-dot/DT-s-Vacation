import type { Metadata } from "next";
import { ToastProvider } from "@/components/admin/Toast";

export const metadata: Metadata = {
  title: "Agency Suite | DT's Vacation & Travel Ltd.",
  description: "Administrative control portal for DT's Vacation & Travel Ltd.",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-body selection:bg-tropical-gold selection:text-deep-navy relative overflow-x-hidden">
        {/* Subtle Ambient Executive Lighting */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-amber-400/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="fixed top-20 left-0 w-[500px] h-[500px] bg-sky-400/[0.03] rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-400/[0.02] rounded-full blur-[150px] pointer-events-none -z-10" />
        {children}
      </div>
    </ToastProvider>
  );
}
