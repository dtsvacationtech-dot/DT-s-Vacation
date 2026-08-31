export interface Member {
  id: string;
  name: string;
  phone: string;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'BLACK_DIAMOND';
  points: number;
  totalSpent: number;
  totalVisits: number;
  nextTierSpend: number;
  avatar: string;
}

export interface CustomerVoucher {
  id: string;
  code: string;
  title: string;
  type: 'FREE_PASS' | 'CASH_DISCOUNT' | 'PERCENT_DISCOUNT' | 'ITEM';
  value: number;
  description: string;
  expireDate: string;
  remainingUses?: number;
  totalUses?: number;
  status: 'ACTIVE' | 'USED' | 'EXPIRED';
  badgeColor: string;
}

export interface StoreVoucher {
  id: string;
  title: string;
  originalPrice: number;
  salePrice: number;
  tag: string;
  description: string;
  popular?: boolean;
  type: string;
}

export interface RedeemReward {
  id: string;
  title: string;
  pointsRequired: number;
  originalValue: number;
  category: string;
  imageIcon: string;
  description: string;
  expireDays: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  duration: string;
  category: 'sauna' | 'vip' | 'spa' | 'drink';
  description: string;
  highlight?: string;
}

export interface MarketingCampaign {
  id: string;
  title: string;
  code: string;
  type: 'FREE_PASS' | 'CASH_DISCOUNT' | 'PERCENT_DISCOUNT';
  discountValue: number;
  minSpend: number;
  eligibleTiers: string[];
  totalQuota: number;
  usedCount: number;
  startDate: string;
  expireDate: string;
  isActive: boolean;
}

export interface POSTransaction {
  id: string;
  ticketNo: string;
  time: string;
  customerName: string;
  customerPhone: string;
  tier: 'GUEST' | 'BRONZE' | 'SILVER' | 'GOLD' | 'BLACK_DIAMOND';
  service: string;
  paymentMethod: 'CASH' | 'PROMPTPAY' | 'CREDIT_CARD' | 'FREE_PASS';
  grossAmount: number;
  discountAmount: number;
  netAmount: number;
  cashReceived?: number;
  cashChange?: number;
  voucherUsed?: string;
  staff: string;
  status: 'VERIFIED' | 'FLAGGED';
  notes?: string;
}

export const INITIAL_MEMBER: Member = {
  id: 'EKI-MEM-88912',
  name: 'คุณธนภัทร ศรีอรรถวรวงศ์',
  phone: '089-765-4321',
  tier: 'GOLD',
  points: 1850,
  totalSpent: 26400,
  totalVisits: 18,
  nextTierSpend: 30000,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
};

export const TIER_BENEFITS = [
  {
    tier: 'BRONZE',
    name: 'Bronze Member',
    badge: '🥉 Bronze',
    minSpend: '0 THB (สมัครฟรี)',
    color: '#CD7F32',
    benefits: [
      'สะสมแต้มทุก 100 บาท = 1 คะแนน',
      'รับข่าวสารโปรโมชันลับก่อนใคร',
      'สิทธิ์ซื้อ Voucher ราคาพิเศษประจำเดือน',
    ]
  },
  {
    tier: 'SILVER',
    name: 'Silver Member',
    badge: '🥈 Silver',
    minSpend: '10,000 THB / ปี',
    color: '#C0C0C0',
    benefits: [
      'รับส่วนลดบริการปกติ 5%',
      'ฟรี Welcome Herbal Drink ทุกครั้งที่เข้าใช้',
      'สะสมแต้มรับคูณ 1.2 เท่า',
    ]
  },
  {
    tier: 'GOLD',
    name: 'Gold Member',
    badge: '👑 Gold VIP',
    minSpend: '25,000 THB / ปี',
    color: '#D4AF37',
    benefits: [
      'รับส่วนลดบริการปกติ 10%',
      'ฟรี ผ้าเช็ดตัว & ล็อกเกอร์ส่วนตัว VIP',
      'สิทธิ์เข้าใช้ซาวน่าฟรี 1 ครั้งในเดือนเกิด (Birthday Pass)',
      'สะสมแต้มรับคูณ 1.5 เท่า',
      'จองห้องไพรเวทล่วงหน้าพร้อมล็อคสิทธิ์ได้ก่อนใคร',
    ]
  },
  {
    tier: 'BLACK_DIAMOND',
    name: 'Black Diamond',
    badge: '💎 Black Diamond',
    minSpend: '50,000 THB / ปี',
    color: '#E5C158',
    benefits: [
      'รับส่วนลดบริการสูงสุด 20%',
      'สิทธิ์พาเพื่อนร่วมเข้าใช้ฟรี 1 ท่าน / เดือน',
      'ฟรี Private VIP Suite Pass 2 ครั้งต่อปี',
      'ที่จอดรถ VIP Reserved เฉพาะคุณ',
      'Personal Concierge ดูแลอุณหภูมิห้องซาวน่าส่วนตัว',
    ]
  }
];

