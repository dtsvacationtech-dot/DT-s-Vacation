import type { FC } from "react";
import { ChevronRight } from "lucide-react";

export interface FacilityCardItem {
  id: string;
  name: string;
  thaiName: string;
  tagline: string;
  image: string;
  temp: string;
  humidity?: string;
  features: string[];
  description: string;
  icon?: React.ReactNode;
}

interface RelaxationShowcaseProps {
  onSelectFacility: (id: string) => void;
  onExploreMore: () => void;
}

export const FACILITIES_DATA = [
  {
    id: "onsen",
    name: "ONSEN",
    thaiName: "บ่อน้ำแร่ออนเซ็นธรรมชาติ",
    tagline: "น้ำแร่นำเข้าจากคุซัทสึ อุณหภูมิสมดุลเพื่อการฟื้นฟูผิว",
    image: "/landing/card_onsen_hd.webp",
    temp: "41.5°C",
    humidity: "100%",
    features: ["น้ำแร่ Kusatsu นำเข้า", "ระบบ Hydro Jet นวดคลายกล้ามเนื้อ", "บ่อน้ำเย็น Micro-bubble 16°C"],
    description: "แช่น้ำแร่ธรรมชาติบริสุทธิ์ที่อุดมไปด้วยแร่ธาตุบำรุงผิว ช่วยกระตุ้นการไหลเวียนของโลหิต บรรเทาอาการเมื่อยล้าสะสม และทำให้ผ่อนคลายอย่างล้ำลึก",
  },
  {
    id: "sauna",
    name: "SAUNA",
    thaiName: "ฟินนิช ฮิโนกิ ซาวน่า",
    tagline: "ไม้ฮิโนกิแท้ 100% พร้อมกลิ่นอโรมาผ่อนคลาย",
    image: "/landing/card_sauna_hd.webp",
    temp: "85°C - 90°C",
    humidity: "15%",
    features: ["ไม้ Hinoki ญี่ปุ่นแท้", "หินลาวาภูเขาไฟ Löyly", "สมุนไพรอโรมาบริสุทธิ์"],
    description: "ห้องซาวน่าไม้สนฮิโนกิธรรมชาติ ขับเหงื่อและขับสารพิษออกจากร่างกาย พร้อมกลิ่นหอมอบอวลที่ช่วยบำบัดระบบทางเดินหายใจและความตึงเครียด",
  },
  {
    id: "steam",
    name: "STEAM",
    thaiName: "ห้องอบไอน้ำอโรมา สตรีม",
    tagline: "ไอละอองหมอกสมุนไพร บำรุงผิวพรรณและทางเดินหายใจ",
    image: "/landing/card_steam_hd.webp",
    temp: "48°C",
    humidity: "100%",
    features: ["Aroma Eucalyptus Mist", "เก้าอี้หินแกรนิตอุ่นสบาย", "ไฟ Ambient Lighting อบอุ่น"],
    description: "ห้องสตรีมไอน้ำละเอียดผสานน้ำมันหอมระเหยยูคาลิปตัส ช่วยเปิดรูขุมขน ชะล้างสิ่งสกปรก และเพิ่มความชุ่มชื้นให้ผิวกลับมาเปล่งปลั่ง",
  },
  {
    id: "relax",
    name: "RELAX ROOM",
    thaiName: "ห้องพักผ่อน Zero-Gravity Lounge",
    tagline: "เก้าอี้ปรับเอนระดับพรีเมียมในบรรยากาศเงียบสงบ",
    image: "/landing/card_relax_hd.webp",
    temp: "24°C",
    humidity: "50%",
    features: ["เก้าอี้ Zero-Gravity นำเข้า", "ไฟโคมญี่ปุ่น Warm Glow", "บริการชาเขียวและเครื่องดื่มฟรี"],
    description: "พื้นที่พักผ่อนหลังการแช่ออนเซ็น พร้อมเก้าอี้ปรับเอนสรีระที่ให้ความรู้สึกไร้น้ำหนัก ท่ามกลางบรรยากาศความเงียบสงบแบบ Zen",
  },
];

