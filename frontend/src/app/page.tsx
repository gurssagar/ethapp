"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// import { ProfileForm } from "@/components/ui/example-form"; // This import is not used in this component

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(2, {
    message: "Email must be at least 2 characters.", // Corrected message for clarity, though email validation usually handles length implicitly
  }),
});

export default function BackgroundBeamsDemo() {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.

  function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMessage(null); // Reset error message on new submit

    const sendToBackend = async () => {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: values.email }),
      });

      if (!response.ok) {
        // Try to parse error message from backend
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
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-3xl mx-auto p-4 z-10">
        {" "}
        <div className="flex justify-center">
          <button className="text-center text-sm px-4 py-2 text-neutral-300 bg-neutral-800 rounded-full">
            Beta Access
          </button>
        </div>
        {/* Added z-10 here to ensure form is above beams if they overlap */}
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <div className="text-center text-sm px-4 py-2 text-neutral-400 rounded-full">
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
                  className="space-y-8 mt-4 flex gap-4"
                >
                  {/* Added mt-4 for spacing */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <div className="w-3/4 ">
                        <FormItem>
                          {/* Adjusted label color for dark bg */}
                          <FormControl>
                            <Input
                              placeholder="Enter Your Email"
                              {...field}
                              className="bg-neutral-800 py-2 border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:ring-neutral-600"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-1/4  bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                  >
                    Join the waitlist
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between w-max-3xl">
        <div className="flex mx-20">
          <Image
            src="/x.svg"
            width={30}
            height={30}
            alt="X Gitfund"
            className="mr-4"
          />

          <div className="mx-2 my-auto">
            <p className="text-lg text-gray-50">X</p>
            <a
              href="x.com/GITFUND2025"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-[14px] text-gray-400">@GITFUND2025</p>
            </a>
          </div>
        </div>

        <a
          href="https://www.linkedin.com/company/quarlatis"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer transition-colors group"
        >
          <div className="flex mx-20 group-hover:bg-blue-950/20 rounded-lg">
            <Image
              src="/linkedin.svg"
              width={30}
              height={30}
              alt="LinkedIn Quarlatis"
              className="mr-4"
            />
            <div className="mx-2 my-auto">
              <p className="text-lg text-gray-50 group-hover:text-blue-400">
                LinkedIn
              </p>
              <p className="text-[14px] text-gray-400">@quarlatis</p>
            </div>
          </div>
        </a>
      </div>
      {errorMessage && (
        <div className="fixed bottom-10 right-10 text-sm bg-neutral-800 px-4 py-2 text-red-400 rounded-full">
          {errorMessage}
        </div>
      )}
      <BackgroundBeams />
    </div>
  );
}