export const INITIAL_MY_VOUCHERS: CustomerVoucher[] = [
  {
    id: 'cv-1',
    code: 'EKI-FREE-BIRTHDAY',
    title: '🎂 Birthday Free Sauna Pass',
    type: 'FREE_PASS',
    value: 450,
    description: 'สิทธิ์เข้าใช้บริการซาวน่ามาตรฐานฟรี 1 ครั้ง ฉลองเดือนเกิดเฉพาะสมาชิก Gold ขึ้นไป',
    expireDate: '2026-09-30',
    status: 'ACTIVE',
    badgeColor: 'border-amber-500/50 bg-amber-950/40 text-amber-300'
  },
  {
    id: 'cv-2',
    code: 'EKI-CASH-200',
    title: '💵 Cash Voucher ส่วนลด 200.-',
    type: 'CASH_DISCOUNT',
    value: 200,
    description: 'ใช้เป็นส่วนลดเงินสดเมื่อมียอดใช้จ่ายขั้นต่ำ 500 บาท สำหรับบริการหรือเครื่องดื่ม',
    expireDate: '2026-09-15',
    status: 'ACTIVE',
    badgeColor: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
  },
  {
    id: 'cv-3',
    code: 'EKI-PASS-10X',
    title: '🎟️ 10-Times Sauna Pass (แพ็กเกจ)',
    type: 'FREE_PASS',
    value: 450,
    description: 'แพ็กเกจเหมาเข้าซาวน่า 10 ครั้ง (คงเหลือ 7 ครั้ง)',
    expireDate: '2026-12-31',
    remainingUses: 7,
    totalUses: 10,
    status: 'ACTIVE',
    badgeColor: 'border-yellow-500/50 bg-yellow-950/40 text-yellow-300'
  },
  {
    id: 'cv-4',
    code: 'EKI-DRINK-HERBAL',
    title: '🍵 Complimentary Herbal Cold-Pressed',
    type: 'ITEM',
    value: 80,
    description: 'แลกรับน้ำสมุนไพรสกัดเย็นเพื่อสุขภาพ 1 ขวดที่เคาน์เตอร์',
    expireDate: '2026-09-20',
    status: 'ACTIVE',
    badgeColor: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300'
  }
];

