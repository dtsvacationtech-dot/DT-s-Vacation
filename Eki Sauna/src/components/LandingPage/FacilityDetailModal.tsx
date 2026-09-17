import type { FC } from "react";
import { X, Thermometer, Droplets, Check, Calendar } from "lucide-react";
import { FACILITIES_DATA } from "./RelaxationShowcase";

interface FacilityDetailModalProps {
  facilityId: string | null;
  onClose: () => void;
  onBook: () => void;
}

export const FacilityDetailModal: FC<FacilityDetailModalProps> = ({ facilityId, onClose, onBook }) => {
  if (!facilityId) return null;

  const facility = FACILITIES_DATA.find((f) => f.id === facilityId) || FACILITIES_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#0F0E13] border border-[#D4AF37]/50 rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Container */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
          <img
            src={facility.image}
            alt={facility.name}
            className="w-full h-full object-cover object-center filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E13] via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <span className="font-serif-luxury text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
              EKI EXPERIENCE
            </span>
            <h3 className="font-serif-luxury text-3xl font-bold text-white tracking-wide mt-1">
              {facility.name}
            </h3>
            <p className="font-thai text-sm text-zinc-300">
              {facility.thaiName}
            </p>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-6">
          
          {/* Key Metrics: Temp & Humidity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded bg-[#16151C] border border-[#D4AF37]/20">
              <div className="w-9 h-9 rounded-full bg-[#201D16] flex items-center justify-center text-[#D4AF37]">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-thai">อุณหภูมิควบคุม</span>
                <p className="font-mono text-base font-bold text-[#F3E5AB]">{facility.temp}</p>
              </div>
            </div>

            {facility.humidity && (
              <div className="flex items-center gap-3 p-3 rounded bg-[#16151C] border border-[#D4AF37]/20">
                <div className="w-9 h-9 rounded-full bg-[#201D16] flex items-center justify-center text-cyan-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-thai">ระดับความชื้น</span>
                  <p className="font-mono text-base font-bold text-cyan-200">{facility.humidity}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-thai text-sm font-semibold text-[#F3E5AB]">
              รายละเอียดและจุดเด่น
            </h4>
            <p className="font-thai text-xs text-zinc-300 leading-relaxed font-light">
              {facility.description}
            </p>
          </div>

          {/* Highlights Checklist */}
          <div className="space-y-2">
            <h4 className="font-thai text-xs font-semibold text-zinc-400 tracking-wider uppercase">
              สิ่งอำนวยความสะดวกเฉพาะโซน
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {facility.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-thai text-zinc-200">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded text-xs font-thai text-zinc-400 hover:text-white transition-colors"
            >
              ปิด
            </button>
            <button
              onClick={() => {
                onClose();
                onBook();
              }}
              className="px-6 py-2.5 rounded-sm bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-serif-luxury text-xs font-bold tracking-[0.2em] shadow-lg shadow-[#D4AF37]/25 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              BOOK THIS EXPERIENCE
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
