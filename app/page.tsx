"use client";
import { Fragment, useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Lang = "en" | "ur" | "ar";
type L3 = Record<Lang, string>;
type User = { name: string; phone: string; email?: string };
type Offer = { fee: string; days: string; note: string };

// Business WhatsApp number in international format (no +)
const WHATSAPP = "923089400872";
const WHATSAPP_DISPLAY = "0308 9400872";

// Google AdSense settings (set these in Vercel > Settings > Environment Variables)
const ADS_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
const SLOT_SIDE = process.env.NEXT_PUBLIC_AD_SLOT_SIDE || "";
const SLOT_INLINE = process.env.NEXT_PUBLIC_AD_SLOT_INLINE || "";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو" },
  { code: "ar", label: "العربية" },
];

/* ---------- Interface text ---------- */
const T: Record<string, L3> = {
  chooseLang: { en: "Choose your language", ur: "اپنی زبان منتخب کریں", ar: "اختر لغتك" },
  tagline: {
    en: "Your trusted partner for visa guidance",
    ur: "ویزا رہنمائی کے لیے آپ کا قابلِ اعتماد ساتھی",
    ar: "شريكك الموثوق في إرشادات التأشيرات",
  },
  signUp: { en: "Sign up", ur: "سائن اپ کریں", ar: "إنشاء حساب" },
  welcome: { en: "Welcome, {name}!", ur: "خوش آمدید، {name}!", ar: "مرحباً، {name}!" },
  selectCountry: { en: "Select a country", ur: "ملک منتخب کریں", ar: "اختر الدولة" },
  selectVisa: {
    en: "Select a visa type for {country}",
    ur: "{country} کے لیے ویزا کی قسم منتخب کریں",
    ar: "اختر نوع التأشيرة إلى {country}",
  },
  tapChecklist: {
    en: "Tap to view the document checklist",
    ur: "دستاویزات کی فہرست دیکھنے کے لیے دبائیں",
    ar: "اضغط لعرض قائمة المستندات",
  },
  fee: { en: "Fee", ur: "فیس", ar: "الرسوم" },
  processing: { en: "Processing", ur: "مدت", ar: "المدة" },
  feeNote: {
    en: "Fees and processing time are confirmed after review.",
    ur: "فیس اور وقت کا تعین جائزے کے بعد کیا جاتا ہے۔",
    ar: "تُحدَّد الرسوم ومدة المعالجة بعد المراجعة.",
  },
  back: { en: "Back to visa types", ur: "ویزا کی اقسام پر واپس جائیں", ar: "العودة إلى أنواع التأشيرات" },
  tickIntro: {
    en: "Tick each document you have ready. You will then send them to us on WhatsApp.",
    ur: "جو دستاویزات آپ کے پاس تیار ہیں ان پر نشان لگائیں۔ اس کے بعد آپ انہیں واٹس ایپ پر ہمیں بھیجیں گے۔",
    ar: "ضع علامة على كل مستند جاهز لديك. بعد ذلك سترسلها إلينا عبر واتساب.",
  },
  submit: { en: "Submit checklist", ur: "چیک لسٹ جمع کروائیں", ar: "إرسال القائمة" },
  submitDisabled: {
    en: "Tick all documents to enable submit",
    ur: "جمع کروانے کے لیے تمام دستاویزات پر نشان لگائیں",
    ar: "ضع علامة على جميع المستندات لتفعيل الإرسال",
  },
  authTitle: {
    en: "Sign up to continue",
    ur: "جاری رکھنے کے لیے سائن اپ کریں",
    ar: "أنشئ حساباً للمتابعة",
  },
  fullName: { en: "Full name", ur: "پورا نام", ar: "الاسم الكامل" },
  email: { en: "Email (optional)", ur: "ای میل (اختیاری)", ar: "البريد الإلكتروني (اختياري)" },
  phone: {
    en: "WhatsApp number (e.g. 03001234567)",
    ur: "واٹس ایپ نمبر (مثلاً 03001234567)",
    ar: "رقم واتساب (مثال: 03001234567)",
  },
  consent: {
    en: "I agree to be contacted about my visa enquiry by WhatsApp, phone or email.",
    ur: "میں اپنی ویزا درخواست کے سلسلے میں واٹس ایپ، فون یا ای میل کے ذریعے رابطے کی اجازت دیتا/دیتی ہوں۔",
    ar: "أوافق على التواصل معي بخصوص استفسار التأشيرة عبر واتساب أو الهاتف أو البريد الإلكتروني.",
  },
  needConsent: {
    en: "Please tick the box to agree.",
    ur: "براہ کرم اتفاق کے خانے پر نشان لگائیں۔",
    ar: "يرجى تحديد المربع للموافقة.",
  },
  continue: { en: "Continue", ur: "جاری رکھیں", ar: "متابعة" },
  cancel: { en: "Cancel", ur: "منسوخ کریں", ar: "إلغاء" },
  fillAll: { en: "Please fill in all required fields.", ur: "براہ کرم تمام ضروری خانے پُر کریں۔", ar: "يرجى تعبئة جميع الحقول المطلوبة." },
  badPhone: {
    en: "Please enter a valid WhatsApp number.",
    ur: "براہ کرم درست واٹس ایپ نمبر درج کریں۔",
    ar: "يرجى إدخال رقم واتساب صحيح.",
  },
  readyTitle: { en: "Your checklist is ready to send", ur: "آپ کی چیک لسٹ بھیجنے کے لیے تیار ہے", ar: "قائمتك جاهزة للإرسال" },
  readyBody: {
    en: "Hi {name}, tap the button below to send your {visa} checklist to us on WhatsApp. We will review it and reply within 1–2 business days.",
    ur: "{name}، اپنی {visa} کی چیک لسٹ واٹس ایپ پر بھیجنے کے لیے نیچے دیا گیا بٹن دبائیں۔ ہم اس کا جائزہ لے کر 1 سے 2 کاروباری دنوں میں جواب دیں گے۔",
    ar: "مرحباً {name}، اضغط على الزر أدناه لإرسال قائمة {visa} إلينا عبر واتساب. سنراجعها ونرد عليك خلال يوم إلى يومي عمل.",
  },
  sendWA: { en: "Send on WhatsApp", ur: "واٹس ایپ پر بھیجیں", ar: "إرسال عبر واتساب" },
  another: { en: "Submit another application", ur: "ایک اور درخواست جمع کروائیں", ar: "تقديم طلب آخر" },
  changeDetails: { en: "Not you? Change details", ur: "آپ نہیں ہیں؟ معلومات تبدیل کریں", ar: "لست أنت؟ غيّر البيانات" },
  adLabel: { en: "Advertisement", ur: "اشتہار", ar: "إعلان" },
  disclaimer: {
    en: "We are an independent visa consultancy. We are not an embassy or a government office, and we cannot guarantee visa approval.",
    ur: "ہم ایک آزاد ویزا کنسلٹنسی ہیں۔ ہم کوئی سفارت خانہ یا سرکاری دفتر نہیں ہیں اور ویزا منظوری کی ضمانت نہیں دے سکتے۔",
    ar: "نحن شركة استشارات تأشيرات مستقلة. لسنا سفارة ولا جهة حكومية، ولا يمكننا ضمان الموافقة على التأشيرة.",
  },
  footer: { en: "All rights reserved", ur: "جملہ حقوق محفوظ ہیں", ar: "جميع الحقوق محفوظة" },
};

