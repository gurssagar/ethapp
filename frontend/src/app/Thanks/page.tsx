"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";


export default function BackgroundBeamsDemo() {

  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-4xl mx-auto p-4 z-10"> {/* Added z-10 here to ensure form is above beams if they overlap */}
        <h1 className="relative z-10 text-lg md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Thanks For Joining the Waitlist
        </h1>
        <p className="text-gray-200 my-10">You will be among the first one to know when the product is ready to be launched and will get access to beta features.</p>
      </div>
    <div className="mt-10 border-1 border-top border-[#010101] ">
    <div className="flex mt-20 justify-between w-max-3xl">
            <div className="flex mx-20">
                <Image src="/x.svg" width={30} height={30} alt="X Gitfund" className="mr-4" />
                <div className="mx-2 my-auto">
                    <p className="text-lg text-gray-50">X</p>
                    <p className="text-[14px] text-gray-400">@GITFUND2025</p>
                </div>
            </div>
            <div className="flex mx-20">
                <Image src="/linkedin.svg" width={30} height={30} alt="LinkedIn Quarlatis" className="mr-4" />
                <div className="mx-2 my-auto">
                    <p className="text-lg text-gray-50">LinkedIn</p>
                    <p className="text-[14px] text-gray-400">@quarlatis</p>
                </div>
            </div>
        </div>

    </div>

      <BackgroundBeams />
    </div>
  );
}