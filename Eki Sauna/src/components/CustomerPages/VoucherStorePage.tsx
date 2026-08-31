import { useState } from 'react';
import type { FC } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  QrCode, 
  ArrowLeft, 
  CheckCircle2, 
  X, 
  Flame, 
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORE_VOUCHERS } from '../../mockData';
import type { StoreVoucher } from '../../mockData';

interface Props {
  onBuyVoucher: (voucher: StoreVoucher) => void;
  onNavigate: (page: string) => void;
}

export const VoucherStorePage: FC<Props> = ({ onBuyVoucher, onNavigate }) => {
  const [buyingItem, setBuyingItem] = useState<StoreVoucher | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleConfirmPurchase = () => {
    if (buyingItem) {
      onBuyVoucher(buyingItem);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFF', '#E5C158']
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setBuyingItem(null);
        onNavigate('vouchers');
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#070709] text-zinc-100 p-4 pb-12 font-['Prompt',sans-serif] space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pt-2 pb-1 border-b border-zinc-800">
        <button 
          onClick={() => onNavigate('member')}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>บัตรสมาชิก</span>
        </button>
        <h1 className="text-sm font-bold text-white flex items-center gap-1.5 font-['Montserrat']">
          <ShoppingBag className="w-4 h-4 text-yellow-400" /> EKI VOUCHER STORE
        </h1>
        <button 
          onClick={() => onNavigate('vouchers')}
          className="text-xs text-amber-300 hover:underline cursor-pointer"
        >
          กระเป๋าของฉัน ›
        </button>
      </div>

      {/* Hero Store Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#241c10] to-[#14120c] border border-amber-500/40 shadow-lg space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-yellow-300" /> Exclusive Packages
        </div>
        <h2 className="text-base font-bold text-white leading-snug">
          ซื้อแพ็กเกจซาวน่าล่วงหน้า <span className="text-[#D4AF37]">ประหยัดสูงสุด 1,000.-</span>
        </h2>
        <p className="text-xs text-zinc-300">
          คูปองจะถูกส่งเข้ากระเป๋า LINE Member ของคุณทันทีหลังชำระเงิน นำไปสแกนใช้ที่หน้าร้านได้เลย
        </p>
      </div>

      {/* Catalog Items */}
      <div className="space-y-3">
        {STORE_VOUCHERS.map((item) => (
          <div 
            key={item.id}
            className="p-4 rounded-2xl border border-zinc-800 bg-[#13131a] hover:border-amber-500/50 transition-all space-y-3 shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.tag}
                </span>
                <h3 className="font-bold text-white text-sm mt-1.5">{item.title}</h3>
                <span className="text-[10px] text-zinc-500 block mt-0.5">{item.type}</span>
              </div>
              {item.popular && (
                <span className="text-[9px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded-full">
                  HOT SELLER
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>

            <div className="flex justify-between items-center pt-2.5 border-t border-zinc-800">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-amber-300 font-mono">{item.salePrice.toLocaleString()} ฿</span>
                <span className="text-xs text-zinc-500 line-through font-mono">{item.originalPrice.toLocaleString()} ฿</span>
              </div>
              <button 
                onClick={() => setBuyingItem(item)}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-1"
              >
                <span>สั่งซื้อทันที</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PromptPay Checkout Modal */}
      {buyingItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="luxury-card rounded-3xl p-6 max-w-sm w-full border border-amber-500/50 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-bold text-white text-sm">ชำระเงินผ่าน PromptPay QR</h3>
              </div>
              <button 
                onClick={() => setBuyingItem(null)}
                className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#181822] p-3 rounded-2xl border border-zinc-800 text-center space-y-1">
              <span className="text-xs text-zinc-400">{buyingItem.title}</span>
              <div className="text-2xl font-bold text-amber-300 font-mono">
                {buyingItem.salePrice.toLocaleString()} THB
              </div>
            </div>

            {/* PromptPay QR Frame */}
            <div className="bg-white p-3.5 rounded-2xl w-44 h-44 mx-auto flex flex-col items-center justify-center shadow-inner">
              <QrCode className="w-36 h-36 text-[#003B64]" />
              <span className="text-[8px] font-bold text-[#003B64] font-mono mt-0.5">EKI PROMPTPAY BILLER</span>
            </div>

            <div className="text-[11px] text-zinc-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ระบบตรวจสอบสลิปและเพิ่มคูปองเข้า Wallet อัตโนมัติ</span>
            </div>

            {isSuccess ? (
              <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold text-center rounded-xl flex items-center justify-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> ชำระเงินสำเร็จ! กำลังไปที่คลังคูปอง...
              </div>
            ) : (
              <button
                onClick={handleConfirmPurchase}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-lg"
              >
                จำลองการโอนเงินสำเร็จ (Auto Confirm Payment)
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