export const REDEEM_REWARDS: RedeemReward[] = [
  {
    id: 'rew-1',
    title: '🍵 Welcome Cold-Pressed Herbal Juice',
    pointsRequired: 150,
    originalValue: 120,
    category: 'เครื่องดื่มสุขภาพ',
    imageIcon: '🍵',
    description: 'น้ำสมุนไพรสกัดเย็นสูตร Rehydrate 1 ขวด เพื่อสุขภาพหลังซาวน่า',
    expireDays: 30
  },
  {
    id: 'rew-2',
    title: '🧖‍♂️ Standard Finnish Sauna Day Pass',
    pointsRequired: 400,
    originalValue: 450,
    category: 'บัตรเข้าใช้บริการ',
    imageIcon: '🧖‍♂️',
    description: 'เข้าใช้บริการ Finnish Sauna + Cold Plunge Ice Bath 1 วันเต็ม',
    expireDays: 45
  },
  {
    id: 'rew-3',
    title: '💵 Cash Voucher ส่วนลด 200.-',
    pointsRequired: 500,
    originalValue: 200,
    category: 'คูปองเงินสด',
    imageIcon: '💵',
    description: 'ส่วนลดเงินสด 200 บาทสำหรับบริการหรือเครื่องดื่ม ยอดขั้นต่ำ 500 บาท',
    expireDays: 30
  },
  {
    id: 'rew-4',
    title: '🌿 Royal Organic Body Scrub (45 นาที)',
    pointsRequired: 800,
    originalValue: 890,
    category: 'สปาและทรีตเมนต์',
    imageIcon: '🌿',
    description: 'สครับผิวกายด้วยเกลือทะเลหิมาลายันและน้ำมันมะพร้าวบริสุทธิ์',
    expireDays: 60
  },
  {
    id: 'rew-5',
    title: '👑 Private VIP Finnish Suite (2 ชม.)',
    pointsRequired: 1500,
    originalValue: 1500,
    category: 'ห้องส่วนตัว VIP',
    imageIcon: '👑',
    description: 'ห้องซาวน่าไพรเวทพร้อมอ่างจากุซซี่และอ่างน้ำแข็งส่วนตัว (สูงสุด 2 ท่าน)',
    expireDays: 90
  }
];

export const STORE_VOUCHERS: StoreVoucher[] = [
  {
    id: 'sv-1',
    title: '🧖‍♂️ 10-Times Sauna Pass (สุดคุ้ม)',
    originalPrice: 4500,
    salePrice: 3500,
    tag: 'ประหยัด 1,000 บาท',
    popular: true,
    type: 'แพ็กเกจ 10 ครั้ง',
    description: 'เข้าใช้บริการ Finnish Sauna + Ice Bath + Onsen ได้ 10 ครั้ง ไม่จำกัดเวลา มีอายุ 6 เดือน'
  },
  {
    id: 'sv-2',
    title: '🧖‍♂️ 5-Times Sauna Pass',
    originalPrice: 2250,
    salePrice: 1900,
    tag: 'ประหยัด 350 บาท',
    type: 'แพ็กเกจ 5 ครั้ง',
    description: 'เหมาะสำหรับผู้เริ่มต้น เข้าใช้บริการซาวน่ามาตรฐาน 5 ครั้ง มีอายุ 3 เดือน'
  },
  {
    id: 'sv-3',
    title: '👑 Private VIP Suite Experience (2 ชม.)',
    originalPrice: 2000,
    salePrice: 1500,
    tag: 'Private & Luxury',
    popular: true,
    type: 'ห้องส่วนตัว VIP',
    description: 'ห้องซาวน่าไพรเวทส่วนตัว ควบคุมอุณหภูมิและกลิ่นอโรมาได้เอง พร้อมอ่างน้ำแข็งส่วนตัว'
  },
  {
    id: 'sv-4',
    title: '💵 Cash Voucher 1,000 THB',
    originalPrice: 1000,
    salePrice: 850,
    tag: 'ลด 15%',
    type: 'บัตรกำนัลเงินสด',
    description: 'ใช้แทนเงินสดชำระได้ทุกบริการ เครื่องดื่ม และผลิตภัณฑ์สปาในร้าน'
  },
  {
    id: 'sv-5',
    title: '🌿 Herbal Scrub & Sauna Combo Pass',
    originalPrice: 1340,
    salePrice: 990,
    tag: 'บำรุงผิว & ดีท็อกซ์',
    type: 'คอมโบสปา',
    description: 'ขัดผิวสมุนไพรสด 45 นาที + ซาวน่าขับสารพิษ 1 วันเต็ม'
  }
];

