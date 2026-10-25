"use client";

// Extra sections for the home page: hero, country cards, visa cards, progress bars, how it works, FAQ.
// All text here is in English, Urdu and Arabic.

type Lang = "en" | "ur" | "ar";
type L3 = Record<Lang, string>;

const headFont = (lang: Lang) => ({
  fontFamily: lang === "en" ? "'Montserrat', sans-serif" : "'Noto Sans Arabic', sans-serif",
});

// Dark label so headings stay readable over the bright sunset background
const CHIP = "inline-block rounded-xl bg-black/70 px-4 py-1";

const FLAGS: Record<string, string> = {
  UAE: "🇦🇪",
  Turkey: "🇹🇷",
  Saudi: "🇸🇦",
  USA: "🇺🇸",
  UK: "🇬🇧",
};

const ICONS: Record<string, string> = {
  visit: "✈️",
  family: "👨‍👩‍👧",
  business: "💼",
  work: "🛠️",
  student: "🎓",
  transit: "🛂",
  umrah: "🕋",
};

const DESC: Record<string, L3> = {
  visit: { en: "Tourism and short stays", ur: "سیاحت اور مختصر قیام", ar: "السياحة والإقامة القصيرة" },
  family: {
    en: "Visit or join your family",
    ur: "اہلِ خانہ سے ملاقات یا ان کے ساتھ رہائش",
    ar: "زيارة العائلة أو الانضمام إليها",
  },
  business: {
    en: "Meetings, trade and company visits",
    ur: "میٹنگز، تجارت اور کمپنی کے دورے",
    ar: "اجتماعات وتجارة وزيارات الشركات",
  },
  work: { en: "Employment and job offers", ur: "ملازمت اور جاب آفر", ar: "العمل وعروض التوظيف" },
  student: {
    en: "Study at a university or college",
    ur: "جامعہ یا کالج میں تعلیم",
    ar: "الدراسة في جامعة أو كلية",
  },
  transit: {
    en: "A short stop on the way to another country",
    ur: "دوسرے ملک جاتے ہوئے مختصر قیام",
    ar: "توقف قصير في الطريق إلى بلد آخر",
  },
  umrah: {
    en: "Pilgrimage to Makkah and Madinah",
    ur: "مکہ اور مدینہ کی زیارت",
    ar: "أداء العمرة في مكة والمدينة",
  },
};

const LBL = {
  fee: { en: "Fee", ur: "فیس", ar: "الرسوم" } as L3,
  time: { en: "Time", ur: "مدت", ar: "المدة" } as L3,
  view: { en: "View checklist", ur: "چیک لسٹ دیکھیں", ar: "عرض القائمة" } as L3,
};

const COUNT: L3 = {
  en: "{n} visa types",
  ur: "{n} اقسام کے ویزا",
  ar: "{n} أنواع تأشيرات",
};

const PROG: L3 = {
  en: "{done} of {total} documents ready",
  ur: "{total} میں سے {done} دستاویزات تیار",
  ar: "{done} من {total} مستندات جاهزة",
};

const STEPS: Record<Lang, string[]> = {
  en: ["Choose visa", "Documents", "WhatsApp"],
  ur: ["ویزا منتخب کریں", "دستاویزات", "واٹس ایپ"],
  ar: ["اختر التأشيرة", "المستندات", "واتساب"],
};

