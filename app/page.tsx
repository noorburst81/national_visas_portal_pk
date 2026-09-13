"use client"

import { useState } from "react"

export default function Home() {
  const [tab, setTab] = useState("visa");
  const [country, setCountry] = useState("");
  const [tour, setTour] = useState("");
  const [result, setResult] = useState("")

  const countryPhotos: any = {
    "": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
    "UAE": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200",
    "Saudi": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
    "USA": "https://images.unsplash.com/photo-1485738422979-e7d0f08eeaf6?w=1200",
    "Canada": "https://images.unsplash.com/photo-1503614478163-cffdde4cc758?w=1200",
    "UK": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
    "Schengen": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200"
  }

  const tourPhotos: any = {
    "": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
    "Umrah Package - Economy": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
    "Umrah Package - 4 Star": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
    "Umrah Package - 5 Star": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
    "Hajj 2027 - Pre-Register Now": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
    "Turkey Family Tour": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200",
    "Malaysia Friends Tour": "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1200",
    "Dubai Luxury Tour": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200"
  }

  const handleSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    if (type === "Visa" &&!country) {
      setResult("Please select a destination country")
      return
    }
    setResult(`✅ ${type} request received! Our agent will WhatsApp you in 10 minutes.`)
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER WITH LOGO SPACE */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">V</div>
            <div>
              <h1 className="text-xl font-bold text-green-700">Visa & Travel Portal</h1>
              <p className="text-xs text-gray-500">Trusted by 5000+ Pakistanis</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 hidden md:block">
            📞 WhatsApp: +92 300 1234567
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Your Journey Starts Here</h2>
          <p className="text-lg opacity-90 mb-6">Visa • Flights • Umrah • Hajj • World Tours</p>
          <p className="text-sm opacity-80">Fast Processing • 100% Guidance • No Hidden Charges</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* TABS */}
        <div className="flex gap-3 mb-8 bg-white p-2 rounded-2xl shadow">
          <button onClick={() => setTab("visa")} className={`flex-1 p-4 rounded-xl font-bold transition ${tab === "visa"? "bg-green-600 text-white shadow" : "bg-gray-50 text-gray-700"}`}>
            🛂 Visa Services
          </button>
          <button onClick={() => setTab("flights")} className={`flex-1 p-4 rounded-xl font-bold transition ${tab === "flights"? "bg-green-600 text-white shadow" : "bg-gray-50 text-gray-700"}`}>
            ✈️ Flight Booking
          </button>
          <button onClick={() => setTab("tours")} className={`flex-1 p-4 rounded-xl font-bold transition ${tab === "tours"? "bg-green-600 text-white shadow" : "bg-gray-50 text-gray-700"}`}>
            🏝️ Tour Packages
          </button>
        </div>

        {/* VISA TAB */}
        {tab === "visa" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img src={countryPhotos[country]} alt="destination" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Check Visa Requirements</h3>
              <form onSubmit={(e) => handleSubmit(e, "Visa")} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="email" placeholder="Your Email" required className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500" />
                  <input type="text" placeholder="Passport Number" required className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500" />
                </div>
                <select value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500">
                  <option value="" disabled hidden>Select Destination Country</option>
                  <option value="UAE">🇦🇪 UAE / Dubai</option>
                  <option value="Saudi">🇸🇦 Saudi Arabia</option>
                  <option value="USA">🇺🇸 USA</option>
                  <option value="Canada">🇨🇦 Canada</option>
                  <option value="UK">🇬🇧 UK</option>
                  <option value="Schengen">🇩🇪 Schengen Europe</option>
                </select>
                <button type="submit" className="w-full bg-green-600 text-white p-4 rounded-lg font-bold hover:bg-green-700 transition">Get Free Visa Consultation</button>
              </form>
            </div>
          </div>
        )}

        {/* FLIGHT TAB */}
        {tab === "flights" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200" alt="flight" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Book Cheapest Flights</h3>
              <form onSubmit={(e) => handleSubmit(e, "Flight")} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="From: Lahore LHE" required className="border p-3 rounded-lg" />
                  <input type="text" placeholder="To: Dubai DXB" required className="border p-3 rounded-lg" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="date" required className="border p-3 rounded-lg" />
                  <input type="date" className="border p-3 rounded-lg" />
                </div>
                <input type="tel" placeholder="WhatsApp Number" required className="w-full border p-3 rounded-lg" />
                <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-700 transition">Get Flight Quotes</button>
              </form>
            </div>
          </div>
        )}

        {/* TOURS TAB */}
        {tab === "tours" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img src={tourPhotos[tour]} alt="tour" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Premium Tour Packages</h3>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-xl border-green-200 text-center">
                  <p className="font-bold text-green-800">🕋 Umrah</p>
                  <p className="text-xs text-green-700">Year Round</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl border-yellow-200 text-center">
                  <p className="font-bold text-yellow-800">🇸🇦 Hajj 2027</p>
                  <p className="text-xs text-yellow-700">Pre-Register</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border text-center">
                  <p className="font-bold">🇹🇷 Turkey</p>
                  <p className="text-xs">7 Days</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border text-center">
                  <p className="font-bold">🇲🇾 Malaysia</p>
                  <p className="text-xs">5 Days</p>
                </div>
              </div>

              <form onSubmit={(e) => handleSubmit(e, "Tour")} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" required className="border p-3 rounded-lg" />
                  <input type="tel" placeholder="WhatsApp Number" required className="border p-3 rounded-lg" />
                </div>
                <select value={tour} onChange={(e) => setTour(e.target.value)} required className="w-full border p-3 rounded-lg">
                  <option value="" disabled hidden>Select Package Type</option>
                  <option>Umrah Package - Economy</option>
                  <option>Umrah Package - 4 Star</option>
                  <option>Umrah Package - 5 Star</option>
                  <option>Hajj 2027 - Pre-Register Now</option>
                  <option>Turkey Family Tour</option>
                  <option>Malaysia Friends Tour</option>
                  <option>Dubai Luxury Tour</option>
                </select>
                <button type="submit" className="w-full bg-orange-600 text-white p-4 rounded-lg font-bold hover:bg-orange-700 transition">Get Package Quote</button>
              </form>
            </div>
          </div>
        )}

        {result && <p className="mt-6 text-center text-green-700 font-semibold bg-green-50 p-4 rounded-xl">{result}</p>}

        {/* FOOTER */}
        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>© 2026 Visa & Travel Portal. Licensed Travel Agency.</p>
        </footer>

      </div>
    </main>
  )
}
