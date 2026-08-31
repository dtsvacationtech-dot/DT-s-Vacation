import { useState, useEffect } from "react";
import type { FC } from "react";
import { 
  Home, 
  Ticket, 
  ShoppingCart, 
  Zap, 
  Gift, 
  ShoppingBag, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  Utensils, 
  Clock, 
  CreditCard,
  QrCode
} from "lucide-react";
import confetti from "canvas-confetti";

export interface ShopVoucher {
  id: string;
  amount: number;
  price: number;
  originalPrice: number;
  title: string;
  subtitle: string;
  image: string;
  validity: string;
  category: "cash" | "food" | "package";
}

interface Props {
  onBackToMember: () => void;
  onGoToVouchers: () => void;
  onAddPurchasedVoucher?: (voucher: any) => void;
}

const SHOP_ITEMS: ShopVoucher[] = [
  {
    id: "shop-1500",
    amount: 1500,
    price: 1350,
    originalPrice: 1500,
    title: "EKI Onsen & Sauna",
    subtitle: "E-Cash Voucher 1,500.- (ใช้แทนเงินสด 1,500.-)",
    image: "/images/shop_card_1500.webp",
    validity: "1 ก.ย. - 30 ก.ย. 2569",
    category: "cash"
  },
  {
    id: "shop-1000",
    amount: 1000,
    price: 900,
    originalPrice: 1000,
    title: "EKI Onsen & Sauna",
    subtitle: "E-Cash Voucher 1,000.- (ใช้แทนเงินสด 1,000.-)",
    image: "/images/shop_card_1000.webp",
    validity: "1 ก.ย. - 30 ก.ย. 2569",
    category: "cash"
  },
  {
    id: "shop-700",
    amount: 700,
    price: 630,
    originalPrice: 700,
    title: "EKI Onsen & Sauna",
    subtitle: "E-Cash Voucher 700.- (ใช้แทนเงินสด 700.-)",
    image: "/images/shop_card_700.webp",
    validity: "1 ก.ย. - 30 ก.ย. 2569",
    category: "cash"
  }
];

