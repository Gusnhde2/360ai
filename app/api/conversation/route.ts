import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

import { increaseApiCount, userApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId)
    return NextResponse.json(
      {
        error: "You must be logged in to use the API.",
        status: 403,
      },
      { status: 403 }
    );

  const freeTrial = await userApiLimit();

  const isPro = await checkSubscription();

  if (!freeTrial && !isPro) {
    return new NextResponse("Free trial has expired. Please upgrade to pro.", {
      status: 403,
    });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { prompt } = await req.json();
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    if (!isPro) increaseApiCount();
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
