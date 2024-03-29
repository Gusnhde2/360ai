"use client";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Heading from "@/components/Heading";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  amountOptions,
  formSchema,
  modelOptions,
  resolutionOptions,
} from "./constants";

interface ErrorMessage {
  error: string;
  status: number;
}

export default function ImagePage() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfImages, setNumberOfImages] = useState<number[]>([]);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      model: "dall-e-3",
      amount: "1",
      resolution: "1024x1024",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setImages([]);
    setNumberOfImages(Array.from(Array(parseInt(values.amount)).keys()));
    setIsLoading(true);
    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: values.model,
          prompt: values.prompt,
          amount: parseInt(values.amount),
          resolution: values.resolution,
        }),
      });

      if (response.ok) {
        const images = await response.json();
        const urls = images.images.map((image: { url: string }) => image.url);
        setImages(urls);
        setIsLoading(false);
        form.reset();
      } else {
        const errorMessage = await response.json();
        setError(errorMessage);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image generation"
        description="Generate image using descriptive text."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border p4 mx-2 lg:mx-10 px-3 py-3 md:px-6 md:py-3 focus-within:shadow-sm grid grid-cols-12 gap-2 items-center"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="A picture of a horse in Swiss alps"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {modelOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {form.getValues("model") === "dall-e-2" ? (
                        amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem key={1} value={"1"}>
                          1 Photo
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {form.getValues("model") === "dall-e-3" ? (
                        resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem key={1} value={"1024x1024"}>
                          1024x1024
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex flex-col  md:flex-row w-full p-4 md:p-10 justify-center gap-6 justify-center align-center">
        {error && (
          <Modal
            title={
              error.status === 403
                ? "You have used all free tokens"
                : "Something went wrong"
            }
            message={error.error}
            closeModal={() => setError(null)}
            status={error.status}
          />
        )}
        {isLoading &&
          numberOfImages.map((_, index) => (
            <div key={index} className="flex justify-center w-full">
              <LoadingSpinner />
            </div>
          ))}
        {images.map((src) => (
          <div
            key={src}
            className="flex flex-col gap-2 align-center md:justfy-center"
          >
            <div className="relative aspect-square w-50 h-50 md:w-80 md:h-80">
              <Image
                fill
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYA"
                alt="Generated"
                src={src}
              />
            </div>
            <Button onClick={() => window.open(src)}>Download</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
