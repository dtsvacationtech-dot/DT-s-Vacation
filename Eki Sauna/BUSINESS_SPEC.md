# 🧖‍♂️ EKI SAUNA & BATHHOUSE — COMPLETE BUSINESS SPECIFICATION & ARCHITECTURE

> **Document Version:** 2.0.0 (Updated Production Blueprint)  
> **Brand Theme:** Ultra-Luxury Obsidian Black & Champagne Gold (`#050507`, `#0C0C10` & `#DEB34A`)  
> **Primary Channel:** LINE Official Account (LIFF Web Apps) + Dynamic Anti-Fraud QR Token + E-Voucher Shop

---

## 🧭 1. ภาพรวมธุรกิจและโมเดลการทำงาน (Business Overview)

**Eki Onsen & Sauna** เป็นธุรกิจออนเซ็น ซาวน่า และสปาระดับไฮเอนด์ (Luxury Japanese Wellness & Finnish Sauna) ดำเนินการผ่าน **LINE Official Account (LINE OA)** และ **LINE Front-end Framework (LIFF)** เพื่อมอบประสบการณ์ที่ไร้รอยต่อแก่ลูกค้า โดยไม่ต้องดาวน์โหลดแอปพลิเคชันเพิ่มเติม

---

## 📱 2. โครงสร้าง LINE Rich Menu & LIFF Routing Matrix

ภาพเมนู 4 ช่องสีทองหรูหรา (4-Grid Luxury Rich Menu) ผูกระบบอัตโนมัติ:

```
┌───────────────────────────────────────┬───────────────────────────────────────┐
│ [ 🪪 ] เมนูบัตรสมาชิก                  │ [ 🎫 ] ซื้อคูปอง                      │
│        MEMBERSHIP                     │        BUY COUPON                     │
│        ➔ https://liff.line.me/...     │        ➔ https://liff.line.me/...?page=shop
├───────────────────────────────────────┼───────────────────────────────────────┤
│ [ 📢 ] โปรโมชั่น                      │ [ 💬 ] ติดต่อสอบถาม                   │
│        PROMOTION                      │        CONTACT US                     │
│        ➔ https://liff.line.me/...?page=promotion │ ➔ https://liff.line.me/...?page=contact
└───────────────────────────────────────┴───────────────────────────────────────┘
```

| Rich Menu Tile | LIFF URL / Routing | วัตถุประสงค์และฟังก์ชันหลัก |
|---|---|---|
| **1. เมนูบัตรสมาชิก (Membership)** | `https://liff.line.me/2011345397-1XKydCv0` | • แสดงบัตรสมาชิกตามระดับจริงพร้อมแสง Shimmer<br>• ตัวติดตามเป้าหมายเลื่อนระดับถัดไป (Target Tracker)<br>• QR Code สแกนจริงที่หน้าร้าน (หมุนเวียนทุก 60 วินาที)<br>• ป๊อปอัปสิทธิประโยชน์ 4 ระดับ<br>• แท็บคูปองของฉัน และแท็บแลกคะแนน |
| **2. ซื้อคูปอง (Buy Coupon)** | `https://liff.line.me/2011345397-1XKydCv0?page=shop` | • หน้าต่าง E-VOUCHER SHOP<br>• โลโก้ทางการ EKI Onsen & Sauna สีทอง<br>• Flash Sale Countdown Timer นับถอยหลังเรียลไทม์<br>• E-Cash Voucher 1,500.-, 1,000.-, 700.- (ลด 10%)<br>• หมวดหมู่ดีลเด็ด และระบบ Checkout ชำระเงินจริง |
| **3. โปรโมชั่น (Promotion)** | `https://liff.line.me/2011345397-1XKydCv0?page=promotion` | • แสดงโปรโมชั่นพิเศษประจำเดือน และสิทธิประโยชน์สมาชิก |
| **4. ติดต่อสอบถาม (Contact Us)** | `https://liff.line.me/2011345397-1XKydCv0?page=contact` | • ติดต่อเจ้าหน้าที่ แผนที่สาขาเอกมัย และการจองบริการ |

---

## 👑 3. โครงสร้างระดับสมาชิก 4 ขั้น (Membership Tier Architecture)

