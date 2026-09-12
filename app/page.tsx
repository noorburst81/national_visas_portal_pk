export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center text-green-700 mb-2">
          International Visa Portal - From Pakistan
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Official Visa Requirements & Links to Apply to Any Country
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Check Visa Requirements</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full border p-3 rounded-lg" />
            <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg" />
            <input type="text" placeholder="Passport Number" className="w-full border p-3 rounded-lg" />
            
            <select className="w-full border p-3 rounded-lg">
              <option>Select Destination Country</option>
              <option>🇦🇪 UAE / Dubai - Work & Visit Visa</option>
              <option>🇸🇦 Saudi Arabia - Umrah, Hajj & Work Visa</option>
              <option>🇺🇸 USA - Tourist, Student & Work Visa</option>
              <option>🇨🇦 Canada - PR, Study & Visit Visa</option>
              <option>🇬🇧 UK - Visit, Study & Work Visa</option>
              <option>🇩🇪 Germany/Schengen - Job & Study Visa</option>
              <option>🇦🇺 Australia - Study & Skilled Visa</option>
              <option>🇹🇷 Turkey - Visit & e-Visa</option>
            </select>

            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700">
              Get Official Visa Info
            </button>
          </form>
        </div>

        <div className="bg-green-50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-3">Top Destinations from Pakistan</h3>
          <p className="text-gray-700">
            We provide 100% official information and direct links to government websites.
            No agents. No fake promises.
          </p>
        </div>

      </div>
    </main>
  )
}
