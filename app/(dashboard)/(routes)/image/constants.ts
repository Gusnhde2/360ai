import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Photo prompt is required",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
  model: z.string().min(1),
});

export const modelOptions = [
  {
    value: "dall-e-2",
    label: "DALL-E 2",
  },
  {
    value: "dall-e-3",
    label: "DALL-E 3",
  },
];

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "2",
    label: "2 Photos",
  },
  {
    value: "3",
    label: "3 Photos",
  },
  {
    value: "4",
    label: "4 Photos",
  },
  {
    value: "5",
    label: "5 Photos",
  },
];

export const resolutionOptions = [
  {
    value: "1024x1024",
    label: "1024x1024",
  },
  {
    value: "1024x1792",
    label: "Portrait (1024x1792)",
  },
  {
    value: "1792x1024",
    label: "Landscape (1792x1024)",
  },
];