/* ---------- Names ---------- */
const countryNames: Record<string, L3> = {
  UAE: { en: "UAE", ur: "متحدہ عرب امارات", ar: "الإمارات" },
  Turkey: { en: "Turkey", ur: "ترکی", ar: "تركيا" },
  Saudi: { en: "Saudi Arabia", ur: "سعودی عرب", ar: "السعودية" },
  USA: { en: "USA", ur: "امریکہ", ar: "الولايات المتحدة" },
  UK: { en: "UK", ur: "برطانیہ", ar: "المملكة المتحدة" },
};

const visaNames: Record<string, L3> = {
  visit: { en: "Visit Visa", ur: "وزٹ ویزا", ar: "تأشيرة زيارة" },
  business: { en: "Business Visa", ur: "بزنس ویزا", ar: "تأشيرة أعمال" },
  work: { en: "Work Visa", ur: "ورک ویزا", ar: "تأشيرة عمل" },
  umrah: { en: "Umrah Visa", ur: "عمرہ ویزا", ar: "تأشيرة عمرة" },
};

/* ---------- Documents ---------- */
const D: Record<string, L3> = {
  passport6: {
    en: "Passport copy (valid for at least 6 months)",
    ur: "پاسپورٹ کی کاپی (کم از کم 6 ماہ کی میعاد کے ساتھ)",
    ar: "نسخة من جواز السفر (صالح لمدة 6 أشهر على الأقل)",
  },
  passport8: {
    en: "Passport (valid for at least 8 months)",
    ur: "پاسپورٹ (کم از کم 8 ماہ کی میعاد کے ساتھ)",
    ar: "جواز سفر (صالح لمدة 8 أشهر على الأقل)",
  },
  passportCopy: { en: "Passport copy", ur: "پاسپورٹ کی کاپی", ar: "نسخة من جواز السفر" },
  photoWhite: { en: "Photograph with a white background", ur: "سفید پس منظر والی تصویر", ar: "صورة شخصية بخلفية بيضاء" },
  photo: { en: "Photograph", ur: "تصویر", ar: "صورة شخصية" },
  photo5: { en: "Photograph (5×5 cm)", ur: "تصویر (5×5 سینٹی میٹر)", ar: "صورة شخصية (5×5 سم)" },
  cnic: { en: "CNIC copy", ur: "شناختی کارڈ کی کاپی", ar: "نسخة من بطاقة الهوية (CNIC)" },
  returnTicket: { en: "Return ticket booking", ur: "واپسی ٹکٹ کی بکنگ", ar: "حجز تذكرة العودة" },
  bank6: { en: "Bank statement (last 6 months)", ur: "بینک اسٹیٹمنٹ (آخری 6 ماہ)", ar: "كشف حساب بنكي (آخر 6 أشهر)" },
  bank3: { en: "Bank statement (last 3 months)", ur: "بینک اسٹیٹمنٹ (آخری 3 ماہ)", ar: "كشف حساب بنكي (آخر 3 أشهر)" },
  bankGen: { en: "Bank statement", ur: "بینک اسٹیٹمنٹ", ar: "كشف حساب بنكي" },
  companyLetter: {
    en: "Company letter / NTN certificate",
    ur: "کمپنی کا خط / این ٹی این سرٹیفکیٹ",
    ar: "خطاب الشركة / شهادة الرقم الضريبي (NTN)",
  },
  ntnCert: { en: "NTN certificate", ur: "این ٹی این سرٹیفکیٹ", ar: "شهادة الرقم الضريبي (NTN)" },
  chamber: { en: "Chamber of Commerce letter", ur: "چیمبر آف کامرس کا خط", ar: "خطاب غرفة التجارة" },
  educational: { en: "Educational documents", ur: "تعلیمی اسناد", ar: "الشهادات الدراسية" },
  experience: { en: "Experience letter", ur: "تجربے کا خط", ar: "شهادة الخبرة" },
  frc: {
    en: "Family Registration Certificate (FRC) or marriage certificate, if travelling with family",
    ur: "فیملی رجسٹریشن سرٹیفکیٹ (FRC) یا نکاح نامہ، اگر اہلِ خانہ کے ساتھ سفر کر رہے ہوں",
    ar: "شهادة تسجيل العائلة (FRC) أو عقد الزواج عند السفر مع العائلة",
  },
  vaccine: { en: "Vaccination card", ur: "ویکسین کارڈ", ar: "بطاقة التطعيم" },
  medical: { en: "Medical report", ur: "میڈیکل رپورٹ", ar: "تقرير طبي" },
  degreeAtt: { en: "Attested degree", ur: "تصدیق شدہ ڈگری", ar: "شهادة جامعية مصدّقة" },
  jobLetter: {
    en: "Job letter / FBR tax record",
    ur: "ملازمت کا خط / ایف بی آر ٹیکس ریکارڈ",
    ar: "خطاب العمل / سجل الضرائب (FBR)",
  },
  companyDocs: { en: "Company documents", ur: "کمپنی کے دستاویزات", ar: "وثائق الشركة" },
  invitation: { en: "Invitation letter (if any)", ur: "دعوت نامہ (اگر ہو)", ar: "خطاب دعوة (إن وجد)" },
  empLetter: { en: "Employment letter", ur: "ملازمت کا خط", ar: "خطاب التوظيف" },
};

