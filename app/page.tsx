"use client"

import { useState } from "react"

export default function Home() {
  const [tab, setTab] = useState("visa");
  const [country, setCountry] = useState("");
  const [result, setResult] = useState("")

  const handleSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    if (type === "visa" && !country) {
      setResult("Please select a destination country")
      return
    }
    setResult(`${type} request received! Our agent will WhatsApp you in 10 minutes with details.`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-2">
          International Visa & Travel Portal
        </h1>
        <p className="text-center text-gray-600 mb-6">Visa • Flights • Hajj • Tours - For Pakistanis</p>

        {/* TABS */}
        <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl shadow overflow-x-auto">
          <button onClick={() => setTab("visa")} className={`flex-1 p-3 rounded-lg font-bold whitespace-nowrap ${tab === "visa" ? "bg-green-600 text-white" : "bg-gray-100"}`}>
            🛂 Visa
          </button>
          <button onClick={() => setTab("flights")} className={`flex-1 p-3 rounded-lg font-bold whitespace-nowrap ${tab === "flights" ? "bg-green-600 text-white" : "bg-gray-100"}`}>
            ✈️ Flights
          </button>
          <button onClick={() => setTab("tours")} className={`flex-1 p-3 rounded-lg font-bold whitespace-nowrap ${tab === "tours" ? "bg-green-600 text-white" : "bg-gray-100"}`}>
            🏝️ Tour Packages
          </button>
        </div>

        {/* VISA TAB */}
        {tab === "visa" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Check Visa Requirements</h2>
            <form onSubmit={(e) => handleSubmit(e, "Visa")} className="space-y-4">
              <input type="email" placeholder="Your Email" required className="w-full border p-3 rounded-lg" />
              <input type="text" placeholder="Passport Number" required className="w-full border p-3 rounded-lg" />
              <select value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full border p-3 rounded-lg">
                <option value="" disabled hidden>Select Country</option>
                <option value="UAE">🇦🇪 UAE / Dubai</option>
                <option value="Saudi">🇸🇦 Saudi Arabia</option>
                <option value="USA">🇺🇸 USA</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="UK">🇬🇧 UK</option>
                <option value="Schengen">🇩🇪 Schengen Europe</option>
              </select>
              <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold">Get Visa Info</button>
            </form>
          </div>
        )}

        {/* FLIGHT TAB */}
        {tab === "flights" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Book Cheapest Flight Tickets</h2>
            <form onSubmit={(e) => handleSubmit(e, "Flight")} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="From: Lahore LHE" required className="w-full border p-3 rounded-lg" />
                <input type="text" placeholder="To: Dubai DXB" required className="w-full border p-3 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" required className="w-full border p-3 rounded-lg" />
                <input type="date" className="w-full border p-3 rounded-lg" />
              </div>
              <input type="tel" placeholder="WhatsApp Number" required className="w-full border p-3 rounded-lg" />
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">Get Flight Quotes</button>
            </form>
          </div>
        )}

        {/* TOURS TAB */}
        {tab === "tours" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Family & Group Tour Packages</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold">🇹🇷 Turkey Tour</p>
                <p className="text-sm">7 Days Family Package</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold">🇲🇾 Malaysia Tour</p>
                <p className="text-sm">5 Days Friends Package</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold">🇦🇪 Dubai Tour</p>
                <p className="text-sm">4 Days Luxury Package</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold">🇸🇦 Umrah + Turkey</p>
                <p className="text-sm">Combo Package</p>
              </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e, "Tour")} className="space-y-4">
              <input type="text" placeholder="Your Name" required className="w-full border p-3 rounded-lg" />
              <input type="tel" placeholder="WhatsApp Number" required className="w-full border p-3 rounded-lg" />
              <select required className="w-full border p-3 rounded-lg">
                <option value="" disabled hidden>Select Tour Type</option>
                <option>Family Vacation</option>
                <option>Friends Group Tour</option>
                <option>Professional/Corporate Trip</option>
                <option>Honeymoon Package</option>
              </select>
              <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-lg font-bold">Get Tour Quote</button>
            </form>
          </div>
        )}

        {result && <p className="mt-6 text-center text-green-700 font-semibold bg-green-50 p-4 rounded-lg">{result}</p>}

      </div>
    </main>
  )
}
