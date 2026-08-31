import type { FC } from 'react';
import { 
  BookOpen, 
  ArrowLeft, 
  Sparkles, 
  ShoppingBag 
} from 'lucide-react';
import { SAUNA_SERVICES } from '../../mockData';

interface Props {
  onNavigate: (page: string) => void;
}

export const ServicesMenuPage: FC<Props> = ({ onNavigate }) => {
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
          <BookOpen className="w-4 h-4 text-zinc-300" /> เมนูบริการ & ราคา (Eki Services)
        </h1>
        <button 
          onClick={() => onNavigate('store')}
          className="text-xs font-bold text-amber-300 hover:underline cursor-pointer flex items-center gap-1"
        >
          <ShoppingBag className="w-3.5 h-3.5" /> ซื้อแพ็กเกจ
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {SAUNA_SERVICES.map((item) => (
          <div 
            key={item.id}
            className="p-4 rounded-3xl border border-zinc-800 bg-[#13131a] space-y-2.5 hover:border-amber-500/40 transition-all shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                {item.highlight && (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-1 inline-block">
                    {item.highlight}
                  </span>
                )}
                <h3 className="font-bold text-white text-sm">{item.name}</h3>
                <span className="text-[11px] text-zinc-400 block">{item.nameEn} • {item.duration}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-amber-300 font-mono">{item.price.toLocaleString()} ฿</span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* VIP Booking CTA */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#221c11] to-[#14120c] border border-amber-500/40 space-y-2 text-center shadow-lg">
        <h4 className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-yellow-300" /> สำรองห้องซาวน่าไพรเวทล่วงหน้า
        </h4>
        <p className="text-xs text-zinc-300">
          ห้อง Private Finnish Suite มีจำนวนจำกัด แนะนำให้จองก่อนเข้าใช้บริการ 2-3 ชั่วโมง
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer shadow-md mt-1"
        >
          📞 ติดต่อสำรองห้องล่วงหน้า
        </button>
      </div>

    </div>
  );
};
