import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
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
