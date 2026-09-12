// fix v7 final
import { useState } from "react"
export import { useState } from "react";
 default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center text-green-700 mb-2">const [country, setCountry] = useState("");
          International Visa Portal - For Pakistanis
        </h1>
        const [result, setResult] = useState("")
        <p className="text-center text-gray-600 mb-8">
        <p className="text-center text-gray-600 mb-8 px-4">
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-wrap">Check Visa Requirements</h2>
          <form className="space-y-4">
           <label className="block text-sm font-semibold text-gray-700 mb-2">Select Country</label>
            
            <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg" />
            <input type="text" placeholder="Passport Number" className="w-full border p-3 rounded-lg" />
            
            <select className="w-full border p-3 rounded-lg">
              
              <option>🇵🇰 Living in Pakistan</option>
              <option>🇦🇪 Living in UAE / Dubai</option>
              <option>🇸🇦 Living in Saudi Arabia</option>
              <option>🇬🇧 United Kingdom</option>
              <option>🇺🇸 Living in USA</option>
              <option>🇨🇦 Living in Canada</option>
            <button onClick={() => setResult("Visa info coming soon for this route!")} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">

            <select className="w-full border p-3 rounded-lg">
              {result && <p className="mt-4 text-center text-green-700 font-semibold">{result}</p>}
              <option>Destination Country You Want to Visit</option>
              <option>🇦🇪 UAE / Dubai - Work & Visit Visa</option>
              <option>🇸🇦 Saudi Arabia - Umrah, Hajj & Work Visa</option>
              <option>🇺🇸 USA - Tourist, Student & Work Visa</option>
              <option>🇨🇦 Canada - PR, Study & Visit Visa</option>
              <option>🇬🇧 UK - Visit, Study & Work Visa</option>
              <option>🇩🇪 Schengen Europe - Job & Study Visa</option>
            </select>

            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700">
              Get Official Visa Info
            </button>
          </form>
        </div>

      </div>
    </main>
  )
}