const HERO = {
  title: {
    en: "Your visa journey, made clear",
    ur: "آپ کے ویزا کا سفر، اب آسان اور واضح",
    ar: "رحلة تأشيرتك أصبحت أوضح",
  } as L3,
  sub: {
    en: "Pick your country, see exactly which documents you need, and send them to us on WhatsApp. We review your case and guide you step by step.",
    ur: "اپنا ملک منتخب کریں، دیکھیں کہ کون سی دستاویزات درکار ہیں، اور انہیں واٹس ایپ پر ہمیں بھیجیں۔ ہم آپ کے کیس کا جائزہ لے کر قدم بہ قدم رہنمائی کریں گے۔",
    ar: "اختر دولتك، واعرف المستندات المطلوبة بدقة، ثم أرسلها إلينا عبر واتساب. نراجع حالتك ونرشدك خطوة بخطوة.",
  } as L3,
  cta: { en: "Start your checklist", ur: "اپنی چیک لسٹ شروع کریں", ar: "ابدأ قائمتك" } as L3,
  wa: { en: "Chat on WhatsApp", ur: "واٹس ایپ پر بات کریں", ar: "تحدث عبر واتساب" } as L3,
  badges: [
    {
      icon: "🌐",
      t: { en: "English · اردو · العربية", ur: "English · اردو · العربية", ar: "English · اردو · العربية" } as L3,
    },
    {
      icon: "⏱",
      t: {
        en: "Reply in 1–2 business days",
        ur: "1 سے 2 کاروباری دنوں میں جواب",
        ar: "الرد خلال يوم إلى يومي عمل",
      } as L3,
    },
    {
      icon: "💬",
      t: {
        en: "Send documents on WhatsApp",
        ur: "دستاویزات واٹس ایپ پر بھیجیں",
        ar: "أرسل المستندات عبر واتساب",
      } as L3,
    },
  ],
};

const HOW = {
  title: { en: "How it works", ur: "یہ کیسے کام کرتا ہے", ar: "كيف يعمل" } as L3,
  steps: [
    {
      t: { en: "Choose", ur: "منتخب کریں", ar: "اختر" } as L3,
      d: {
        en: "Pick your country and visa type.",
        ur: "اپنا ملک اور ویزا کی قسم چنیں۔",
        ar: "حدد دولتك ونوع التأشيرة.",
      } as L3,
    },
    {
      t: { en: "Check", ur: "جانچیں", ar: "تحقق" } as L3,
      d: {
        en: "Tick the documents you have ready.",
        ur: "جو دستاویزات تیار ہیں ان پر نشان لگائیں۔",
        ar: "ضع علامة على المستندات الجاهزة.",
      } as L3,
    },
    {
      t: { en: "Send", ur: "بھیجیں", ar: "أرسل" } as L3,
      d: {
        en: "Send your documents to us on WhatsApp.",
        ur: "اپنی دستاویزات واٹس ایپ پر ہمیں بھیجیں۔",
        ar: "أرسل مستنداتك إلينا عبر واتساب.",
      } as L3,
    },
    {
      t: { en: "We guide you", ur: "ہم رہنمائی کرتے ہیں", ar: "نرشدك" } as L3,
      d: {
        en: "We review your case and guide you through the application.",
        ur: "ہم آپ کے کیس کا جائزہ لے کر درخواست کے مراحل میں رہنمائی کرتے ہیں۔",
        ar: "نراجع حالتك ونرشدك خلال مراحل التقديم.",
      } as L3,
    },
  ],
};

