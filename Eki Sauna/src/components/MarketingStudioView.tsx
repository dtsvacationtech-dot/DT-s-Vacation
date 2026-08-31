import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { 
  Plus, 
  Ticket, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { MarketingCampaign, CustomerVoucher } from '../mockData';

interface Props {
  campaigns: MarketingCampaign[];
  onCreateCampaign: (newCampaign: MarketingCampaign) => void;
  onToggleStatus: (campaignId: string) => void;
  onPushToCustomer: (voucher: CustomerVoucher) => void;
}

export const MarketingStudioView: FC<Props> = ({ 
  campaigns, 
  onCreateCampaign, 
  onToggleStatus,
  onPushToCustomer 
}) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState<'FREE_PASS' | 'CASH_DISCOUNT' | 'PERCENT_DISCOUNT'>('FREE_PASS');
  const [discountValue, setDiscountValue] = useState<number>(450);
  const [minSpend, setMinSpend] = useState<number>(0);
  const [eligibleTiers, setEligibleTiers] = useState<string[]>(['GOLD', 'BLACK_DIAMOND']);
  const [totalQuota, setTotalQuota] = useState<number>(50);
  const [expireDate, setExpireDate] = useState<string>('2026-10-31');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleTierToggle = (tier: string) => {
    if (eligibleTiers.includes(tier)) {
      setEligibleTiers(eligibleTiers.filter(t => t !== tier));
    } else {
      setEligibleTiers([...eligibleTiers, tier]);
    }
  };

  const handleCreateCoupon = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !code) {
      alert('กรุณากรอกชื่อแคมเปญและรหัสคูปอง');
      return;
    }

    const newCamp: MarketingCampaign = {
      id: `camp-${Date.now().toString().slice(-4)}`,
      title,
      code: code.toUpperCase(),
      type,
      discountValue: Number(discountValue),
      minSpend: Number(minSpend),
      eligibleTiers,
      totalQuota: Number(totalQuota),
      usedCount: 0,
      startDate: new Date().toISOString().split('T')[0],
      expireDate,
      isActive: true
    };

    onCreateCampaign(newCamp);

    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#60A5FA', '#FFFFFF']
    });

    setSuccessMsg(`🎉 สร้างแคมเปญ "${title}" เรียบร้อยแล้ว! พร้อมใช้งานทันที`);
    setTitle('');
    setCode('');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handlePushTestVoucher = (camp: MarketingCampaign) => {
    const newVoucher: CustomerVoucher = {
      id: `cv-push-${Date.now()}`,
      code: camp.code,
      title: camp.title,
      type: camp.type as any,
      value: camp.discountValue,
      description: `คูปองพิเศษจากการตลาด: ${camp.title} (ส่วนลด ${camp.discountValue} ฿)`,
      expireDate: camp.expireDate,
      status: 'ACTIVE',
      badgeColor: 'border-yellow-500/50 bg-yellow-950/40 text-yellow-300'
    };

    onPushToCustomer(newVoucher);
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.7 }
    });
    setSuccessMsg(`🚀 ยิงคูปอง [${camp.code}] เข้ากระเป๋า LINE ของลูกค้าจำลองแล้ว! (ลองคลิกดูที่ LINE View)`);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  return (
    <div className="flex-1 bg-[#0c0c0f] text-zinc-100 p-4 md:p-6 flex flex-col font-['Prompt',sans-serif] h-full overflow-y-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Eki Marketing & Coupon Creator Studio
              <span className="text-xs bg-amber-950 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
                ADMIN ACCESS
              </span>
            </h2>
            <p className="text-xs text-zinc-400">ระบบสร้างคูปอง กำหนดสิทธิ์ และบริหารแคมเปญการตลาดด้วยตัวเอง</p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="my-3 p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 flex-1">
        
        {/* Left Column: Coupon Creation Form */}
        <div className="lg:col-span-5">
          <div className="luxury-card-gold rounded-2xl p-5 border border-amber-500/40 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
              <Plus className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-sm">สร้างคูปอง / โปรโมชันใหม่ (Create Coupon)</h3>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3.5 text-xs">
              
              <div>
                <label className="text-zinc-300 font-medium block mb-1">
                  🏷️ ชื่อแคมเปญ / คูปอง
                </label>
                <input
                  type="text"
                  placeholder="เช่น ฉลองเปิดสาขาใหม่ เข้าซาวน่าฟรี"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-zinc-300 font-medium block mb-1">
                    🔢 รหัสคูปอง (Code)
                  </label>
                  <input
                    type="text"
                    placeholder="EKI-FREE-GIFT"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-amber-300 font-mono font-bold uppercase placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 font-medium block mb-1">
                    🎯 ประเภทคูปอง
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="FREE_PASS">🎟️ เข้าฟรี (Free Pass)</option>
                    <option value="CASH_DISCOUNT">💵 ลดเงินสด (Cash Off)</option>
                    <option value="PERCENT_DISCOUNT">🏷️ ลดเปอร์เซ็นต์ (% Off)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-zinc-300 font-medium block mb-1">
                    {type === 'PERCENT_DISCOUNT' ? 'เปอร์เซ็นต์ส่วนลด (%)' : 'มูลค่าส่วนลด (บาท)'}
                  </label>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-amber-300 font-mono font-bold focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 font-medium block mb-1">
                    ยอดซื้อขั้นต่ำ (บาท)
                  </label>
                  <input
                    type="number"
                    value={minSpend}
                    onChange={(e) => setMinSpend(Number(e.target.value))}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-zinc-300 font-medium block mb-1">
                    👥 จำกัดจำนวนสิทธิ์ (Quota)
                  </label>
                  <input
                    type="number"
                    value={totalQuota}
                    onChange={(e) => setTotalQuota(Number(e.target.value))}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 font-medium block mb-1">
                    ⏳ วันหมดอายุ
                  </label>
                  <input
                    type="date"
                    value={expireDate}
                    onChange={(e) => setExpireDate(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-300 font-medium block mb-1.5">
                  👑 ระดับสมาชิกที่ใช้ได้ (Tier Locking)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['BRONZE', 'SILVER', 'GOLD', 'BLACK_DIAMOND'].map((tier) => {
                    const isChecked = eligibleTiers.includes(tier);
                    return (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => handleTierToggle(tier)}
                        className={`py-1.5 px-2 rounded-lg border text-left flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-semibold'
                            : 'border-zinc-800 bg-[#16161d] text-zinc-500'
                        }`}
                      >
                        <span className="text-[11px]">{tier}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-extrabold text-xs hover:brightness-110 active:scale-98 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  บันทึกและเปิดใช้งานแคมเปญทันที
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Column: Active Campaigns */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="luxury-card rounded-2xl p-5 border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-sm">แคมเปญคูปองที่เปิดใช้งานอยู่ ({campaigns.length} รายการ)</h3>
              </div>
              <span className="text-[11px] text-zinc-400">อัปเดตแบบ Real-time</span>
            </div>

            <div className="space-y-3">
              {campaigns.map((camp) => {
                const percentage = Math.round((camp.usedCount / camp.totalQuota) * 100);
                return (
                  <div 
                    key={camp.id}
                    className="p-4 rounded-2xl border border-zinc-800 bg-[#141419] space-y-3 hover:border-amber-500/40 transition-all shadow-md"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/60 border border-amber-500/40 text-amber-300">
                            {camp.code}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            camp.isActive 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' 
                              : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {camp.isActive ? '🟢 ACTIVE' : '⏸️ PAUSED'}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm mt-1.5">{camp.title}</h4>
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handlePushTestVoucher(camp)}
                          title="แจกคูปองนี้เข้ากระเป๋าลูกค้าจำลอง"
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <Send className="w-3 h-3" /> ยิงเข้า LINE ลูกค้า
                        </button>
                        <button
                          onClick={() => onToggleStatus(camp.id)}
                          className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-[11px] font-medium cursor-pointer transition-all"
                        >
                          {camp.isActive ? 'พักแคมเปญ' : 'เปิดใช้งาน'}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-zinc-400">
                        <span>ใช้ไปแล้ว: <strong className="text-white font-mono">{camp.usedCount}</strong> / {camp.totalQuota} สิทธิ์</span>
                        <span className="text-amber-300 font-mono font-bold">{percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/70 rounded-full overflow-hidden border border-zinc-800">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap justify-between items-center text-[11px] text-zinc-400 gap-2">
                      <div className="flex items-center gap-2">
                        <span>สิทธิ์สำหรับ:</span>
                        <div className="flex gap-1">
                          {camp.eligibleTiers.map(t => (
                            <span key={t} className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>หมดอายุ: {camp.expireDate}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