const visaData: Record<string, Record<string, string[]>> = {
  UAE: {
    visit: ["passport6", "photoWhite", "cnic", "returnTicket"],
    business: ["passport6", "photoWhite", "cnic", "bank6", "companyLetter"],
    work: ["passport6", "photoWhite", "cnic", "educational", "experience"],
  },
  Turkey: {
    visit: ["passportCopy", "photo", "cnic", "bank3", "frc"],
    business: ["passportCopy", "photo", "ntnCert", "bank6", "chamber"],
  },
  Saudi: {
    umrah: ["passport8", "photoWhite", "cnic", "vaccine"],
    work: ["passportCopy", "photo", "cnic", "medical", "degreeAtt"],
  },
  USA: {
    visit: ["passportCopy", "photo5", "bank6", "jobLetter"],
    business: ["passportCopy", "photo5", "companyDocs", "bankGen", "invitation"],
  },
  UK: {
    visit: ["passportCopy", "photo", "bank6", "empLetter", "cnic"],
  },
};

const countries = Object.keys(visaData);

/* ---------- Blurred background scenes ---------- */
type Scene = "UAE" | "Turkey" | "Saudi" | "USA" | "UK" | "work" | "business";

const SKY: Record<Scene, [string, string]> = {
  UAE: ["#f59e0b", "#7c2d12"],
  Turkey: ["#f87171", "#7f1d1d"],
  Saudi: ["#facc15", "#78350f"],
  USA: ["#60a5fa", "#1e3a8a"],
  UK: ["#94a3b8", "#334155"],
  work: ["#fb923c", "#44403c"],
  business: ["#38bdf8", "#0f172a"],
};

const INK = "#0b1220";

