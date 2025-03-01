// @ts-nocheck
"use client";
import Image from "next/image";
import React from "react";

export function AppleCardsCarouselDemo() {
    return (
        <>
            <div id="features" className="dark:bg-black flex flex-col items-center">
                
                <div className="grid grid-cols-2    gap-6 px-4">
                    {data.map((item, index) => (
                        <div key={index} className="px-5 bg-white dark:bg-[#171717] text-slate-800 dark:text-white my-6 shadow-sm border border-slate-200 dark:border-neutral-800 rounded-lg w-full h-[600px]">
                            <div className="p-4">
                                <h6 className="mb-2 text-7xl font-semibold">
                                    {item.category}
                                </h6>
                                <p className="text-slate-600 text-2xl dark:text-slate-300 leading-normal font-light">
                                    {item.title}
                                </p>
                            </div>
                            <div className="relative h-[70%] m-2.5 overflow-hidden rounded-md">
                                <img src={item.src} alt={item.category} className="w-full h-full object-cover"/>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-40 w-full mx-10 justify-between flex space-x-7 bg-cover bg-center bg-no-repeat">
                    <div className="w-1/3">
                        <h1 id="how" className="text-2xl mt-10 mb-10 -ml-40 lg:text-5xl  text-center   dark:from-neutral-800 dark:via-white dark:to-white">
                            How It Works
                        </h1>

                    </div>
                    <div className="w-2/3 flex space-x-6">
                    <div className="w-1/2 mt-40">
                    <div className="pb-40 grid mx-auto gap-8 sm:grid-cols-1 lg:grid-cols- max-w-6xl">
    <div key="item-1" className="flex flex-col h-full dark:bg-[#171717] dark:border-0 rounded-lg border text-card-foreground shadow-sm border-gray-200 bg-white">
        <div className="flex flex-col space-y-1.5 p-6 flex-grow">
            <div className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 mb-4 h-8 w-8 bg-gray-200 text-lg text-gray-700">
                1
            </div>
            <h3 className="text-2xl dark:text-white font-semibold leading-none tracking-tight text-gray-900">
                Browse Bounties
            </h3>
        </div>
        <div className="p-6 pt-0 mt-auto">
            <p className="text-gray-600 dark:text-gray-300">Explore available bounties from various open-source projects.</p>
        </div>
    </div>

    

    <div key="item-3" className="flex flex-col h-full dark:bg-[#171717] dark:border-0 rounded-lg border text-card-foreground shadow-sm border-gray-200 bg-white">
        <div className="flex flex-col space-y-1.5 p-6 flex-grow">
            <div className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 mb-4 h-8 w-8 bg-gray-200 text-lg text-gray-700">
                3
            </div>
            <h3 className="text-2xl dark:text-white font-semibold leading-none tracking-tight text-gray-900">
                Get Rewarded
            </h3>
        </div>
        <div className="p-6 pt-0 mt-auto">
            <p className="text-gray-600 dark:text-gray-300">Once accepted, unlock the reward and receive crypto payment.</p>
        </div>
    </div>
</div>              
                    </div>
                    

                    <div className="w-1/2 ">
                    <div className="pb-40 grid mx-auto gap-8 sm:grid-cols-1 lg:grid-cols- max-w-6xl">
    

    <div key="item-2" className="flex flex-col h-full dark:bg-[#171717] dark:border-0 rounded-lg border text-card-foreground shadow-sm border-gray-200 bg-white">
        <div className="flex flex-col space-y-1.5 p-6 flex-grow">
            <div className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 mb-4 h-8 w-8 bg-gray-200 text-lg text-gray-700">
                2
            </div>
            <h3 className="text-2xl dark:text-white font-semibold leading-none tracking-tight text-gray-900">
                Claim & Solve
            </h3>
        </div>
        <div className="p-6 pt-0 mt-auto">
            <p className="text-gray-600 dark:text-gray-300">Claim a bounty and submit link to your pull request.</p>
        </div>
    </div>
    <div key="item-2" className="flex flex-col h-full dark:bg-[#171717] dark:border-0 rounded-lg border text-card-foreground shadow-sm border-gray-200 bg-white">
        <div className="flex flex-col space-y-1.5 p-6 flex-grow">
            <div className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 mb-4 h-8 w-8 bg-gray-200 text-lg text-gray-700">
                4
            </div>
            <h3 className="text-2xl dark:text-white font-semibold leading-none tracking-tight text-gray-900">
            Level Up

            </h3>
        </div>
        <div className="p-6 pt-0 mt-auto">
            <p className="text-gray-600 dark:text-gray-300">Build your reputation and unlock bigger opportunities. 🚀
            </p>
        </div>
    </div>

    
</div>              
                    </div>
                    </div>

                    

                </div>
                
            </div>
        </>
    );
}

const data = [
    {
        category: "Github Integration",
        title: "Seamlessly connect with GitHub repositories and issues.",
        src: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    },
    
    {
        category: "Streamlined Process",
        title: "Easy-to-use platform for creating, finding, claiming, and submitting bounties.",
        src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    },


];