export const RelaxationShowcase: FC<RelaxationShowcaseProps> = ({ onSelectFacility, onExploreMore }) => {
  return (
    <section id="facilities" className="relative bg-[#08080A] py-20 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Story */}
          <div className="lg:col-span-4 text-left">
            <span className="font-serif-luxury text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
              ONSEN & SAUNA
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.06em] text-white mt-2 mb-4 leading-tight">
              THE ART OF <br />
              <span className="gold-gradient-text">RELAXATION</span>
            </h2>

            {/* Lotus Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#D4AF37] fill-current">
                <path d="M12 3C11 6 9.5 8 9.5 10C9.5 11.5 10.5 12.5 12 12.5C13.5 12.5 14.5 11.5 14.5 10C14.5 8 13 6 12 3Z" />
                <path d="M12 13.5C10 13.5 8.5 12 7 10.5C7.5 13 9 15.5 12 15.5C15 15.5 16.5 13 17 10.5C15.5 12 14 13.5 12 13.5Z" opacity="0.7" />
              </svg>
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>

            {/* Thai Description Copy */}
            <p className="font-thai text-sm text-zinc-300 font-light leading-relaxed mb-8">
              รวมทุกความผ่อนคลายในที่เดียว ไม่ว่าจะเป็นบ่อน้ำร้อนออนเซ็น ซาวน่า ห้องอบไอน้ำ และสิ่งอำนวยความสะดวกครบครัน เพื่อการดูแลตัวเองในทุกๆ วัน
            </p>

            {/* CTA Button: EXPLORE MORE > */}
            <button
              onClick={onExploreMore}
              className="relative group overflow-hidden px-6 py-3 rounded-sm border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-serif-luxury text-xs font-bold tracking-[0.2em] shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>EXPLORE MORE</span>
                <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Right Column: 4 Vertical Showcase Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {FACILITIES_DATA.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onSelectFacility(card.id)}
                  className="group relative h-[320px] sm:h-[360px] rounded-md overflow-hidden cursor-pointer border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-500 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] bg-[#121216]"
                >
                  {/* Card Background Image with Smooth Zoom */}
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:brightness-110 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/40 to-transparent group-hover:via-[#08080A]/20 transition-all duration-500" />

                  {/* Top Badge: Temperature */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#08080A]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[10px] font-mono text-[#F3E5AB]">
                    {card.temp}
                  </div>

                  {/* Bottom Label Container */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#08080A] via-[#08080A]/90 to-transparent flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1.5 mb-1 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                      {card.id === "onsen" && (
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                          <path d="M12 2C10.5 5 9 7.5 9 10C9 12 10.34 13.5 12 13.5C13.66 13.5 15 12 15 10C15 7.5 13.5 5 12 2Z" />
                          <path d="M5 20H19" strokeLinecap="round" />
                        </svg>
                      )}
                      {card.id === "sauna" && (
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                          <rect x="4" y="4" width="16" height="16" rx="2" />
                          <path d="M9 4V20M15 4V20" />
                        </svg>
                      )}
                      {card.id === "steam" && (
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                          <path d="M8 17C8 17 6 15 6 12C6 9 12 5 12 5C12 5 18 9 18 12C18 15 16 17 16 17" />
                          <path d="M12 12V21" />
                        </svg>
                      )}
                      {card.id === "relax" && (
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                          <path d="M5 13V18H19V13" />
                          <path d="M3 13H21" />
                          <circle cx="12" cy="7" r="3" />
                        </svg>
                      )}
                      <span className="font-serif-luxury text-xs tracking-[0.2em] font-bold text-[#F3E5AB] group-hover:text-white transition-colors">
                        {card.name}
                      </span>
                    </div>

                    <span className="font-thai text-[10px] text-zinc-400 font-light truncate max-w-full">
                      {card.thaiName}
                    </span>
                  </div>

                  {/* Subtle Shimmer highlight on hover */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-[#D4AF37]/50 rounded-md transition-colors pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
