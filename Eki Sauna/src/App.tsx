import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { MemberCardPage } from "./components/CustomerPages/MemberCardPage";
import { CounterPOSView } from "./components/CounterPOSView";
import { MarketingStudioView } from "./components/MarketingStudioView";
import { OwnerFinanceDashboardView } from "./components/OwnerFinanceDashboardView";
import { 
  INITIAL_MEMBER, 
  INITIAL_MY_VOUCHERS, 
  INITIAL_MARKETING_CAMPAIGNS, 
  INITIAL_POS_TRANSACTIONS 
} from "./mockData";
import type { 
  CustomerVoucher, 
  MarketingCampaign, 
  POSTransaction 
} from "./mockData";
import { Sparkles, Layers, ChevronDown, ChevronUp } from "lucide-react";

export function App() {
  const [currentView, setCurrentView] = useState<"landing" | "member" | "pos" | "marketing" | "finance">(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view");
    if (viewParam === "member") return "member";
    if (viewParam === "pos") return "pos";
    if (viewParam === "marketing") return "marketing";
    if (viewParam === "finance") return "finance";
    return "landing";
  });

  const [showNavSwitcher, setShowNavSwitcher] = useState(false);
  const [member] = useState(INITIAL_MEMBER);
  const [myVouchers, setMyVouchers] = useState<CustomerVoucher[]>(INITIAL_MY_VOUCHERS);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(INITIAL_MARKETING_CAMPAIGNS);
  const [transactions, setTransactions] = useState<POSTransaction[]>(INITIAL_POS_TRANSACTIONS);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get("view");
      if (viewParam === "member") setCurrentView("member");
      else if (viewParam === "pos") setCurrentView("pos");
      else if (viewParam === "marketing") setCurrentView("marketing");
      else if (viewParam === "finance") setCurrentView("finance");
      else setCurrentView("landing");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const changeView = (view: "landing" | "member" | "pos" | "marketing" | "finance") => {
    setCurrentView(view);
    const url = new URL(window.location.href);
    if (view === "landing") {
      url.searchParams.delete("view");
    } else {
      url.searchParams.set("view", view);
    }
    window.history.pushState({}, "", url.toString());
  };

  const handleCompleteTransaction = (newTx: POSTransaction, usedVoucherId?: string) => {
    setTransactions((prev) => [newTx, ...prev]);
    if (usedVoucherId) {
      setMyVouchers((prev) =>
        prev.map((v) => (v.id === usedVoucherId ? { ...v, status: "USED" } : v))
      );
    }
  };

  const handleCreateCampaign = (newCamp: MarketingCampaign) => {
    setCampaigns((prev) => [newCamp, ...prev]);
  };

  const handleToggleCampaignStatus = (campaignId: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaignId
          ? { ...c, isActive: !c.isActive }
          : c
      )
    );
  };

  const handlePushVoucherToCustomer = (voucher: CustomerVoucher) => {
    setMyVouchers((prev) => [voucher, ...prev]);
  };

  return (
    <div className="relative min-h-screen bg-[#08080A] text-zinc-100 font-thai">
      
      {/* Quick View Switcher floating pill */}
      <div className="fixed top-20 right-4 z-50 flex flex-col items-end">
        <button
          onClick={() => setShowNavSwitcher(!showNavSwitcher)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#12110D]/90 border border-[#D4AF37]/50 text-[#F3E5AB] text-xs font-serif-luxury tracking-wider shadow-lg hover:border-[#F3E5AB] transition-all backdrop-blur-md cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>View: {currentView.toUpperCase()}</span>
          {showNavSwitcher ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showNavSwitcher && (
          <div className="mt-2 w-48 rounded-md bg-[#121217]/95 border border-[#D4AF37]/40 shadow-2xl p-1.5 flex flex-col gap-1 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
                changeView("landing");
                setShowNavSwitcher(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                currentView === "landing"
                  ? "bg-[#D4AF37] text-black font-bold"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <span>🏮 EKI Landing Page</span>
              {currentView === "landing" && <Sparkles className="w-3 h-3" />}
            </button>

            <button
              onClick={() => {
                changeView("member");
                setShowNavSwitcher(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                currentView === "member"
                  ? "bg-[#D4AF37] text-black font-bold"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <span>💳 Member Card / CRM</span>
              {currentView === "member" && <Sparkles className="w-3 h-3" />}
            </button>

            <button
              onClick={() => {
                changeView("pos");
                setShowNavSwitcher(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                currentView === "pos"
                  ? "bg-[#D4AF37] text-black font-bold"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <span>🖥️ Counter POS</span>
              {currentView === "pos" && <Sparkles className="w-3 h-3" />}
            </button>

            <button
              onClick={() => {
                changeView("marketing");
                setShowNavSwitcher(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                currentView === "marketing"
                  ? "bg-[#D4AF37] text-black font-bold"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <span>🎨 Marketing Studio</span>
              {currentView === "marketing" && <Sparkles className="w-3 h-3" />}
            </button>

            <button
              onClick={() => {
                changeView("finance");
                setShowNavSwitcher(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                currentView === "finance"
                  ? "bg-[#D4AF37] text-black font-bold"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <span>📊 Owner Finance</span>
              {currentView === "finance" && <Sparkles className="w-3 h-3" />}
            </button>
          </div>
        )}
      </div>

      {/* Render Selected View */}
      {currentView === "landing" && (
        <LandingPage onNavigateToCRM={() => changeView("member")} />
      )}

      {currentView === "member" && (
        <main className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col items-center justify-start">
          <MemberCardPage member={member} />
        </main>
      )}

      {currentView === "pos" && (
        <CounterPOSView
          currentMember={member}
          myVouchers={myVouchers}
          onCompleteTransaction={handleCompleteTransaction}
        />
      )}

      {currentView === "marketing" && (
        <MarketingStudioView
          campaigns={campaigns}
          onCreateCampaign={handleCreateCampaign}
          onToggleStatus={handleToggleCampaignStatus}
          onPushToCustomer={handlePushVoucherToCustomer}
        />
      )}

      {currentView === "finance" && (
        <OwnerFinanceDashboardView transactions={transactions} />
      )}

    </div>
  );
}

export default App;
