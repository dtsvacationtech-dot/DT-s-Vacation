import type { FC } from 'react';
import { 
  Award, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { TIER_BENEFITS } from '../../mockData';
import type { Member } from '../../mockData';

interface Props {
  member: Member;
  onNavigate: (page: string) => void;
}

export const TierPrivilegesPage: FC<Props> = ({ member, onNavigate }) => {
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
        <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-400" /> สิทธิประโยชน์ระดับสมาชิก (Tier Privileges)
        </h1>
        <div className="w-6" />
      </div>

      {/* Member Current Status Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-[#241c10] to-[#12110c] border border-amber-500/40 space-y-2 shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-xs text-zinc-400">สถานะสมาชิกปัจจุบันของคุณ</span>
          <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-400/60 text-amber-300">
            👑 GOLD VIP MEMBER
          </span>
        </div>
        <h2 className="text-lg font-bold text-white">{member.name}</h2>
        <div className="text-xs text-zinc-300 pt-1 flex justify-between border-t border-amber-500/20">
          <span>ยอดใช้จ่ายสะสม: <strong className="text-amber-300 font-mono">{member.totalSpent.toLocaleString()} ฿</strong></span>
          <span>แต้มสะสม: <strong className="text-amber-300 font-mono">{member.points} pts</strong></span>
        </div>
      </div>

      {/* Tiers List */}
      <div className="space-y-3.5">
        {TIER_BENEFITS.map((tier) => {
          const isCurrent = member.tier === tier.tier;
          const cardImg = 
            tier.tier === 'SILVER' ? '/images/card_silver_member.webp' :
            tier.tier === 'GOLD' ? '/images/card_gold_member.webp' :
            tier.tier === 'BLACK_DIAMOND' ? '/images/card_platinum_member.webp' :
            '/images/card_eco_member.webp';
          
          const auraClass = 
            tier.tier === 'SILVER' ? 'aura-silver' :
            tier.tier === 'GOLD' ? 'aura-gold' :
            tier.tier === 'BLACK_DIAMOND' ? 'aura-platinum' : '';

          return (
            <div 
              key={tier.tier}
              className={`p-4 rounded-3xl border bg-[#13131a] space-y-3 transition-all overflow-hidden ${
                isCurrent 
                  ? 'border-amber-400/80 shadow-[0_0_20px_rgba(212,175,55,0.15)] bg-gradient-to-br from-[#1c160c] to-[#0d0b07]' 
                  : 'border-zinc-800 opacity-90'
              }`}
            >
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">{tier.badge}</h3>
                  {isCurrent && (
                    <span className="text-[9px] bg-amber-400 text-black font-extrabold px-2 py-0.5 rounded-full">
                      ระดับปัจจุบันของคุณ
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">{tier.minSpend}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Tier Card with Aura */}
                <div className="relative w-[130px] aspect-[2/1] shrink-0 select-none flex items-center justify-center">
                  {auraClass && <div className={auraClass} />}
                  <img 
                    src={cardImg} 
                    alt={tier.name} 
                    className="w-full h-full object-contain relative z-10" 
                  />
                  <div className="absolute inset-[2.5px] rounded-[8px] overflow-hidden pointer-events-none z-20">
                    <div className="card-shimmer" />
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300 flex-1">
                  {tier.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-2xl bg-[#121217] border border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
        <span>อายุสถานะสมาชิกมีระยะเวลา 1 ปี นับจากวันที่สะสมยอดถึงเกณฑ์</span>
      </div>

    </div>
  );
};
