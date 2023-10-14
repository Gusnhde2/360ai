"use client";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Heading from "@/components/Heading";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/constants";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Video() {
  const [video, setVideo] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const user = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: values.prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setVideo(data.response);
        setIsLoading(false);
        form.reset();
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.error.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      setError("An error occurred while processing your request.");
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Video generation"
        description="Generate video from a prompt."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg border p4 mx-2 lg:mx-10 px-3 py-3 md:px-6 md:py-3 focus-within:shadow-sm grid grid-cols-12 gap-2 items-center"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-10 p-2 ">
                <FormControl className="m-0 p-0">
                  <Input
                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent p-4"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-12 lg:col-span-2">
            Generate
          </Button>
        </form>
      </Form>
      {video && (
        <video controls className="w-full aspect-video mt-8 rounded-lg">
          <source src={video} />
        </video>
      )}
      {isLoading && (
        <div className="flex w-full justify-center mt-10">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
