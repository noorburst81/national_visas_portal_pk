export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-2">
          International Visa Portal - From Pakistan
        </h1>
        Apply for Visa to Any Country in the World
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Visa Application Form</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full border p-3 rounded-lg" />
            <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg" />
            <input type="text" placeholder="Passport Number" className="w-full border p-3 rounded-lg" />
            <select className="w-full border p-3 rounded-lg">
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
<option>Canada</option>
<option>Dubai / UAE</option>
<option>Saudi Arabia</option>
<option>Turkey</option>
<option>Australia</option>
              <option>Student Visa</option>
            </select>
            <button type="submit" className="w-full bg-green-700 text-white p-3 rounded-lg font-bold">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
