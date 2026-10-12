export const metadata = { title: "Contact | Pakistan Travel and Visa Services" };

export default function Contact() {
  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 leading-relaxed">
        <h1 className="text-2xl font-extrabold mb-4">Contact us</h1>
        <p className="mb-3">Pakistan Travel and Visa Services (Paktravel.pk), Pakistan.</p>
        <p className="mb-4">
          The fastest way to reach us is WhatsApp. We reply within 1 to 2 business days.
        </p>
        <a
          href="https://wa.me/923089400872"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg"
        >
          💬 WhatsApp 0308 9400872
        </a>
        <p className="mt-6">
          <a href="/" className="text-green-700 font-semibold underline">
            Back to home
          </a>
        </p>
      </div>
    </main>
  );
}
