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
