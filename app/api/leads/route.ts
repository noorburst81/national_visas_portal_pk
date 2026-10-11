import { NextResponse } from 'next/server'

// This catches ALL visa leads automatically
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, country, visaType, email } = body

    // 1. Save lead with timestamp
    const lead = {
      id: Date.now(),
      name: name || "Customer",
      phone: phone,
      email: email || "",
      country: country,
      visaType: visaType,
      status: "NEW",
      created_at: new Date().toISOString(),
      // For Pakistan timezone
      pakistan_time: new Date().toLocaleString("en-PK", {timeZone: "Asia/Karachi"})
    }

    console.log("🔥 NEW LEAD:", lead)

    // 2. Here we will later connect Supabase to save forever
    // For now, it logs in Vercel logs + you get WhatsApp

    // 3. Create WhatsApp message for YOU
    const whatsappMessage = `🔥 NEW VISA LEAD!
    
Country: ${country} ${country === 'Schengen' ? '🇪🇺' : ''}
Visa: ${visaType}
Name: ${lead.name}
Phone: ${phone}
Time: ${lead.pakistan_time}

Call Now!`

    // Return success + WhatsApp link
    return NextResponse.json({ 
      success: true,
      lead: lead,
      whatsappLink: `https://wa.me/92${phone.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(whatsappMessage)}`,
      adminMessage: whatsappMessage,
      message: "Lead captured! We will contact you in 5 mins"
    })

  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: "Leads API Working ✅", time: new Date().toISOString() })
}
