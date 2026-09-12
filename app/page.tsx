"use client"

import { useState } from "react"

export default function Home() {
  const [country, setCountry] = useState("");
  const [result, setResult] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (country) {
      setResult(`Visa info coming soon for ${country}!`)
    } else {
      setResult("Please select a destination country")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center text-green-700 mb-2">
          International Visa Portal - For Pakistanis
        </h1>
        
        <p className="text-center text-gray-600 mb-8 px-4">
          Check visa requirements and official info for your destination
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Check Visa Requirements</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
           
            {/* FIXED: Removed "Living in" and added static label */}
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Your Current Country
            </label>
            <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg" />
            <input type="text" placeholder="Passport Number" className="w-full border p-3 rounded-lg" />
            
            <select className="w-full border p-3 rounded-lg">
              <option>🇵🇰 Pakistan</option>
              <option>🇦🇪 UAE / Dubai</option>
              <option>🇸🇦 Saudi Arabia</option>
              <option>🇬🇧 United Kingdom</option>
              <option>🇺🇸 USA</option>
              <option>🇨🇦 Canada</option>
            </select>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Destination Country You Want to Visit
            </label>
            <select 
              value={country} 
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Country</option>
              <option value="UAE">🇦🇪 UAE / Dubai - Work & Visit Visa</option>
              <option value="Saudi">🇸🇦 Saudi Arabia - Umrah, Hajj & Work Visa</option>
              <option value="USA">🇺🇸 USA - Tourist, Student & Work Visa</option>
              <option value="Canada">🇨🇦 Canada - PR, Study & Visit Visa</option>
              <option value="UK">🇬🇧 UK - Visit, Study & Work Visa</option>
              <option value="Schengen">🇩🇪 Schengen Europe - Job & Study Visa</option>
            </select>

            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700">
              Get Official Visa Info
            </button>

            {result && <p className="mt-4 text-center text-green-700 font-semibold">{result}</p>}
          </form>
        </div>

      </div>
    </main>
  )
}