// Construction worker: yellow helmet, tool in hand, sweat drops
function Worker({ x, s = 1.5, tool }: { x: number; s?: number; tool: "hammer" | "shovel" | "wrench" }) {
  return (
    <g transform={`translate(${x} 600) scale(${s})`}>
      <rect x="-18" y="-112" width="36" height="72" rx="10" fill={INK} />
      <rect x="-15" y="-44" width="13" height="44" fill={INK} />
      <rect x="2" y="-44" width="13" height="44" fill={INK} />
      <circle cx="0" cy="-128" r="13" fill={INK} />
      <path d="M-17 -131 A17 17 0 0 1 17 -131 Z" fill="#facc15" />
      <rect x="-22" y="-133" width="44" height="5" rx="2" fill="#facc15" />
      <path d="M16 -102 L44 -138" stroke={INK} strokeWidth="7" strokeLinecap="round" fill="none" />
      {tool === "hammer" && (
        <rect x="34" y="-152" width="26" height="12" rx="2" fill={INK} transform="rotate(-35 47 -146)" />
      )}
      {tool === "shovel" && <path d="M40 -146 L58 -156 L66 -140 L50 -128Z" fill={INK} />}
      {tool === "wrench" && <circle cx="48" cy="-146" r="9" fill="none" stroke={INK} strokeWidth="6" />}
      <circle cx="22" cy="-134" r="2.6" fill="#bae6fd" />
      <circle cx="-21" cy="-124" r="2.6" fill="#bae6fd" />
      <circle cx="19" cy="-118" r="2.2" fill="#bae6fd" />
    </g>
  );
}

function Truck({ x, s = 1 }: { x: number; s?: number }) {
  return (
    <g transform={`translate(${x} 600) scale(${s})`} fill={INK}>
      <path d="M-100 -100 L40 -100 L30 -40 L-100 -40Z" />
      <path d="M44 -88 L44 -40 L112 -40 L112 -62 L92 -88Z" />
      <rect x="-104" y="-44" width="220" height="14" />
      <rect x="62" y="-80" width="22" height="14" fill="#cbd5e1" opacity="0.5" />
      {[-70, 10, 82].map((cx) => (
        <circle key={cx} cx={cx} cy={-22} r={20} fill="#1f2937" stroke="#94a3b8" strokeWidth="3" />
      ))}
    </g>
  );
}

// Businessman / businesswoman in a suit with a briefcase or handbag
function Suit({ x, s = 1.5, woman = false }: { x: number; s?: number; woman?: boolean }) {
  return (
    <g transform={`translate(${x} 600) scale(${s})`} fill={INK}>
      {woman ? (
        <>
          <path d="M-14 -176 Q-22 -140 -16 -128 L16 -128 Q22 -140 14 -176 Q0 -190 -14 -176Z" />
          <circle cx="0" cy="-160" r="12" />
          <path d="M-20 -146 L20 -146 L16 -92 L-16 -92Z" />
          <path d="M-18 -94 L18 -94 L28 -40 L-28 -40Z" />
          <rect x="-9" y="-42" width="6" height="42" />
          <rect x="3" y="-42" width="6" height="42" />
          <rect x="22" y="-80" width="22" height="18" rx="4" fill="#be123c" />
        </>
      ) : (
        <>
          <circle cx="0" cy="-166" r="13" />
          <path d="M-26 -148 L26 -148 L22 -66 L-22 -66Z" />
          <path d="M0 -148 L6 -124 L0 -100 L-6 -124Z" fill="#ef4444" />
          <rect x="-15" y="-68" width="12" height="68" />
          <rect x="3" y="-68" width="12" height="68" />
          <path d="M24 -144 L36 -70" stroke={INK} strokeWidth="8" strokeLinecap="round" fill="none" />
          <rect x="22" y="-72" width="34" height="24" rx="4" fill="#92400e" />
        </>
      )}
    </g>
  );
}

const TOWERS: [number, number, number][] = [
  [360, 190, 110],
  [480, 60, 130],
  [620, 140, 120],
  [750, 30, 140],
  [900, 200, 110],
  [200, 260, 120],
  [60, 330, 110],
  [1040, 280, 120],
];

