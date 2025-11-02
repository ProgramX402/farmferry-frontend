// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { message } = await request.json();
  if (!message) return NextResponse.json({ error: "No message" }, { status: 400 });

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct", // or "meta-llama/llama-3-8b-instruct"
      messages: [
        {
          role: "system",
          content:
            "You are FarmFerry AI, an agricultural assistant helping farmers with sustainable practices and farm advice.",
        },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content || "No response.";

  return NextResponse.json({ success: true, response: reply });
}
