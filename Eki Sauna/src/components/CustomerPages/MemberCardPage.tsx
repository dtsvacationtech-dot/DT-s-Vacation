import { useState, useEffect } from "react";
import type { FC } from "react";
import { 
  Crown, 
  ChevronRight, 
  X, 
  CheckCircle2,
  Info,
  ShieldCheck
} from "lucide-react";
import { EVoucherShopPage } from "./EVoucherShopPage";
import { PromotionPage } from "./PromotionPage";
import confetti from "canvas-confetti";
import { QRCodeSVG } from "qrcode.react";
import type { Member } from "../../mockData";

export interface VoucherItem {
  id: string;
  title: string;
  description: string;
  expireDate: string;
  image: string;
  badgeType: "percent" | "gift";
  badgeValue?: string;
  status: "ACTIVE" | "EXPIRED";
}

interface RewardItem {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  image: string;
  badgeType: "percent" | "gift";
  badgeValue?: string;
}

interface Props {
  member?: Member;
}

// Tier Configuration for Progression
const TIERS_CONFIG = {
  ECO: {
    name: "ECO",
    label: "ECO",
    slogan: "เริ่มต้นความผ่อนคลายกับ EKI",
    minPoints: 0,
    nextTier: "SILVER",
    nextThreshold: 3000,
    cardImage: "/images/card_eco_member.webp"
  },
  SILVER: {
    name: "SILVER",
    label: "SILVER",
    slogan: "สัมผัสความพิเศษระดับ Silver",
    minPoints: 3000,
    nextTier: "GOLD",
    nextThreshold: 8000,
    cardImage: "/images/card_silver_member.webp"
  },
  GOLD: {
    name: "GOLD",
    label: "GOLD VIP",
    slogan: "เอกสิทธิ์เหนือระดับสำหรับ Gold VIP",
    minPoints: 8000,
    nextTier: "PLATINUM",
    nextThreshold: 20000,
    cardImage: "/images/card_gold_member.webp"
  },
  PLATINUM: {
    name: "PLATINUM",
    label: "PLATINUM VIP",
    slogan: "ระดับเกียรติยศสูงสุดของ EKI",
    minPoints: 20000,
    nextTier: null,
    nextThreshold: 20000,
    cardImage: "/images/card_platinum_member.webp"
  }
};