// Dark silhouettes drawn in a 1200x600 box. The key subject sits near x=600 so it stays visible on phones.
function SceneArt({ scene }: { scene: Scene }) {
  switch (scene) {
    case "UAE":
      return (
        <g fill={INK}>
          <path d="M0 600 V570 Q300 520 600 570 T1200 550 V600Z" opacity="0.6" />
          <g opacity="0.6">
            <rect x="380" y="400" width="40" height="200" />
            <rect x="430" y="340" width="34" height="260" />
            <rect x="740" y="370" width="44" height="230" />
            <rect x="800" y="430" width="50" height="170" />
            <rect x="250" y="460" width="60" height="140" />
            <rect x="900" y="410" width="40" height="190" />
          </g>
          <path d="M560 600 L575 360 L582 360 L586 250 L592 250 L596 140 L600 20 L604 140 L608 250 L614 250 L618 360 L625 360 L640 600Z" />
        </g>
      );
    case "Turkey":
      return (
        <g fill={INK}>
          <path d="M0 600 V570 Q300 530 600 570 T1200 550 V600Z" opacity="0.6" />
          <path d="M470 470 A130 130 0 0 1 730 470 Z" />
          <rect x="598" y="300" width="4" height="42" />
          <rect x="460" y="470" width="280" height="130" />
          <path d="M390 535 A70 70 0 0 1 530 535 Z" />
          <path d="M670 535 A70 70 0 0 1 810 535 Z" />
          <rect x="360" y="535" width="480" height="65" />
          <rect x="332" y="270" width="16" height="330" />
          <path d="M328 270 L340 220 L352 270Z" />
          <rect x="326" y="340" width="28" height="6" />
          <rect x="852" y="270" width="16" height="330" />
          <path d="M848 270 L860 220 L872 270Z" />
          <rect x="846" y="340" width="28" height="6" />
        </g>
      );
    case "Saudi":
      return (
        <g fill={INK}>
          <path d="M0 600 V575 Q300 530 600 575 T1200 555 V600Z" opacity="0.6" />
          <g opacity="0.6">
            <rect x="620" y="340" width="50" height="260" />
            <rect x="790" y="310" width="50" height="290" />
            <rect x="860" y="390" width="60" height="210" />
            <rect x="300" y="370" width="12" height="230" />
            <path d="M296 370 L306 335 L316 370Z" />
          </g>
          <rect x="690" y="210" width="80" height="390" />
          <path d="M680 210 L730 90 L780 210Z" />
          <rect x="727" y="40" width="6" height="55" />
          <circle cx="730" cy="270" r="26" fill="#fde68a" opacity="0.6" />
          <rect x="380" y="470" width="130" height="130" />
          <rect x="380" y="490" width="130" height="10" fill="#fbbf24" opacity="0.85" />
        </g>
      );
    case "USA":
      return (
        <g fill={INK}>
          <g opacity="0.6">
            <rect x="120" y="420" width="50" height="180" />
            <rect x="180" y="360" width="60" height="240" />
            <rect x="250" y="440" width="50" height="160" />
            <rect x="300" y="330" width="70" height="270" />
            <rect x="880" y="400" width="60" height="200" />
            <rect x="950" y="340" width="50" height="260" />
            <rect x="1010" y="430" width="70" height="170" />
            <rect x="1090" y="380" width="60" height="220" />
          </g>
          <rect x="545" y="480" width="110" height="120" />
          <rect x="560" y="455" width="80" height="30" />
          <path d="M575 455 L588 300 L612 300 L625 455Z" />
          <circle cx="600" cy="283" r="17" />
          <path d="M583 270 L576 250 L588 262 L592 244 L598 260 L604 242 L610 262 L618 246 L616 270Z" />
          <path d="M612 315 L655 215" stroke={INK} strokeWidth="11" strokeLinecap="round" fill="none" />
          <rect x="645" y="185" width="20" height="32" rx="3" />
          <path d="M655 180 Q640 150 655 125 Q670 150 655 180Z" fill="#fbbf24" opacity="0.9" />
          <rect x="570" y="340" width="22" height="32" rx="3" />
        </g>
      );
    case "UK":
      return (
        <g fill={INK}>
          <g opacity="0.6">
            <circle cx="250" cy="400" r="130" fill="none" stroke={INK} strokeWidth="8" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const a = (i * Math.PI) / 8;
              return (
                <line
                  key={i}
                  x1={250 - 130 * Math.cos(a)}
                  y1={400 - 130 * Math.sin(a)}
                  x2={250 + 130 * Math.cos(a)}
                  y2={400 + 130 * Math.sin(a)}
                  stroke={INK}
                  strokeWidth="3"
                />
              );
            })}
            <path d="M250 400 L215 600 M250 400 L285 600" stroke={INK} strokeWidth="8" fill="none" />
            <rect x="640" y="470" width="460" height="130" />
            <rect x="670" y="430" width="18" height="40" />
            <rect x="780" y="440" width="18" height="30" />
            <rect x="900" y="430" width="18" height="40" />
            <rect x="1010" y="440" width="18" height="30" />
          </g>
          <rect x="560" y="260" width="60" height="340" />
          <rect x="550" y="190" width="80" height="80" />
          <path d="M548 190 L590 90 L632 190Z" />
          <rect x="588" y="40" width="4" height="52" />
          <circle cx="590" cy="232" r="24" fill="#fde68a" opacity="0.6" />
        </g>
      );
    case "work":
      return (
        <g fill={INK}>
          <rect x="0" y="590" width="1200" height="10" />
          <g opacity="0.55">
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={`f${i}`} x="560" y={340 + i * 50} width="360" height="8" />
            ))}
            {[0, 1, 2, 3].map((j) => (
              <rect key={`c${j}`} x={560 + j * 117} y="340" width="9" height="250" />
            ))}
          </g>
          <rect x="420" y="90" width="14" height="500" />
          <rect x="300" y="90" width="520" height="9" />
          <rect x="300" y="99" width="40" height="30" />
          <rect x="410" y="100" width="34" height="24" />
          <path d="M427 90 L427 50 M427 50 L330 90 M427 50 L760 90 M700 99 L700 250" stroke={INK} strokeWidth="3" fill="none" />
          <rect x="680" y="250" width="40" height="30" />
          <Truck x={150} s={0.9} />
          <Truck x={470} />
          <Worker x={250} tool="wrench" />
          <Worker x={640} tool="hammer" />
          <Worker x={740} tool="shovel" s={1.4} />
          <Worker x={830} tool="wrench" />
          <Worker x={1000} tool="hammer" />
        </g>
      );
    case "business":
      return (
        <g>
          <defs>
            <pattern id="nvp-win" width="16" height="20" patternUnits="userSpaceOnUse">
              <rect x="4" y="5" width="7" height="9" fill="#fde68a" opacity="0.55" />
            </pattern>
          </defs>
          {TOWERS.map(([x, y, w]) => (
            <g key={x}>
              <rect x={x} y={y} width={w} height={600 - y} fill={INK} opacity="0.85" />
              <rect x={x} y={y} width={w} height={600 - y} fill="url(#nvp-win)" />
            </g>
          ))}
          <Suit x={150} woman />
          <Suit x={520} woman />
          <Suit x={620} />
          <Suit x={730} woman />
          <Suit x={1000} />
        </g>
      );
  }
}

