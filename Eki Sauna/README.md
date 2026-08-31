# 🧖‍♂️ Eki Sauna — Luxury LINE CRM, POS & Audit System

ระบบ CRM, POS จุดรับลูกค้าหน้าร้าน, ระบบสร้างคูปองการตลาด และระบบตรวจสอบการเงินป้องกันการทุจริต สำหรับธุรกิจซาวน่า **Eki Sauna** ในธีม **Luxury Black & Gold**

---

## 🌟 4 Core Modules

1. **📱 LINE Customer App (LIFF):**
   - Rich Menu 6 ช่อง (ถอดแบบ Bar B Q Plaza / GON Member)
   - หน้า Standalone ใช้งานง่าย ไม่ซับซ้อน
   - บัตรสมาชิกเสมือน Gold VIP พร้อม Dynamic QR Token เปลี่ยนทุก 60 วินาที ป้องกันการแคปภาพหน้าจอ
   - คลังคูปอง (My Vouchers) & สิทธิประโยชน์ Tier
   - หน้าร้านค้าซื้อ Voucher ล่วงหน้า พร้อมตัวจำลองการชำระเงิน PromptPay QR

2. **🖥️ Front Desk Staff POS & Scanner:**
   - สแกน QR บัตรสมาชิก/คูปองจากหน้าจอลูกค้า 1-Click
   - ระบบตัดคูปองเข้าฟรี และหักส่วนลดเงินสดทันที
   - บังคับแยกรับเงินสด vs เงินโอน พร้อมคำนวณเงินทอนอัตโนมัติ
   - ออกหมายเลขล็อกเกอร์และบันทึกประวัติพนักงาน

3. **🎯 Marketing Coupon & Campaign Studio:**
   - ฟอร์มสร้างคูปองด้วยตัวเอง: กำหนดวันหมดอายุ, จำนวนสิทธิ์ (Quota), และระดับสมาชิกที่ใช้ได้ (Tier-locking)
   - มอนิเตอร์สถิติการใช้คูปองแบบ Real-time
   - ปุ่มยิงคูปองเข้า LINE กระเป๋าลูกค้าจำลอง

4. **👑 Owner & Finance Anti-Fraud Audit Dashboard:**
   - สรุปจำนวนผู้เข้าใช้บริการต่อวัน
   - สรุปยอดเงินสดในลิ้นชัก vs ยอดเงินโอน PromptPay
   - ฟังก์ชันกระทบยอดเงินสดในลิ้นชัก (Cash Reconciliation) ป้องกันเงินสดรั่วไหล
   - ตรวจสอบประวัติการใช้คูปองทุกใบ ป้องกันการนำคูปองเก่ามาวนใช้ซ้ำ

---

## 🚀 วิธีการรันโปรเจกต์ (Quick Start)

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. เริ่มต้นรัน Dev Server
npm run dev

# 3. Build สำหรับ Production
npm run build
```

เปิดเบราว์เซอร์ไปที่: `http://localhost:5173`

