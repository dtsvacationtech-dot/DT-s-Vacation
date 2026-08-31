import { useState } from 'react';
import type { FC } from 'react';
import { 
  Scan, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  CheckCircle2, 
  Flame, 
  Trash2, 
  ShieldCheck, 
  Receipt,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SAUNA_SERVICES } from '../mockData';
import type { 
  Member, 
  CustomerVoucher, 
  ServiceItem, 
  POSTransaction 
} from '../mockData';

interface Props {
  currentMember: Member;
  myVouchers: CustomerVoucher[];
  onCompleteTransaction: (transaction: POSTransaction, usedVoucherId?: string) => void;
}

export const CounterPOSView: FC<Props> = ({ 
  currentMember, 
  myVouchers, 
  onCompleteTransaction 
}) => {
  const [scannedCustomer, setScannedCustomer] = useState<Member | null>(currentMember);
  const [cart, setCart] = useState<ServiceItem[]>([SAUNA_SERVICES[0]]);
  const [selectedVoucher, setSelectedVoucher] = useState<CustomerVoucher | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'PROMPTPAY' | 'CREDIT_CARD' | 'FREE_PASS'>('CASH');
  const [cashReceived, setCashReceived] = useState<string>('500');
  const [lockerNumber, setLockerNumber] = useState<number>(24);
  const [staffName] = useState<string>('น้องฟ้า (Staff #01)');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Cart calculations
  const grossTotal = cart.reduce((sum, item) => sum + item.price, 0);
  
  let discountAmount = 0;
  if (selectedVoucher) {
    if (selectedVoucher.type === 'FREE_PASS') {
      discountAmount = Math.min(grossTotal, 450);
    } else if (selectedVoucher.type === 'CASH_DISCOUNT') {
      discountAmount = Math.min(grossTotal, selectedVoucher.value);
    }
  } else if (scannedCustomer) {
    if (scannedCustomer.tier === 'BLACK_DIAMOND') discountAmount = grossTotal * 0.20;
    else if (scannedCustomer.tier === 'GOLD') discountAmount = grossTotal * 0.10;
    else if (scannedCustomer.tier === 'SILVER') discountAmount = grossTotal * 0.05;
  }

  const netTotal = Math.max(0, grossTotal - discountAmount);
  const parsedCash = parseFloat(cashReceived) || 0;
  const changeAmount = paymentMethod === 'CASH' ? Math.max(0, parsedCash - netTotal) : 0;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedCustomer(currentMember);
      setNotification(`✅ สแกนสำเร็จ: พบข้อมูล ${currentMember.name} (ระดับ ${currentMember.tier})`);
      setTimeout(() => setNotification(null), 3000);
    }, 800);
  };

  const handleAddToCart = (service: ServiceItem) => {
    setCart((prev) => [...prev, service]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectVoucher = (voucher: CustomerVoucher) => {
    if (selectedVoucher?.id === voucher.id) {
      setSelectedVoucher(null);
      if (paymentMethod === 'FREE_PASS') setPaymentMethod('CASH');
    } else {
      setSelectedVoucher(voucher);
      if (voucher.type === 'FREE_PASS' && grossTotal <= 450) {
        setPaymentMethod('FREE_PASS');
      }
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('กรุณาเลือกรายการบริการอย่างน้อย 1 รายการ');
      return;
    }

    if (paymentMethod === 'CASH' && parsedCash < netTotal) {
      alert('ยอดเงินสดที่รับมาต้องไม่น้อยกว่ายอดรวมสุทธิ');
      return;
    }

    const newTx: POSTransaction = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      ticketNo: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      customerName: scannedCustomer ? scannedCustomer.name : 'Walk-in Guest',
      customerPhone: scannedCustomer ? scannedCustomer.phone : '099-xxx-xxxx',
      tier: scannedCustomer ? scannedCustomer.tier : 'GUEST',
      service: cart.map(c => c.nameEn).join(' + '),
      paymentMethod,
      grossAmount: grossTotal,
      discountAmount,
      netAmount: netTotal,
      cashReceived: paymentMethod === 'CASH' ? parsedCash : undefined,
      cashChange: paymentMethod === 'CASH' ? changeAmount : undefined,
      voucherUsed: selectedVoucher ? selectedVoucher.title : undefined,
      staff: staffName,
      status: 'VERIFIED',
      notes: `Locker #${lockerNumber} Issued`
    };

    onCompleteTransaction(newTx, selectedVoucher?.id);
    
    confetti({
      particleCount: 70,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#10B981', '#FFFFFF']
    });

    setNotification(`🎉 เช็คอินสำเร็จ! ออกล็อกเกอร์เบอร์ #${lockerNumber} เรียบร้อยแล้ว`);
    setLockerNumber(prev => prev + 1);
    setSelectedVoucher(null);
    if (netTotal === 0) setPaymentMethod('FREE_PASS');

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  return (
    <div className="flex-1 bg-[#0c0c0f] text-zinc-100 p-4 md:p-6 flex flex-col font-['Prompt',sans-serif] h-full overflow-y-auto">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Eki Sauna Front Desk POS & Scanner
              <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                ONLINE
              </span>
            </h2>
            <p className="text-xs text-zinc-400">ระบบจุดรับลูกค้าหน้าเคาน์เตอร์ • พนักงาน: <span className="text-amber-300 font-medium">{staffName}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
          >
            <Scan className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'กำลังสแกน QR...' : '📸 สแกน QR ลูกค้า (Member / Voucher)'}
          </button>
        </div>
      </div>

      {notification && (
        <div className="my-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          {notification}
        </div>
      )}

      {/* Main 2-Column POS Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 flex-1">
        
        {/* Left Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="luxury-card rounded-2xl p-4 border border-amber-500/30 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> ข้อมูลสมาชิกที่สแกน (Customer Profile)
              </span>
              {scannedCustomer && (
                <span className="text-[11px] text-zinc-400 font-mono">
                  ID: {scannedCustomer.id}
                </span>
              )}
            </div>

            {scannedCustomer ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#17171e] p-3.5 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5">
                    <img 
                      src={scannedCustomer.avatar} 
                      alt="Avatar" 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{scannedCustomer.name}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 border border-amber-400/50 text-amber-300">
                        👑 {scannedCustomer.tier}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono">{scannedCustomer.phone}</p>
                  </div>
                </div>

                <div className="flex gap-4 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-2 sm:pt-0 sm:pl-4 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">แต้มสะสม</span>
                    <span className="font-bold text-amber-400 font-mono">{scannedCustomer.points} pts</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">เข้าใช้แล้ว</span>
                    <span className="font-bold text-white font-mono">{scannedCustomer.totalVisits} ครั้ง</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-xs">
                ยังไม่มีการสแกนบัตรสมาชิก (คลิกปุ่ม "สแกน QR ลูกค้า" ด้านบน)
              </div>
            )}

            {scannedCustomer && (
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-400" /> คูปอง/สิทธิ์ที่ใช้งานได้ของลูกค้า ({myVouchers.filter(v => v.status === 'ACTIVE').length})
                  </span>
                  <span className="text-[10px] text-zinc-500">คลิกเพื่อเลือกตัดคูปอง</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {myVouchers.filter(v => v.status === 'ACTIVE').map((voucher) => {
                    const isSelected = selectedVoucher?.id === voucher.id;
                    return (
                      <button
                        key={voucher.id}
                        onClick={() => handleSelectVoucher(voucher)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                            : 'border-zinc-800 bg-[#15151c] hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono font-bold text-amber-300 bg-black/40 px-1.5 py-0.5 rounded">
                            {voucher.code}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-amber-400 text-black' : 'text-zinc-400'}`}>
                            {isSelected ? '✓ เลือกใช้' : '+ คลิกใช้สิทธิ์'}
                          </span>
                        </div>
                        <h5 className="font-semibold text-white text-xs mt-1.5 truncate">{voucher.title}</h5>
                        <p className="text-[10px] text-zinc-400 mt-0.5">หมดอายุ: {voucher.expireDate}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="luxury-card rounded-2xl p-4 border border-zinc-800 space-y-3">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              🧖‍♂️ แตะเลือกบริการ / สินค้า (Touch Service Grid)
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SAUNA_SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleAddToCart(service)}
                  className="p-3 rounded-xl border border-zinc-800 bg-[#16161d] hover:border-amber-500/50 hover:bg-[#1f1e26] transition-all text-left flex flex-col justify-between active:scale-95 cursor-pointer group shadow-sm"
                >
                  <div>
                    <h5 className="font-bold text-xs text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-2">
                      {service.name}
                    </h5>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">{service.duration}</span>
                  </div>
                  <div className="mt-3 flex justify-between items-center pt-2 border-t border-zinc-800/80">
                    <span className="font-mono font-bold text-amber-400 text-xs">{service.price} ฿</span>
                    <span className="text-[10px] bg-zinc-800 group-hover:bg-amber-400 group-hover:text-black font-bold px-1.5 py-0.5 rounded transition-colors">
                      + เพิ่ม
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          <div className="luxury-card-gold rounded-2xl p-5 border border-amber-500/40 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-white text-sm">รายการคิดเงิน (Check-in Ticket)</h3>
                </div>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-mono font-bold">
                  Locker #{lockerNumber}
                </span>
              </div>

              {/* Cart List */}
              <div className="py-3 space-y-2 max-h-48 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-zinc-500 text-xs py-4">ยังไม่มีรายการบริการ</p>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs bg-black/40 p-2.5 rounded-xl border border-zinc-800">
                      <div className="truncate pr-2">
                        <span className="font-medium text-white">{item.nameEn}</span>
                        <span className="text-[10px] text-zinc-400 block">{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono font-bold text-amber-300">{item.price} ฿</span>
                        <button 
                          onClick={() => handleRemoveFromCart(idx)}
                          className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {selectedVoucher && (
                <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-xs flex justify-between items-center text-amber-200 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate max-w-[180px]">{selectedVoucher.title}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">-{discountAmount} ฿</span>
                </div>
              )}

              {/* Totals Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-800 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>ยอดรวมก่อนลด (Gross Total):</span>
                  <span className="font-mono">{grossTotal} ฿</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>ส่วนลด/สิทธิ์คูปอง (Discounts):</span>
                  <span className="font-mono">-{discountAmount} ฿</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>ยอดชำระสุทธิ (Net Total):</span>
                  <span className="font-mono text-xl text-amber-300">{netTotal} ฿</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-4 space-y-2">
                <label className="text-xs font-semibold text-zinc-300 block">
                  💳 เลือกช่องทางการชำระเงิน (Mandatory Payment Split):
                </label>
                
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  <button
                    onClick={() => setPaymentMethod('CASH')}
                    className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'CASH'
                        ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold'
                        : 'border-zinc-800 bg-[#16161c] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span>💵 เงินสด</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('PROMPTPAY')}
                    className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'PROMPTPAY'
                        ? 'border-blue-400 bg-blue-500/20 text-blue-300 font-bold'
                        : 'border-zinc-800 bg-[#16161c] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>📱 เงินโอน</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('CREDIT_CARD')}
                    className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'CREDIT_CARD'
                        ? 'border-purple-400 bg-purple-500/20 text-purple-300 font-bold'
                        : 'border-zinc-800 bg-[#16161c] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>💳 บัตรเครดิต</span>
                  </button>
                </div>
              </div>

              {/* Cash Calculator */}
              {paymentMethod === 'CASH' && (
                <div className="bg-[#121217] p-3 rounded-xl border border-zinc-800 space-y-2 mt-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">รับเงินสดมา (Cash Received):</span>
                    <input
                      type="number"
                      value={cashReceived}
                      onChange={(e) => setCashReceived(e.target.value)}
                      className="w-24 bg-black border border-amber-500/40 rounded-lg px-2 py-1 text-right font-mono text-amber-300 font-bold focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold pt-1 border-t border-zinc-800">
                    <span className="text-zinc-300">เงินทอน (Change Due):</span>
                    <span className="font-mono text-emerald-400 text-base">{changeAmount} ฿</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'PROMPTPAY' && (
                <div className="bg-blue-950/40 border border-blue-500/30 p-2.5 rounded-xl text-[11px] text-blue-200 flex items-center gap-2 mt-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>พนักงานตรวจสอบสลิปโอนเงินเข้าบัญชีร้านแล้ว</span>
                </div>
              )}

            </div>

            {/* Complete Check-in Button */}
            <div className="pt-4">
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-extrabold text-sm hover:brightness-110 active:scale-98 transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                ยืนยันการเช็คอิน & ออกเบอร์ล็อกเกอร์ #{lockerNumber}
              </button>
              <p className="text-[10px] text-zinc-400 text-center mt-2">
                🔒 ระบบจะตัดคูปองและบันทึกลงระบบตรวจสอบบัญชีการเงินของเจ้าของร้านทันที
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
