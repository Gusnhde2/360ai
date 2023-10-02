"use client";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Headnig from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constants";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Logo from "@/public/logo.svg";

interface ConversationQuestion {
  prompt: string;
  answer: string;
}

export default function Conversation() {
  const [messages, setMessages] = useState<Array<ConversationQuestion>>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const user = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: values.prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((current: any) => [
          ...current,
          {
            prompt: values.prompt,
            answer: data.message.content,
          },
        ]);
        form.reset();
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.error.message);
      }
    } catch (error: any) {
      setError("An error occurred while processing your request.");
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Headnig
        title="Conversation"
        description="Ask me anything."
        icon={MessageSquare}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "py-8 px-3 lg:px-10 w-full flex flex-col items-start  rounded-lg"
          )}
        >
          <div className="flex items-center gap-8 p-4 w-full rounded-lg">
            <img
              src={user.user?.imageUrl}
              alt="profile-picture"
              style={{
                borderRadius: "100%",
                width: "2.5rem",
                height: "2.5rem",
              }}
            />
            <p className="text-sm">{message.prompt}</p>
          </div>
          {isLoading ? (
            <p>...loading</p>
          ) : (
            <div className="flex items-center gap-8 bg-slate-200 p-4 w-full rounded-lg">
              <Image
                src={Logo}
                alt="logo"
                style={{
                  borderRadius: "100%",
                  width: "2.5rem",
                  height: "2.5rem",
                }}
              />
              <p className="text-sm">{message.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
