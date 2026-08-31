import { useState } from 'react';
import type { FC } from 'react';
import { 
  Ticket, 
  Sparkles, 
  QrCode, 
  ArrowLeft, 
  Clock, 
  ShoppingBag,
  Gift
} from 'lucide-react';
import type { CustomerVoucher } from '../../mockData';

interface Props {
  myVouchers: CustomerVoucher[];
  onNavigate: (page: string) => void;
}

export const MyVouchersPage: FC<Props> = ({ myVouchers, onNavigate }) => {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'USED'>('ACTIVE');
  const [selectedVoucherForQR, setSelectedVoucherForQR] = useState<CustomerVoucher | null>(null);

  const filteredVouchers = myVouchers.filter((v) => {
    if (filter === 'ACTIVE') return v.status === 'ACTIVE';
    if (filter === 'USED') return v.status === 'USED';
    return true;
  });

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#070709] text-zinc-100 p-4 pb-12 font-['Prompt',sans-serif] space-y-4">
      
      {/* Top Header with Back Navigation */}
      <div className="flex items-center justify-between pt-2 pb-1 border-b border-zinc-800">
        <button 
          onClick={() => onNavigate('member')}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>บัตรสมาชิก</span>
        </button>
        <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
          <Ticket className="w-4 h-4 text-emerald-400" /> คลังคูปองของฉัน (My Vouchers)
        </h1>
        <button 
          onClick={() => onNavigate('store')}
          className="text-xs font-bold text-amber-300 flex items-center gap-1 hover:underline cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" /> ซื้อเพิ่ม
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-[#121218] p-1 rounded-xl border border-zinc-800 text-xs">
        <button
          onClick={() => setFilter('ACTIVE')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            filter === 'ACTIVE'
              ? 'bg-[#D4AF37] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          พร้อมใช้งาน ({myVouchers.filter(v => v.status === 'ACTIVE').length})
        </button>
        <button
          onClick={() => setFilter('ALL')}
          className={`flex-1 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            filter === 'ALL'
              ? 'bg-[#D4AF37] text-black font-bold shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          ทั้งหมด ({myVouchers.length})
        </button>
        <button
          onClick={() => setFilter('USED')}
          className={`flex-1 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            filter === 'USED'
              ? 'bg-zinc-800 text-white font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          ใช้แล้ว ({myVouchers.filter(v => v.status === 'USED').length})
        </button>
      </div>

      {/* Vouchers List */}
      <div className="space-y-3">
        {filteredVouchers.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-3xl p-6 space-y-3">
            <Gift className="w-10 h-10 text-zinc-600 mx-auto" />
            <p className="text-xs text-zinc-400">ไม่มีคูปองในหมวดนี้</p>
            <button
              onClick={() => onNavigate('store')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold text-xs hover:brightness-110 cursor-pointer shadow-md"
            >
              🛒 ไปที่ร้านค้า Voucher
            </button>
          </div>
        ) : (
          filteredVouchers.map((voucher) => {
            const isAvailable = voucher.status === 'ACTIVE';
            return (
              <div
                key={voucher.id}
                className={`p-4 rounded-2xl border bg-[#13131a] space-y-2.5 transition-all shadow-md ${
                  isAvailable 
                    ? voucher.badgeColor 
                    : 'border-zinc-800 opacity-50 bg-[#0e0e12]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/50 border border-current font-mono font-bold">
                      {voucher.code}
                    </span>
                    <h3 className="font-bold text-white text-sm mt-1.5">{voucher.title}</h3>
                  </div>
                  {voucher.remainingUses !== undefined ? (
                    <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/40 font-mono">
                      เหลือ {voucher.remainingUses}/{voucher.totalUses} ครั้ง
                    </span>
                  ) : (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isAvailable ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {isAvailable ? 'พร้อมใช้' : 'ใช้แล้ว'}
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{voucher.description}</p>

                <div className="pt-2.5 border-t border-zinc-800/80 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>หมดอายุ: {voucher.expireDate}</span>
                  </div>

                  {isAvailable && (
                    <button
                      onClick={() => setSelectedVoucherForQR(voucher)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs hover:brightness-110 transition-all flex items-center gap-1 cursor-pointer shadow-md"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      เปิด QR สแกนใช้
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Popup: Direct Single Voucher QR for Scanning */}
      {selectedVoucherForQR && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="luxury-card rounded-3xl p-6 max-w-sm w-full border border-amber-500/40 space-y-4 text-center">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-xs font-bold text-amber-400 font-mono">{selectedVoucherForQR.code}</span>
              <button 
                onClick={() => setSelectedVoucherForQR(null)}
                className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="font-bold text-white text-base">{selectedVoucherForQR.title}</h3>
              <p className="text-xs text-zinc-400 mt-1">{selectedVoucherForQR.description}</p>
            </div>

            {/* Big QR Code */}
            <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto flex flex-col items-center justify-center shadow-inner">
              <QrCode className="w-36 h-36 text-black" />
              <span className="text-[9px] font-bold text-black font-mono mt-1">
                TOKEN-{selectedVoucherForQR.code}
              </span>
            </div>

            <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>แสดงหน้าจอนี้ให้พนักงานเคาน์เตอร์สแกนตัดสิทธิ์</span>
            </div>

            <button
              onClick={() => setSelectedVoucherForQR(null)}
              className="w-full py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold hover:text-white cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
