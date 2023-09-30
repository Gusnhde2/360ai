"use client";

import { MessageSquare } from "lucide-react";
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
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constants";

export default function Conversation() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
          className="rounded-lg border w-full p4 px-3 md: px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 items-center"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-10 p-2 ">
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl className="m-0 p-0">
                  <Input
                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
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
      <div className="space-y-4 mt-4">Message content</div>
    </div>
  );
}
