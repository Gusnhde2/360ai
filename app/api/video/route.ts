import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiCount, userApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

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

  const { prompt } = await req.json();
  const model =
    "cjwbw/videocrafter:3a7e6cdc3f95192092fa47346a73c28d1373d1499f3b62cdea25efe355823afb";
  const input = {
    prompt: prompt,
  };

  try {
    const response = await replicate.run(model, { input });
    return NextResponse.json({ response });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
