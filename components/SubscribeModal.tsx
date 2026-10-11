"use client";
import { useState } from "react";

export default function SubscribeModal({ open, onClose }: any) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const data = {
      name: form.get("name"),
      whatsapp: form.get("whatsapp"),
      email: form.get("email"),
      interest: form.getAll("interest"),
    };
    await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setLoading(false);
    setDone(true);
    setTimeout(() => { setDone(false); onClose(); }, 2000);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">✕</button>
        {done? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="font-bold text-xl text-green-600">Subscribed!</h3>
            <p className="text-sm">You will get 10% off!</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-1">🔔 Subscribe for Offers</h2>
            <p className="text-sm text-gray-500 mb-4">Get visa offers + 10% discount!</p>
            <form onSubmit={submit} className="space-y-3">
              <input name="name" required placeholder="Full Name" className="w-full border p-3 rounded-lg text-black" />
              <input name="whatsapp" required placeholder="WhatsApp Number" className="w-full border p-3 rounded-lg text-black" />
              <input name="email" type="email" required placeholder="Email Address" className="w-full border p-3 rounded-lg text-black" />
              <div className="flex flex-wrap gap-2 text-xs">
                <label className="border rounded-full px-3 py-1 text-black"><input type="checkbox" name="interest" value="Work Visa" defaultChecked /> Work</label>
                <label className="border rounded-full px-3 py-1 text-black"><input type="checkbox" name="interest" value="Student Visa" /> Student</label>
                <label className="border rounded-full px-3 py-1 text-black"><input type="checkbox" name="interest" value="Tourist" /> Tourist</label>
              </div>
              <button disabled={loading} className="w-full bg-[#0B5394] text-white py-3 rounded-lg font-bold">
                {loading? "Subscribing..." : "SUBSCRIBE FREE - Get 10% Off"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
