import { useState } from "react";
import type { FC } from "react";
import { X, CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PACKAGES = [
  {
    id: "onsen-single",
    name: "Authentic Mineral Onsen",
    thaiName: "บัตรแช่ออนเซ็นธรรมชาติ ไม่จำกัดเวลา",
    price: 650,
    badge: "Popular",
    desc: "รวมผ้าขนหนู, ชุดยูกาตะ, ล็อกเกอร์, น้ำดื่มและชาเขียวญี่ปุ่นฟรี",
  },
  {
    id: "combo",
    name: "Onsen & Hinoki Sauna Combo",
    thaiName: "แพ็กเกจคอมโบ ออนเซ็น + ซาวน่า + สตรีม",
    price: 950,
    badge: "Best Value",
    desc: "เข้าใช้บริการได้ครบทุกโซน ทั้งบ่อน้ำแร่, ซาวน่าไม้ฮิโนกิ, และห้องอบไอน้ำ",
  },
  {
    id: "vip-suite",
    name: "VIP Private Hinoki Suite",
    thaiName: "ห้องออนเซ็นและซาวน่าส่วนตัว VIP 120 นาที",
    price: 1850,
    badge: "Luxury VIP",
    desc: "ความเป็นส่วนตัวสูงสุด พร้อมชุดของว่างและเครื่องดื่มพรีเมียม",
  },
  {
    id: "spa-duo",
    name: "Ultimate Rejuvenation & Spa",
    thaiName: "ออนเซ็น + ซาวน่า + นวดอโรมาบำบัด 60 นาที",
    price: 2400,
    badge: "Signature",
    desc: "การผ่อนคลายเต็มรูปแบบ แช่น้ำแร่พร้อมทรีตเมนต์นวดน้ำมันหอมระเหย",
  },
];

const TIME_SLOTS = [
  "10:30", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30", "22:00"
];

export const BookingModal: FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[1].id);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [selectedTime, setSelectedTime] = useState("14:30");
  const [guests, setGuests] = useState(2);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  if (!isOpen) return null;

  const currentPkg = PACKAGES.find((p) => p.id === selectedPackage) || PACKAGES[1];
  const totalPrice = currentPkg.price * guests;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    const code = "EKI-" + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setIsSuccess(true);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#ECC853", "#FFF0B3", "#AA820A"],
    });
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#0F0E13] border border-[#D4AF37]/50 rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/30 bg-[#16141A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#201D16]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-base font-bold tracking-wider text-[#F3E5AB]">
                RESERVATION / จองบริการ
              </h3>
              <p className="font-thai text-[11px] text-zinc-400 font-light">
                EKI Onsen & Sauna Luxury Sanctuary
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-400">
              <div className="w-16 h-16 rounded-full bg-[#1A1810] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                <CheckCircle2 className="w-9 h-9 text-[#D4AF37]" />
              </div>

              <div>
                <span className="font-serif-luxury text-xs tracking-[0.2em] text-[#D4AF37] uppercase font-semibold">
                  BOOKING CONFIRMED
                </span>
                <h4 className="font-thai text-xl font-bold text-white mt-1">
                  การจองของคุณได้รับการยืนยันแล้ว
                </h4>
                <p className="font-thai text-xs text-zinc-400 mt-1">
                  ระบบได้ส่งข้อมูลการยืนยันและรายละเอียดการเข้าใช้บริการไปยังหมายเลข {phone} เรียบร้อยแล้ว
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#141318] border border-[#D4AF37]/40 rounded-md p-4 max-w-md mx-auto text-left space-y-2 font-thai text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">รหัสการจอง:</span>
                  <span className="font-mono font-bold text-[#F3E5AB] text-sm tracking-wider">{bookingCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">ผู้จอง:</span>
                  <span className="text-white font-medium">{customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">แพ็กเกจ:</span>
                  <span className="text-[#D4AF37] font-medium">{currentPkg.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">วันที่ & เวลา:</span>
                  <span className="text-white">{selectedDate} @ {selectedTime} น. ({guests} ท่าน)</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-800 font-semibold">
                  <span className="text-zinc-300">ยอดชำระ (หน้าเคาน์เตอร์):</span>
                  <span className="text-lg text-[#F3E5AB]">฿{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-sm bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-serif-luxury text-xs font-bold tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:scale-105 transition-all cursor-pointer"
              >
                CLOSE / ปิดหน้าต่าง
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5 font-thai">
              
              {/* Package Selection */}
              <div>
                <label className="block text-xs font-medium text-[#F3E5AB] mb-2 font-serif-luxury tracking-wider">
                  1. SELECT PACKAGE / เลือกแพ็กเกจบริการ
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PACKAGES.map((pkg) => {
                    const isSelected = selectedPackage === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`p-3 rounded border cursor-pointer transition-all duration-300 relative ${
                          isSelected
                            ? "bg-[#211E16] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                            : "bg-[#141318] border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-serif-luxury text-xs font-bold text-white">
                            {pkg.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#F3E5AB] font-mono">
                            ฿{pkg.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1 font-light line-clamp-1">
                          {pkg.thaiName}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F3E5AB] mb-1 font-serif-luxury tracking-wider">
                    2. DATE / วันที่ต้องการเข้าใช้บริการ
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141318] border border-zinc-800 rounded text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#F3E5AB] mb-1 font-serif-luxury tracking-wider">
                    3. GUEST COUNT / จำนวนผู้เข้าใช้
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setGuests(num)}
                        className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                          guests === num
                            ? "bg-[#D4AF37] text-black"
                            : "bg-[#141318] text-zinc-400 border border-zinc-800 hover:text-white"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-medium text-[#F3E5AB] mb-1 font-serif-luxury tracking-wider">
                  4. TIME SLOT / เลือกรอบเวลา
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-1.5 rounded text-xs font-mono transition-all ${
                        selectedTime === slot
                          ? "bg-[#D4AF37] text-black font-bold shadow-md shadow-[#D4AF37]/30"
                          : "bg-[#141318] text-zinc-300 border border-zinc-800 hover:border-[#D4AF37]/50"
                      }`}
                    >
                      {slot} น.
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                <div>
                  <label className="block text-xs text-zinc-300 mb-1">
                    ชื่อ-นามสกุล ผู้จอง *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น คุณสมชาย ใจดี"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141318] border border-zinc-800 rounded text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">
                    เบอร์โทรศัพท์ / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08X-XXX-XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141318] border border-zinc-800 rounded text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Submit & Price Summary */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/30">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[11px] text-zinc-400">ยอดรวมโดยประมาณ:</span>
                  <div className="text-2xl font-bold font-serif-luxury text-[#F3E5AB]">
                    ฿{totalPrice.toLocaleString()}
                    <span className="text-xs font-normal text-zinc-400 ml-1">({guests} ท่าน)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-sm bg-gradient-to-r from-[#D4AF37] via-[#ECC853] to-[#AA820A] text-black font-serif-luxury text-xs font-bold tracking-[0.2em] shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  CONFIRM RESERVATION
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
