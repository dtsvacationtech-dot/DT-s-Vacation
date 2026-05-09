// mockData.ts — นำเข้าจาก siteContent.ts ไฟล์เดียว
// ไม่ต้องแก้ไขไฟล์นี้ — แก้ที่ lib/siteContent.ts แทน
export { heroSlides, trustStats, servicePackages } from "./siteContent";

export const quizQuestions = [
  {
    id: "q1",
    question: "What is the primary return-state goal of your journey?",
    options: [
      { id: "o1", text: "Refreshed & Inspired", resultScore: { discovery: 2, union: 0, synergy: 0 } },
      { id: "o2", text: "Connected & Celebrated", resultScore: { discovery: 0, union: 2, synergy: 1 } },
      { id: "o3", text: "Bold & Strategic", resultScore: { discovery: 1, union: 0, synergy: 2 } },
    ],
  },
];
