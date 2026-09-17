# 🚀 คู่มือการ Deploy บน Digital Gateway / VPS (Self-Hosted Architecture)

โปรเจกต์นี้ได้รับการปรับเปลี่ยนโครงสร้างให้ทำงานแบบ **Full-Stack Standalone (หน้าบ้าน + หลังบ้าน)** โดย**ไม่จำเป็นต้องพึ่งพา Vercel หรือ Supabase** ช่วยลดค่าใช้จ่ายคลาวด์รายเดือนเป็น 0 บาท

---

## 🗄️ สถาปัตยกรรมระบบ (System Architecture)

- **Frontend & Backend:** Next.js Standalone Node Server (Port 3000)
- **Database:** SQLite with WAL Mode (`data/dtvacation.sqlite`)
  - เก็บข้อมูลโปรโมชั่น, ลูกค้าที่ส่ง Inquiry, สมาชิก Newsletter, ประวัติ Broadcast, บัญชีผู้ดูแล และ Security Audit Logs
  - ข้อมูลมีความคงทน (Persistent) ผ่าน Docker Volume หรือไฟล์ในเครื่อง
- **Email:** Direct Gmail SMTP (Nodemailer) หรือ Resend
- **Reverse Proxy:** Nginx + Let's Encrypt SSL (Port 80/443)

---

## 📦 วิธีที่ 1: Deploy ด้วย Docker & Docker Compose (แนะนำ)

### 1. ติดตั้ง Docker บน Server / Gateway
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### 2. โคลนโปรเจกต์และตั้งค่า `.env`
```bash
git clone https://github.com/dtsvacationtech-dot/DT-s-Vacation.git
cd DT-s-Vacation
cp .env.example .env
```
แก้ไขไฟล์ `.env` ใส่ค่าอีเมล Gmail App Password:
```env
GMAIL_USER=dtvacationandtravel@gmail.com
GMAIL_APP_PASSWORD=xrlhjcqspqkonhmv
ADMIN_SESSION_SECRET=your-random-secure-secret-key
```

### 3. สั่งรันด้วย Docker Compose
```bash
docker compose up -d --build
```
ระบบจะสร้าง Container และเปิดบริการที่ Port `3000` โดยอัตโนมัติ พร้อมผูก Volume `./data:/app/data` เพื่อเก็บ Database ไม่ให้ข้อมูลหายเมื่อ Restart หรือ Rebuild

---

## ⚡ วิธีที่ 2: Deploy ด้วย PM2 (Node.js Direct)

### 1. Build และรัน
```bash
npm install
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 🌐 ตั้งค่า Nginx Reverse Proxy & SSL (Domain)

1. คัดลอกไฟล์ Nginx:
   ```bash
   sudo cp deploy/nginx.conf /etc/nginx/sites-available/dtsvacation
   sudo ln -s /etc/nginx/sites-available/dtsvacation /etc/nginx/sites-enabled/
   ```
2. แก้ไข `server_name yourdomain.com;` ในไฟล์เป็นโดเมนของคุณ
3. ติดตั้ง SSL ด้วย Certbot:
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   sudo systemctl reload nginx
   ```