export const MemberCardPage: FC<Props> = ({ member }) => {
  const [activeTab, setActiveTab] = useState<"vouchers" | "redeem">("vouchers");
  
  // Dual-Ledger Points System:
  // 1. tierPoints: Accumulated points for Tier Upgrade (NEVER drops on redemption)
  // 2. redeemablePoints: Balance for claiming rewards (drops on redemption)
  const [tierPoints] = useState(486);
  const [redeemablePoints, setRedeemablePoints] = useState(member?.points ?? 486);
  
  // Dynamically compute tier from tierPoints:
  const currentTierKey: "ECO" | "SILVER" | "GOLD" | "PLATINUM" = 
    tierPoints >= 20000 ? "PLATINUM" :
    tierPoints >= 8000 ? "GOLD" :
    tierPoints >= 3000 ? "SILVER" : "ECO";
  const [memberName, setMemberName] = useState(member?.name ?? "ธนภัทร ศรีอุฑารวงศ์");
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(member?.name ?? "ธนภัทร ศรีอุฑารวงศ์");

  // QR & Modals
  const [qrCounter, setQrCounter] = useState(59);
  const [showFullQR, setShowFullQR] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);

  useEffect(() => {
    const rawSearch = window.location.search;
    const rawHash = window.location.hash;
    const fullUrl = window.location.href;
    const path = window.location.pathname.toLowerCase();

    const params = new URLSearchParams(rawSearch);
    let pageParam = params.get("page") || params.get("tab") || params.get("action") || params.get("route");

    // Handle LINE LIFF encoded state e.g. ?liff.state=%3Fpage%3Dshop or ?liff.state=/shop
    const liffState = params.get("liff.state");
    if (liffState) {
      try {
        const decodedState = decodeURIComponent(liffState);
        const stateParams = new URLSearchParams(decodedState.startsWith("?") ? decodedState : `?${decodedState}`);
        pageParam = pageParam || stateParams.get("page") || stateParams.get("tab") || stateParams.get("action");
        if (decodedState.includes("shop") || decodedState.includes("voucher") || decodedState.includes("buy")) {
          pageParam = "shop";
        }
      } catch (e) {
        console.error("Error decoding LIFF state", e);
      }
    }

    if (
      pageParam === "shop" || 
      pageParam === "voucher" || 
      pageParam === "vouchershop" || 
      pageParam === "buy" || 
      pageParam === "buy_coupon" ||
      path.includes("/shop") ||
      path.includes("/voucher-store") ||
      rawHash.includes("shop") ||
      fullUrl.includes("page=shop")
    ) {
      setShowShop(true);
    }

    if (
      pageParam === "promotion" || 
      pageParam === "promo" || 
      pageParam === "promotions" || 
      pageParam === "deal" || 
      pageParam === "deals" || 
      path.includes("/promotion") || 
      rawHash.includes("promotion") || 
      fullUrl.includes("page=promotion")
    ) {
      setShowPromotion(true);
    }
  }, []);
  const [selectedVoucherForQR, setSelectedVoucherForQR] = useState<VoucherItem | null>(null);
  const [selectedRewardToRedeem, setSelectedRewardToRedeem] = useState<RewardItem | null>(null);
  const [redeemSuccessToast, setRedeemSuccessToast] = useState<string | null>(null);

  // Vouchers state - exact match to user mockup
  const [vouchers, setVouchers] = useState<VoucherItem[]>([
    {
      id: "v-1",
      title: "ส่วนลดค่าเข้าออนเซ็น 10%",
      description: "ลด 10% สำหรับค่าเข้าออนเซ็น\nเมื่อใช้บริการที่ EKI Onsen & Sauna\n*(ไม่ลดเพิ่มจากราคาโปรโมชั่น)",
      expireDate: "31/08/2025",
      image: "/images/coupon_onsen.webp",
      badgeType: "percent",
      badgeValue: "10%",
      status: "ACTIVE"
    },
    {
      id: "v-2",
      title: "เครื่องดื่ม Welcome Drink",
      description: "รับฟรี! เครื่องดื่ม Welcome Drink\n1 แก้ว เมื่อใช้บริการครบ 500 บาท",
      expireDate: "15/09/2025",
      image: "/images/coupon_drink.webp",
      badgeType: "gift",
      status: "ACTIVE"
    },
    {
      id: "v-3",
      title: "ส่วนลดอาหาร 10%",
      description: "ลด 10% สำหรับค่าอาหาร\nเมื่อใช้บริการที่ EKI Onsen & Sauna",
      expireDate: "15/05/2025",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=80",
      badgeType: "percent",
      badgeValue: "10%",
      status: "EXPIRED"
    }
  ]);

  // Redeem rewards catalog
  const redeemRewards: RewardItem[] = [
    {
      id: "r-1",
      title: "เครื่องดื่ม Welcome Drink 1 แก้ว",
      description: "เครื่องดื่มสมุนไพรสกัดเย็นสูตร Rehydrate ฟื้นฟูร่างกาย",
      pointsRequired: 150,
      image: "/images/coupon_drink.webp",
      badgeType: "gift"
    },
    {
      id: "r-2",
      title: "ส่วนลดค่าเข้าออนเซ็น 10%",
      description: "ลด 10% สำหรับค่าเข้า Onsen & Finnish Sauna 1 ครั้ง\n*(ไม่ลดเพิ่มจากราคาโปรโมชั่น)",
      pointsRequired: 300,
      image: "/images/coupon_onsen.webp",
      badgeType: "percent",
      badgeValue: "10%"
    },
    {
      id: "r-3",
      title: "Eki E-Voucher 100 บาท",
      description: "บัตรกำนัลแทนเงินสดมูลค่า 100 บาท สำหรับใช้บริการ Onsen & Sauna (หมดอายุ 30/11/2025)",
      pointsRequired: 450,
      image: "/images/voucher_evoucher_square.webp",
      badgeType: "percent",
      badgeValue: "100฿"
    }
  ];

  // Calculate Tier and Progression Logic
  const tierConfig = TIERS_CONFIG[currentTierKey];
  const isMaxTier = currentTierKey === "PLATINUM";

  const prevThreshold = tierConfig.minPoints;
  const nextThreshold = tierConfig.nextThreshold;
  const nextTierName = tierConfig.nextTier;

  // Percentage within current stage
  const stageRange = isMaxTier ? 1 : Math.max(1, nextThreshold - prevThreshold);
  const currentStageProgress = isMaxTier ? 100 : Math.min(100, Math.max(0, Math.round(((tierPoints - prevThreshold) / stageRange) * 100)));
  const pointsNeededForNextTier = isMaxTier ? 0 : Math.max(0, nextThreshold - tierPoints);

  // Dynamic 60s QR code refresh
  useEffect(() => {
    const timer = setInterval(() => {
      setQrCounter((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeVouchers = vouchers.filter((v) => v.status === "ACTIVE");
  const expiredVouchers = vouchers.filter((v) => v.status === "EXPIRED");

  // Handle Point Redemption - Deducts only redeemablePoints, NEVER tierPoints!
  const handleConfirmRedeem = () => {
    if (!selectedRewardToRedeem) return;
    if (redeemablePoints < selectedRewardToRedeem.pointsRequired) {
      alert("คะแนนสำหรับแลกของรางวัลไม่เพียงพอ");
      return;
    }

    // Deduct only redeemable points
    setRedeemablePoints((prev) => prev - selectedRewardToRedeem.pointsRequired);

    const newV: VoucherItem = {
      id: `v-redeemed-${Date.now()}`,
      title: selectedRewardToRedeem.title,
      description: selectedRewardToRedeem.description,
      expireDate: "30/11/2025",
      image: selectedRewardToRedeem.image,
      badgeType: selectedRewardToRedeem.badgeType,
      badgeValue: selectedRewardToRedeem.badgeValue,
      status: "ACTIVE"
    };

    setVouchers((prev) => [newV, ...prev]);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#F5D77F", "#FFF"]
    });

    const rewardTitle = selectedRewardToRedeem.title;
    setSelectedRewardToRedeem(null);
    setRedeemSuccessToast(`แลกรับ "${rewardTitle}" สำเร็จ! (แต้มเลื่อนระดับยังคงอยู่ครบ)`);
    setActiveTab("vouchers");

    setTimeout(() => {
      setRedeemSuccessToast(null);
    }, 4000);
  };

  if (showPromotion) {
    return (
      <PromotionPage 
        onBackToMember={() => setShowPromotion(false)}
        onGoToVouchers={() => {
          setShowPromotion(false);
          setActiveTab("vouchers");
        }}
        onAddPurchasedVoucher={(newV) => {
          setVouchers((prev) => [newV, ...prev]);
        }}
      />
    );
  }

  if (showShop) {
    return (
      <EVoucherShopPage 
        onBackToMember={() => setShowShop(false)}
        onGoToVouchers={() => {
          setShowShop(false);
          setActiveTab("vouchers");
        }}
        onAddPurchasedVoucher={(newV) => {
          setVouchers((prev) => [newV, ...prev]);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#050507] text-[#E0E0E0] font-['Prompt',sans-serif] flex flex-col items-center justify-start p-3 sm:p-4 select-none pb-12">
      
      {/* Mobile Screen Container */}
      <div className="w-full max-w-[390px] space-y-3.5">
        
        {/* ========================================================================= */}
        {/* 👑 TOP HEADER: EKI ONSEN & SAUNA — MEMBERSHIP — */}
        {/* ========================================================================= */}
        <div className="relative text-center pt-2 pb-1.5 border-b border-[#242018]/60">

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[14px] font-extrabold tracking-[0.22em] text-[#DEB34A] font-['Montserrat'] uppercase leading-tight">
              EKI ONSEN & SAUNA
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="h-[0.5px] w-7 bg-[#DEB34A]/50" />
              <span className="text-[9px] tracking-[0.28em] text-[#DEB34A]/90 font-semibold uppercase font-['Montserrat']">
                MEMBERSHIP
              </span>
              <span className="h-[0.5px] w-7 bg-[#DEB34A]/50" />
            </div>
            
            {/* Golden Lotus SVG Emblem */}
            <svg className="w-4 h-3 text-[#DEB34A] mt-1" viewBox="0 0 24 16" fill="currentColor">
              <path d="M12 0C11.5 3 8 7 3 9C7 10 10.5 13 12 16C13.5 13 17 10 21 9C16 7 12.5 3 12 0Z" />
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 🪪 COMPACT CARD & STAGE-BY-STAGE PROGRESSION (ECO -> SILVER -> GOLD -> PLAT) */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-3 pt-1 px-0.5">
          
          {/* Left: Compact Card with Smooth Shimmer Animation (Full Unclipped Corners) */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="relative w-[140px] aspect-[2/1] z-10 select-none flex items-center justify-center">
              {/* Dynamic Tier Aura Animation */}
              {currentTierKey === "SILVER" && <div className="aura-silver" />}
              {currentTierKey === "GOLD" && <div className="aura-gold" />}
              {currentTierKey === "PLATINUM" && <div className="aura-platinum" />}

              <img 
                src={tierConfig.cardImage} 
                alt="Member Card" 
                className="w-full h-full object-contain relative z-10"
              />
              {/* Confined Metallic Shimmer (Locked strictly inside the card surface) */}
              <div className="absolute inset-[3px] rounded-[10px] overflow-hidden pointer-events-none z-20">
                <div className="card-shimmer" />
              </div>
            </div>

            {/* Seamless Soft Golden Floor Glow (No White Artifacts) */}
            <div className="w-[128px] h-[6px] -mt-1 bg-gradient-to-b from-[#deb34a]/25 to-transparent blur-[2px] pointer-events-none rounded-full" />
          </div>

          {/* Right: Dynamic Tier Upgrade Tracker (Clean & Non-Repetitive) */}
          <div className="flex-1 min-w-0 space-y-1.5 pl-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-zinc-200">
                {isMaxTier ? "ระดับสมาชิกสูงสุด" : `เป้าหมายถัดไป: ${nextTierName}`}
              </span>
              <span className="text-[10.5px] font-mono text-[#DEB34A] font-bold">
                {currentStageProgress}%
              </span>
            </div>

            {/* Stage Progress Bar */}
            <div className="space-y-1">
              <div className="relative h-[6px] w-full bg-[#1e1e24] rounded-full overflow-hidden border border-zinc-800">
                <div 
                  className="h-full bg-gradient-to-r from-[#ECC853] via-[#D4AF37] to-[#AA820A] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-700" 
                  style={{ width: `${currentStageProgress}%` }}
                />
              </div>

              {/* Stage Endpoints */}
              <div className="flex justify-between items-center text-[9px] leading-tight text-zinc-400 font-mono">
                <span>สะสม {tierPoints.toLocaleString()} P</span>
                <span>เป้าหมาย {isMaxTier ? "สูงสุด" : `${nextThreshold.toLocaleString()} P`}</span>
              </div>
            </div>

            {/* Motivation Notice */}
            <p className="text-[10px] text-zinc-300 leading-tight pt-0.5">
              {isMaxTier ? (
                <span className="text-amber-300 font-medium">👑 คุณอยู่ในระดับสมาชิกสูงสุดแล้ว</span>
              ) : (
                <>
                  สะสมอีก <span className="text-[#DEB34A] font-bold font-mono">{pointsNeededForNextTier.toLocaleString()}</span> คะแนน เพื่อเลื่อนเป็น <span className="text-[#DEB34A] font-bold font-mono">{nextTierName}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 🔲 PROFILE & QR CODE CARD (Clean Charcoal & Gold Glow) */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-[#0d0d12] border border-[#d4af37]/45 p-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.85),0_0_18px_rgba(212,175,55,0.09)] flex items-center gap-3.5">
          
          {/* Crisp White QR Box (Real Scannable QR) */}
          <div 
            onClick={() => setShowFullQR(true)}
            className="bg-white p-1.5 rounded-xl w-[108px] h-[108px] shrink-0 flex flex-col items-center justify-center cursor-pointer shadow-inner border border-zinc-200 relative group overflow-hidden"
          >
            <QRCodeSVG
              value="https://eki-sauna.pages.dev/member/EKI313008492754"
              size={92}
              level="M"
              marginSize={0}
              fgColor="#000000"
              bgColor="#FFFFFF"
            />
          </div>

          {/* Member Details */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[#DEB34A] font-bold text-[14.5px] tracking-tight truncate">
                {memberName}
              </h3>
              <button 
                onClick={() => setIsEditingName(true)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                {/* Pencil / Edit Icon */}
                <svg className="w-3.5 h-3.5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>

            <p className="text-zinc-300 text-[11px] font-mono tracking-wide">
              รหัสสมาชิก: EKI313008492754
            </p>

            <div className="pt-0.5">
              <span className="text-[11px] text-zinc-400 block font-light">คะแนนสะสมของคุณ (แลกรางวัลได้)</span>
              <div className="flex items-baseline gap-1.5 leading-none mt-1">
                <span className="text-[26px] font-extrabold text-[#DEB34A] font-mono tracking-tight">
                  {redeemablePoints.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-[#DEB34A]">คะแนน</span>
              </div>
            </div>

            <div className="pt-1 text-[10px] text-zinc-400 leading-tight">
              <span>คะแนนจะหมดอายุในวันที่ 31/01/2027</span>
              <button 
                onClick={() => setShowExpiryModal(true)}
                className="block text-[#DEB34A]/90 hover:text-[#DEB34A] mt-0.5 font-medium cursor-pointer"
              >
                ดูวันหมดอายุทั้งหมด &gt;
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 👑 VIEW BENEFITS BUTTON (With Japanese Seigaiha Waves Watermark) */}
        {/* ========================================================================= */}
        <button
          onClick={() => setShowBenefitsModal(true)}
          className="w-full py-2.5 px-4 rounded-xl bg-[#0c0c10] border border-[#deb34a]/60 text-[#DEB34A] flex items-center justify-between hover:bg-[#15151c] active:scale-[0.99] transition-all cursor-pointer shadow-md relative overflow-hidden group"
        >
          {/* Japanese Seigaiha Traditional Wave Watermark */}
          <div className="absolute right-0 top-0 bottom-0 w-36 opacity-15 pointer-events-none flex items-center justify-end pr-2">
            <svg className="w-28 h-10 text-[#deb34a]" viewBox="0 0 100 40" fill="currentColor">
              <circle cx="20" cy="40" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="20" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="20" cy="40" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="60" cy="40" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="60" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="60" cy="40" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          
          <div className="flex items-center gap-2 font-bold text-xs tracking-wide">
            <Crown className="w-4 h-4 text-[#DEB34A]" />
            <span>ดูสิทธิประโยชน์</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#DEB34A] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* ========================================================================= */}
        {/* 🔔 SUCCESS TOAST */}
        {/* ========================================================================= */}
        {redeemSuccessToast && (
          <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{redeemSuccessToast}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 📑 SMOOTH SLIDING GOLDEN SEGMENTED TABS */}
        {/* ========================================================================= */}
        <div className="relative flex border-b border-zinc-800/90 pt-1">
          
          {/* Tab: คูปองของฉัน */}
          <button
            onClick={() => setActiveTab("vouchers")}
            className={`flex-1 pb-2.5 text-center font-bold text-xs transition-colors duration-300 relative cursor-pointer ${
              activeTab === "vouchers"
                ? "text-[#DEB34A]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span>คูปองของฉัน</span>
          </button>

          {/* Tab: แลกคะแนน */}
          <button
            onClick={() => setActiveTab("redeem")}
            className={`flex-1 pb-2.5 text-center font-bold text-xs transition-colors duration-300 relative cursor-pointer ${
              activeTab === "redeem"
                ? "text-[#DEB34A]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span>แลกคะแนน</span>
          </button>

          {/* Sliding Luxury Golden Indicator Bar with Soft Ambient Glow */}
          <div
            className="absolute bottom-0 h-[2.5px] w-1/2 bg-gradient-to-r from-[#F5D77F] via-[#DEB34A] to-[#B38728] shadow-[0_0_14px_rgba(222,179,74,0.9)] rounded-full transition-transform duration-300 ease-out"
            style={{
              transform: activeTab === "vouchers" ? "translateX(0%)" : "translateX(100%)"
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* 🎟️ TAB 1: คูปองของฉัน (MY VOUCHERS) */}
        {/* ========================================================================= */}
        {activeTab === "vouchers" && (
          <div className="space-y-4 pt-1 animate-in fade-in slide-in-from-left-2 duration-300 ease-out">
            
            {/* Section: คูปองที่ใช้ได้ */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#DEB34A]">
                {/* Yellow Ticket Icon Box */}
                <div className="w-5 h-4 rounded bg-[#DEB34A] flex items-center justify-center text-black">
                  <span className="text-[10px] font-mono font-bold leading-none">%</span>
                </div>
                <span>คูปองที่ใช้ได้</span>
                <span className="w-4 h-4 rounded-full bg-[#DEB34A] text-black text-[10px] flex items-center justify-center font-bold font-mono">
                  {activeVouchers.length}
                </span>
              </div>

              {activeVouchers.map((voucher) => (
                <div 
                  key={voucher.id}
                  className="relative rounded-xl bg-[#0c0c10] border border-[#deb34a]/50 flex items-stretch overflow-hidden shadow-md"
                >
                  {/* Left Section: Image + Info */}
                  <div className="flex-1 p-2.5 sm:p-3 flex items-center gap-2.5 min-w-0">
                    <img 
                      src={voucher.image} 
                      alt={voucher.title}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg object-cover shrink-0 border border-zinc-800" 
                    />
                    <div className="min-w-0 space-y-1 flex-1">
                      <h4 className="text-xs font-bold text-[#DEB34A] leading-snug">
                        {voucher.title}
                      </h4>
                      <p className="text-[10px] text-zinc-300 whitespace-pre-line leading-tight">
                        {voucher.description}
                      </p>
                      <div className="pt-0.5">
                        <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-black/70 text-zinc-300 border border-zinc-700 font-mono">
                          หมดอายุ {voucher.expireDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Vertical Perforated Dashed Divider */}
                  <div className="relative flex flex-col justify-between items-center py-1">
                    <div className="w-3.5 h-3.5 bg-[#050507] rounded-full -mt-3 border-b border-[#deb34a]/60" />
                    <div className="w-[1px] h-full border-r border-dashed border-[#deb34a]/60 my-1" />
                    <div className="w-3.5 h-3.5 bg-[#050507] rounded-full -mb-3 border-t border-[#deb34a]/60" />
                  </div>

                  {/* Right Section: Stub with 20% OFF / Gift + Action Button */}
                  <div className="w-[88px] sm:w-[94px] bg-gradient-to-b from-[#1a160f] to-[#0e0d0a] p-2 flex flex-col items-center justify-center text-center shrink-0 space-y-1.5">
                    {voucher.badgeType === "percent" ? (
                      <div className="text-[#DEB34A] font-['Montserrat'] leading-none">
                        <span className="block text-base font-extrabold">{voucher.badgeValue || "20%"}</span>
                        <span className="text-[9.5px] font-bold tracking-wider">OFF</span>
                      </div>
                    ) : (
                      /* Golden Gift Box Outline Icon */
                      <svg className="w-6 h-6 text-[#DEB34A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="8" width="18" height="4" rx="1" />
                        <path d="M12 8v13" />
                        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                      </svg>
                    )}

                    <button
                      onClick={() => setSelectedVoucherForQR(voucher)}
                      className="w-full py-1.5 rounded-md bg-gradient-to-r from-[#F5D77F] via-[#DEB34A] to-[#B38728] text-black font-extrabold text-[11px] hover:brightness-110 active:scale-95 transition-all shadow-xs cursor-pointer"
                    >
                      ใช้คูปอง
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Section: ใช้แล้ว/หมดอายุ */}
            {expiredVouchers.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400">
                  <div className="w-5 h-4 rounded bg-zinc-700 flex items-center justify-center text-zinc-300">
                    <span className="text-[10px] font-mono font-bold leading-none">%</span>
                  </div>
                  <span>ใช้แล้ว/หมดอายุ</span>
                  <span className="w-4 h-4 rounded-full bg-zinc-800 text-zinc-400 text-[10px] flex items-center justify-center font-mono">
                    {expiredVouchers.length}
                  </span>
                </div>

                {expiredVouchers.map((voucher) => (
                  <div 
                    key={voucher.id}
                    className="relative rounded-xl bg-[#09090d] border border-zinc-800 flex items-stretch overflow-hidden opacity-60"
                  >
                    {/* Left Info */}
                    <div className="flex-1 p-2.5 sm:p-3 flex items-center gap-2.5 min-w-0">
                      <img 
                        src={voucher.image} 
                        alt={voucher.title}
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg object-cover shrink-0 grayscale border border-zinc-800" 
                      />
                      <div className="min-w-0 space-y-1 flex-1">
                        <h4 className="text-xs font-bold text-zinc-300 leading-snug">
                          {voucher.title}
                        </h4>
                        <p className="text-[10px] text-zinc-400 whitespace-pre-line leading-tight">
                          {voucher.description}
                        </p>
                        <div className="pt-0.5">
                          <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-black/70 text-zinc-500 border border-zinc-800 font-mono">
                            หมดอายุ {voucher.expireDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Perforated Divider */}
                    <div className="relative flex flex-col justify-between items-center py-1">
                      <div className="w-3.5 h-3.5 bg-[#050507] rounded-full -mt-3 border-b border-zinc-800" />
                      <div className="w-[1px] h-full border-r border-dashed border-zinc-800 my-1" />
                      <div className="w-3.5 h-3.5 bg-[#050507] rounded-full -mb-3 border-t border-zinc-800" />
                    </div>

                    {/* Right Stub */}
                    <div className="w-[88px] sm:w-[94px] bg-[#0c0c10] p-2 flex flex-col items-center justify-center text-center shrink-0 space-y-1.5">
                      <div className="text-zinc-400 font-['Montserrat'] leading-none">
                        <span className="block text-base font-extrabold">10%</span>
                        <span className="text-[9.5px] font-bold tracking-wider">OFF</span>
                      </div>

                      <button
                        disabled
                        className="w-full py-1.5 rounded-md bg-zinc-800/90 text-zinc-500 font-medium text-[11px] cursor-not-allowed"
                      >
                        หมดอายุ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Terms */}
            <div className="pt-2 text-[9.5px] text-zinc-400 space-y-0.5">
              <p>* ส่วนลด 10% ไม่สามารถใช้ลดเพิ่มจากราคาที่ลดแล้ว หรือราคาโปรโมชั่นได้</p>
              <p>* คูปองไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้</p>
              <p>* เงื่อนไขเป็นไปตามที่บริษัทกำหนด</p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 🎁 TAB 2: แลกคะแนน (REDEEM POINTS) */}
        {/* ========================================================================= */}
        {activeTab === "redeem" && (
          <div className="space-y-3 pt-1 animate-in fade-in slide-in-from-right-2 duration-300 ease-out">
            
            {/* Points Balance Banner */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#0e0e13] border border-[#deb34a]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 block">คะแนนที่ใช้แลกได้</span>
                <span className="text-sm font-extrabold text-[#DEB34A] font-mono leading-none">
                  {redeemablePoints.toLocaleString()} คะแนน
                </span>
              </div>
            </div>

            {redeemRewards.map((reward) => {
              const canRedeem = redeemablePoints >= reward.pointsRequired;
              return (
                <div 
                  key={reward.id}
                  className="relative rounded-xl bg-[#0c0c10] border border-[#deb34a]/50 flex items-stretch overflow-hidden shadow-md"
                >
                  {/* Left Info */}
                  <div className="flex-1 p-2.5 sm:p-3 flex items-center gap-2.5 min-w-0">
                    <img 
                      src={reward.image} 
                      alt={reward.title}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg object-cover shrink-0 border border-zinc-800" 
                    />
                    <div className="min-w-0 space-y-1 flex-1">
                      <h4 className="text-xs font-bold text-[#DEB34A] leading-snug">
                        {reward.title}
                      </h4>
                      <p className="text-[10px] text-zinc-300 leading-tight">
                        {reward.description}
                      </p>
                      <div className="pt-0.5">
                        <span className="inline-block text-[9.5px] px-2 py-0.5 rounded-full bg-amber-950/40 text-amber-300 border border-amber-500/30 font-mono font-bold">
                          ใช้ {reward.pointsRequired} คะแนน
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Perforated Divider */}
                  <div className="relative flex flex-col justify-between items-center py-1">
                    <div className="w-3.5 h-3.5 bg-[#050507] rounded-full -mt-3 border-b border-[#deb34a]/60" />
                    <div className="w-[1px] h-full border-r border-dashed border-[#deb34a]/60 my-1" />
                    <div className="w-3.5 h-3.5 bg-[#050507] rounded-full -mb-3 border-t border-[#deb34a]/60" />
                  </div>

                  {/* Right Stub */}
                  <div className="w-[88px] sm:w-[94px] bg-gradient-to-b from-[#1a160f] to-[#0e0d0a] p-2 flex flex-col items-center justify-center text-center shrink-0 space-y-1.5">
                    <div className="text-xs font-extrabold text-[#DEB34A] font-mono leading-none">
                      {reward.pointsRequired} P
                    </div>

                    <button
                      onClick={() => setSelectedRewardToRedeem(reward)}
                      disabled={!canRedeem}
                      className={`w-full py-1.5 rounded-md text-[11px] font-extrabold transition-all cursor-pointer ${
                        canRedeem
                          ? "bg-gradient-to-r from-[#F5D77F] via-[#DEB34A] to-[#B38728] text-black hover:brightness-110 active:scale-95 shadow-xs"
                          : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      }`}
                    >
                      {canRedeem ? "แลกคูปอง" : "แต้มไม่พอ"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 🔍 MODAL: FULL SCREEN QR SCANNER (Tap QR or Use Voucher) */}
      {/* ========================================================================= */}
      {(showFullQR || selectedVoucherForQR) && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#101015] rounded-2xl p-5 max-w-xs w-full border border-[#deb34a]/60 text-center space-y-3.5 shadow-2xl relative">
            <button 
              onClick={() => {
                setShowFullQR(false);
                setSelectedVoucherForQR(null);
              }}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center cursor-pointer hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-mono text-[#DEB34A] bg-black/60 px-2 py-0.5 rounded border border-[#deb34a]/30">
                {selectedVoucherForQR ? selectedVoucherForQR.id : "EKI313008492754"}
              </span>
              <h3 className="font-bold text-white text-sm mt-1.5">
                {selectedVoucherForQR ? selectedVoucherForQR.title : "QR บัตรสมาชิก Eki Onsen & Sauna"}
              </h3>
              <p className="text-[10.5px] text-zinc-400 mt-0.5">
                {selectedVoucherForQR ? selectedVoucherForQR.description.replace("\n", " ") : "แสดงหน้าจอนี้ให้พนักงานที่เคาน์เตอร์สแกน"}
              </p>
            </div>

            {/* High Contrast Big Real Scannable QR */}
            <div className="bg-white p-3.5 rounded-xl w-52 h-52 mx-auto flex flex-col items-center justify-center shadow-inner border-2 border-[#deb34a]/50">
              <QRCodeSVG
                value={
                  selectedVoucherForQR
                    ? `https://eki-sauna.pages.dev/redeem?voucherId=${selectedVoucherForQR.id}&memberId=EKI313008492754&token=${qrCounter}`
                    : `https://eki-sauna.pages.dev/member/EKI313008492754?token=${qrCounter}`
                }
                size={168}
                level="H"
                marginSize={1}
                fgColor="#000000"
                bgColor="#FFFFFF"
              />
              <span className="text-[9px] font-bold text-black font-mono mt-1 tracking-wider">
                {selectedVoucherForQR ? `VOUCHER-${selectedVoucherForQR.id.toUpperCase()}` : `MEMBER-EKI313008492754`}
              </span>
            </div>

            <p className="text-[10px] text-zinc-400 font-mono">
              รหัสหมุนเวียนอัตโนมัติใน {qrCounter} วินาที
            </p>

            <button
              onClick={() => {
                setShowFullQR(false);
                setSelectedVoucherForQR(null);
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-800 text-zinc-200 text-xs font-bold hover:text-white cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 👑 MODAL: TIER BENEFITS DETAIL (EXACT MOCKUP MATCH) */}
      {showBenefitsModal && (
        <div className="fixed inset-0 bg-black/92 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-[#0b0b0e] rounded-3xl p-4 sm:p-5 max-w-[390px] w-full border border-[#deb34a]/50 space-y-3.5 relative max-h-[92vh] overflow-y-auto shadow-2xl">
            
            {/* Top Close Button (X in circle) */}
            <button 
              onClick={() => setShowBenefitsModal(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full border border-zinc-700 bg-[#16161c] text-zinc-400 flex items-center justify-center cursor-pointer hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title Header */}
            <div className="text-center pt-1 pb-1">
              <h2 className="text-[15px] font-extrabold tracking-[0.16em] text-[#DEB34A] font-['Montserrat'] uppercase leading-tight">
                MEMBERSHIP PRIVILEGES
              </h2>
              <p className="text-[11px] text-zinc-300 mt-0.5">
                สิทธิพิเศษสำหรับสมาชิก EKI
              </p>
              <div className="flex items-center justify-center gap-2 mt-1.5">
                <span className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#deb34a]/60" />
                <svg className="w-4 h-3 text-[#DEB34A]" viewBox="0 0 24 16" fill="currentColor">
                  <path d="M12 0C11.5 3 8 7 3 9C7 10 10.5 13 12 16C13.5 13 17 10 21 9C16 7 12.5 3 12 0Z" />
                </svg>
                <span className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-[#deb34a]/60" />
              </div>
            </div>

            {/* Tier Cards List */}
            <div className="space-y-3">
              
              {/* ========================================= */}
              {/* 1. ECO TIER */}
              {/* ========================================= */}
              <div className="rounded-2xl border border-[#3d3319] bg-gradient-to-b from-[#0e120d] to-[#070907] p-2.5 space-y-2 relative overflow-hidden shadow-md">
                <div className="flex justify-between items-center pl-1">
                  <span className="text-xs font-bold text-[#DEB34A]">สมาชิกระดับ ECO</span>
                  {currentTierKey === "ECO" && (
                    <span className="text-[8.5px] font-bold text-[#DEB34A] bg-[#1a170e] border border-[#deb34a]/50 px-2 py-0.5 rounded-full font-['Montserrat'] tracking-wider">
                      YOUR CURRENT TIER ✓
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Thumbnail with Metallic Shimmer Animation */}
                  <div className="relative w-[120px] aspect-[2/1] shrink-0 select-none">
                    <img 
                      src="/images/card_eco_member.webp" 
                      alt="ECO" 
                      className="w-full h-full object-contain" 
                    />
                    <div className="absolute inset-[2.5px] rounded-[8px] overflow-hidden pointer-events-none">
                      <div className="card-shimmer" />
                    </div>
                  </div>

                  {/* 3 Benefits Grid */}
                  <div className="grid grid-cols-3 gap-1.5 flex-1 text-center">
                    {/* Benefit 1 */}
                    <div className="flex flex-col items-center justify-start space-y-1">
                      <div className="w-5 h-5 rounded-full border border-[#deb34a] text-[#deb34a] text-[10px] font-bold flex items-center justify-center font-mono">
                        P
                      </div>
                      <p className="text-[8px] text-zinc-300 leading-tight">
                        สมัครฟรี<br />สะสมแต้มทุก<br />100 บาท<br />= 1 คะแนน
                      </p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="flex flex-col items-center justify-start space-y-1">
                      <svg className="w-5 h-5 text-[#deb34a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M18 8a6 6 0 0 0-9.33-5M12 2v6M2 13l6-3M16 11l6-3M10 20l4-2M10 14l4 6" />
                        <path d="M12 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
                      </svg>
                      <p className="text-[8px] text-zinc-300 leading-tight">
                        รับข่าวสาร<br />โปรโมชั่น<br />และส่วนลดลับ<br />เฉพาะสมาชิก
                      </p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="flex flex-col items-center justify-start space-y-1">
                      <svg className="w-5 h-5 text-[#deb34a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="8" width="18" height="4" rx="1" />
                        <path d="M12 8v13" />
                        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                      </svg>
                      <p className="text-[7.5px] text-zinc-300 leading-tight uppercase font-medium">
                        MEMBER<br />EXCLUSIVE<br />PROMOTIONS
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================= */}
              {/* 2. SILVER TIER */}
              {/* ========================================= */}
              <div className="rounded-2xl border border-zinc-500/40 bg-gradient-to-b from-[#141820] to-[#08090c] p-2.5 space-y-2 relative shadow-[0_0_16px_rgba(255,255,255,0.08)]">
                <div className="flex justify-between items-center pl-1">
                  <span className="text-xs font-bold text-zinc-200">สมาชิกระดับ SILVER</span>
                  {currentTierKey === "SILVER" && (
                    <span className="text-[8.5px] font-bold text-zinc-300 bg-zinc-800 border border-zinc-600 px-2 py-0.5 rounded-full font-['Montserrat'] tracking-wider">
                      YOUR CURRENT TIER ✓
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Thumbnail with Aura & Metallic Shimmer Animation */}
                  <div className="relative w-[120px] aspect-[2/1] shrink-0 select-none flex items-center justify-center">
                    {/* Silver Aura (Subtle sparkling white light) */}
                    <div className="aura-silver" />
                    <img 
                      src="/images/card_silver_member.webp" 
                      alt="SILVER" 
                      className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" 
                    />
                    <div className="absolute inset-[2.5px] rounded-[8px] overflow-hidden pointer-events-none z-20">
                      <div className="card-shimmer" />
                    </div>
                  </div>

                  {/* 2 Benefits Grid */}
                  <div className="grid grid-cols-2 gap-2 flex-1 text-center">
                    {/* Benefit 1: 5% Badge */}
                    <div className="flex flex-col items-center justify-start space-y-1">
                      <div className="w-6 h-6 rounded-full border border-dashed border-zinc-400 text-zinc-200 text-[10px] font-bold flex items-center justify-center font-mono">
                        5%
                      </div>
                      <p className="text-[8.5px] text-zinc-300 leading-tight">
                        รับส่วนลด<br />ค่าบริการปกติ 5%
                      </p>
                    </div>

                    {/* Benefit 2: Herbal Drink */}
                    <div className="flex flex-col items-center justify-start space-y-1">
                      <svg className="w-5 h-5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                        <line x1="6" y1="1" x2="6" y2="4" />
                        <line x1="10" y1="1" x2="10" y2="4" />
                        <line x1="14" y1="1" x2="14" y2="4" />
                      </svg>
                      <p className="text-[8px] text-zinc-300 leading-tight">
                        ฟรี<br /><span className="font-semibold text-zinc-200">WELCOME HERBAL DRINK</span><br />ทุกครั้งที่เข้าใช้บริการ
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================= */}
              {/* 3. GOLD VIP TIER */}
              {/* ========================================= */}
              <div className="rounded-2xl border border-[#deb34a]/60 bg-gradient-to-b from-[#221a0a] to-[#0c0a05] p-2.5 space-y-2 relative shadow-[0_0_20px_rgba(212,175,55,0.18)]">
                {/* Gold Crown Ribbon */}
                <div className="absolute top-0 right-3 w-5 h-6 bg-[#deb34a] text-black flex items-center justify-center rounded-b-sm shadow-sm z-20">
                  <Crown className="w-3 h-3" />
                </div>

                <div className="flex justify-between items-center pl-1">
                  <span className="text-xs font-bold text-[#E5BA55]">สมาชิกระดับ GOLD VIP</span>
                  {currentTierKey === "GOLD" && (
                    <span className="text-[8.5px] font-bold text-[#DEB34A] bg-[#1a170e] border border-[#deb34a]/50 px-2 py-0.5 rounded-full font-['Montserrat'] tracking-wider mr-6">
                      YOUR CURRENT TIER ✓
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Thumbnail with Aura & Metallic Shimmer Animation */}
                  <div className="relative w-[120px] aspect-[2/1] shrink-0 select-none flex items-center justify-center">
                    {/* Gold Aura (Medium warm gold pulse) */}
                    <div className="aura-gold" />
                    <img 
                      src="/images/card_gold_member.webp" 
                      alt="GOLD" 
                      className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]" 
                    />
                    <div className="absolute inset-[2.5px] rounded-[8px] overflow-hidden pointer-events-none z-20">
                      <div className="card-shimmer" />
                    </div>
                  </div>

                  {/* 3 Benefits Grid */}
                  <div className="grid grid-cols-3 gap-1.5 flex-1 text-center">
                    {/* Benefit 1: 10% */}
                    <div className="flex flex-col items-center justify-start space-y-1">
                      <div className="w-6 h-6 rounded-full border border-[#deb34a] bg-[#deb34a]/10 text-[#deb34a] text-[10px] font-bold flex items-center justify-center font-mono">
                        10%
                      </div>
                      <p className="text-[8px] text-zinc-300 leading-tight">
                        รับส่วนลด<br />ค่าบริการปกติ 10%
                      </p>
                    </div>

                    {/* Benefit 2: VIP Locker */}
                    <div className="flex flex-col items-center justify-start space-y-1">
                      <svg className="w-5 h-5 text-[#deb34a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <line x1="12" y1="2" x2="12" y2="22" />
                        <circle cx="9" cy="12" r="1" fill="currentColor" />
                        <circle cx="15" cy="12" r="1" fill="currentColor" />
                      </svg>
                      <p className="text-[8px] text-zinc-300 leading-tight">
                        ฟรี<br />ล็อกเกอร์ VIP<br />ส่วนตัว
                      </p>
                    </div>

                    {/* Benefit 3: Birthday Pass */}
                    <div className="flex flex-col items-center justify-start space-y-1">
                      <svg className="w-5 h-5 text-[#deb34a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
                        <path d="M2 21h20" />
                        <line x1="7" y1="8" x2="7" y2="11" />
                        <line x1="12" y1="8" x2="12" y2="11" />
                        <line x1="17" y1="8" x2="17" y2="11" />
                      </svg>
                      <p className="text-[8px] text-zinc-300 leading-tight">
                        สิทธิ์เข้าใช้ซาวน่าฟรี<br />1 ครั้งในเดือนเกิด<br /><span className="text-[#DEB34A] font-semibold">(BIRTHDAY PASS)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================= */}
              {/* 4. PLATINUM VIP TIER (12% DISCOUNT) */}
              {/* ========================================= */}
              <div className="rounded-2xl border border-[#a855f7]/70 bg-gradient-to-b from-[#1e1030] to-[#0a0611] p-2.5 space-y-2 relative shadow-[0_0_25px_rgba(168,85,247,0.25)]">
                {/* Purple Crown Ribbon */}
                <div className="absolute top-0 right-3 w-5 h-6 bg-[#a78bfa] text-black flex items-center justify-center rounded-b-sm shadow-sm z-20">
                  <Crown className="w-3 h-3" />
                </div>

                <div className="flex justify-between items-center pl-1">
                  <span className="text-xs font-bold text-[#d8b4fe]">สมาชิกระดับ PLATINUM VIP</span>
                  {currentTierKey === "PLATINUM" && (
                    <span className="text-[8.5px] font-bold text-[#c084fc] bg-[#2e1065] border border-[#a855f7] px-2 py-0.5 rounded-full font-['Montserrat'] tracking-wider mr-6">
                      YOUR CURRENT TIER ✓
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Thumbnail with Aura & Metallic Shimmer Animation */}
                  <div className="relative w-[120px] aspect-[2/1] shrink-0 select-none flex items-center justify-center">
                    {/* Platinum Aura (Larger expansive royal purple pulse) */}
                    <div className="aura-platinum" />
                    <img 
                      src="/images/card_platinum_member.webp" 
                      alt="PLATINUM" 
                      className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_16px_rgba(192,132,252,0.9)]" 
                    />
                    <div className="absolute inset-[2.5px] rounded-[8px] overflow-hidden pointer-events-none z-20">
                      <div className="card-shimmer" />
                    </div>
                  </div>

                  {/* 3 Benefits Grid */}
                  <div className="grid grid-cols-3 gap-1.5 flex-1 text-center">
                    {/* Benefit 1: 12% Discount (As requested) */}
                    <div className="flex flex-col items-center justify-start space-y-1">
                      <div className="w-6 h-6 rounded-full border border-[#c084fc] bg-[#581c87]/40 text-[#e9d5ff] text-[10px] font-bold flex items-center justify-center font-mono">
                        12%
                      </div>
                      <p className="text-[8px] text-zinc-300 leading-tight">
                        รับส่วนลด<br />ค่าบริการปกติ 12%
                      </p>
                    </div>

                    {/* Benefit 2: 1 Free Companion */}
                    <div className="flex flex-col items-center justify-start space-y-1">
                      <div className="relative">
                        <svg className="w-5 h-5 text-[#c084fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                        <span className="absolute -bottom-1 -right-1 text-[9px] font-bold font-mono text-[#e9d5ff]">1</span>
                      </div>
                      <p className="text-[8px] text-zinc-300 leading-tight">
                        พาเพื่อนร่วมเข้าใช้ฟรี<br />1 ท่าน / เดือน
                      </p>
                    </div>

                    {/* Benefit 3: VIP Suite Pass */}
                    <div className="flex flex-col items-center justify-start space-y-1">
                      <div className="relative">
                        <svg className="w-5 h-5 text-[#c084fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span className="absolute -bottom-1 -right-1 text-[9px] font-bold font-mono text-[#e9d5ff]">2</span>
                      </div>
                      <p className="text-[7.5px] text-zinc-300 leading-tight uppercase font-medium">
                        FREE PRIVATE<br />VIP SUITE PASS<br />2 ครั้งต่อปี
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Shield Protection Notice */}
            <div className="p-2.5 rounded-xl bg-[#101015] border border-zinc-800 text-[10.5px] text-zinc-300 flex items-center justify-center gap-2 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-[#DEB34A] shrink-0" />
              <span>การแลกของรางวัลจะไม่ทำให้แต้มสะสมลดลง</span>
            </div>

            {/* Big Golden Close Button */}
            <button
              onClick={() => setShowBenefitsModal(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F5D77F] via-[#DEB34A] to-[#B38728] text-black font-extrabold text-xs hover:brightness-110 active:scale-98 transition-all shadow-md cursor-pointer"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

      {/* 📅 MODAL: EXPIRY BREAKDOWN */}
      {/* ========================================================================= */}
      {showExpiryModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#101015] rounded-2xl p-5 max-w-xs w-full border border-[#deb34a]/60 space-y-3 relative">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-xs font-bold text-[#DEB34A] flex items-center gap-1">
                <Info className="w-4 h-4" /> รายละเอียดวันหมดอายุคะแนน
              </span>
              <button 
                onClick={() => setShowExpiryModal(false)}
                className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-black/60 border border-zinc-800">
                <span className="text-zinc-300">หมดอายุ 31/01/2027</span>
                <span className="text-[#DEB34A] font-bold font-mono">360 คะแนน</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-black/60 border border-zinc-800">
                <span className="text-zinc-300">หมดอายุ 31/12/2027</span>
                <span className="text-[#DEB34A] font-bold font-mono">126 คะแนน</span>
              </div>
            </div>

            <button
              onClick={() => setShowExpiryModal(false)}
              className="w-full py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold hover:text-white cursor-pointer"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ✏️ MODAL: EDIT NAME */}
      {/* ========================================================================= */}
      {isEditingName && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#101015] rounded-2xl p-5 max-w-xs w-full border border-[#deb34a]/60 space-y-3.5 relative">
            <h3 className="text-xs font-bold text-[#DEB34A]">แก้ไขชื่อสมาชิก</h3>
            <input 
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-700 text-white text-xs focus:border-[#DEB34A] focus:outline-none"
              placeholder="กรอกชื่อ-นามสกุล"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditingName(false)}
                className="flex-1 py-2 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-bold cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => {
                  setMemberName(nameInput);
                  setIsEditingName(false);
                }}
                className="flex-1 py-2 rounded-xl bg-[#DEB34A] text-black text-xs font-extrabold cursor-pointer"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🎁 MODAL: CONFIRM REDEEM REWARD (With Tier Protection Notice) */}
      {/* ========================================================================= */}
      {selectedRewardToRedeem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#101015] rounded-2xl p-5 max-w-xs w-full border border-[#deb34a]/60 text-center space-y-3.5 relative">
            <button 
              onClick={() => setSelectedRewardToRedeem(null)}
              className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <img 
              src={selectedRewardToRedeem.image} 
              alt={selectedRewardToRedeem.title} 
              className="w-16 h-16 rounded-xl object-cover mx-auto border border-[#deb34a]/40 shadow-sm"
            />

            <div>
              <h3 className="font-bold text-white text-xs">ยืนยันการแลกของรางวัล</h3>
              <p className="text-xs text-[#DEB34A] font-semibold mt-1">
                {selectedRewardToRedeem.title}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>ใช้คะแนน:</span>
                <span className="text-[#DEB34A] font-bold font-mono">-{selectedRewardToRedeem.pointsRequired} P</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>คะแนนคงเหลือหลังแลก:</span>
                <span className="text-white font-bold font-mono">
                  {(redeemablePoints - selectedRewardToRedeem.pointsRequired).toLocaleString()} P
                </span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[10px] text-emerald-300 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>ไม่กระทบต่อแต้มเลื่อนระดับสมาชิก</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedRewardToRedeem(null)}
                className="flex-1 py-2 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-bold cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirmRedeem}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#F5D77F] via-[#DEB34A] to-[#B38728] text-black text-xs font-extrabold cursor-pointer"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
