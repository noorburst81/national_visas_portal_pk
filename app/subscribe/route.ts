import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("NEW SUBSCRIBER:", {
     ...body,
      time: new Date().toLocaleString(),
      status: "SUBSCRIBED"
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
