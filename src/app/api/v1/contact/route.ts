import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Forward to FormSubmit to deliver email directly to Nirvaya
    const targetEmail = "nirvaya22@gmail.com";
    const res = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _subject: subject ? `[QA Inquiry] ${subject}` : `[QA Inquiry] New message from ${name}`,
        message,
        _captcha: "false",
        _template: "table",
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.message || "Failed to deliver email through notification service." },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message successfully sent to nirvaya22@gmail.com",
    });
  } catch (error: unknown) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      {
        error: "Server error processing contact request.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

