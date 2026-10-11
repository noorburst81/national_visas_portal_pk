"use client";
import { useState } from "react";

export default function Home() {
  const [tab, setTab] = useState("visa");
  const [country, setCountry] = useState("");
  const [tour, setTour] = useState("");
  const [visaType, setVisaType] = useState("");
  const [result, setResult] = useState("");
  const [showOffers, setShowOffers] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const countryPhotos: any = {
    UAE: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
    Saudi: "https://images.unsplash.com/photo-1591604466108-ec97de577aff?w=1200",
    USA: "https://images.unsplash.com/photo-1485738422979-b5d0a3a0a6a7?w=1200",
    Canada: "https://images.unsplash.com/photo-1730604545-2c0b0a1c7b2e?w=1200",
    UK: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
    Schengen: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200",
    Pakistan: "https://images.unsplash.com/photo-1605627079912-97c3810a11a4?w=1200",
  };

  const countryFlags: any = {
    UAE: "🇦🇪",
    Saudi: "🇸🇦",
    USA: "🇺🇸",
    Canada: "🇨🇦",
    UK: "🇬🇧",
    Schengen: "🇪🇺",
    Pakistan: "🇵🇰",
  };

  const tourPhotos: any = {
    "Umrah Package - Economy": "https://images.unsplash.com/photo-15074403186-4273783833c7?w=1200",
    "Umrah Package - 4 Star": "https://images.unsplash.com/photo-1574781126401-d1f6b7e4611e?w=1200",
    "Umrah Package - 5 Star": "https://images.unsplash.com/photo-1578303010-8e1d5c1b1c0a?w=1200",
    "Hajj 2027 - Pre-Registration": "https://images.unsplash.com/photo-1591604466108-ec97de577aff?w=1200",
    "Turkey Family Tour": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200",
    "Malaysia Friends Tour": "https://images.unsplash.com/photo-1596422844803-f7a54d78f11b?w=1200",
    "Dubai Luxury Tour": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200",
  };

  const visaOffers: any = {
    UAE: [
      { type: "Visit Visa 30 Days", price: "PKR 45,000", time: "3-5 Working Days" },
      { type: "Visit Visa 60 Days", price: "PKR 75,000", time: "3-5 Working Days" },
      { type: "Work Visa", price: "PKR 150,000", time: "10-15 Working Days" },
    ],
    Saudi: [
      { type: "Umrah Visa", price: "PKR 55,000", time: "24-48 Hours" },
      { type: "Visit Visa", price: "PKR 60,000", time: "5-7 Working Days" },
      { type: "Work Visa", price: "PKR 200,000", time: "15-20 Working Days" },
    ],
    USA: [
      { type: "B1/B2 Visit Visa", price: "PKR 35,000 + Embassy Fee", time: "15-30 Days" },
      { type: "Student Visa F1", price: "PKR 40,000 + SEVIS", time: "30-45 Days" },
      { type: "Work Visa H1B", price: "Consultation Required", time: "60-90 Days" },
    ],
    Canada: [
      { type: "Visitor Visa", price: "PKR 50,000", time: "20-30 Days" },
      { type: "Study Permit", price: "PKR 55,000", time: "30-60 Days" },
      { type: "Work Permit", price: "PKR 80,000", time: "45-60 Days" },
    ],
    UK: [
      { type: "Standard Visitor", price: "PKR 60,000", time: "15-20 Days" },
      { type: "Student Visa", price: "PKR 65,000", time: "3-6 Weeks" },
      { type: "Skilled Worker", price: "PKR 120,000", time: "4 Weeks" },
    ],
    Schengen: [
      { type: "Tourist Visa", price: "PKR 55,000", time: "15-20 Days" },
      { type: "Business Visa", price: "PKR 60,000", time: "15-20 Days" },
      { type: "Transit Visa", price: "PKR 40,000", time: "10-15 Days" },
    ],
    Pakistan: [
      { type: "Visit Visa 30 Days", price: "PKR 15,000", time: "5-7 Working Days" },
      { type: "Family Visit Visa", price: "PKR 20,000", time: "7-10 Working Days" },
      { type: "Business Visa", price: "PKR 35,000", time: "10-15 Working Days" },
    ],
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!country ||!visaType) {
      setResult("Please select Country and Visa Type");
      return;
    }
    setResult("Submitting...");
    try {
      const phone = prompt("Enter your WhatsApp number:") || "03000000000";
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Customer", phone, country, visaType }),
      });
      setResult(`Lead Saved! We will call you for ${visaType} in ${country} in 5 mins.`);
      setShowOffers(true);
    } catch (err) {
      setResult(`Submitted for ${visaType} in ${country}`);
      setShowOffers(true);
    }
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    if (!form.name ||!form.email ||!form.phone) {
      alert("Fill all fields");
      return;
    }
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, country, visaType }),
      });
      setIsSignedUp(true);
      setShowSignup(false);
    } catch {
      setIsSignedUp(true);
      setShowSignup(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-green-800 to-green-400 rounded-2xl flex items-center justify-center text-white font-black">N</div>
            <div>
              <h1 className="font-black text-green-700 text-lg leading-none">Pakistan travel and visa Services</h1>
              <p className="text-xs font-bold text-green-800">We Help You in Visa Processing</p>
<p className="text-xs text-slate-500 mt-1">Trusted Since 2010 • Lahore • Pakistan</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTab("visa")} className={`px-4 py-2 rounded-full font-bold text-sm ${tab === "visa"? "bg-green-600 text-white" : "bg-slate-100"}`}>Visa</button>
            <button onClick={() => setTab("tours")} className={`px-4 py-2 rounded-full font-bold text-sm ${tab === "tours"? "bg-green-600 text-white" : "bg-slate-100"}`}>Tours</button>
          </div>
        </div>
      </header>

      {/* AD - TOP */}
<div className="max-w-6xl mx-auto px-4 mt-3">
  <div className="bg-slate-100 border-2 border-dashed rounded-xl h-[90px] flex items-center justify-center text-slate-400 text-xs font-bold">
    📢 AD SPACE TOP - Google Ad Will Appear Here
  </div>
</div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {tab === "visa"? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-black mb-4">Check Visa Requirements {countryFlags[country] || "🌍"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <select value={country} onChange={(e) => { setCountry(e.target.value); setVisaType(""); setShowOffers(false); setIsSignedUp(false); }} className="w-full border rounded-xl px-4 py-3 font-medium">
                  <option value="">Select Country</option>
                  {Object.keys(visaOffers).map((c) => <option key={c} value={c}>{countryFlags[c]} {c}</option>)}
                </select>
                {country && (
                  <>
                    <div className="rounded-xl overflow-hidden h-52 shadow"><img src={countryPhotos[country]} alt={country} className="w-full h-full object-cover" /></div>
                    <select value={visaType} onChange={(e) => setVisaType(e.target.value)} className="w-full border rounded-xl px-4 py-3">
                      <option value="">Select Visa Type</option>
                      {visaOffers[country]?.map((v: any, i: number) => <option key={i} value={v.type}>{v.type} - {v.price}</option>)}
                    </select>
                  </>
                )}
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold">Check & Get Price →</button>
              </form>

              {result && (
                <div className="mt-6">
                  {!isSignedUp? (
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 rounded-2xl text-center">
                      <p className="font-bold text-lg">🔒 {result}</p>
                      <p className="text-sm opacity-90 mt-2">Free signup to unlock full checklist, documents, embassy fee & processing time</p>
                      <button onClick={() => setShowSignup(true)} className="mt-4 bg-white text-blue-600 px-8 py-3 rounded-full font-black shadow">Unlock Free Checklist →</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* AD - SIDEBAR */}
<div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 text-center">
  <p className="text-[10px] font-bold text-slate-400">Sponsored</p>
  <div className="h-60 bg-white rounded-xl mt-2 flex items-center justify-center text-xs text-slate-400">AD 300x250<br/>Your Earning Ad</div>
</div>
                      <div className="bg-green-50 border border-green-200 p-4 rounded-xl"><p className="font-bold text-green-800">✅ Unlocked! Hi {form.name}, sent to {form.email}</p></div>
                      {visaOffers[country]?.filter((v: any) => v.type === visaType).map((v: any, i: number) => (
                        <div key={i} className="border-2 border-green-200 rounded-xl p-4 bg-green-50">
                          <h3 className="font-bold">{v.type}</h3>
                          <p className="text-2xl font-black text-green-600 mt-2">{v.price}</p>
                          <p className="text-sm text-slate-500">{v.time}</p>
                          <p className="text-sm mt-3">📄 Full docs will be WhatsApped to {form.phone} + emailed</p>
                          <a href={`https://wa.me/923000000000?text=Hi, I need ${v.type} for ${country}`} className="mt-3 inline-block w-full text-center bg-green-600 text-white py-2 rounded-xl font-bold">Chat on WhatsApp</a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="font-black mb-3">Why National Visas?</h3>
                <ul className="text-sm space-y-2 text-slate-700"><li>✅ 15 Years Experience</li><li>✅ 10,000+ Visas Approved</li><li>✅ WhatsApp Support 24/7</li><li>✅ Money Back Guarantee</li><li>✅ Office in Lahore</li></ul>
              </div>
              {country && showOffers && (
                <div className="bg-white rounded-2xl p-4 shadow">
                  <h4 className="font-bold">Popular in {country} {countryFlags[country]}</h4>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {visaOffers[country]?.map((v: any, i: number) => <div key={i} className="bg-slate-50 p-3 rounded-xl text-xs"><p className="font-bold truncate">{v.type}</p><p className="text-green-600 font-black mt-1">{v.price}</p></div>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-black mb-4">Our Tour Packages</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.keys(tourPhotos).map((t) => (
                <div key={t} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                  <img src={tourPhotos[t]} className="h-48 w-full object-cover" alt={t} />
                  <div className="p-4"><h3 className="font-bold">{t}</h3><p className="text-sm text-slate-500 mt-1">All inclusive • Guide • Hotel • Visa</p><button onClick={() => setTour(t)} className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl font-bold">View Details →</button></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showSignup && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-black text-xl">Get Free Visa Checklist</h3><p className="text-sm text-slate-500 mt-1">Enter details, unlock instantly</p>
            <form onSubmit={handleSignup} className="space-y-3 mt-4">
              <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value })} placeholder="Full Name" className="w-full border rounded-xl px-3 py-3" required />
              <input value={form.email} onChange={(e) => setForm({...form, email: e.target.value })} placeholder="Email Address" type="email" className="w-full border rounded-xl px-3 py-3" required />
              <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value })} placeholder="WhatsApp Number 0300..." className="w-full border rounded-xl px-3 py-3" required />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold">Unlock Free Checklist →</button>
            </form>
            <button onClick={() => setShowSignup(false)} className="w-full mt-3 text-sm text-slate-500">Cancel</button>
          </div>
        </div>
      )}

      <footer className="bg-slate-900 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="font-bold">National Visas Portal - Lahore</p><p className="text-sm opacity-70 mt-2">© 2026 All Rights Reserved • Trusted Since 2010</p></div></footer>
    </main>
  );
}
