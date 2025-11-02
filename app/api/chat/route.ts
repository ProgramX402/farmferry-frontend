// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

// Force dynamic execution (no cookies or cache)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { success: false, error: "No message provided" },
        { status: 400 }
      );
    }

    // ✅ Call OpenRouter API (no auth or cookies required from the user)
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // only on your server
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yourwebsite.com", // replace with your actual domain
        "X-Title": "FarmFerry Chat",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free", // ✅ Free OpenRouter model
        messages: [
          {
            role: "system",
            content:
              "You are FarmFerry AI, an agricultural assistant. You help users with farming, sustainability, and agriculture tips in a concise, friendly, and practical way.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API Error:", errorText);
      return NextResponse.json(
        {
          success: false,
          response:
            "Sorry, the AI service is currently unavailable. Please try again later.",
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    const aiMessage =
      data?.choices?.[0]?.message?.content ||
      "I'm sorry, I couldn't generate a response right now.";

    return NextResponse.json({ success: true, response: aiMessage });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      {
        success: false,
        response:
          "Sorry, I'm having trouble responding right now. Please try again later or contact us through WhatsApp or email.",
      },
      { status: 500 }
    );
  }
}