export const SAUNA_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Finnish Sauna & Cold Plunge (Standard Pass)',
    nameEn: 'Standard Day Access',
    price: 450,
    duration: 'ไม่จำกัดเวลา (Day Pass)',
    category: 'sauna',
    description: 'เข้าใช้ห้องซาวน่าฟินแลนด์ไม้ซีดาร์, อ่างน้ำแข็ง Ice Bath 8°C, ห้องสตรีมสมุนไพร และพื้นที่พักผ่อน',
    highlight: 'ยอดนิยมที่สุด'
  },
  {
    id: 'srv-2',
    name: 'Private VIP Finnish Suite (2 Hours)',
    nameEn: 'Private Sauna & Jacuzzi',
    price: 1500,
    duration: '120 นาที (สูงสุด 2 ท่าน)',
    category: 'vip',
    description: 'ห้องซาวน่าไพรเวทส่วนตัวพร้อมอ่างน้ำแข็ง และจากุซซี่น้ำอุ่น ควบคุมแสงไฟและเพลงได้ตามใจชอบ',
    highlight: 'Exclusive VIP'
  },
  {
    id: 'srv-3',
    name: 'Aromatherapy Herbal Steam Bath',
    nameEn: 'Herbal Steam Session',
    price: 350,
    duration: 'ไม่จำกัดเวลา',
    category: 'sauna',
    description: 'อบไอน้ำสมุนไพรไทยแท้ 9 ชนิด ช่วยระบบทางเดินหายใจและดีท็อกซ์ผิวพรรณ'
  },
  {
    id: 'srv-4',
    name: 'Royal Organic Body Scrub (60 Mins)',
    nameEn: 'Organic Body Scrub',
    price: 890,
    duration: '60 นาที',
    category: 'spa',
    description: 'ขัดผิวกายด้วยเกลือทะเลออร์แกนิกและน้ำมันมะพร้าวบริสุทธิ์เพื่อผิวนุ่มชุ่มชื้น'
  },
  {
    id: 'srv-5',
    name: 'Cold-Pressed Detox Juice Set',
    nameEn: 'Fresh Detox Juice',
    price: 120,
    duration: 'เสิร์ฟสด',
    category: 'drink',
    description: 'น้ำผลไม้และสมุนไพรสกัดเย็นสูตร Rehydrate ฟื้นฟูเกลือแร่หลังซาวน่า'
  }
];

export const INITIAL_MARKETING_CAMPAIGNS: MarketingCampaign[] = [
  {
    id: 'camp-1',
    title: '🎉 Welcome New Member Free Pass',
    code: 'EKI-WELCOME-2026',
    type: 'FREE_PASS',
    discountValue: 450,
    minSpend: 0,
    eligibleTiers: ['BRONZE', 'SILVER', 'GOLD', 'BLACK_DIAMOND'],
    totalQuota: 200,
    usedCount: 148,
    startDate: '2026-08-01',
    expireDate: '2026-09-30',
    isActive: true
  },
  {
    id: 'camp-2',
    title: '👑 Gold & Diamond Cash Discount 300.-',
    code: 'EKI-VIP-CASH300',
    type: 'CASH_DISCOUNT',
    discountValue: 300,
    minSpend: 800,
    eligibleTiers: ['GOLD', 'BLACK_DIAMOND'],
    totalQuota: 50,
    usedCount: 42,
    startDate: '2026-08-15',
    expireDate: '2026-09-15',
    isActive: true
  },
  {
    id: 'camp-3',
    title: '🌿 Midweek Relax 20% Discount',
    code: 'EKI-MIDWEEK-20',
    type: 'PERCENT_DISCOUNT',
    discountValue: 20,
    minSpend: 450,
    eligibleTiers: ['SILVER', 'GOLD', 'BLACK_DIAMOND'],
    totalQuota: 100,
    usedCount: 35,
    startDate: '2026-08-20',
    expireDate: '2026-10-31',
    isActive: true
  }
];

