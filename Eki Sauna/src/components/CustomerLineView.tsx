import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { 
  CreditCard, 
  Ticket, 
  Sparkles, 
  PhoneCall, 
  BookOpen, 
  Award, 
  QrCode, 
  Clock, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Flame, 
  MapPin, 
  RefreshCw,
  ShoppingBag,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  TIER_BENEFITS, 
  STORE_VOUCHERS, 
  SAUNA_SERVICES 
} from '../mockData';
import type { 
  Member, 
  CustomerVoucher, 
  StoreVoucher 
} from '../mockData';

interface Props {
  member: Member;
  myVouchers: CustomerVoucher[];
  onBuyVoucher: (voucher: StoreVoucher) => void;
}

export const CustomerLineView: FC<Props> = ({ member, myVouchers, onBuyVoucher }) => {
  const [activeTab, setActiveTab] = useState<'member' | 'booking' | 'voucher' | 'services'>('member');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [qrCounter, setQrCounter] = useState(59);
  const [buyingVoucher, setBuyingVoucher] = useState<StoreVoucher | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setQrCounter((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const handlePurchase = (item: StoreVoucher) => {
    setBuyingVoucher(item);
  };

  const confirmPurchase = () => {
    if (buyingVoucher) {
      onBuyVoucher(buyingVoucher);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFF', '#E5C158']
      });
      setPurchaseSuccess(true);
      setTimeout(() => {
        setPurchaseSuccess(false);
        setBuyingVoucher(null);
      }, 1600);
    }
  };

  return (
    <div className="relative mx-auto max-w-[420px] rounded-[44px] border-[8px] border-[#1f1f24] bg-[#09090b] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col h-[820px] font-['Prompt',sans-serif]">
      
      {/* iOS Status Bar & Dynamic Island */}
      <div className="bg-[#0e0e12] px-7 pt-3 pb-2 flex justify-between items-center text-[12px] text-zinc-400 font-medium tracking-tight">
        <span>13:42</span>
        <div className="w-24 h-4 bg-black rounded-full mx-auto" />
        <div className="flex items-center gap-1.5 text-zinc-300">
          <span className="text-[10px] font-mono">5G</span>
          <div className="w-5 h-2.5 border border-zinc-500 rounded-sm p-0.5 flex items-center">
            <div className="w-full h-full bg-emerald-400 rounded-2xs" />
          </div>
        </div>
      </div>

      {/* LINE Chat Header */}
      <div className="bg-[#121216] border-b border-zinc-800/80 px-4 py-2.5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 p-0.5">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
              <CheckCircle2 className="w-2.5 h-2.5 text-black stroke-[3]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-semibold text-white tracking-wide">Eki Sauna Official</h2>
              <span className="bg-emerald-900/60 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded font-mono">VERIFIED</span>
            </div>
            <p className="text-[11px] text-zinc-400">Automated Luxury Responses</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-zinc-400">
          <Clock className="w-4 h-4 hover:text-[#D4AF37] cursor-pointer" />
          <Info className="w-4 h-4 hover:text-[#D4AF37] cursor-pointer" />
        </div>
      </div>

      {/* LINE Chat History Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#0a0a0d] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,90,20,0.15),rgba(255,255,255,0))]">
        
        {/* Date Divider */}
        <div className="flex justify-center my-1">
          <span className="bg-zinc-900/90 text-zinc-400 text-[10px] px-3 py-1 rounded-full border border-zinc-800">
            วันนี้ 31 สิงหาคม 2026
          </span>
        </div>

        {/* Promo Hero Banner Bubble */}
        <div className="rounded-2xl overflow-hidden border border-amber-500/30 bg-gradient-to-b from-[#221c12] to-[#12110e] shadow-lg">
          <div className="relative h-28 bg-[#1a160e] flex items-center justify-between p-4 overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none" />
            <div className="z-10">
              <div className="flex items-center gap-1 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Eki Exclusive Perks
              </div>
              <h3 className="text-white font-bold text-base leading-snug">
                สิทธิ์เดือนเกิด <span className="text-[#D4AF37]">เข้าฟรี 1 ครั้ง</span>
              </h3>
              <p className="text-zinc-300 text-xs mt-0.5">เฉพาะสมาชิก Eki Member ระดับ Gold ขึ้นไป</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-lg transform rotate-3">
              <Flame className="w-8 h-8 text-black" />
            </div>
          </div>
          <div className="p-3 bg-black/40 border-t border-amber-500/20 flex justify-between items-center text-xs">
            <span className="text-zinc-400">หมดเขต 30 ก.ย. 2026</span>
            <button 
              onClick={() => handleOpenModal('vouchers')}
              className="text-[#D4AF37] font-medium flex items-center gap-1 hover:underline cursor-pointer"
            >
              กดดูสิทธิ์ในกระเป๋า <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Message Bubble from Eki Sauna */}
        <div className="flex items-start gap-2 max-w-[90%]">
          <div className="w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold text-xs shrink-0 mt-0.5">
            EKI
          </div>
          <div className="bg-[#18181f] border border-zinc-800 text-zinc-200 text-xs p-3.5 rounded-2xl rounded-tl-xs leading-relaxed space-y-1.5 shadow-md">
            <p className="font-semibold text-[#D4AF37]">ยินดีต้อนรับ คุณธนภัทร ✨</p>
            <p>ขณะนี้คุณมีสถานะเป็น <strong className="text-amber-300">Gold VIP Member</strong> มีแต้มสะสม <strong>1,850 แต้ม</strong> และมีคูปองที่ยังไม่ได้ใช้งาน <strong>4 ใบ</strong></p>
            <p className="text-zinc-400 text-[11px] pt-1">💡 แตะเลือกเมนูด้านล่างเพื่อเปิดหน้าต่างที่ต้องการได้ทันทีครับ</p>
          </div>
        </div>
      </div>

      {/* LINE Rich Menu (Bar B Q Plaza / GON Member Style - Luxury Black & Gold) */}
      <div className="bg-[#0f0f13] border-t border-amber-500/30 shrink-0">
        
        {/* Top 4 Tabs */}
        <div className="grid grid-cols-4 border-b border-zinc-800 text-[11px] font-medium">
          <button 
            onClick={() => setActiveTab('member')}
            className={`py-2 px-1 text-center transition-all ${
              activeTab === 'member' 
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-black font-bold shadow-inner' 
                : 'bg-[#15151a] text-zinc-400 hover:text-white'
            }`}
          >
            Eki Member
          </button>
          <button 
            onClick={() => setActiveTab('booking')}
            className={`py-2 px-1 text-center transition-all ${
              activeTab === 'booking' 
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-black font-bold shadow-inner' 
                : 'bg-[#15151a] text-zinc-400 hover:text-white'
            }`}
          >
            จองคิว/เข้าใช้
          </button>
          <button 
            onClick={() => setActiveTab('voucher')}
            className={`py-2 px-1 text-center transition-all ${
              activeTab === 'voucher' 
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-black font-bold shadow-inner' 
                : 'bg-[#15151a] text-zinc-400 hover:text-white'
            }`}
          >
            Eki Voucher
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`py-2 px-1 text-center transition-all ${
              activeTab === 'services' 
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-black font-bold shadow-inner' 
                : 'bg-[#15151a] text-zinc-400 hover:text-white'
            }`}
          >
            บริการพิเศษ
          </button>
        </div>

        {/* 6-Grid Rich Menu Actions */}
        <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#0a0a0d]">
          
          <button 
            onClick={() => handleOpenModal('member')}
            className="group relative flex flex-col items-center justify-center p-2.5 rounded-xl bg-gradient-to-b from-[#201d15] to-[#12110c] border border-amber-500/40 hover:border-amber-400 transition-all active:scale-95 shadow-md text-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-200 p-0.5 flex items-center justify-center shadow-lg mb-1.5">
              <div className="w-full h-full bg-black/80 rounded-[10px] flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-200">บัตรสมาชิก</span>
            <span className="text-[9px] text-zinc-400">Eki Member</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </button>

          <button 
            onClick={() => handleOpenModal('vouchers')}
            className="group relative flex flex-col items-center justify-center p-2.5 rounded-xl bg-gradient-to-b from-[#201d15] to-[#12110c] border border-amber-500/40 hover:border-amber-400 transition-all active:scale-95 shadow-md text-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-300 p-0.5 flex items-center justify-center shadow-lg mb-1.5">
              <div className="w-full h-full bg-black/80 rounded-[10px] flex items-center justify-center">
                <Ticket className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-200">คูปองของฉัน</span>
            <span className="text-[9px] text-zinc-400">My Vouchers ({myVouchers.filter(v => v.status === 'ACTIVE').length})</span>
          </button>

          <button 
            onClick={() => handleOpenModal('store')}
            className="group relative flex flex-col items-center justify-center p-2.5 rounded-xl bg-gradient-to-b from-[#251e10] to-[#141007] border border-amber-400 hover:border-yellow-300 transition-all active:scale-95 shadow-lg text-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 p-0.5 flex items-center justify-center shadow-lg mb-1.5">
              <div className="w-full h-full bg-black/80 rounded-[10px] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-yellow-300 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-yellow-300">ซื้อ Voucher</span>
            <span className="text-[9px] text-amber-400/90 font-medium">ลดสูงสุด 30%</span>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-bold px-1 rounded-full">HOT</span>
          </button>

          <button 
            onClick={() => handleOpenModal('tiers')}
            className="group relative flex flex-col items-center justify-center p-2.5 rounded-xl bg-gradient-to-b from-[#18181f] to-[#0e0e12] border border-zinc-700/60 hover:border-amber-500/40 transition-all active:scale-95 shadow-md text-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-800 p-0.5 flex items-center justify-center shadow-lg mb-1.5">
              <div className="w-full h-full bg-black/80 rounded-[10px] flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-zinc-200">สิทธิประโยชน์</span>
            <span className="text-[9px] text-zinc-400">Tier Privileges</span>
          </button>

          <button 
            onClick={() => handleOpenModal('menu')}
            className="group relative flex flex-col items-center justify-center p-2.5 rounded-xl bg-gradient-to-b from-[#18181f] to-[#0e0e12] border border-zinc-700/60 hover:border-amber-500/40 transition-all active:scale-95 shadow-md text-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-zinc-500 to-zinc-700 p-0.5 flex items-center justify-center shadow-lg mb-1.5">
              <div className="w-full h-full bg-black/80 rounded-[10px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-zinc-300 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-zinc-200">บริการ & ราคา</span>
            <span className="text-[9px] text-zinc-400">Service Menu</span>
          </button>

          <button 
            onClick={() => handleOpenModal('contact')}
            className="group relative flex flex-col items-center justify-center p-2.5 rounded-xl bg-gradient-to-b from-[#18181f] to-[#0e0e12] border border-zinc-700/60 hover:border-amber-500/40 transition-all active:scale-95 shadow-md text-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 p-0.5 flex items-center justify-center shadow-lg mb-1.5">
              <div className="w-full h-full bg-black/80 rounded-[10px] flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-cyan-300 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-zinc-200">ติดต่อสอบถาม</span>
            <span className="text-[9px] text-zinc-400">Contact & Map</span>
          </button>

        </div>
      </div>

      {/* Standalone Modals */}
      {activeModal === 'member' && (
        <div className="absolute inset-0 bg-[#0a0a0e] z-50 flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-200">
          <div className="bg-[#121217] p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-bold text-white text-sm">บัตรสมาชิก Eki Member</h3>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            
            {/* Gold Card */}
            <div className="relative rounded-3xl p-5 bg-gradient-to-br from-[#2a2212] via-[#1a160d] to-[#0d0c08] border border-amber-400/50 shadow-[0_15px_35px_rgba(212,175,55,0.2)] overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-extrabold tracking-widest text-amber-200 text-sm font-['Montserrat']">EKI SAUNA</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 tracking-wider">EXCLUSIVE PRIVILEGE CLUB</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-400/60 text-amber-300 shadow-inner">
                  👑 GOLD VIP
                </span>
              </div>

              <div className="space-y-1 my-4">
                <p className="text-zinc-400 text-xs">ชื่อสมาชิก</p>
                <h4 className="text-white font-bold text-base tracking-wide">{member.name}</h4>
                <p className="text-amber-400 font-mono text-xs tracking-wider">{member.phone}</p>
              </div>

              <div className="pt-3 border-t border-amber-500/20 space-y-1.5">
                <div className="flex justify-between text-[10px] text-zinc-300">
                  <span>ยอดใช้จ่ายสะสม {member.totalSpent.toLocaleString()} ฿</span>
                  <span className="text-amber-300">อีก {(member.nextTierSpend - member.totalSpent).toLocaleString()} ฿ ขึ้น Black Diamond</span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-amber-500/20">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full" 
                    style={{ width: `${(member.totalSpent / member.nextTierSpend) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#141419] border border-zinc-800 rounded-2xl p-3 text-center">
                <span className="text-[10px] text-zinc-400 block">แต้มสะสม</span>
                <span className="text-base font-bold text-[#D4AF37] font-mono">{member.points}</span>
                <span className="text-[9px] text-zinc-500 block">Points</span>
              </div>
              <div className="bg-[#141419] border border-zinc-800 rounded-2xl p-3 text-center">
                <span className="text-[10px] text-zinc-400 block">เข้าใช้แล้ว</span>
                <span className="text-base font-bold text-white font-mono">{member.totalVisits}</span>
                <span className="text-[9px] text-zinc-500 block">ครั้ง</span>
              </div>
              <div className="bg-[#141419] border border-zinc-800 rounded-2xl p-3 text-center">
                <span className="text-[10px] text-zinc-400 block">คูปองที่ใช้ได้</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  {myVouchers.filter(v => v.status === 'ACTIVE').length}
                </span>
                <span className="text-[9px] text-zinc-500 block">ใบ</span>
              </div>
            </div>

            {/* Dynamic Anti-Fraud QR Code for Counter Scan */}
            <div className="bg-gradient-to-b from-[#181820] to-[#101014] border border-amber-500/30 rounded-3xl p-5 text-center space-y-3 shadow-lg">
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-medium">
                <ShieldCheck className="w-4 h-4" /> สแกนหน้าร้านเพื่อรับสิทธิ์ / ตัดคูปอง
              </div>

              <div className="bg-white p-3.5 rounded-2xl w-48 h-48 mx-auto flex flex-col items-center justify-center shadow-inner relative">
                <QrCode className="w-36 h-36 text-black" />
                <div className="text-[9px] text-black font-mono font-bold tracking-widest mt-1">
                  EKI-QR-{member.id.split('-')[2]}-{qrCounter}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
                <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                <span>QR Code อัปเดตใหม่ใน <strong className="text-amber-400 font-mono">{qrCounter}</strong> วินาที</span>
              </div>
              <p className="text-[10px] text-zinc-500">ระบบป้องกันการแคปหน้าจอส่งต่อ เพื่อความปลอดภัยของสมาชิก</p>
            </div>

          </div>
        </div>
      )}

      {/* Other modals (vouchers, store, tiers, menu, contact) */}
      {activeModal === 'vouchers' && (
        <div className="absolute inset-0 bg-[#0a0a0e] z-50 flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-200">
          <div className="bg-[#121217] p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">คลังคูปอง & สิทธิ์ของฉัน</h3>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="text-xs text-zinc-400 flex justify-between items-center">
              <span>คูปองพร้อมใช้งาน ({myVouchers.filter(v => v.status === 'ACTIVE').length} ใบ)</span>
              <span className="text-[#D4AF37] text-[11px] cursor-pointer hover:underline" onClick={() => setActiveModal('store')}>
                + ซื้อคูปองเพิ่ม
              </span>
            </div>

            {myVouchers.map((voucher) => (
              <div 
                key={voucher.id}
                className={`p-4 rounded-2xl border bg-[#14141a] space-y-2 transition-all ${
                  voucher.status === 'ACTIVE' 
                    ? voucher.badgeColor 
                    : 'border-zinc-800 opacity-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 border border-current font-mono">
                      {voucher.code}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-1">{voucher.title}</h4>
                  </div>
                  {voucher.remainingUses !== undefined && (
                    <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-500/40">
                      เหลือ {voucher.remainingUses}/{voucher.totalUses} ครั้ง
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{voucher.description}</p>

                <div className="pt-2 border-t border-zinc-800/60 flex justify-between items-center text-[11px]">
                  <span className="text-zinc-400">หมดอายุ: {voucher.expireDate}</span>
                  <button 
                    onClick={() => setActiveModal('member')}
                    className="px-3 py-1 rounded-lg bg-[#D4AF37] text-black font-bold hover:bg-amber-400 transition-all text-xs cursor-pointer"
                  >
                    เปิด QR ให้เคาน์เตอร์สแกน
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeModal === 'store' && (
        <div className="absolute inset-0 bg-[#0a0a0e] z-50 flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-200">
          <div className="bg-[#121217] p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-yellow-300" />
              <h3 className="font-bold text-white text-sm">ซื้อ Voucher สุดคุ้ม (Eki Store)</h3>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-950/40 to-yellow-950/20 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>ซื้อแพ็กเกจล่วงหน้าคุ้มกว่า ประหยัดสูงสุดถึง 1,000 บาท!</span>
            </div>

            {STORE_VOUCHERS.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#1a1712] to-[#100f0b] space-y-2.5 shadow-md hover:border-amber-400 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {item.tag}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-1">{item.title}</h4>
                  </div>
                  {item.popular && (
                    <span className="text-[9px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">
                      POPULAR
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>

                <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-amber-300 font-mono">{item.salePrice.toLocaleString()} ฿</span>
                    <span className="text-xs text-zinc-500 line-through font-mono">{item.originalPrice.toLocaleString()} ฿</span>
                  </div>
                  <button 
                    onClick={() => handlePurchase(item)}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold text-xs hover:brightness-110 transition-all active:scale-95 shadow-md cursor-pointer"
                  >
                    สั่งซื้อทันที
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeModal === 'tiers' && (
        <div className="absolute inset-0 bg-[#0a0a0e] z-50 flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-200">
          <div className="bg-[#121217] p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-sm">ระดับสมาชิก & สิทธิประโยชน์</h3>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
            {TIER_BENEFITS.map((tier) => {
              const cardImg = 
                tier.tier === 'SILVER' ? '/images/card_silver_member.webp' :
                tier.tier === 'GOLD' ? '/images/card_gold_member.webp' :
                tier.tier === 'BLACK_DIAMOND' ? '/images/card_platinum_member.webp' :
                '/images/card_eco_member.webp';
              
              const auraClass = 
                tier.tier === 'SILVER' ? 'aura-silver' :
                tier.tier === 'GOLD' ? 'aura-gold' :
                tier.tier === 'BLACK_DIAMOND' ? 'aura-platinum' : '';

              const dropShadowClass = 
                tier.tier === 'SILVER' ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]' :
                tier.tier === 'GOLD' ? 'drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]' :
                tier.tier === 'BLACK_DIAMOND' ? 'drop-shadow-[0_0_16px_rgba(192,132,252,0.9)]' : '';

              return (
                <div 
                  key={tier.tier}
                  className={`p-4 rounded-2xl border bg-[#141419] space-y-2.5 transition-all ${
                    member.tier === tier.tier 
                      ? 'border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.2)] bg-gradient-to-br from-[#221c10] to-[#12110c]' 
                      : 'border-zinc-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{tier.badge}</h4>
                      {member.tier === tier.tier && (
                        <span className="text-[10px] bg-amber-400 text-black font-bold px-2 py-0.5 rounded-full">
                          ระดับของคุณ
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono">{tier.minSpend}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {/* Tier Card with Aura */}
                    <div className="relative w-[120px] aspect-[2/1] shrink-0 select-none flex items-center justify-center">
                      {auraClass && <div className={auraClass} />}
                      <img 
                        src={cardImg} 
                        alt={tier.name} 
                        className={`w-full h-full object-contain relative z-10 ${dropShadowClass}`} 
                      />
                      <div className="absolute inset-[2.5px] rounded-[8px] overflow-hidden pointer-events-none z-20">
                        <div className="card-shimmer" />
                      </div>
                    </div>

                    <ul className="space-y-1.5 text-xs text-zinc-300 flex-1">
                      {tier.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeModal === 'menu' && (
        <div className="absolute inset-0 bg-[#0a0a0e] z-50 flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-200">
          <div className="bg-[#121217] p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-zinc-300" />
              <h3 className="font-bold text-white text-sm">บริการ & เมนูราคา (Eki Menu)</h3>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {SAUNA_SERVICES.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl border border-zinc-800 bg-[#141419] space-y-2 hover:border-amber-500/40 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    {item.highlight && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.highlight}
                      </span>
                    )}
                    <h4 className="font-bold text-white text-sm mt-1">{item.name}</h4>
                    <p className="text-[11px] text-zinc-400">{item.nameEn} • {item.duration}</p>
                  </div>
                  <span className="text-base font-bold text-amber-300 font-mono">{item.price.toLocaleString()} ฿</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeModal === 'contact' && (
        <div className="absolute inset-0 bg-[#0a0a0e] z-50 flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-200">
          <div className="bg-[#121217] p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-cyan-300" />
              <h3 className="font-bold text-white text-sm">ข้อมูลสาขา & ติดต่อสอบถาม</h3>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            <div className="p-4 rounded-2xl border border-zinc-800 bg-[#141419] space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D4AF37]" /> สาขาเอกมัย (Eki Flagship)
              </h4>
              <p className="text-zinc-300 leading-relaxed">
                เลขที่ 88/1 ซอยเอกมัย 12 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110 (มีที่จอดรถ VIP รองรับ 25 คัน)
              </p>
              <div className="pt-2 flex gap-2">
                <a 
                  href="#map" 
                  onClick={(e) => { e.preventDefault(); alert('เปิด Google Maps นำทางสู่ Eki Sauna Flagship'); }}
                  className="flex-1 py-2 text-center bg-zinc-800 text-zinc-200 rounded-xl font-medium hover:bg-zinc-700 transition-all cursor-pointer"
                >
                  📍 เปิด Google Maps
                </a>
                <a 
                  href="tel:021234567" 
                  className="flex-1 py-2 text-center bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-amber-400 transition-all cursor-pointer"
                >
                  📞 โทร 02-123-4567
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-zinc-800 bg-[#141419] space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D4AF37]" /> เวลาเปิด-ปิดให้บริการ
              </h4>
              <div className="space-y-1 text-zinc-300">
                <div className="flex justify-between">
                  <span>จันทร์ - ศุกร์:</span>
                  <span className="font-mono text-amber-300">11:00 - 24:00 น.</span>
                </div>
                <div className="flex justify-between">
                  <span>เสาร์ - อาทิตย์ & นักขัตฤกษ์:</span>
                  <span className="font-mono text-amber-300">10:00 - 24:00 น.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Simulator */}
      {buyingVoucher && (
        <div className="absolute inset-0 bg-black/90 z-60 flex flex-col justify-end p-4 animate-in fade-in duration-200">
          <div className="bg-[#14141a] border border-amber-500/40 rounded-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-white text-sm">ชำระเงินผ่าน PromptPay QR</h4>
              <button 
                onClick={() => setBuyingVoucher(null)}
                className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center space-y-1 bg-[#1c1c24] p-3 rounded-2xl border border-zinc-800">
              <span className="text-xs text-zinc-400">{buyingVoucher.title}</span>
              <div className="text-2xl font-bold text-amber-300 font-mono">
                {buyingVoucher.salePrice.toLocaleString()} THB
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl w-40 h-40 mx-auto flex flex-col items-center justify-center">
              <QrCode className="w-32 h-32 text-[#003B64]" />
              <span className="text-[8px] font-bold text-[#003B64] font-mono mt-0.5">PROMPTPAY BILLER ID</span>
            </div>

            {purchaseSuccess ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs text-center rounded-xl font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> ชำระเงินสำเร็จ! เพิ่มคูปองเข้า Wallet แล้ว
              </div>
            ) : (
              <button 
                onClick={confirmPurchase}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold text-xs hover:brightness-110 transition-all cursor-pointer shadow-lg"
              >
                จำลองการโอนเงินสำเร็จ (Auto Confirm)
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
