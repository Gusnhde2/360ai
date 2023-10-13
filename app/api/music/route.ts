import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const model =
    "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05";
  const input = {
    prompt_a: prompt,
  };

  try {
    const response = await replicate.run(model, { input });
    return NextResponse.json({ response });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
