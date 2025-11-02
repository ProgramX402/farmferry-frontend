import { NextRequest, NextResponse } from "next/server";

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
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yourwebsite.com", // required by OpenRouter
        "X-Title": "FarmFerry Chat", // optional but recommended
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free", // ✅ correct model
        messages: [
          {
            role: "system",
            content:
              "You are FarmFerry AI, an agricultural assistant. Answer simply and helpfully about farming and sustainability.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    const aiMessage =
      data?.choices?.[0]?.message?.content ||
      data?.error?.message ||
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
