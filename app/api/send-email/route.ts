import { NextResponse } from "next/server";
import { sendFormDataEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData } = body;
    
    // Send to both email addresses
    await Promise.all([
      sendFormDataEmail(formData, "aminofab@gmail.com"),
      sendFormDataEmail(formData, "secretarygsk@gmail.com")
    ]);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
} 