const FAQ = {
  title: { en: "Frequently asked questions", ur: "اکثر پوچھے گئے سوالات", ar: "الأسئلة الشائعة" } as L3,
  items: [
    {
      q: {
        en: "Do you guarantee visa approval?",
        ur: "کیا آپ ویزا منظوری کی ضمانت دیتے ہیں؟",
        ar: "هل تضمنون الموافقة على التأشيرة؟",
      } as L3,
      a: {
        en: "No. The embassy or government decides every application. We help you prepare the right documents and avoid common mistakes.",
        ur: "نہیں۔ ہر درخواست کا فیصلہ سفارت خانہ یا حکومت کرتی ہے۔ ہم آپ کو درست دستاویزات تیار کرنے اور عام غلطیوں سے بچنے میں مدد دیتے ہیں۔",
        ar: "لا. السفارة أو الجهة الحكومية هي التي تقرر في كل طلب. نساعدك في تجهيز المستندات الصحيحة وتجنب الأخطاء الشائعة.",
      } as L3,
    },
    {
      q: {
        en: "How do I send my documents?",
        ur: "میں اپنی دستاویزات کیسے بھیجوں؟",
        ar: "كيف أرسل مستنداتي؟",
      } as L3,
      a: {
        en: "Tick your documents on the checklist, then tap the WhatsApp button. Send a clear photo or scan of each document in the chat.",
        ur: "چیک لسٹ میں اپنی دستاویزات پر نشان لگائیں، پھر واٹس ایپ بٹن دبائیں۔ چیٹ میں ہر دستاویز کی صاف تصویر یا اسکین بھیجیں۔",
        ar: "ضع علامة على مستنداتك في القائمة ثم اضغط زر واتساب. أرسل صورة واضحة أو مسحاً ضوئياً لكل مستند في المحادثة.",
      } as L3,
    },
    {
      q: {
        en: "How long does it take?",
        ur: "اس میں کتنا وقت لگتا ہے؟",
        ar: "كم تستغرق المعالجة؟",
      } as L3,
      a: {
        en: "We reply within 1–2 business days. Visa processing time depends on the embassy and the visa type.",
        ur: "ہم 1 سے 2 کاروباری دنوں میں جواب دیتے ہیں۔ ویزا پراسیسنگ کا وقت سفارت خانے اور ویزا کی قسم پر منحصر ہے۔",
        ar: "نرد خلال يوم إلى يومي عمل. تعتمد مدة معالجة التأشيرة على السفارة ونوع التأشيرة.",
      } as L3,
    },
    {
      q: { en: "What does it cost?", ur: "اس کی فیس کتنی ہے؟", ar: "كم التكلفة؟" } as L3,
      a: {
        en: "Fees depend on the country and visa type. We confirm the exact cost after reviewing your case, before you pay anything.",
        ur: "فیس ملک اور ویزا کی قسم پر منحصر ہے۔ ہم آپ کے کیس کا جائزہ لینے کے بعد، آپ کے کوئی رقم ادا کرنے سے پہلے، درست فیس بتاتے ہیں۔",
        ar: "تعتمد الرسوم على الدولة ونوع التأشيرة. نؤكد التكلفة الدقيقة بعد مراجعة حالتك وقبل أن تدفع أي مبلغ.",
      } as L3,
    },
    {
      q: {
        en: "Is my information safe?",
        ur: "کیا میری معلومات محفوظ ہیں؟",
        ar: "هل معلوماتي آمنة؟",
      } as L3,
      a: {
        en: "We use your details only to answer your enquiry. Read our Privacy Policy for more.",
        ur: "ہم آپ کی معلومات صرف آپ کی درخواست کا جواب دینے کے لیے استعمال کرتے ہیں۔ مزید کے لیے ہماری پرائیویسی پالیسی پڑھیں۔",
        ar: "نستخدم بياناتك فقط للرد على استفسارك. اقرأ سياسة الخصوصية للمزيد.",
      } as L3,
    },
  ],
};

