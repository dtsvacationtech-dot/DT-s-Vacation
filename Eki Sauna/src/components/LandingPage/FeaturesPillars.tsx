import type { FC } from "react";

export const FeaturesPillars: FC = () => {
  const features = [
    {
      id: "onsen",
      title: "AUTHENTIC ONSEN",
      description: "ออนเซ็นต้นตำรับแท้แห่งญี่ปุ่น ช่วยผ่อนคลายและบำรุงผิวพรรณ",
      icon: (
        <svg viewBox="0 0 64 64" className="w-10 h-10 text-[#D4AF37] fill-none stroke-current stroke-2">
          {/* Outer circle */}
          <circle cx="32" cy="32" r="30" className="stroke-[#D4AF37]/50" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="26" className="stroke-[#D4AF37]/20" strokeWidth="1" strokeDasharray="3 3" />
          {/* Hot spring bowl base */}
          <path d="M18 42C18 48 24 50 32 50C40 50 46 48 46 42" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 42H50" strokeWidth="2" strokeLinecap="round" />
          {/* Steam curves */}
          <path d="M24 34C22 28 26 24 24 18" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 34C30 26 34 22 32 14" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M40 34C38 28 42 24 40 18" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "sauna",
      title: "PREMIUM SAUNA",
      description: "ห้องซาวน่าคุณภาพสูง หลากหลายรูปแบบ",
      icon: (
        <svg viewBox="0 0 64 64" className="w-10 h-10 text-[#D4AF37] fill-none stroke-current stroke-2">
          {/* Outer circle */}
          <circle cx="32" cy="32" r="30" className="stroke-[#D4AF37]/50" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="26" className="stroke-[#D4AF37]/20" strokeWidth="1" strokeDasharray="3 3" />
          {/* 2 Sauna figures side-by-side */}
          <circle cx="26" cy="22" r="4" strokeWidth="2" fill="#D4AF37" fillOpacity="0.2" />
          <path d="M20 44V34C20 31 23 29 26 29C29 29 32 31 32 34V44" strokeWidth="2" strokeLinecap="round" />
          <circle cx="38" cy="22" r="4" strokeWidth="2" fill="#D4AF37" fillOpacity="0.2" />
          <path d="M32 44V34C32 31 35 29 38 29C41 29 44 31 44 34V44" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 46H48" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "ambience",
      title: "JAPANESE AMBIENCE",
      description: "บรรยากาศญี่ปุ่นแท้ ให้คุณรู้สึกผ่อนคลาย ตั้งแต่ก้าวแรกที่เข้ามา",
      icon: (
        <svg viewBox="0 0 64 64" className="w-10 h-10 text-[#D4AF37] fill-none stroke-current stroke-2">
          {/* Outer circle */}
          <circle cx="32" cy="32" r="30" className="stroke-[#D4AF37]/50" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="26" className="stroke-[#D4AF37]/20" strokeWidth="1" strokeDasharray="3 3" />
          {/* Torii Gate */}
          <path d="M14 20H50" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 26H46" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 20V48" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M42 20V48" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M30 20V26" strokeWidth="1.5" />
          <path d="M34 20V26" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: "recharge",
      title: "RELAX & RECHARGE",
      description: "เติมเต็มการพักผ่อนอย่างสมบูรณ์แบบ ให้กับคุณและใจ",
      icon: (
        <svg viewBox="0 0 64 64" className="w-10 h-10 text-[#D4AF37] fill-none stroke-current stroke-2">
          {/* Outer circle */}
          <circle cx="32" cy="32" r="30" className="stroke-[#D4AF37]/50" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="26" className="stroke-[#D4AF37]/20" strokeWidth="1" strokeDasharray="3 3" />
          {/* Lotus Flower */}
          <path d="M32 18C30 24 28 29 28 34C28 38 29.8 41 32 41C34.2 41 36 38 36 34C36 29 34 24 32 18Z" strokeWidth="2" fill="#D4AF37" fillOpacity="0.25" />
          <path d="M32 41C27 41 22 38 20 34C21 39 25 44 32 44C39 44 43 39 44 34C42 38 37 41 32 41Z" strokeWidth="2" />
          <path d="M32 46C22 46 16 42 14 39C16 45 23 49 32 49C41 49 48 45 50 39C48 42 42 46 32 46Z" strokeWidth="1.8" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative bg-[#070709] border-y border-[#D4AF37]/20 py-12 overflow-hidden">
      {/* Subtle Bamboo Leaves Background Silhouette */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 10C50 35 30 50 10 60C35 70 50 90 60 110C70 85 90 70 110 60C85 50 70 30 60 10Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D4AF37]/20">
          {features.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center px-6 py-6 sm:py-2 group hover:bg-[#12110D]/40 transition-all duration-300 rounded-sm"
            >
              {/* Gold Line Art Icon with Pulse on Hover */}
              <div className="mb-4 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.5)] transition-all duration-300">
                {item.icon}
              </div>

              {/* English Heading */}
              <h3 className="font-serif-luxury text-sm font-semibold tracking-[0.2em] text-[#F3E5AB] group-hover:text-white transition-colors duration-300 mb-2">
                {item.title}
              </h3>

              {/* Thai Subtitle */}
              <p className="font-thai text-xs text-zinc-400 font-light leading-relaxed max-w-[220px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
