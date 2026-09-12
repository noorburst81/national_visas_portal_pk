export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-2">
          National Visa Portal - Pakistan
        </h1>
        <p className="text-gray-600 mb-8">Apply for Pakistan Visa Online</p>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Visa Application Form</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full border p-3 rounded-lg" />
            <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg" />
            <input type="text" placeholder="Passport Number" className="w-full border p-3 rounded-lg" />
            <select className="w-full border p-3 rounded-lg">
              <option>Visa Type</option>
              <option>Tourist Visa</option>
              <option>Business Visa</option>
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