/* ---------- Hero ---------- */
export function Hero({ lang, wa }: { lang: Lang; wa: string }) {
  return (
    <section className="mb-6 rounded-2xl bg-black/70 p-5 text-center text-white">
      <h2 style={headFont(lang)} className="text-2xl font-extrabold sm:text-4xl">
        {HERO.title[lang]}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-200 sm:text-base">{HERO.sub[lang]}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <a href="#countries" className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white">
          {HERO.cta[lang]}
        </a>
        <a
          href={`https://wa.me/${wa}?text=${encodeURIComponent("Hello, I need visa information.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/60 bg-white/10 px-6 py-3 font-bold text-white"
        >
          💬 {HERO.wa[lang]}
        </a>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {HERO.badges.map((b, i) => (
          <div key={i} className="rounded-xl bg-white/10 px-3 py-2 text-sm">
            {b.icon} {b.t[lang]}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Progress steps: choose visa, documents, WhatsApp ---------- */
export function Stepper({ lang, step }: { lang: Lang; step: 1 | 2 | 3 }) {
  const labels = STEPS[lang];
  return (
    <ol className="mb-5 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-lg">
      {labels.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const on = n === step;
        return (
          <li key={n} className="flex flex-1 items-center">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                done || on ? "bg-green-600 text-white" : "bg-neutral-200 text-neutral-500"
              }`}
            >
              {done ? "✓" : n}
            </span>
            <span className={`mx-2 text-xs font-semibold sm:text-sm ${on ? "text-neutral-900" : "text-neutral-500"}`}>
              {label}
            </span>
            {n < 3 && <span className={`h-0.5 flex-1 ${done ? "bg-green-600" : "bg-neutral-200"}`} />}
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- Country cards (same five countries) ---------- */
export function CountryCards({
  lang,
  selected,
  items,
  onSelect,
}: {
  lang: Lang;
  selected: string;
  items: { code: string; name: string; count: number }[];
  onSelect: (code: string) => void;
}) {
  return (
    <div id="countries" className="mb-6 grid scroll-mt-4 grid-cols-2 gap-3 sm:grid-cols-5">
      {items.map((it, idx) => {
        const on = it.code === selected;
        const lonely = idx === items.length - 1 && items.length % 2 === 1;
        return (
          <button
            key={it.code}
            onClick={() => onSelect(it.code)}
            className={`rounded-2xl bg-white p-4 text-center shadow-lg transition ${
              lonely ? "col-span-2 sm:col-span-1" : ""
            } ${on ? "ring-4 ring-green-500" : "hover:-translate-y-0.5 hover:shadow-xl"}`}
          >
            <div className="text-4xl">{FLAGS[it.code] ?? "🌍"}</div>
            <div style={headFont(lang)} className="mt-2 text-sm font-extrabold text-neutral-900">
              {it.name}
            </div>
            <div className="mt-1 text-xs text-neutral-500">{COUNT[lang].replace("{n}", String(it.count))}</div>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Visa card ---------- */
export function VisaCard({
  lang,
  vkey,
  name,
  fee,
  days,
  note,
  onClick,
}: {
  lang: Lang;
  vkey: string;
  name: string;
  fee?: string;
  days?: string;
  note?: string;
  onClick: () => void;
}) {
  const arrow = lang === "en" ? "→" : "←";
  return (
    <button
      onClick={onClick}
      className="flex w-full items-start gap-4 rounded-2xl bg-white p-4 text-start text-neutral-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl">
        {ICONS[vkey] ?? "📄"}
      </span>
      <span className="min-w-0 flex-1">
        <span style={headFont(lang)} className="block text-lg font-extrabold">
          {name}
        </span>
        <span className="mt-0.5 block text-sm text-neutral-500">{DESC[vkey]?.[lang] ?? ""}</span>
        {(fee || days) && (
          <span className="mt-2 flex flex-wrap gap-2">
            {fee && (
              <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-800">
                💰 {LBL.fee[lang]}: {fee}
              </span>
            )}
            {days && (
              <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-800">
                ⏱ {LBL.time[lang]}: {days}
              </span>
            )}
          </span>
        )}
        {note && <span className="mt-1 block text-xs text-neutral-500">{note}</span>}
        <span className="mt-3 inline-block rounded-lg bg-green-600 px-4 py-1.5 text-sm font-bold text-white">
          {LBL.view[lang]} {arrow}
        </span>
      </span>
    </button>
  );
}

/* ---------- Documents progress bar ---------- */
export function DocProgress({ lang, done, total }: { lang: Lang; done: number; total: number }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-xs font-semibold text-neutral-600">
        <span>{PROG[lang].replace("{done}", String(done)).replace("{total}", String(total))}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full rounded-full bg-green-600 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ---------- How it works ---------- */
export function HowItWorks({ lang }: { lang: Lang }) {
  return (
    <section className="mt-10">
      <h2 style={headFont(lang)} className={`${CHIP} mb-3 text-2xl font-extrabold text-white`}>
        {HOW.title[lang]}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {HOW.steps.map((s, i) => (
          <div key={i} className="rounded-2xl bg-white p-4 text-neutral-900 shadow-lg">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 font-bold text-white">
              {i + 1}
            </div>
            <div style={headFont(lang)} className="mt-3 font-extrabold">
              {s.t[lang]}
            </div>
            <p className="mt-1 text-sm text-neutral-600">{s.d[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function Faq({ lang }: { lang: Lang }) {
  return (
    <section className="mt-10">
      <h2 style={headFont(lang)} className={`${CHIP} mb-3 text-2xl font-extrabold text-white`}>
        {FAQ.title[lang]}
      </h2>
      <div className="space-y-3">
        {FAQ.items.map((it, i) => (
          <details key={i} className="rounded-2xl bg-white p-4 text-neutral-900 shadow-lg">
            <summary className="cursor-pointer font-bold">{it.q[lang]}</summary>
            <p className="mt-2 text-sm text-neutral-600">{it.a[lang]}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
