"use client"

import { useState } from "react"

export default function Home() {
  const [tab, setTab] = useState("visa");
  const [country, setCountry] = useState("");
  const [tour, setTour] = useState("");
  const [visaType, setVisaType] = useState("");
  const [result, setResult] = useState("")
  const [showOffers, setShowOffers] = useState(false)

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

  const visaOffers: any = {
    "UAE": [
      {type: "Visit Visa 30 Days", price: "PKR 45,000", time: "3-5 Working Days"},
      {type: "Visit Visa 60 Days", price: "PKR 75,000", time: "3-5 Working Days"},
      {type: "Work Visa", price: "PKR 150,000", time: "10-15 Working Days"}
    ],
    "Saudi": [
      {type: "Umrah Visa", price: "PKR 55,000", time: "24-48 Hours"},
      {type: "Visit Visa", price: "PKR 60,000", time: "5-7 Working Days"},
      {type: "Work Visa", price: "PKR 200,000", time: "15-20 Working Days"}
    ],
    "USA": [
      {type: "B1/B2 Visit Visa", price: "PKR 35,000 + Embassy Fee", time: "15-30 Days"},
      {type: "Student Visa F1", price: "PKR 40,000 + SEVIS", time: "30-45 Days"},
      {type: "Work Visa H1B", price: "Consultation Required", time: "60-90 Days"}
    ],
    "Canada": [
      {type: "Visitor Visa", price: "PKR 50,000", time: "20-30 Days"},
      {type: "Study Permit", price: "PKR 55,000", time: "30-60 Days"},
      {type: "Work Permit", price: "PKR 80,000", time: "45-60 Days"}
    ],
    "UK": [
      {type: "Standard Visitor", price: "PKR 60,000", time: "15-20 Days"},
      {type: "Student Visa", price: "PKR 65,000", time: "3-6 Weeks"},
      {type: "Skilled Worker", price: "PKR 120,000", time: "8 Weeks"}
    ],
    "Schengen": [
      {type: "Tourist Visa", price: "PKR 55,000", time: "15-20 Days"},
      {type: "Business Visa", price: "PKR 60,000", time: "15-20 Days"},
      {type: "Transit Visa", price: "PKR 40,000", time: "10-15 Days"}
    ]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!country ||!visaType) {
      setResult("Please select Country and Visa Type")
      return
    }
    setShowOffers(true)
    setResult(`✅ Application submitted for ${visaType} to ${country}`)
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER - BIG LOGO */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">IJ</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">International Journey & Tours</h1>
              <p className="text-sm text-gray-500">Your Global Travel Partner • Trusted by 5000+ Pakistanis</p>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Explore The World With Us</h2>
          <p className="text-xl opacity-90 mb-4">Visa • Flights • Umrah • Hajj • International Tours</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* TABS */}
        <div className="flex gap-3 mb-8 bg-white p-2 rounded-2xl shadow">
          <button onClick={() => {setTab("visa"); setShowOffers(false)}} className={`flex-1 p-4 rounded-xl font-semibold ${tab === "visa"? "bg-green-600 text-white shadow-md" : "bg-gray-50 text-gray-700"}`}>🛂 Visa Services</button>
          <button onClick={() => {setTab("flights"); setShowOffers(false)}} className={`flex-1 p-4 rounded-xl font-semibold ${tab === "flights"? "bg-green-600 text-white shadow-md" : "bg-gray-50 text-gray-700"}`}>✈️ Flight Booking</button>
          <button onClick={() => {setTab("tours"); setShowOffers(false)}} className={`flex-1 p-4 rounded-xl font-semibold ${tab === "tours"? "bg-green-600 text-white shadow-md" : "bg-gray-50 text-gray-700"}`}>🏝️ Tour Packages</button>
        </div>

        {/* VISA TAB */}
        {tab === "visa" &&!showOffers && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img src={countryPhotos[country]} alt="destination" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Apply For Visa</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" required className="border p-3 rounded-lg" />
                  <input type="email" placeholder="Your Email" required className="border p-3 rounded-lg" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Phone Number" required className="border p-3 rounded-lg" />
                  <input type="text" placeholder="Passport Number" required className="border p-3 rounded-lg" />
                </div>
                
                <select value={country} onChange={(e) => {setCountry(e.target.value); setVisaType("")}} required className="w-full border p-3 rounded-lg">
                  <option value="" disabled hidden>1. Select Destination Country</option>
                  <option value="UAE">🇦🇪 UAE / Dubai</option>
                  <option value="Saudi">🇸🇦 Saudi Arabia</option>
                  <option value="USA">🇺🇸 USA</option>
                  <option value="Canada">🇨🇦 Canada</option>
                  <option value="UK">🇬🇧 UK</option>
                  <option value="Schengen">🇩🇪 Schengen Europe</option>
                </select>

                {country && (
                  <select value={visaType} onChange={(e) => setVisaType(e.target.value)} required className="w-full border p-3 rounded-lg bg-yellow-50">
                    <option value="" disabled hidden>2. Select Visa Type</option>
                    <option value="Visit Visa">Visit / Tourist Visa</option>
                    <option value="Work Visa">Work Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Transit Visa">Transit Visa</option>
                    <option value="Business Visa">Business Visa</option>
                  </select>
                )}

                <textarea placeholder="Any General Query / Message" rows={3} className="w-full border p-3 rounded-lg"></textarea>
                <button type="submit" className="w-full bg-green-600 text-white p-4 rounded-lg font-bold hover:bg-green-700 transition">Check Latest Visa Offers</button>
              </form>
            </div>
          </div>
        )}

        {/* SHOW OFFERS */}
        {tab === "visa" && showOffers && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-green-700">Latest {country} Visa Offers</h3>
            <p className="mb-4 text-gray-600">{result}</p>
            <div className="space-y-3">
              {visaOffers[country]?.map((offer, i) => (
                <div key={i} className="border p-4 rounded-xl hover:shadow-md transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">{offer.type}</p>
                      <p className="text-sm text-gray-500">Processing: {offer.time}</p>
                    </div>
                    <p className="font-bold text-xl text-green-600">{offer.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowOffers(false)} className="mt-4 w-full bg-gray-200 p-3 rounded-lg font-bold">← Back to Form</button>
          </div>
        )}

        {/* FLIGHTS TAB */}
        {tab === "flights" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200" alt="flight" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Book Cheapest Flights</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="From: Lahore LHE" required className="border p-3 rounded-lg" />
                  <input type="text" placeholder="To: Dubai DXB" required className="border p-3 rounded-lg" />
                </