function Backdrop({ scene }: { scene: Scene }) {
  const [top, bottom] = SKY[scene];
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden bg-neutral-800">
      <div key={scene} className="nvp-fade absolute inset-0" style={{ background: `linear-gradient(to bottom, ${top}, ${bottom})` }}>
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full scale-110 opacity-80 blur-[4px]"
        >
          <SceneArt scene={scene} />
        </svg>
      </div>
      <div className="absolute inset-0 bg-neutral-900/55" />
    </div>
  );
}

/* ---------- Google ad slot ---------- */
function AdSlot({ slot, className = "", label }: { slot: string; className?: string; label: string }) {
  const live = Boolean(ADS_CLIENT && slot);

  useEffect(() => {
    if (!live) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // ad blocker or script not ready: ignore
    }
  }, [live, slot]);

  return (
    <div className={`w-full ${className}`}>
      <p className="text-center text-[10px] uppercase tracking-wide text-neutral-400 mb-1">{label}</p>
      {live ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={ADS_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="h-full min-h-[90px] rounded-xl border border-dashed border-neutral-500 bg-neutral-700/60" />
      )}
    </div>
  );
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
  const [selectedCountry, setSelectedCountry] = useState("UAE");
  const [selectedVisa, setSelectedVisa] = useState("");
  const [ticks, setTicks] = useState<boolean[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [offers, setOffers] = useState<Record<string, Offer>>({});

  // Translate helper: t("key", { name: "Ali" })
  const t = (key: string, vars?: Record<string, string>) => {
    let s = T[key]?.[lang] ?? key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        s = s.split(`{${k}}`).join(vars[k]);
      });
    }
    return s;
  };

  // Load saved language and user
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("nvp_lang");
      if (savedLang === "en" || savedLang === "ur" || savedLang === "ar") setLang(savedLang);
      const savedUser = localStorage.getItem("nvp_user");
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch {
      // storage unavailable: ignore
    }
  }, []);

  // Load current visa offers (fees and processing times you maintain in your Google Sheet)
  useEffect(() => {
    fetch("/api/offers")
      .then((r) => (r.ok ? r.json() : { offers: {} }))
      .then((data: { offers?: Record<string, Offer> }) => setOffers(data.offers || {}))
      .catch(() => setOffers({}));
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("nvp_lang", l);
    } catch {
      // ignore
    }
  };

  const docIds: string[] = selectedVisa ? visaData[selectedCountry]?.[selectedVisa] || [] : [];

  useEffect(() => {
    setTicks(new Array(docIds.length).fill(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVisa, selectedCountry]);

  const allTicked = ticks.length > 0 && ticks.every(Boolean);

  // Save every sign-up and every submitted checklist as a lead
  const postLead = (u: User, country: string, visa: string, stage: string) => {
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: u.name,
        phone: u.phone,
        email: u.email || "",
        country: country ? countryNames[country].en : "",
        visa: visa ? visaNames[visa].en : "",
        stage,
        lang,
      }),
    }).catch(() => {
      // lead could not be saved: the WhatsApp message still reaches you
    });
  };

  const handleContinue = () => {
    if (!name.trim() || !phone.trim()) {
      setError(t("fillAll"));
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError(t("badPhone"));
      return;
    }
    if (!consent) {
      setError(t("needConsent"));
      return;
    }
    const newUser: User = { name: name.trim(), phone: phone.trim(), email: email.trim() };
    try {
      localStorage.setItem("nvp_user", JSON.stringify(newUser));
    } catch {
      // ignore
    }
    setUser(newUser);
    setError("");
    setShowAuth(false);

    const submittingNow = Boolean(selectedVisa) && allTicked;
    postLead(newUser, selectedVisa ? selectedCountry : "", selectedVisa, submittingNow ? "checklist_submitted" : "signup");
    if (submittingNow) setIsSubmitted(true);
  };

  const changeDetails = () => {
    try {
      localStorage.removeItem("nvp_user");
    } catch {
      // ignore
    }
    setUser(null);
    setName("");
    setEmail("");
    setPhone("");
    setConsent(false);
    setIsSubmitted(false);
  };

  // WhatsApp message is always in English so the business can read it
  const buildWaLink = () => {
    const lines = [
      `Hello, my name is ${user?.name ?? ""}.`,
      `I would like to apply for: ${countryNames[selectedCountry]?.en} - ${visaNames[selectedVisa]?.en}.`,
      `My WhatsApp number: ${user?.phone ?? ""}.`,
      `Documents ready:`,
      ...docIds.map((id, i) => `${i + 1}. ${D[id]?.en ?? id}`),
    ];
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const dir = lang === "en" ? "ltr" : "rtl";
  const visaKeys = Object.keys(visaData[selectedCountry] || {});

  // Background: work and business visas get their own scene, everything else shows the country landmark
  const scene: Scene =
    selectedVisa === "work" ? "work" : selectedVisa === "business" ? "business" : (selectedCountry as Scene);

  // Bold, stylish heading font (Latin: Montserrat, Urdu/Arabic: Noto Sans Arabic)
  const headStyle = {
    fontFamily: lang === "en" ? "'Montserrat', sans-serif" : "'Noto Sans Arabic', sans-serif",
  };
  const H = "font-extrabold tracking-tight drop-shadow-lg";

  return (
    <div dir={dir} lang={lang} className="relative min-h-screen text-white p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Noto+Sans+Arabic:wght@800&display=swap');
        @keyframes nvpFade { from { opacity: 0; } to { opacity: 1; } }
        .nvp-fade { animation: nvpFade 0.9s ease; }
      `}</style>
      <Backdrop scene={scene} />
      {ADS_CLIENT && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}

      <div className="relative z-10 mx-auto flex max-w-7xl justify-center gap-4">
        {/* Left ad rail (large screens only) */}
        <aside className="hidden xl:block w-40 shrink-0">
          <div className="sticky top-4">
            <AdSlot slot={SLOT_SIDE} label={t("adLabel")} className="min-h-[600px]" />
          </div>
        </aside>

        {/* Main column */}
        <div className="min-w-0 w-full max-w-4xl">
          {/* Header */}
          <h1 style={headStyle} className={`${H} text-4xl sm:text-5xl text-center text-white pt-6 uppercase`}>
            National Visas Portal <span className="text-green-400">PK</span>
          </h1>
          <p className="text-center text-sm text-neutral-300 mt-1 mb-4">{t("tagline")}</p>

          {!user && (
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setShowAuth(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-2 rounded-full"
              >
                {t("signUp")}
              </button>
            </div>
          )}

          {/* Language selector */}
          <div className="bg-white text-neutral-900 rounded-xl shadow p-3 mb-6">
            <p className="text-center text-xs text-neutral-500 mb-2">{t("chooseLang")}</p>
            <div className="flex gap-2 justify-center">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLang(l.code)}
                  className={`px-5 py-2 rounded-full border font-semibold ${
                    lang === l.code
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-neutral-800 border-neutral-300"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {user && (
            <div className="bg-white text-green-700 font-semibold border-s-4 border-green-600 p-3 rounded mb-4 text-center">
              {t("welcome", { name: user.name })}
            </div>
          )}

          {!selectedVisa ? (
            <>
              <h2 style={headStyle} className={`${H} text-2xl mb-3`}>{t("selectCountry")}</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {countries.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedCountry(c);
                      setSelectedVisa("");
                      setIsSubmitted(false);
                    }}
                    className={`px-4 py-2 rounded-full border ${
                      selectedCountry === c
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-neutral-800 border-neutral-300"
                    }`}
                  >
                    {countryNames[c][lang]}
                  </button>
                ))}
              </div>

              <AdSlot slot={SLOT_INLINE} label={t("adLabel")} className="mb-6" />

              <h2 style={headStyle} className={`${H} text-2xl mb-3`}>
                {t("selectVisa", { country: countryNames[selectedCountry][lang] })}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {visaKeys.map((v, idx) => {
                  const offer = offers[`${selectedCountry}|${v}`];
                  return (
                    <Fragment key={v}>
                      <button
                        onClick={() => setSelectedVisa(v)}
                        className="bg-white text-neutral-900 p-4 rounded-xl shadow border border-transparent text-start hover:border-green-600"
                      >
                        <div style={headStyle} className="text-lg font-extrabold">{visaNames[v][lang]}</div>
                        {offer && (
                          <div className="text-sm text-green-700 font-semibold mt-1">
                            {t("fee")}: {offer.fee} • {t("processing")}: {offer.days}
                          </div>
                        )}
                        {offer?.note && <div className="text-xs text-neutral-500 mt-1">{offer.note}</div>}
                        <div className="text-sm text-neutral-500 mt-1">{t("tapChecklist")}</div>
                      </button>
                      {/* Extra ad after every 3rd card */}
                      {idx % 3 === 2 && idx < visaKeys.length - 1 && (
                        <div className="col-span-full">
                          <AdSlot slot={SLOT_INLINE} label={t("adLabel")} />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
              <p className="text-xs text-neutral-300 mt-4">{t("feeNote")}</p>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setSelectedVisa("");
                  setIsSubmitted(false);
                }}
                className="mb-4 text-green-400 hover:text-green-300"
              >
                {t("back")}
              </button>
              <div className="bg-white text-neutral-900 rounded-xl shadow p-6">
                <h2 style={headStyle} className="text-2xl font-extrabold mb-2">
                  {countryNames[selectedCountry][lang]} — {visaNames[selectedVisa][lang]}
                </h2>

                {!isSubmitted ? (
                  <>
                    <p className="text-sm text-neutral-500 mb-4">{t("tickIntro")}</p>
                    {docIds.map((id, i) => (
                      <label key={id} className="flex items-center gap-3 py-3 border-b border-neutral-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ticks[i] || false}
                          onChange={() => {
                            const n = [...ticks];
                            n[i] = !n[i];
                            setTicks(n);
                          }}
                          className="w-5 h-5 accent-green-600"
                        />
                        <span className="text-[15px]">
                          {i + 1}. {D[id][lang]}
                        </span>
                      </label>
                    ))}

                    <button
                      disabled={!allTicked}
                      onClick={() => {
                        if (!user) {
                          setShowAuth(true);
                        } else {
                          postLead(user, selectedCountry, selectedVisa, "checklist_submitted");
                          setIsSubmitted(true);
                        }
                      }}
                      className={`w-full mt-6 py-3 rounded-lg font-bold ${
                        allTicked ? "bg-green-600 hover:bg-green-700 text-white" : "bg-neutral-300 text-neutral-500"
                      }`}
                    >
                      {allTicked ? t("submit") : t("submitDisabled")}
                    </button>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-5xl mb-3">✅</div>
                    <h3 className="text-xl font-bold text-green-700">{t("readyTitle")}</h3>
                    <p className="mt-2">
                      {t("readyBody", { name: user?.name ?? "", visa: visaNames[selectedVisa][lang] })}
                    </p>
                    <a
                      href={buildWaLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold"
                    >
                      💬 {t("sendWA")} ({WHATSAPP_DISPLAY})
                    </a>
                    <div className="mt-6 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setSelectedVisa("");
                        }}
                        className="text-green-700 text-sm"
                      >
                        {t("another")}
                      </button>
                      <button onClick={changeDetails} className="text-neutral-500 text-xs">
                        {t("changeDetails")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* No ad on the final WhatsApp step, so nothing distracts from your lead */}
          {!isSubmitted && <AdSlot slot={SLOT_INLINE} label={t("adLabel")} className="mt-8" />}

          <p className="text-center text-xs text-neutral-300 mt-8 max-w-xl mx-auto">{t("disclaimer")}</p>
          <p className="text-center text-xs text-neutral-400 mt-4 mb-4">
            © 2026 National Visas Portal PK — {t("footer")}
          </p>
        </div>

        {/* Right ad rail (large screens only) */}
        <aside className="hidden xl:block w-40 shrink-0">
          <div className="sticky top-4">
            <AdSlot slot={SLOT_SIDE} label={t("adLabel")} className="min-h-[600px]" />
          </div>
        </aside>
      </div>

      {/* Sign-up modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-neutral-900 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-center mb-4">{t("authTitle")}</h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("fullName")}
              className="w-full border border-neutral-300 bg-white text-neutral-900 p-3 rounded mb-3"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phone")}
              inputMode="tel"
              dir="ltr"
              className="w-full border border-neutral-300 bg-white text-neutral-900 p-3 rounded mb-3"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("email")}
              type="email"
              dir="ltr"
              className="w-full border border-neutral-300 bg-white text-neutral-900 p-3 rounded mb-3"
            />

            <label className="flex items-start gap-2 text-xs text-neutral-600 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-green-600"
              />
              <span>{t("consent")}</span>
            </label>

            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

            <button
              onClick={handleContinue}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
            >
              {t("continue")}
            </button>
            <button
              onClick={() => {
                setShowAuth(false);
                setError("");
              }}
              className="w-full mt-3 text-sm text-neutral-500"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
