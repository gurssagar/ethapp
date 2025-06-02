"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import Image from "next/image";

// import { ProfileForm } from "@/components/ui/example-form"; // This import is not used in this component

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(2, {
    message: "Email must be at least 2 characters.", // Corrected message for clarity, though email validation usually handles length implicitly
  }),
});

export default function BackgroundBeamsDemo() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const sendToBackend = async () => {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: values.email }),
      });
      if (!response.ok) {
        throw new Error("Failed to send email");
      }
    }
    sendToBackend().then(
      () => {
          window.location.href = "/Thanks";
      }
  );
    
  }

  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 z-10"> {/* Added z-10 here to ensure form is above beams if they overlap */}
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you&apos;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4"> {/* Added mt-4 for spacing */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400">Email</FormLabel> {/* Adjusted label color for dark bg */}
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      {...field} 
                      className="bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:ring-neutral-600" // Style input for dark mode
                    />
                  </FormControl>
                  <FormDescription className="text-neutral-600">
                    We&apos;ll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-neutral-200 text-neutral-900 hover:bg-neutral-300">
              Join the waitlist
            </Button>
          </form>
        </Form>
      </div>

      <div className="flex mt-20 justify-between w-max-2xl">
            <div className="flex">
                <Image src="/x.svg" width={40} height={40} alt="X Gitfund" className="mr-4" />
                <div className="mx-2 my-auto">
                    <p className="text-xl text-gray-50">X</p>
                    <p className="text-lg text-gray-400">@GITFUND2025</p>
                </div>
            </div>
            <div className="flex">
                <Image src="/linkedin.svg" width={40} height={40} alt="Your Company" className="mr-4" />
                <div className="mx-2 my-auto">
                    <p className="text-xl text-gray-50">LinkedIn</p>
                    <p className="text-lg text-gray-400">@quarlatis</p>
                </div>
            </div>
        </div>
      <BackgroundBeams />
    </div>
  );
}