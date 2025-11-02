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

    // ✅ Call OpenRouter API directly (no user auth needed)
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // server-only
        "Content-Type": "application/json",
        "HTTP-Referer": "https://farmferry.netlify.app", // must match your domain exactly (no trailing slash)
        "X-Title": "FarmFerry Chat",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-nano-12b-v2-vl:free", // ✅ free model
        messages: [
          {
            role: "system",
            content:
              "You are FarmFerry AI, a helpful, friendly agricultural assistant that provides concise and practical farming and sustainability advice.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    // If API fails or returns non-JSON
    if (!response.ok) {
      const text = await response.text();
      console.error("❌ OpenRouter API Error:", text);
      return NextResponse.json(
        {
          success: false,
          response:
            "Sorry, the AI service is unavailable right now. Please try again later.",
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("🧠 OpenRouter Response:", JSON.stringify(data, null, 2));

    // ✅ Get response or fallback
    const aiMessage =
      data?.choices?.[0]?.message?.content?.trim() ||
      data?.error?.message ||
      "I'm sorry, I couldn’t generate a response right now.";

    return NextResponse.json({ success: true, response: aiMessage });
  } catch (err) {
    console.error("💥 Chat route error:", err);
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
