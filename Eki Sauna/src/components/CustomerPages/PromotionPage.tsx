import { useState, useEffect } from "react";
import type { FC } from "react";
import { 
  Home,
  Ticket, 
  ShoppingCart, 
  Menu, 
  Zap, 
  Gift, 
  Calendar, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  ArrowLeft,
  LayoutGrid,
  Check,
  Plus,
  Minus
} from "lucide-react";
import confetti from "canvas-confetti";

export interface PromoDeal {
  id: string;
  category: "ONSEN & SAUNA" | "FOOD & DRINK" | "MEMBER ONLY" | "FLASH SALE";
  badge: string;
  badgeType: "discount" | "free" | "special";
  title: string;
  subtitle: string;
  image: string;
  validity: string;
  price: number;
  originalPrice: number;
  details: string[];
  terms: string[];
}

interface Props {
  onBackToMember: () => void;
  onGoToVouchers: () => void;
  onAddPurchasedVoucher?: (voucher: any) => void;
}

const PROMO_DEALS: PromoDeal[] = [
  {
    id: "promo-onsen-20",
    category: "ONSEN & SAUNA",
    badge: "-20%",
    badgeType: "discount",
    title: "ส่วนลดค่าเข้าออนเซ็น 20%",
    subtitle: "สำหรับค่าเข้า Onsen & Finnish Sauna ทุกประเภท",
    image: "/images/promo_deal_onsen.webp",
    validity: "1 ก.ย. 2567 - 30 ก.ย. 2567",
    price: 520,
    originalPrice: 650,
    details: [
      "รับส่วนลด 20% สำหรับค่าเข้า Onsen & Finnish Sauna ทุกประเภท (ไม่รวมแพ็กเกจและคอร์สพิเศษ)",
      "ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้",
      "จำกัด 1 สิทธิ์ / ใบเสร็จ",
      "เงื่อนไขเป็นไปตามที่บริษัทกำหนด"
    ],
    terms: [
      "แสดง E-Voucher ก่อนชำระเงิน",
      "สามารถใช้สิทธิ์ได้ที่ EKI Onsen & Sauna เท่านั้น",
      "ไม่สามารถคืนเงินหรือแลกเปลี่ยนเป็นเงินสดได้"
    ]
  },
  {
    id: "promo-drink-free",
    category: "FOOD & DRINK",
    badge: "FREE",
    badgeType: "free",
    title: "รับฟรี! เครื่องดื่ม Welcome Drink",
    subtitle: "เมื่อใช้บริการ Onsen & Sauna (จำกัด 1 สิทธิ์ / ใบเสร็จ)",
    image: "/images/promo_deal_drink.webp",
    validity: "1 ก.ย. 2567 - 30 ก.ย. 2567",
    price: 0,
    originalPrice: 120,
    details: [
      "รับฟรี Welcome Herbal Drink 1 แก้ว สูตรสมุนไพรสกัดเย็นฟื้นฟูร่างกาย",
      "รับสิทธิ์ได้เมื่อเข้าใช้บริการออนเซ็นหรือซาวน่า",
      "จำกัด 1 สิทธิ์ ต่อ 1 ใบเสร็จ",
      "ไม่สามารถเปลี่ยนเป็นเงินสดได้"
    ],
    terms: [
      "แสดง E-Voucher ที่เคาน์เตอร์เครื่องดื่ม",
      "ใช้ได้ทุกวันตามเวลาทำการ"
    ]
  },
  {
    id: "promo-spa-15",
    category: "ONSEN & SAUNA",
    badge: "-15%",
    badgeType: "discount",
    title: "ส่วนลดสปาและทรีตเมนต์ 15%",
    subtitle: "ให้ร่างกายและจิตใจได้ผ่อนคลาย ด้วยทรีตเมนต์คุณภาพ",
    image: "/images/promo_deal_spa.webp",
    validity: "1 ก.ย. 2567 - 30 ก.ย. 2567",
    price: 1020,
    originalPrice: 1200,
    details: [
      "รับส่วนลด 15% สำหรับทุกแพ็กเกจสปา นวดอโรมา และทรีตเมนต์ผิวกาย",
      "กรุณาจองเวลาล่วงหน้าอย่างน้อย 1 วัน",
      "ไม่สามารถใช้ร่วมกับบัตรกำนัลอื่นได้"
    ],
    terms: [
      "แสดง E-Voucher ก่อนเข้ารับบริการ",
      "สามารถใช้สิทธิ์ได้ที่ EKI Onsen & Sauna เท่านั้น"
    ]
  },
  {
    id: "promo-member-x2",
    category: "MEMBER ONLY",
    badge: "SPECIAL",
    badgeType: "special",
    title: "คะแนน X2",
    subtitle: "รับคะแนนสะสม 2 เท่า เมื่อใช้จ่ายครบ 1,000 บาทขึ้นไป",
    image: "/images/promo_deal_x2.webp",
    validity: "1 ก.ย. 2567 - 30 ก.ย. 2567",
    price: 0,
    originalPrice: 0,
    details: [
      "เอกสิทธิ์เฉพาะสมาชิก EKI ทุกระดับ",
      "รับคะแนนสะสมคูณ 2 เท่าทันทีเมื่อมียอดบิลตั้งแต่ 1,000 บาทขึ้นไป",
      "คะแนนจะเข้ากระเป๋าบัญชีสมาชิกอัตโนมัติ"
    ],
    terms: [
      "ต้องเป็นสมาชิกที่ลงทะเบียนผ่าน LINE OA",
      "แต้มจะถูกคำนวณและปรับเข้าสู่ระบบแบบเรียลไทม์"
    ]
  }
];

