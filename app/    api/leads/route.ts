import { NextResponse } from "next/server";

// Receives every sign-up and submitted checklist, then forwards it to your Google Sheet
// (or any webhook) set in the LEADS_WEBHOOK_URL environment variable.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

    const lead = {
      name: clean(body.name, 100),
      phone: clean(body.phone, 30),
      email: clean(body.email, 120),
      country: clean(body.country, 40),
      visa: clean(body.visa, 40),
      stage: clean(body.stage, 40),
      lang: clean(body.lang, 5),
      createdAt: new Date().toISOString(),
    };

    if (!lead.name || !lead.phone) {
      return NextResponse.json({ ok: false, error: "name and phone required" }, { status: 400 });
    }

    // Always visible in Vercel > your project > Logs
    console.log("NEW LEAD", JSON.stringify(lead));

    const hook = process.env.LEADS_WEBHOOK_URL;
    if (hook) {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
