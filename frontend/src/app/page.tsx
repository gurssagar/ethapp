"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

export default function BackgroundBeamsDemo() {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMessage(null);

    const sendToBackend = async () => {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: values.email }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to send email");
      }
    };

    (async () => {
      try {
        await sendToBackend();
        setIsCompleted(true);
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message: unknown }).message === "string" &&
          (error as { message: string }).message.includes("insert into")
        ) {
          setErrorMessage("This email is already on the waitlist.");
        } else if (
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message: unknown }).message === "string"
        ) {
          setErrorMessage((error as { message: string }).message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        console.error(error);
      }
    })();
  }

  return (
    <div className="dark min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased px-2">
      <div className="w-full max-w-3xl mx-auto p-2 sm:p-4 z-10">
        <div className="flex justify-center">
          
        </div>
        <h1 className="relative z-10 text-4xl sm:text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mt-4">
          Join the waitlist
        </h1>
        <div className="text-center text-[14px] sm:text-sm px-2 sm:px-4 py-2 text-neutral-400 rounded-full">
          Early users get access to high-reward bounties and earn more for their
          contributions, while maintainers can post tasks, attract top talent,
          and get critical issues resolved faster — making it a win-win for
          builders and project owners alike.
        </div>
        <div className="mt-5 max-w-lg w-full mx-auto">
          {isCompleted ? (
            <>
              <div className="text-center text-sm px-4 py-2 text-neutral-400 rounded-full">
                Thanks for Submitting the form you wil be the first one to know
                when the dApp Launches. Stay Stuned by following our socials
                mentioned below
              </div>
            </>
          ) : (
            <>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mt-4 flex flex-col sm:flex-row lg:gap-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <div className="w-full sm:w-3/4 ">
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Email"
                              {...field}
                              className="bg-neutral-800 py-6 border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:ring-neutral-600"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full py-6 sm:w-1/4 bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                  >
                    Join the waitlist
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>

      {/* Socials section */}
      <div className="z-50  flex flex-row justify-center items-center w-full max-w-3xl gap-4 mt-8 px-2">
        <Link
          href="https://x.com/GITFUND2025"
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-pointer" // Added block display
        >
          <div className="flex bg-black rounded-lg items-center mx-0 border-2 border-neutral-800 hover:scale-95 transition-transform p-2">
            <Image
              src="/x.png"
              width={30}
              height={30}
              alt="X Gitfund"
              className="pointer-events-none" // Added to prevent image interference
            />
          </div>
        </Link>

        <Link
          href="https://www.linkedin.com/company/quarlatis"
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-pointer" // Added block display
        >
          <div className="flex bg-black  rounded-lg items-center mx-0 border-2 border-neutral-800 hover:scale-95 transition-transform p-2">
            <Image
              src="/linkedin.png"
              width={30}
              height={30}
              alt="LinkedIn Quarlatis"
              className="pointer-events-none" // Added to prevent image interference
            />
          </div>
        </Link>
      </div>


      {errorMessage && (
        <div className="fixed bottom-4 right-4 text-xs sm:text-sm bg-neutral-800 px-4 py-2 text-red-400 rounded-full max-w-[90vw] break-words">
          {errorMessage}
        </div>
      )}
      <BackgroundBeams />
    </div>
  );
}