export const PromotionPage: FC<Props> = ({ 
  onBackToMember, 
  onGoToVouchers, 
  onAddPurchasedVoucher 
}) => {
  // Navigation View State: "list" | "detail" | "checkout"
  const [viewMode, setViewMode] = useState<"list" | "detail" | "checkout">("list");
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [selectedDeal, setSelectedDeal] = useState<PromoDeal>(PROMO_DEALS[0]);
  const [voucherType, setVoucherType] = useState<"online" | "gift">("online");
  const [quantity, setQuantity] = useState<number>(1);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);

  // Flash Sale Countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 8,
    seconds: 46
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenDetail = (deal: PromoDeal) => {
    setSelectedDeal(deal);
    setViewMode("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenCheckout = (deal: PromoDeal) => {
    setSelectedDeal(deal);
    setViewMode("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmPurchase = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPurchaseSuccess(true);
      setCartCount((prev) => prev + quantity);

      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F5D77F", "#FFFFFF", "#E5BA55"]
      });

      if (onAddPurchasedVoucher) {
        onAddPurchasedVoucher({
          id: `v-promo-${Date.now()}`,
          title: selectedDeal.title,
          description: selectedDeal.subtitle,
          expireDate: "30/09/2026",
          image: selectedDeal.image,
          badgeType: selectedDeal.badgeType === "free" ? "gift" : "percent",
          badgeValue: selectedDeal.badge,
          status: "ACTIVE"
        });
      }

      setTimeout(() => {
        setPurchaseSuccess(false);
        setViewMode("list");
        onGoToVouchers();
      }, 1800);
    }, 1200);
  };

  const filteredDeals = PROMO_DEALS.filter((deal) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "FLASH SALE") return true;
    return deal.category === activeTab;
  });

  return (
    <div className="min-h-screen w-full bg-[#050507] text-[#E0E0E0] font-['Prompt',sans-serif] flex flex-col items-center justify-start p-3 sm:p-4 select-none pb-12 relative overflow-x-hidden">
      
      {/* Bamboo Silhouette Background Watermark */}
      <div 
        className="absolute top-0 right-0 w-[200px] h-[180px] bg-no-repeat bg-contain opacity-25 pointer-events-none z-0"
        style={{ backgroundImage: "url('/images/shop_bamboo.webp')" }}
      />

      {/* Main Container */}
      <div className="w-full max-w-[390px] space-y-3.5 relative z-10">

        {/* ========================================================================= */}
        {/* 📱 VIEW 1: PROMOTION MAIN LIST SCREEN */}
        {/* ========================================================================= */}
        {viewMode === "list" && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            
            {/* Top Bar: Logo & Action Icons */}
            <div className="flex items-center justify-between pt-1">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <img 
                  src="/images/logo_eki_gold.webp" 
                  alt="EKI ONSEN & SAUNA" 
                  className="h-11 w-auto object-contain drop-shadow-md"
                />
              </div>

              {/* 4 Header Action Icons */}
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={onBackToMember}
                  className="w-7 h-7 rounded-full border border-zinc-700 bg-[#121218] text-zinc-300 flex items-center justify-center hover:text-[#DEB34A] transition-colors cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={onGoToVouchers}
                  className="w-7 h-7 rounded-full border border-zinc-700 bg-[#121218] text-zinc-300 flex items-center justify-center hover:text-[#DEB34A] transition-colors cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => {}}
                  className="w-7 h-7 rounded-full border border-zinc-700 bg-[#121218] text-zinc-300 flex items-center justify-center relative hover:text-[#DEB34A] transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#DEB34A] text-black font-extrabold text-[8px] flex items-center justify-center font-mono">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => {}}
                  className="w-7 h-7 rounded-full border border-zinc-700 bg-[#121218] text-zinc-300 flex items-center justify-center hover:text-[#DEB34A] transition-colors cursor-pointer"
                >
                  <Menu className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Title Header */}
            <div className="text-center pt-1 pb-0.5">
              <h2 className="text-[17px] font-extrabold tracking-[0.16em] text-[#DEB34A] font-['Montserrat'] uppercase leading-none">
                PROMOTION
              </h2>
              <p className="text-[11px] text-zinc-300 mt-1">
                สิทธิพิเศษสำหรับคุณ
              </p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="h-[0.5px] w-8 bg-gradient-to-r from-transparent to-[#deb34a]/60" />
                <svg className="w-3.5 h-2.5 text-[#DEB34A]" viewBox="0 0 24 16" fill="currentColor">
                  <path d="M12 0C11.5 3 8 7 3 9C7 10 10.5 13 12 16C13.5 13 17 10 21 9C16 7 12.5 3 12 0Z" />
                </svg>
                <span className="h-[0.5px] w-8 bg-gradient-to-l from-transparent to-[#deb34a]/60" />
              </div>
            </div>

            {/* Horizontal Filter Tabs */}
            <div className="overflow-x-auto no-scrollbar -mx-3 px-3">
              <div className="flex items-center border-b border-zinc-800/80 gap-3 text-[10.5px] font-bold w-max min-w-full">
                {[
                  { id: "ALL", label: "ทั้งหมด" },
                  { id: "FLASH SALE", label: "FLASH SALE" },
                  { id: "ONSEN & SAUNA", label: "ONSEN & SAUNA" },
                  { id: "FOOD & DRINK", label: "FOOD & DRINK" },
                  { id: "MEMBER ONLY", label: "MEMBER ONLY" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-2 transition-all relative cursor-pointer ${
                      activeTab === tab.id
                        ? "text-[#DEB34A] font-extrabold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DEB34A] shadow-[0_0_8px_rgba(222,179,74,0.9)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ⚡ FLASH SALE BIG HERO BANNER */}
            <div className="rounded-2xl border border-[#deb34a]/60 bg-[#17140e] overflow-hidden shadow-xl relative min-h-[142px] flex items-stretch">
              {/* Right Image with Smooth Cinematic Fade */}
              <div className="absolute right-0 top-0 bottom-0 w-[65%] sm:w-[60%] overflow-hidden pointer-events-none select-none">
                <img 
                  src="/images/promo_flash_hero.webp" 
                  alt="Flash Sale" 
                  className="w-full h-full object-cover object-right"
                />
                {/* Smooth multi-stage gradient fade from solid left to transparent right */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#17140e] via-[#17140e]/75 via-30% to-transparent" />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#17140e] to-transparent" />
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[8.5px] font-mono text-zinc-300 z-10 border border-white/10">
                  1/5
                </span>
              </div>

              {/* Left Info */}
              <div className="p-3.5 relative z-10 max-w-[50%] flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-1.5 text-[#DEB34A]">
                  <Zap className="w-4 h-4 fill-[#DEB34A]" />
                  <span className="text-xs font-extrabold tracking-wider font-['Montserrat']">
                    FLASH SALE
                  </span>
                </div>

                <div>
                  <p className="text-[10px] text-zinc-300 leading-tight">
                    ราคาพิเศษ<br />เฉพาะช่วงเวลานี้เท่านั้น
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="space-y-0.5">
                  <span className="text-[8.5px] text-zinc-400 block">เหลือเวลา</span>
                  <div className="flex items-center gap-1 font-mono text-[10px] font-bold">
                    <div className="flex flex-col items-center">
                      <span className="w-5 h-4.5 rounded bg-[#1f1d18] border border-zinc-700 text-[#DEB34A] flex items-center justify-center">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                      <span className="text-[6.5px] text-zinc-400 font-sans mt-0.5">ชม.</span>
                    </div>
                    <span className="text-[#DEB34A] pb-1.5">:</span>
                    <div className="flex flex-col items-center">
                      <span className="w-5 h-4.5 rounded bg-[#1f1d18] border border-zinc-700 text-[#DEB34A] flex items-center justify-center">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                      <span className="text-[6.5px] text-zinc-400 font-sans mt-0.5">นาที</span>
                    </div>
                    <span className="text-[#DEB34A] pb-1.5">:</span>
                    <div className="flex flex-col items-center">
                      <span className="w-5 h-4.5 rounded bg-[#1f1d18] border border-zinc-700 text-[#DEB34A] flex items-center justify-center">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                      <span className="text-[6.5px] text-zinc-400 font-sans mt-0.5">วินาที</span>
                    </div>
                  </div>
                </div>

                {/* Button: ดูเพิ่มเติม */}
                <button 
                  onClick={() => handleOpenDetail(PROMO_DEALS[0])}
                  className="py-1 px-3 rounded-full bg-gradient-to-r from-[#F5D77F] via-[#DEB34A] to-[#B38728] text-black font-extrabold text-[9.5px] hover:brightness-110 active:scale-95 transition-all w-max flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <span>ดูเพิ่มเติม</span>
                  <span>›</span>
                </button>
              </div>
            </div>

            {/* ดีลแนะนำสำหรับคุณ Header */}
            <div className="flex justify-between items-center pt-1">
              <h3 className="text-xs font-bold text-white">ดีลแนะนำสำหรับคุณ</h3>
              <button className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-0.5 cursor-pointer">
                <span>ดูทั้งหมด</span>
                <span>›</span>
              </button>
            </div>

            {/* Deal Cards List */}
            <div className="space-y-2.5">
              {filteredDeals.map((deal) => (
                <div 
                  key={deal.id}
                  className="p-2.5 rounded-2xl bg-gradient-to-r from-[#131217] to-[#0a0a0d] border border-zinc-800 hover:border-[#deb34a]/60 transition-all flex items-center gap-2.5 shadow-md group cursor-pointer"
                  onClick={() => handleOpenDetail(deal)}
                >
                  {/* Left Thumbnail with Badge */}
                  <div className="w-[100px] h-[64px] rounded-xl overflow-hidden relative shrink-0 border border-zinc-800">
                    <img 
                      src={deal.image} 
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-[#deb34a] text-black font-extrabold text-[8.5px] font-mono shadow-sm">
                      {deal.badge}
                    </div>
                  </div>

                  {/* Center Details */}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <span className="text-[8px] font-bold text-[#DEB34A] tracking-wider uppercase font-['Montserrat'] block">
                      {deal.category}
                    </span>
                    <h4 className="text-[11px] font-bold text-white leading-tight truncate">
                      {deal.title}
                    </h4>
                    <p className="text-[9px] text-zinc-400 line-clamp-1 leading-tight">
                      {deal.subtitle}
                    </p>
                    <div className="flex items-center gap-1 text-[8.5px] text-zinc-400 pt-0.5">
                      <Calendar className="w-3 h-3 text-[#DEB34A]" />
                      <span>{deal.validity}</span>
                    </div>
                  </div>

                  {/* Right Button */}
                  <div className="shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(deal);
                      }}
                      className="py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-[#F5D77F] via-[#DEB34A] to-[#B38728] text-black font-extrabold text-[9.5px] hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-xs flex items-center gap-0.5"
                    >
                      <span>ดูรายละเอียด</span>
                      <span>›</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Member VIP Banner */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-[#17140e] to-[#0c0a06] border border-[#deb34a]/50 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#deb34a]/15 text-[#DEB34A] flex items-center justify-center">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-[#DEB34A] leading-tight">
                    สิทธิพิเศษสำหรับสมาชิก EKI
                  </h4>
                  <p className="text-[9px] text-zinc-400">อัปเดตโปรโมชั่นใหม่ ๆ ก่อนใคร</p>
                </div>
              </div>

              <button 
                onClick={onBackToMember}
                className="py-1 px-2.5 rounded-xl border border-[#deb34a]/70 text-[#DEB34A] font-bold text-[9.5px] hover:bg-[#deb34a] hover:text-black transition-all flex items-center gap-0.5 cursor-pointer"
              >
                <span>สมัครสมาชิก</span>
                <span>›</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 📱 VIEW 2: PROMOTION DETAIL SCREEN */}
        {/* ========================================================================= */}
        {viewMode === "detail" && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between pb-1 border-b border-zinc-800/80">
              <button 
                onClick={() => setViewMode("list")}
                className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h3 className="text-xs font-bold text-white">รายละเอียดโปรโมชั่น</h3>
              <button className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:text-white cursor-pointer">
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Large Hero Banner with -20% badge */}
            <div className="rounded-2xl overflow-hidden border border-[#deb34a]/50 relative shadow-xl">
              <div className="relative h-[160px] w-full bg-black">
                <img 
                  src={selectedDeal.image} 
                  alt={selectedDeal.title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Floating Badge */}
                <div className="absolute top-2.5 left-2.5 w-10 h-10 rounded-full bg-[#deb34a] text-black font-extrabold text-xs font-mono flex items-center justify-center shadow-lg border border-white/40">
                  {selectedDeal.badge}
                </div>

                {/* Pagination Indicator */}
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 text-[9px] font-mono text-zinc-300">
                  1/5
                </span>
              </div>
            </div>

            {/* Title & Category Info */}
            <div className="space-y-1 pt-0.5">
              <span className="text-[9px] font-bold text-[#DEB34A] tracking-wider uppercase font-['Montserrat'] block">
                {selectedDeal.category}
              </span>
              <h2 className="text-sm font-extrabold text-white leading-tight">
                {selectedDeal.title}
              </h2>
              <p className="text-[10.5px] text-zinc-300 leading-tight">
                {selectedDeal.subtitle}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-1 text-[9.5px] text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-[#DEB34A]" />
                  <span>{selectedDeal.validity}</span>
                </div>
                <span className="text-[8.5px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium">
                  ทุกวัน
                </span>
              </div>
            </div>

            {/* รายละเอียด (Details Card) */}
            <div className="p-3 rounded-2xl bg-[#0f0f14] border border-zinc-800 space-y-2">
              <h4 className="text-xs font-bold text-white border-b border-zinc-800 pb-1.5">
                รายละเอียด
              </h4>
              <div className="text-[10px] text-zinc-300 space-y-1.5 leading-relaxed">
                {selectedDeal.details.map((item, idx) => (
                  <p key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#DEB34A] leading-tight">•</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* เงื่อนไขการใช้สิทธิ์ (Terms Card) */}
            <div className="p-3 rounded-2xl bg-[#0f0f14] border border-zinc-800 space-y-2">
              <h4 className="text-xs font-bold text-white border-b border-zinc-800 pb-1.5">
                เงื่อนไขการใช้สิทธิ์
              </h4>
              <div className="text-[10px] text-zinc-300 space-y-1.5 leading-relaxed">
                <div className="flex items-center gap-2">
                  <Ticket className="w-3.5 h-3.5 text-[#DEB34A] shrink-0" />
                  <span>แสดง E-Voucher ก่อนชำระเงิน</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#DEB34A] shrink-0" />
                  <span>สามารถใช้สิทธิ์ได้ที่ EKI Onsen & Sauna เท่านั้น</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>ไม่สามารถคืนเงินหรือแลกเปลี่ยนเป็นเงินสดได้</span>
                </div>
              </div>
            </div>

            {/* Bottom Sticky Action: ซื้อเลย */}
            <div className="pt-2">
              <button
                onClick={() => handleOpenCheckout(selectedDeal)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F5D77F] via-[#DEB34A] to-[#B38728] text-black font-extrabold text-xs hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>ซื้อเลย</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 📱 VIEW 3: E-VOUCHER CHECKOUT SCREEN */}
        {/* ========================================================================= */}
        {viewMode === "checkout" && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between pb-1 border-b border-zinc-800/80">
              <button 
                onClick={() => setViewMode("detail")}
                className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h3 className="text-xs font-bold text-white">ซื้อ E-Voucher</h3>
              <div className="w-7" />
            </div>

            {purchaseSuccess ? (
              <div className="py-8 text-center space-y-3 rounded-2xl bg-[#0f0f14] border border-zinc-800 p-5">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-base font-bold text-white">ชำระเงินสำเร็จ!</h3>
                <p className="text-xs text-zinc-300">
                  คูปอง &quot;{selectedDeal.title}&quot; ถูกเพิ่มเข้าสู่กระเป๋าคูปองของคุณแล้ว
                </p>
              </div>
            ) : (
              <>
                {/* Product Summary Card */}
                <div className="p-2.5 rounded-2xl bg-[#0f0f14] border border-zinc-800 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0 border border-[#deb34a]/40">
                    <img 
                      src={selectedDeal.image} 
                      alt="" 
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-0.5 left-0.5 px-1 rounded-full bg-[#deb34a] text-black font-extrabold text-[7.5px]">
                      {selectedDeal.badge}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] font-bold text-[#DEB34A] tracking-wider uppercase font-['Montserrat'] block">
                      {selectedDeal.category}
                    </span>
                    <h4 className="text-[11px] font-bold text-white leading-tight truncate">
                      {selectedDeal.title}
                    </h4>
                    <p className="text-[9.5px] text-zinc-400 truncate">
                      {selectedDeal.subtitle}
                    </p>
                  </div>
                </div>

                {/* เลือกรูปแบบ E-Voucher */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold text-zinc-200">
                    เลือกรูปแบบ E-Voucher
                  </h4>

                  {/* Option 1: E-Voucher ออนไลน์ */}
                  <div 
                    onClick={() => setVoucherType("online")}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      voucherType === "online" 
                        ? "bg-[#181510] border-[#deb34a] shadow-sm" 
                        : "bg-[#0c0c10] border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#deb34a]/15 text-[#DEB34A] flex items-center justify-center">
                        <Gift className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-[11px] font-bold text-white">
                          E-Voucher ออนไลน์
                        </h5>
                        <p className="text-[9px] text-zinc-400">
                          รับโค้ดทันที ใช้งานได้เลย
                        </p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      voucherType === "online" 
                        ? "bg-[#DEB34A] border-[#DEB34A] text-black" 
                        : "border-zinc-700"
                    }`}>
                      {voucherType === "online" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Option 2: Gift Voucher (ส่งให้ผู้อื่น) */}
                  <div 
                    onClick={() => setVoucherType("gift")}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      voucherType === "gift" 
                        ? "bg-[#181510] border-[#deb34a] shadow-sm" 
                        : "bg-[#0c0c10] border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center">
                        <Gift className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-[11px] font-bold text-zinc-300">
                          Gift Voucher (ส่งให้ผู้อื่น)
                        </h5>
                        <p className="text-[9px] text-zinc-400">
                          ส่งเป็นของขวัญให้คนที่คุณรัก
                        </p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      voucherType === "gift" 
                        ? "bg-[#DEB34A] border-[#DEB34A] text-black" 
                        : "border-zinc-700"
                    }`}>
                      {voucherType === "gift" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>

                {/* จำนวน (Quantity Stepper) */}
                <div className="p-3 rounded-2xl bg-[#0f0f14] border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-300">จำนวน</span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-zinc-700 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm text-white font-mono min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-zinc-700 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* สรุปคำสั่งซื้อ (Order Summary) */}
                <div className="p-3 rounded-2xl bg-[#0f0f14] border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-white border-b border-zinc-800 pb-1.5">
                    สรุปคำสั่งซื้อ
                  </h4>
                  
                  <div className="flex justify-between items-center text-[10.5px] text-zinc-300">
                    <span className="truncate pr-2">{selectedDeal.title}</span>
                    <span className="font-mono">x{quantity}</span>
                  </div>

                  <div className="flex justify-between items-center text-[10.5px] text-zinc-400">
                    <span>ราคาปกติ</span>
                    <span className="font-mono">฿{(selectedDeal.originalPrice * quantity).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-1.5 border-t border-zinc-800">
                    <span className="text-xs font-bold text-white">รวมทั้งสิ้น</span>
                    <span className="text-lg font-extrabold text-[#DEB34A] font-mono">
                      ฿{(selectedDeal.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Bottom CTA Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleConfirmPurchase}
                    disabled={isProcessing}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F5D77F] via-[#DEB34A] to-[#B38728] text-black font-extrabold text-xs hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    {isProcessing ? (
                      <span>กำลังประมวลผลการชำระเงิน...</span>
                    ) : (
                      <span>ชำระเงิน</span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setCartCount((prev) => prev + quantity);
                      alert(`เพิ่ม "${selectedDeal.title}" ลงในตะกร้าแล้ว`);
                    }}
                    className="w-full py-2.5 rounded-xl border border-zinc-700 bg-[#121218] text-zinc-200 font-bold text-xs hover:border-[#deb34a] hover:text-[#DEB34A] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>เพิ่มในตะกร้า</span>
                  </button>
                </div>

                {/* Bottom Security Trust */}
                <div className="text-center pt-1 text-[9px] text-zinc-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#DEB34A]" />
                  <span>มั่นใจ ปลอดภัย 100% ข้อมูลของคุณจะถูกเก็บเป็นความลับ</span>
                </div>
              </>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
