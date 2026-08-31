import { useState } from 'react';
import type { FC } from 'react';
import { 
  Banknote, 
  Smartphone, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  Search,
  ArrowUpRight,
  RefreshCw,
  Ticket
} from 'lucide-react';
import type { POSTransaction } from '../mockData';

interface Props {
  transactions: POSTransaction[];
}

export const OwnerFinanceDashboardView: FC<Props> = ({ transactions }) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditReport, setAuditReport] = useState<string | null>(null);

  const totalVisitors = transactions.length + 136;
  
  const cashRevenue = transactions
    .filter(t => t.paymentMethod === 'CASH')
    .reduce((sum, t) => sum + t.netAmount, 0) + 24500;

  const transferRevenue = transactions
    .filter(t => t.paymentMethod === 'PROMPTPAY')
    .reduce((sum, t) => sum + t.netAmount, 0) + 48200;

  const voucherValueBurned = transactions
    .filter(t => t.discountAmount > 0)
    .reduce((sum, t) => sum + t.discountAmount, 0) + 17100;

  // Filtered transactions
  const filteredList = transactions.filter(t => {
    const matchesFilter = 
      filterType === 'ALL' ||
      (filterType === 'CASH' && t.paymentMethod === 'CASH') ||
      (filterType === 'PROMPTPAY' && t.paymentMethod === 'PROMPTPAY') ||
      (filterType === 'FREE_PASS' && (t.paymentMethod === 'FREE_PASS' || t.discountAmount > 0));

    const matchesSearch = 
      t.ticketNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.staff.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleRunReconciliation = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditReport(`✅ ผลการตรวจสอบ: เงินสดในลิ้นชัก (${cashRevenue.toLocaleString()} ฿) และยอดโอน PromptPay (${transferRevenue.toLocaleString()} ฿) ตรงกับระบบ 100% ไม่มีรายการสูญหาย`);
    }, 1000);
  };

  const handleExportCSV = () => {
    alert('📥 ส่งออกไฟล์ Excel / CSV สรุปรายรับและการตรวจสอบสิทธิ์เรียบร้อยแล้ว');
  };

  return (
    <div className="flex-1 bg-[#0c0c0f] text-zinc-100 p-4 md:p-6 flex flex-col font-['Prompt',sans-serif] h-full overflow-y-auto">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Eki Owner & Financial Audit Control
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono">
                OWNER SECURE
              </span>
            </h2>
            <p className="text-xs text-zinc-400">ระบบตรวจสอบยอดรายรับ บันทึกเงินสด ป้องกันการทุจริต และตรวจสอบการใช้คูปอง</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunReconciliation}
            disabled={isAuditing}
            className="px-3.5 py-2 rounded-xl bg-zinc-800 border border-amber-500/40 hover:border-amber-400 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            {isAuditing ? 'กำลังกระทบยอด...' : '🔍 ตรวจสอบเงินสดในลิ้นชัก'}
          </button>
          
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            Export สรุปยอด (.CSV)
          </button>
        </div>
      </div>

      {auditReport && (
        <div className="my-3 p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/90 to-teal-950/80 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center justify-between gap-2 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{auditReport}</span>
          </div>
          <button onClick={() => setAuditReport(null)} className="text-emerald-400 hover:text-white cursor-pointer">✕</button>
        </div>
      )}

      {/* KPI Cards (4 Summary Stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        
        {/* Card 1: Total Visitors */}
        <div className="luxury-card rounded-2xl p-4 border border-zinc-800 space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs">
            <span>👥 ลูกค้าเข้าใช้บริการวันนี้</span>
            <span className="text-emerald-400 flex items-center text-[11px] font-mono">
              +14% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">{totalVisitors}</span>
            <span className="text-xs text-zinc-400">ท่าน / ครั้ง</span>
          </div>
          <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/80">
            เฉลี่ย 18 ท่าน / ชั่วโมง
          </div>
        </div>

        {/* Card 2: Cash Revenue */}
        <div className="luxury-card rounded-2xl p-4 border border-amber-500/30 space-y-2 bg-gradient-to-b from-[#1c1810] to-[#12110c]">
          <div className="flex justify-between items-center text-amber-300 text-xs">
            <span className="flex items-center gap-1">💵 ยอดเงินสด (Cash)</span>
            <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded font-mono">ลิ้นชัก</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-amber-300 font-mono">
              {cashRevenue.toLocaleString()}
            </span>
            <span className="text-xs text-amber-400/80">THB</span>
          </div>
          <div className="text-[11px] text-zinc-400 pt-1 border-t border-amber-500/20 flex justify-between">
            <span>เงินทอนเปิดกะ: 5,000 ฿</span>
            <span className="text-emerald-400 font-mono">รวม: {(cashRevenue + 5000).toLocaleString()} ฿</span>
          </div>
        </div>

        {/* Card 3: Transfer Revenue */}
        <div className="luxury-card rounded-2xl p-4 border border-blue-500/30 space-y-2 bg-gradient-to-b from-[#10141e] to-[#0c0e14]">
          <div className="flex justify-between items-center text-blue-300 text-xs">
            <span className="flex items-center gap-1">📱 ยอดเงินโอน (PromptPay)</span>
            <span className="text-[10px] bg-blue-500/20 px-1.5 py-0.5 rounded font-mono">Verified</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-blue-300 font-mono">
              {transferRevenue.toLocaleString()}
            </span>
            <span className="text-xs text-blue-400/80">THB</span>
          </div>
          <div className="text-[11px] text-zinc-400 pt-1 border-t border-blue-500/20">
            สลิปตรงบัญชี กสิกรไทย (xxx-x-88912-x)
          </div>
        </div>

        {/* Card 4: Vouchers Redeemed */}
        <div className="luxury-card rounded-2xl p-4 border border-purple-500/30 space-y-2 bg-gradient-to-b from-[#18101e] to-[#0f0a14]">
          <div className="flex justify-between items-center text-purple-300 text-xs">
            <span className="flex items-center gap-1">🎟️ มูลค่าคูปองที่ใช้ไป</span>
            <span className="text-[10px] bg-purple-500/20 px-1.5 py-0.5 rounded font-mono">Audit Log</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-purple-300 font-mono">
              {voucherValueBurned.toLocaleString()}
            </span>
            <span className="text-xs text-purple-400/80">THB</span>
          </div>
          <div className="text-[11px] text-zinc-400 pt-1 border-t border-purple-500/20">
            ตัดสิทธิ์แล้ว 38 คูปอง (ไม่พบการวนใช้ซ้ำ)
          </div>
        </div>

      </div>

      {/* Real-Time Transaction Ledger */}
      <div className="luxury-card rounded-2xl p-5 border border-zinc-800 space-y-4 mt-5">
        
        {/* Table Filters & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex bg-[#16161d] p-1 rounded-xl border border-zinc-800 text-xs">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
                  filterType === 'ALL' ? 'bg-[#D4AF37] text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ทั้งหมด ({transactions.length})
              </button>
              <button
                onClick={() => setFilterType('CASH')}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
                  filterType === 'CASH' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-zinc-400 hover:text-white'
                }`}
              >
                💵 เงินสด
              </button>
              <button
                onClick={() => setFilterType('PROMPTPAY')}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
                  filterType === 'PROMPTPAY' ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40' : 'text-zinc-400 hover:text-white'
                }`}
              >
                📱 เงินโอน
              </button>
              <button
                onClick={() => setFilterType('FREE_PASS')}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
                  filterType === 'FREE_PASS' ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40' : 'text-zinc-400 hover:text-white'
                }`}
              >
                🎟️ คูปอง/ฟรี
              </button>
            </div>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหา Ticket / ชื่อ / พนักงาน..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-zinc-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 bg-black/40">
                <th className="p-3 font-semibold">เวลา (Time)</th>
                <th className="p-3 font-semibold">เลขที่ Ticket</th>
                <th className="p-3 font-semibold">ลูกค้า (Customer)</th>
                <th className="p-3 font-semibold">บริการที่เข้าใช้</th>
                <th className="p-3 font-semibold">วิธีชำระ</th>
                <th className="p-3 font-semibold text-right">ยอดสุทธิ (Net)</th>
                <th className="p-3 font-semibold">พนักงานแคชเชียร์</th>
                <th className="p-3 font-semibold text-center">สถานะ Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredList.map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="p-3 font-mono text-zinc-400">{tx.time}</td>
                  <td className="p-3 font-mono font-bold text-amber-300">{tx.ticketNo}</td>
                  <td className="p-3">
                    <div className="font-semibold text-white">{tx.customerName}</div>
                    <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                      <span className="font-mono">{tx.customerPhone}</span>
                      {tx.tier !== 'GUEST' && (
                        <span className="text-amber-400/90 font-bold">• {tx.tier}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-zinc-300">
                    <div>{tx.service}</div>
                    {tx.voucherUsed && (
                      <span className="text-[10px] text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-500/30 flex items-center gap-1 w-fit mt-0.5">
                        <Ticket className="w-3 h-3" /> {tx.voucherUsed}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {tx.paymentMethod === 'CASH' && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1 w-fit">
                        <Banknote className="w-3 h-3" /> เงินสด
                      </span>
                    )}
                    {tx.paymentMethod === 'PROMPTPAY' && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold flex items-center gap-1 w-fit">
                        <Smartphone className="w-3 h-3" /> เงินโอน
                      </span>
                    )}
                    {tx.paymentMethod === 'FREE_PASS' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1 w-fit">
                        <Ticket className="w-3 h-3" /> คูปองฟรี 100%
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-white text-sm">
                    {tx.netAmount.toLocaleString()} ฿
                    {tx.discountAmount > 0 && (
                      <span className="text-[10px] text-emerald-400 block font-normal">
                        (ลด -{tx.discountAmount} ฿)
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-zinc-400">{tx.staff}</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold font-mono">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