```
[🌱 ECO] -------------> [🥈 SILVER] -------------> [🥇 GOLD VIP] -------------> [💎 PLATINUM VIP]
  0 - 2,999 P             3,000 - 7,999 P           8,000 - 19,999 P            20,000+ P (Max Tier)
  (บัตรไผ่เขียวมรกต)      (บัตรเรือนออนเซ็นเงิน)    (บัตรพระจันทร์ฟูจิทอง)      (บัตรราตรีซากุระม่วง)
```

### รายละเอียดสิทธิประโยชน์และเงื่อนไขแต่ละระดับ (100% Exact Match):

1. 🌱 **ECO MEMBER (0 – 2,999 คะแนน):**
   - **Asset:** `/images/card_eco_member.webp` (Natural • Relax • Balance)
   - **สิทธิประโยชน์:**
     1. `Ⓟ` สมัครฟรี สะสมแต้มทุก 100 บาท = 1 คะแนน
     2. `📢` รับข่าวสารโปรโมชั่นและส่วนลดลับเฉพาะสมาชิก
     3. `🎁` MEMBER EXCLUSIVE PROMOTIONS

2. 🥈 **SILVER MEMBER (3,000 – 7,999 คะแนน):**
   - **Asset:** `/images/card_silver_member.webp` (Purify • Refresh • Renew)
   - **สิทธิประโยชน์:**
     1. `5%` รับส่วนลดค่าบริการปกติ 5%
     2. `☕` ฟรี **WELCOME HERBAL DRINK** ทุกครั้งที่เข้าใช้บริการ

3. 🥇 **GOLD VIP (8,000 – 19,999 คะแนน):**
   - **Asset:** `/images/card_gold_member.webp` (Harmony • Comfort • Privilege)
   - **สิทธิประโยชน์:**
     1. `10%` รับส่วนลดค่าบริการปกติ 10%
     2. `🚪` ฟรี ล็อกเกอร์ VIP ส่วนตัว
     3. `🎂` สิทธิ์เข้าใช้ซาวน่าฟรี 1 ครั้งในเดือนเกิด (**BIRTHDAY PASS**)

4. 💎 **PLATINUM VIP (20,000 คะแนนขึ้นไป — ระดับสูงสุด):**
   - **Asset:** `/images/card_platinum_member.webp` (Premium • Exclusive • Excellence)
   - **สิทธิประโยชน์:**
     1. **`12%` รับส่วนลดค่าบริการปกติ 12%** *(เงื่อนไขเฉพาะที่กำหนด)*
     2. `👤1` พาเพื่อนร่วมเข้าใช้ฟรี 1 ท่าน / เดือน
     3. `👥2` **FREE PRIVATE VIP SUITE PASS** 2 ครั้งต่อปี

---

## 🧮 4. สถาปัตยกรรมระบบคะแนนแบบบัญชีคู่ (Dual-Ledger Points System)

ระบบแยกกระเป๋าคะแนนออกเป็น 2 ส่วนอย่างอิสระ:

1. **`tierPoints` (คะแนนสำหรับเลื่อนระดับ):**
   - คำนวณจากยอดการใช้จ่ายสะสม
   - **ไม่มีวันลดลง** แม้ลูกค้าจะนำแต้มไปแลกคูปองหรือของรางวัล
   - นำมาคำนวณหลอดความคืบหน้าแบบ Stage-by-Stage (ECO ➔ SILVER ➔ GOLD ➔ PLATINUM)

2. **`redeemablePoints` (คะแนนคงเหลือสำหรับแลกของรางวัล):**
   - จะถูกหักออกเฉพาะเมื่อลูกค้ากดยืนยันการแลกของรางวัลในแท็บ "แลกคะแนน" เท่านั้น

---

## 🎟️ 5. ระบบคูปองและของรางวัล (Coupons & Rewards Rules)

### 5.1 คูปองส่วนลดค่าเข้าออนเซ็น 10%:
- **ส่วนลด:** `10% OFF` (ใช้ 300 คะแนนแลก)
- **เงื่อนไขสำคัญ:** **ไม่สามารถใช้ลดเพิ่มจากราคาที่ลดแล้ว หรือราคาโปรโมชั่นได้** (Non-stackable with promotional/discounted rates)

