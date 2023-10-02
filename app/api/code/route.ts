import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { prompt } = await req.json();
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a code generating machine, and you will be extremly helpful. You will allways answer in marcdown code snippets. Use code comments for explanation. ${prompt}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    return NextResponse.json({ message: chatCompletion.choices[0].message });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
    });
  }
}
