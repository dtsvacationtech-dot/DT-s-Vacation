import { useState } from "react";
import type { FC } from "react";
import { X, Copy, Check, Crown, ArrowRight } from "lucide-react";

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
}

const PROMOTIONS_LIST = [
  {
    id: "welcome-20",
    code: "EKIWELCOME20",
    title: "FIRST VISIT PRIVILEGE — ลดทันที 20%",
    subtitle: "สำหรับลูกค้าที่เข้าใช้บริการครั้งแรก",
    desc: "รับส่วนลด 20% สำหรับแพ็กเกจ Onsen & Hinoki Sauna Combo ทุกวันจันทร์ - พฤหัสบดี",
    badge: "Welcome Deal",
    expire: "31 ธ.ค. 2026",
    tagColor: "from-amber-500 to-yellow-600",
  },
  {
    id: "vip-matcha",
    code: "EKIVIPSUITE",
    title: "VIP PRIVATE SUITE — ฟรีชุดชามัทฉะ & วากาชิ",
    subtitle: "สัมผัสความหรูหราแบบญี่ปุ่นแท้",
    desc: "เมื่อจองห้อง VIP Private Hinoki Suite 120 นาที รับฟรีเซ็ตชาเขียวมัทฉะอุจิและขนมวากาชิญี่ปุ่น 1 ชุด",
    badge: "VIP Exclusive",
    expire: "30 ก.ย. 2026",
    tagColor: "from-emerald-500 to-teal-700",
  },
  {
    id: "couple-retreat",
    code: "EKICOUPLERETREAT",
    title: "COUPLE RETREAT PACKAGE — ฿1,800 (ปกติ ฿2,400)",
    subtitle: "แพ็กเกจคู่รักสุดพิเศษ",
    desc: "แพ็กเกจแช่ออนเซ็นและซาวน่าสำหรับ 2 ท่าน พร้อมผ้าเช็ดตัวและเครื่องดื่มซิกเนเจอร์",
    badge: "Best Seller",
    expire: "31 ต.ค. 2026",
    tagColor: "from-purple-500 to-indigo-700",
  },
];

export const PromotionModal: FC<PromotionModalProps> = ({ isOpen, onClose, onBook }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#0F0E13] border border-[#D4AF37]/50 rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/30 bg-[#16141A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#201D16]">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-base font-bold tracking-wider text-[#F3E5AB]">
                SPECIAL PROMOTIONS & VOUCHERS
              </h3>
              <p className="font-thai text-[11px] text-zinc-400 font-light">
                โปรโมชั่นพิเศษและโค้ดส่วนลดสำหรับสมาชิก EKI
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Promotions List */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          {PROMOTIONS_LIST.map((promo) => (
            <div
              key={promo.id}
              className="relative p-4 rounded-lg bg-[#141318] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-md group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40">
                      {promo.badge}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      หมดเขต: {promo.expire}
                    </span>
                  </div>

                  <h4 className="font-thai text-sm font-bold text-white group-hover:text-[#F3E5AB] transition-colors mt-1">
                    {promo.title}
                  </h4>
                  <p className="font-thai text-xs text-zinc-400 font-light leading-relaxed">
                    {promo.desc}
                  </p>
                </div>

                {/* Promo Code & Copy Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => handleCopy(promo.code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1F1D17] border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer"
                    title="คัดลอกโค้ดส่วนลด"
                  >
                    {copiedCode === promo.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                        <span className="text-emerald-300 font-thai">คัดลอกแล้ว</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{promo.code}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onBook();
                    }}
                    className="text-[11px] text-[#D4AF37] hover:text-white flex items-center gap-1 font-thai underline font-medium"
                  >
                    ใช้สิทธิ์จองทันที <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 bg-[#141318] border-t border-zinc-800 flex items-center justify-between">
          <span className="font-thai text-xs text-zinc-400">
            *เงื่อนไขเป็นไปตามที่บริษัทกำหนด สามารถแสดงโค้ดที่เคาน์เตอร์ได้ทันที
          </span>

          <button
            onClick={() => {
              onClose();
              onBook();
            }}
            className="px-5 py-2 rounded-sm bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-serif-luxury text-xs font-bold tracking-wider hover:scale-105 transition-transform"
          >
            BOOK NOW
          </button>
        </div>

      </div>
    </div>
  );
};