### 5.2 Eki E-Voucher 100 บาท:
- **มูลค่า:** บัตรกำนัลแทนเงินสดมูลค่า **100 บาท** (`100฿`)
- **คะแนนที่ใช้แลก:** 450 คะแนน
- **วันหมดอายุ:** **30/11/2025**
- **การแสดงผล:** ภาพ 1:1 Square Thumbnail (`voucher_evoucher_square.webp`) ไม่ถูกตัดขอบ

### 5.3 คูปอง Welcome Drink:
- รับฟรีเครื่องดื่ม Welcome Drink 1 แก้วเมื่อใช้บริการครบ 500 บาท หรือใช้ 150 คะแนนแลก

---

## 🛍️ 6. ระบบร้านค้า E-VOUCHER SHOP (`/shop`)

- **Header:** โลโก้ทางการ EKI Onsen & Sauna สีทอง (`logo_eki_gold.webp`) + 3 ปุ่มวงกลม (`[🏠]`, `[🎫]`, `[🛒]`)
- **Flash Sale:** นาฬิกาจับเวลานับถอยหลัง Real-time (ชม. : นาที : วินาที)
- **รายการ E-Cash Voucher (Carousel):**
  1. **E-Cash Voucher 1,500.-** ➔ ราคาพิเศษ **฿1,350** (ลด 10%)
  2. **E-Cash Voucher 1,000.-** ➔ ราคาพิเศษ **฿900** (ลด 10%)
  3. **E-Cash Voucher 700.-** ➔ ราคาพิเศษ **฿630** (ลด 10%)
  - ทุกใบมีสิทธิ์ `ใช้แทนเงินสด` | `ซื้อสินค้า/บริการ` | `ใช้ได้ทุกสาขา` | `วันหมดอายุ 30 ก.ย. 2569`
- **หมวดหมู่ (Category):** E-Voucher เงินสด, อาหาร & เครื่องดื่ม, แพ็กเกจ & บริการ
- **ระบบสั่งซื้อ (Checkout Modal):** รองรับพร้อมเพย์ QR, บัตรเครดิต, LINE Pay พร้อมยิงพลุ Confetti และส่งคูปองเข้ากระเป๋าของลูกค้าทันที

---

## 🛡️ 7. มาตรการความปลอดภัยและป้องกันการทุจริต (Anti-Fraud QR Security)

1. **Dynamic Real-Time QR Code (`qrcode.react`):**
   - QR Code สแกนได้จริงทั้งหน้าบัตรสมาชิกและหน้ารายละเอียดคูปอง
   - มีระบบนับถอยหลังหมุนเวียนรหัสโทเคนทุก 60 วินาที ป้องกันการแคปภาพหน้าจอส่งต่อ
2. **One-Click Voucher Burn:**
   - เมื่อพนักงานสแกนตัดสิทธิ์ คูปองจะเปลี่ยนสถานะเป็น `USED` ทันที และย้ายไปแท็บ "ใช้แล้ว/หมดอายุ"

---

## 🎨 8. ดีไซน์และแอนิเมชัน (Design & Micro-Interactions)

- **Metallic Shimmer:** แสงสะท้อนสีทอง/เงิน/ม่วงวิ่งพาดผ่านผิวบัตรสมาชิก ล็อกแนวแสงให้อยู่เฉพาะเนื้อการ์ดด้านใน (`inset-[3px] rounded-[10px] overflow-hidden`)
- **Sliding Tabs Indicator:** เส้นแถบสีทองสไลด์ลื่นไหลด้วยฟิสิกส์ `ease-out` (300ms) เมื่อสลับแท็บ "คูปองของฉัน" และ "แลกคะแนน"
- **Content Slide & Fade:** รายการคูปองลอยสไลด์เข้ามาอย่างนุ่มนวลแบบ Native Mobile App
- **Clean Border Alignment:** การ์ดสมาชิกแสดงผลด้วยอัตราส่วนมาตรฐาน `2.139 : 1` ขอบมุมมนเนียนระดับ Retina ไม่มีขอบซ้อนและไม่กินมุม

---

*บันทึกข้อมูลล่าสุด: 31 สิงหาคม 2569 (Production Ready)*