export const EVoucherShopPage: FC<Props> = ({ 
  onBackToMember, 
  onGoToVouchers, 
  onAddPurchasedVoucher 
}) => {
  // Flash Sale Countdown Timer (Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 8,
    seconds: 46
  });

  const [selectedItemForPurchase, setSelectedItemForPurchase] = useState<ShopVoucher | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cartCount, setCartCount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<"promptpay" | "credit" | "linepay">("promptpay");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);

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

  const handleConfirmPurchase = () => {
    if (!selectedItemForPurchase) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPurchaseSuccess(true);
      setCartCount((prev) => prev + 1);

      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F5D77F", "#FFFFFF", "#E5BA55"]
      });

      // Add to customer vouchers list
      if (onAddPurchasedVoucher) {
        onAddPurchasedVoucher({
          id: `v-purchased-${Date.now()}`,
          title: `E-Cash Voucher ${selectedItemForPurchase.amount.toLocaleString()}.-`,
          description: `บัตรกำนัลแทนเงินสดมูลค่า ${selectedItemForPurchase.amount.toLocaleString()} บาท\nสำหรับใช้บริการที่ EKI Onsen & Sauna`,
          expireDate: "30/09/2026",
          image: "/images/voucher_evoucher_square.webp",
          badgeType: "percent",
          badgeValue: `${selectedItemForPurchase.amount.toLocaleString()}฿`,
          status: "ACTIVE"
        });
      }

      setTimeout(() => {
        setPurchaseSuccess(false);
        setSelectedItemForPurchase(null);
        onGoToVouchers();
      }, 1800);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-[#050507] text-[#E0E0E0] font-['Prompt',sans-serif] flex flex-col items-center justify-start p-3 sm:p-4 select-none pb-12 relative overflow-x-hidden">
      
      {/* Bamboo Silhouette Background Watermark */}
      <div 
        className="absolute top-0 right-0 w-[200px] h-[180px] bg-no-repeat bg-contain opacity-25 pointer-events-none z-0"
        style={{ backgroundImage: "url('/images/shop_bamboo.webp')" }}
      />

      {/* Main Container (390px Mobile View) */}
      <div className="w-full max-w-[390px] space-y-4 relative z-10">
        
        {/* ========================================================================= */}
        {/* 👑 HEADER: EKI EMBLEM & TOP ACTION BUTTONS */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between pt-1">
          
          {/* Official Gold Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/images/logo_eki_gold.webp" 
              alt="EKI ONSEN & SAUNA" 
              className="h-12 w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* 3 Top Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Home */}
            <button 
              onClick={onBackToMember}
              className="w-8 h-8 rounded-full border border-zinc-700 bg-[#121218] text-zinc-300 flex items-center justify-center hover:text-[#DEB34A] hover:border-[#deb34a] transition-all cursor-pointer shadow-sm"
              title="หน้าหลักบัตรสมาชิก"
            >
              <Home className="w-4 h-4" />
            </button>

            {/* My Vouchers */}
            <button 
              onClick={onGoToVouchers}
              className="w-8 h-8 rounded-full border border-zinc-700 bg-[#121218] text-zinc-300 flex items-center justify-center hover:text-[#DEB34A] hover:border-[#deb34a] transition-all cursor-pointer shadow-sm"
              title="คูปองของฉัน"
            >
              <Ticket className="w-4 h-4" />
            </button>

            {/* Cart */}
            <button 
              onClick={() => {}}
              className="w-8 h-8 rounded-full border border-zinc-700 bg-[#121218] text-zinc-300 flex items-center justify-center relative hover:text-[#DEB34A] hover:border-[#deb34a] transition-all cursor-pointer shadow-sm"
              title="ตะกร้าสินค้า"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#DEB34A] text-black font-extrabold text-[9px] flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Page Title */}
        <div className="pt-1">
          <h2 className="text-xl font-extrabold tracking-[0.14em] text-[#DEB34A] font-['Montserrat'] uppercase leading-none">
            E-VOUCHER
          </h2>
          <p className="text-[11.5px] text-zinc-300 mt-1">
            เลือก E-Voucher ที่ใช่สำหรับคุณ
          </p>
        </div>

        {/* ========================================================================= */}
        {/* ⚡ FLASH SALE COUNTDOWN BANNER */}
        {/* ========================================================================= */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#17140e] via-[#100f0b] to-[#0a0a0c] border border-[#deb34a]/50 shadow-lg relative overflow-hidden flex items-center justify-between">
          
          {/* Subtle Seigaiha wave texture background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#deb34a_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

          {/* Left Flash Sale Info */}
          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-[#deb34a]/15 border border-[#deb34a]/40 flex items-center justify-center text-[#DEB34A]">
              <Zap className="w-5 h-5 fill-[#DEB34A]" />
            </div>
            <div>
              <span className="text-[13px] font-extrabold text-[#DEB34A] font-['Montserrat'] tracking-wider block leading-tight">
                FLASH SALE
              </span>
              <p className="text-[9.5px] text-zinc-300 leading-tight">
                ราคาพิเศษ เฉพาะช่วงเวลานี้เท่านั้น
              </p>
            </div>
          </div>

          {/* Right Countdown Clock */}
          <div className="text-right relative z-10">
            <span className="text-[9px] text-zinc-400 block mb-0.5">เหลือเวลา</span>
            <div className="flex items-center gap-1 font-mono text-[11px] font-bold">
              <div className="flex flex-col items-center">
                <span className="w-6 h-5 rounded bg-[#1f1d18] border border-zinc-700 text-[#DEB34A] flex items-center justify-center">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[7.5px] text-zinc-400 font-sans mt-0.5">ชม.</span>
              </div>
              <span className="text-[#DEB34A] font-bold pb-2">:</span>
              <div className="flex flex-col items-center">
                <span className="w-6 h-5 rounded bg-[#1f1d18] border border-zinc-700 text-[#DEB34A] flex items-center justify-center">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[7.5px] text-zinc-400 font-sans mt-0.5">นาที</span>
              </div>
              <span className="text-[#DEB34A] font-bold pb-2">:</span>
              <div className="flex flex-col items-center">
                <span className="w-6 h-5 rounded bg-[#1f1d18] border border-zinc-700 text-[#DEB34A] flex items-center justify-center">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[7.5px] text-zinc-400 font-sans mt-0.5">วินาที</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 🎟️ HORIZONTAL SCROLLABLE VOUCHER CARDS */}
        {/* ========================================================================= */}
        <div className="overflow-x-auto no-scrollbar -mx-3 px-3 py-1">
          <div className="flex items-stretch gap-3 w-max">
            {SHOP_ITEMS.map((item) => (
              <div 
                key={item.id}
                className="w-[260px] rounded-2xl bg-gradient-to-b from-[#16141a] to-[#0b0a0d] border border-[#deb34a]/60 flex flex-col overflow-hidden shadow-xl relative"
              >
                {/* Top Card Hero Header */}
                <div className="relative h-[125px] w-full overflow-hidden bg-black flex flex-col justify-between p-2.5">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16141a] via-black/40 to-transparent" />

                  {/* K LIVE Badge */}
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded-full bg-[#1b1912] border border-[#deb34a]/60 text-[#DEB34A] text-[9px] font-bold font-mono tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      K LIVE
                    </span>
                  </div>

                  {/* Center Text */}
                  <div className="relative z-10 text-center pb-1">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-300 block font-['Montserrat'] font-bold">
                      E-CASH VOUCHER
                    </span>
                    <span className="text-xl font-extrabold text-[#DEB34A] font-mono leading-none tracking-wide drop-shadow-md">
                      {item.amount.toLocaleString()}.-
                    </span>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2.5">
                  
                  {/* 3 Icon Features Row */}
                  <div className="grid grid-cols-3 gap-1 text-center border-b border-zinc-800/80 pb-2">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full border border-[#deb34a]/60 bg-[#deb34a]/10 flex items-center justify-center text-[#DEB34A]">
                        <Gift className="w-3 h-3" />
                      </div>
                      <span className="text-[7.5px] text-zinc-300 mt-1">ใช้แทนเงินสด</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full border border-[#deb34a]/60 bg-[#deb34a]/10 flex items-center justify-center text-[#DEB34A]">
                        <ShoppingBag className="w-3 h-3" />
                      </div>
                      <span className="text-[7.5px] text-zinc-300 mt-1">ซื้อสินค้า/บริการ</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full border border-[#deb34a]/60 bg-[#deb34a]/10 flex items-center justify-center text-[#DEB34A]">
                        <MapPin className="w-3 h-3" />
                      </div>
                      <span className="text-[7.5px] text-zinc-300 mt-1">ใช้ได้ทุกสาขา</span>
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="text-[8.5px] text-zinc-300 space-y-0.5">
                    <div className="flex items-center gap-1 text-zinc-400">
                      <Calendar className="w-3 h-3 text-[#DEB34A]" />
                      <span>ใช้ได้ตั้งแต่</span>
                    </div>
                    <p className="font-mono pl-4 text-zinc-200">
                      ★ {item.validity}
                    </p>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-0.5 pt-0.5">
                    <span className="text-[9px] text-zinc-400 block">{item.title}</span>
                    <h4 className="text-[11px] font-bold text-white leading-tight">
                      E-Cash Voucher {item.amount.toLocaleString()}.-
                    </h4>
                    <p className="text-[9.5px] text-zinc-400 leading-none">
                      (ใช้แทนเงินสด {item.amount.toLocaleString()}.-)
                    </p>
                  </div>

                  {/* Price Row */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-extrabold text-[#DEB34A] font-mono leading-none">
                        ฿{item.price.toLocaleString()}
                      </span>
                      <span className="text-[10.5px] text-zinc-500 line-through font-mono">
                        ฿{item.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => setSelectedItemForPurchase(item)}
                    className="w-full py-2 rounded-xl border border-[#deb34a] bg-gradient-to-r from-[#deb34a]/10 to-[#deb34a]/25 text-[#DEB34A] font-bold text-xs hover:bg-[#deb34a] hover:text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>ซื้อเลย</span>
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 🗂️ CATEGORY: ดีลเด็ดสำหรับคุณ */}
        {/* ========================================================================= */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[9.5px] font-bold text-[#DEB34A] tracking-wider uppercase font-['Montserrat'] block">
                CATEGORY
              </span>
              <h3 className="text-sm font-bold text-white leading-tight">
                ดีลเด็ดสำหรับคุณ
              </h3>
            </div>
            <button 
              onClick={() => {}}
              className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-0.5 cursor-pointer"
            >
              <span>ดูทั้งหมด</span>
              <span>›</span>
            </button>
          </div>

          {/* 3 Horizontal Category Badges */}
          <div className="grid grid-cols-3 gap-2">
            
            {/* Cash */}
            <button 
              onClick={() => setSelectedCategory("cash")}
              className={`p-2.5 rounded-xl border transition-all text-left space-y-1.5 cursor-pointer ${
                selectedCategory === "cash" 
                  ? "bg-[#1f1a10] border-[#deb34a] text-white" 
                  : "bg-[#0f0f14] border-zinc-800 text-zinc-300 hover:border-zinc-700"
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-[#deb34a]/15 text-[#DEB34A] flex items-center justify-center">
                <Gift className="w-3.5 h-3.5" />
              </div>
              <p className="text-[9.5px] font-medium leading-tight">
                E-Voucher<br /><span className="font-bold">เงินสด</span>
              </p>
            </button>

            {/* Food & Beverage */}
            <button 
              onClick={() => setSelectedCategory("food")}
              className={`p-2.5 rounded-xl border transition-all text-left space-y-1.5 cursor-pointer ${
                selectedCategory === "food" 
                  ? "bg-[#1f1a10] border-[#deb34a] text-white" 
                  : "bg-[#0f0f14] border-zinc-800 text-zinc-300 hover:border-zinc-700"
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-[#deb34a]/15 text-[#DEB34A] flex items-center justify-center">
                <Utensils className="w-3.5 h-3.5" />
              </div>
              <p className="text-[9.5px] font-medium leading-tight">
                E-Voucher<br /><span className="font-bold">อาหาร & เครื่องดื่ม</span>
              </p>
            </button>

            {/* Packages */}
            <button 
              onClick={() => setSelectedCategory("package")}
              className={`p-2.5 rounded-xl border transition-all text-left space-y-1.5 cursor-pointer ${
                selectedCategory === "package" 
                  ? "bg-[#1f1a10] border-[#deb34a] text-white" 
                  : "bg-[#0f0f14] border-zinc-800 text-zinc-300 hover:border-zinc-700"
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-[#deb34a]/15 text-[#DEB34A] flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <p className="text-[9.5px] font-medium leading-tight">
                E-Voucher<br /><span className="font-bold">แพ็กเกจ & บริการ</span>
              </p>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 🛡️ BOTTOM SECURITY ASSURANCE */}
        {/* ========================================================================= */}
        <div className="p-3 rounded-xl bg-[#0a0a0f] border border-zinc-800 text-center space-y-1 mt-4">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-zinc-200">
            <ShieldCheck className="w-4 h-4 text-[#DEB34A]" />
            <span>มั่นใจ ปลอดภัย 100%</span>
          </div>
          <p className="text-[9.5px] text-zinc-400">
            ซื้อได้เลย ใช้ง่าย คุ้มค่าแน่นอน คูปองเข้ากระเป๋าทันที
          </p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 💳 CHECKOUT / PURCHASE MODAL */}
      {/* ========================================================================= */}
      {selectedItemForPurchase && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="bg-[#111116] rounded-3xl p-5 max-w-[390px] w-full border border-[#deb34a]/60 space-y-4 shadow-2xl relative">
            
            <button 
              onClick={() => setSelectedItemForPurchase(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {purchaseSuccess ? (
              <div className="py-6 text-center space-y-2.5">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-base font-bold text-white">สั่งซื้อ E-Voucher สำเร็จ!</h3>
                <p className="text-xs text-zinc-300">
                  คูปองมูลค่า {selectedItemForPurchase.amount.toLocaleString()}.- ถูกส่งเข้ากระเป๋าคูปองของคุณแล้ว
                </p>
              </div>
            ) : (
              <>
                <div className="border-b border-zinc-800 pb-3">
                  <span className="text-[10px] font-bold text-[#DEB34A] tracking-wider uppercase font-['Montserrat']">
                    CHECKOUT
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    ยืนยันการซื้อ E-Cash Voucher
                  </h3>
                </div>

                {/* Item Summary */}
                <div className="p-3 rounded-2xl bg-[#171720] border border-zinc-800 flex items-center gap-3">
                  <img 
                    src={selectedItemForPurchase.image} 
                    alt="" 
                    className="w-14 h-14 rounded-xl object-cover border border-[#deb34a]/40 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      E-Cash Voucher {selectedItemForPurchase.amount.toLocaleString()}.-
                    </h4>
                    <p className="text-[10px] text-zinc-400">ใช้แทนเงินสดที่ EKI Onsen & Sauna</p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-sm font-extrabold text-[#DEB34A] font-mono">
                        ฿{selectedItemForPurchase.price.toLocaleString()}
                      </span>
                      <span className="text-[10.5px] text-zinc-500 line-through font-mono">
                        ฿{selectedItemForPurchase.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-zinc-400 block">เลือกวิธีชำระเงิน</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod("promptpay")}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === "promptpay"
                          ? "border-[#deb34a] bg-[#deb34a]/15 text-[#DEB34A]"
                          : "border-zinc-800 bg-[#15151c] text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <QrCode className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[9.5px] font-medium block">พร้อมเพย์ QR</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("credit")}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === "credit"
                          ? "border-[#deb34a] bg-[#deb34a]/15 text-[#DEB34A]"
                          : "border-zinc-800 bg-[#15151c] text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[9.5px] font-medium block">บัตรเครดิต</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("linepay")}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === "linepay"
                          ? "border-[#deb34a] bg-[#deb34a]/15 text-[#DEB34A]"
                          : "border-zinc-800 bg-[#15151c] text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <div className="w-4 h-4 mx-auto mb-1 font-bold text-[10px] text-emerald-400">LINE</div>
                      <span className="text-[9.5px] font-medium block">LINE Pay</span>
                    </button>
                  </div>
                </div>

                {/* Final Total and Action */}
                <div className="pt-2 border-t border-zinc-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-300">ยอดชำระสุทธิ</span>
                    <span className="text-lg font-extrabold text-[#DEB34A] font-mono">
                      ฿{selectedItemForPurchase.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={handleConfirmPurchase}
                    disabled={isProcessing}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F5D77F] via-[#DEB34A] to-[#B38728] text-black font-extrabold text-xs hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    {isProcessing ? (
                      <span>กำลังประมวลผลการชำระเงิน...</span>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>ชำระเงิน ฿{selectedItemForPurchase.price.toLocaleString()}</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
