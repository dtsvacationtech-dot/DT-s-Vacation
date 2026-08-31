import type { FC } from 'react';
import { 
  PhoneCall, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  ShieldCheck
} from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const ContactPage: FC<Props> = ({ onNavigate }) => {
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
          <PhoneCall className="w-4 h-4 text-cyan-400" /> ข้อมูลสาขา & ติดต่อสอบถาม
        </h1>
        <div className="w-6" />
      </div>

      {/* Location & Map Card */}
      <div className="p-4 rounded-3xl border border-zinc-800 bg-[#13131a] space-y-3 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-[#D4AF37] flex items-center justify-center border border-amber-500/30">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-white text-sm">สาขาเอกมัย (Eki Flagship)</h2>
            <span className="text-[10px] text-zinc-400">สุขุมวิท 63 • มีที่จอดรถ VIP 25 คัน</span>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          เลขที่ 88/1 ซอยเอกมัย 12 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110 (ใกล้ BTS เอกมัย)
        </p>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button 
            onClick={() => alert('📍 เปิด Google Maps นำทางสู่ Eki Sauna & Bathhouse')}
            className="py-2.5 px-3 rounded-xl bg-zinc-800 text-zinc-200 text-xs font-semibold hover:bg-zinc-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Maps</span>
          </button>

          <a 
            href="tel:021234567"
            className="py-2.5 px-3 rounded-xl bg-[#D4AF37] text-black text-xs font-bold hover:bg-amber-400 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>โทร 02-123-4567</span>
          </a>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="p-4 rounded-3xl border border-zinc-800 bg-[#13131a] space-y-2.5 shadow-md">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="font-bold text-white text-sm">เวลาเปิด-ปิดให้บริการ</h3>
        </div>

        <div className="space-y-1.5 text-xs text-zinc-300 pt-1">
          <div className="flex justify-between p-2 rounded-xl bg-black/40 border border-zinc-800/80">
            <span>วันจันทร์ - วันศุกร์:</span>
            <span className="font-mono text-amber-300 font-bold">11:00 - 24:00 น.</span>
          </div>
          <div className="flex justify-between p-2 rounded-xl bg-black/40 border border-zinc-800/80">
            <span>วันเสาร์ - อาทิตย์ & นักขัตฤกษ์:</span>
            <span className="font-mono text-amber-300 font-bold">10:00 - 24:00 น.</span>
          </div>
        </div>
      </div>

      {/* Sauna Rules */}
      <div className="p-4 rounded-3xl border border-amber-500/20 bg-gradient-to-b from-[#181611] to-[#100f0c] space-y-2.5">
        <h3 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> กฎระเบียบ & มารยาทการใช้บริการ
        </h3>
        <ul className="space-y-2 text-xs text-zinc-300">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">•</span>
            <span>กรุณาอาบน้ำชำระร่างกายให้สะอาดก่อนลงแช่ในออนเซ็นหรือเข้าห้องซาวน่า</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">•</span>
            <span>สวมใส่ผ้าขนหนูหรือชุดคลุมที่ทางร้านจัดเตรียมไว้ให้เสมอในพื้นที่ส่วนกลาง</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">•</span>
            <span>งดการใช้โทรศัพท์ถ่ายภาพในพื้นที่อาบน้ำและห้องซาวน่าโดยเด็ดขาดเพื่อความเป็นส่วนตัว</span>
          </li>
        </ul>
      </div>

    </div>
  );
};