export const INITIAL_POS_TRANSACTIONS: POSTransaction[] = [
  {
    id: 'tx-1085',
    ticketNo: 'TK-1085',
    time: '14:28:10',
    customerName: 'คุณธนภัทร ศรีอรรถวรวงศ์',
    customerPhone: '089-765-4321',
    tier: 'GOLD',
    service: 'Standard Sauna Pass + Cold Plunge',
    paymentMethod: 'FREE_PASS',
    grossAmount: 450,
    discountAmount: 450,
    netAmount: 0,
    voucherUsed: '🎂 Birthday Free Sauna Pass',
    staff: 'น้องฟ้า (Staff #01)',
    status: 'VERIFIED',
    notes: 'ใช้สิทธิ์เดือนเกิด บัตรประชาชนตรง'
  },
  {
    id: 'tx-1084',
    ticketNo: 'TK-1084',
    time: '14:15:32',
    customerName: 'คุณปรียาพร เกียรติสกุล',
    customerPhone: '081-445-9988',
    tier: 'BLACK_DIAMOND',
    service: 'Private VIP Finnish Suite (2 ชม.)',
    paymentMethod: 'PROMPTPAY',
    grossAmount: 1500,
    discountAmount: 300,
    netAmount: 1200,
    staff: 'น้องแพร (Staff #02)',
    status: 'VERIFIED',
    notes: 'ส่วนลด Black Diamond 20% โอนเงินแนบสลิปถูกต้อง'
  },
  {
    id: 'tx-1083',
    ticketNo: 'TK-1083',
    time: '13:58:04',
    customerName: 'Walk-in Customer (Guest)',
    customerPhone: '095-223-1144',
    tier: 'GUEST',
    service: 'Standard Day Access + Detox Juice',
    paymentMethod: 'CASH',
    grossAmount: 570,
    discountAmount: 0,
    netAmount: 570,
    cashReceived: 1000,
    cashChange: 430,
    staff: 'น้องฟ้า (Staff #01)',
    status: 'VERIFIED',
    notes: 'เงินสดใส่ลิ้นชักเรียบร้อย'
  },
  {
    id: 'tx-1082',
    ticketNo: 'TK-1082',
    time: '13:30:22',
    customerName: 'คุณอนันต์ ชาญวิทย์',
    customerPhone: '086-339-7711',
    tier: 'SILVER',
    service: 'Standard Day Access',
    paymentMethod: 'PROMPTPAY',
    grossAmount: 450,
    discountAmount: 22.5,
    netAmount: 427.5,
    staff: 'น้องฟ้า (Staff #01)',
    status: 'VERIFIED',
    notes: 'สแกน QR PromptPay เรียบร้อย'
  },
  {
    id: 'tx-1081',
    ticketNo: 'TK-1081',
    time: '13:10:15',
    customerName: 'คุณเอกสิทธิ์ ภัทรเดช',
    customerPhone: '082-991-0022',
    tier: 'GOLD',
    service: '10-Times Sauna Pass (ซื้อหน้าร้าน)',
    paymentMethod: 'PROMPTPAY',
    grossAmount: 3500,
    discountAmount: 0,
    netAmount: 3500,
    staff: 'น้องแพร (Staff #02)',
    status: 'VERIFIED',
    notes: 'ซื้อ Voucher 10 ครั้ง เพิ่มสิทธิ์เข้า Wallet เรียบร้อย'
  },
  {
    id: 'tx-1080',
    ticketNo: 'TK-1080',
    time: '12:45:00',
    customerName: 'คุณกิตติศักดิ์',
    customerPhone: '090-881-2233',
    tier: 'BRONZE',
    service: 'Standard Day Access',
    paymentMethod: 'CASH',
    grossAmount: 450,
    discountAmount: 0,
    netAmount: 450,
    cashReceived: 500,
    cashChange: 50,
    staff: 'น้องฟ้า (Staff #01)',
    status: 'VERIFIED'
  }
];
