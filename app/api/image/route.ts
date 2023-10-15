import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

import { increaseApiCount, userApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";

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

  if (!freeTrial)
    return NextResponse.json(
      {
        error:
          "You have reached your API limit. Please upgrade your account to continue using the API.",
        status: 403,
      },
      { status: 403 }
    );

  await increaseApiCount();
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
