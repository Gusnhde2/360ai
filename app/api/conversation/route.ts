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
    return NextResponse.json(
      { error: "Free trial has expired. Please upgrade to pro.", status: 403 },
      {
        status: 403,
      }
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { prompt } = await req.json();
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    if (!isPro) increaseApiCount();
    return NextResponse.json({ message: chatCompletion.choices[0].message });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: JSON.stringify({
        error: error ? error.message : "Something went wrong",
      }),
    });
  }
}
