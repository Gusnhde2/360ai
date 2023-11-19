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

  const { prompt, amount, resolution, model } = await req.json();
  try {
    const response = await openai.images.generate({
      model: model,
      prompt: prompt,
      n: amount,
      size: resolution,
      quality: "hd",
    });

    if (!isPro) increaseApiCount();
    return NextResponse.json({ images: response.data });
  } catch (error: string | any) {
    return NextResponse.json(
      {
        status: 500,
        error:
          model === "dall-e-3"
            ? "DALL-E-3 is currently unavailable. Please try again later."
            : JSON.stringify(error.message),
      },
      { status: 500 }
    );
  }
}
