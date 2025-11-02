// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

// Force dynamic execution (no cache, no cookies)
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

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://farmferry.netlify.app/", // ✅ change to your domain in production
        "X-Title": "FarmFerry Chat",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free", // ✅ free OpenRouter model
        messages: [
          {
            role: "system",
            content:
              "You are FarmFerry AI, a helpful and knowledgeable agricultural assistant. Be concise, professional, and friendly when giving farming and sustainability advice.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    console.log("🧠 OpenRouter Response:", JSON.stringify(data, null, 2));

    // ✅ Guarantee a fallback text
    let aiMessage =
      data?.choices?.[0]?.message?.content?.trim() ||
      data?.error?.message ||
      "I'm sorry, I couldn’t generate a response right now.";

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
