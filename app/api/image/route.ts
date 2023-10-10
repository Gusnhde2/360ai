import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { prompt, amount, resolution } = await req.json();
  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: amount,
      size: resolution,
    });
    return NextResponse.json({ images: response.data });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
    });
  }
}
