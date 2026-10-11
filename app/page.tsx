"use client";
import { useEffect, useState } from "react";

type Lang = "en" | "ur" | "ar";
type L3 = Record<Lang, string>;
type User = { name: string; phone: string };

// Business WhatsApp number in international format (no +)
const WHATSAPP = "923089400872";
const WHATSAPP_DISPLAY = "0308 9400872";

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
    en: "Please enter your details to continue",
    ur: "جاری رکھنے کے لیے اپنی معلومات درج کریں",
    ar: "يرجى إدخال بياناتك للمتابعة",
  },
  fullName: { en: "Full name", ur: "پورا نام", ar: "الاسم الكامل" },
  phone: {
    en: "WhatsApp number (e.g. 03001234567)",
    ur: "واٹس ایپ نمبر (مثلاً 03001234567)",
    ar: "رقم واتساب (مثال: 03001234567)",
  },
  continue: { en: "Continue", ur: "جاری رکھیں", ar: "متابعة" },
  cancel: { en: "Cancel", ur: "منسوخ کریں", ar: "إلغاء" },
  fillAll: { en: "Please fill in all fields.", ur: "براہ کرم تمام خانے پُر کریں۔", ar: "يرجى تعبئة جميع الحقول." },
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

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
  const [selectedCountry, setSelectedCountry] = useState("UAE");
  const [selectedVisa, setSelectedVisa] = useState("");
  const [ticks, setTicks] = useState<boolean[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleContinue = () => {
    if (!name.trim() || !phone.trim()) {
      setError(t("fillAll"));
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError(t("badPhone"));
      return;
    }
    const newUser: User = { name: name.trim(), phone: phone.trim() };
    try {
      localStorage.setItem("nvp_user", JSON.stringify(newUser));
    } catch {
      // ignore
    }
    setUser(newUser);
    setError("");
    setShowAuth(false);
    setIsSubmitted(true);
  };

  const changeDetails = () => {
    try {
      localStorage.removeItem("nvp_user");
    } catch {
      // ignore
    }
    setUser(null);
    setName("");
    setPhone("");
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

  return (
    <div dir={dir} lang={lang} className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-blue-700 pt-6">National Visas Portal PK</h1>
        <p className="text-center text-sm text-gray-500 mt-1 mb-4">{t("tagline")}</p>

        {/* Language selector */}
        <div className="bg-white rounded-xl shadow p-3 mb-6">
          <p className="text-center text-xs text-gray-500 mb-2">{t("chooseLang")}</p>
          <div className="flex gap-2 justify-center">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLang(l.code)}
                className={`px-5 py-2 rounded-full border font-semibold ${
                  lang === l.code ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {user && (
          <div className="bg-green-100 border border-green-400 p-3 rounded mb-4 text-center">
            {t("welcome", { name: user.name })}
          </div>
        )}

        {!selectedVisa ? (
          <>
            <h2 className="font-semibold mb-2">{t("selectCountry")}</h2>
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
                    selectedCountry === c ? "bg-blue-600 text-white" : "bg-white"
                  }`}
                >
                  {countryNames[c][lang]}
                </button>
              ))}
            </div>

            <h2 className="font-semibold mb-2">
              {t("selectVisa", { country: countryNames[selectedCountry][lang] })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.keys(visaData[selectedCountry] || {}).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVisa(v)}
                  className="bg-white p-4 rounded-xl shadow border text-start hover:border-blue-500"
                >
                  <div className="font-bold">{visaNames[v][lang]}</div>
                  <div className="text-sm text-gray-500">{t("tapChecklist")}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">{t("feeNote")}</p>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setSelectedVisa("");
                setIsSubmitted(false);
              }}
              className="mb-4 text-blue-600"
            >
              {t("back")}
            </button>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-1">
                {countryNames[selectedCountry][lang]} — {visaNames[selectedVisa][lang]}
              </h2>

              {!isSubmitted ? (
                <>
                  <p className="text-sm text-gray-500 mb-4">{t("tickIntro")}</p>
                  {docIds.map((id, i) => (
                    <label key={id} className="flex items-center gap-3 py-3 border-b cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ticks[i] || false}
                        onChange={() => {
                          const n = [...ticks];
                          n[i] = !n[i];
                          setTicks(n);
                        }}
                        className="w-5 h-5 accent-blue-600"
                      />
                      <span className="text-[15px]">
                        {i + 1}. {D[id][lang]}
                      </span>
                    </label>
                  ))}

                  <button
                    disabled={!allTicked}
                    onClick={() => {
                      if (!user) setShowAuth(true);
                      else setIsSubmitted(true);
                    }}
                    className={`w-full mt-6 py-3 rounded-lg font-bold text-white ${
                      allTicked ? "bg-blue-600" : "bg-gray-300"
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
                    className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
                  >
                    💬 {t("sendWA")} ({WHATSAPP_DISPLAY})
                  </a>
                  <div className="mt-6 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setSelectedVisa("");
                      }}
                      className="text-blue-600 text-sm"
                    >
                      {t("another")}
                    </button>
                    <button onClick={changeDetails} className="text-gray-500 text-xs">
                      {t("changeDetails")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Details modal */}
        {showAuth && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-center mb-4">{t("authTitle")}</h3>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("fullName")}
                className="w-full border p-3 rounded mb-3"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("phone")}
                inputMode="tel"
                dir="ltr"
                className="w-full border p-3 rounded mb-3"
              />

              {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

              <button onClick={handleContinue} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
                {t("continue")}
              </button>
              <button
                onClick={() => {
                  setShowAuth(false);
                  setError("");
                }}
                className="w-full mt-3 text-sm text-gray-500"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-10 mb-4">
          © 2026 National Visas Portal PK — {t("footer")}
        </p>
      </div>
    </div>
  );
}
