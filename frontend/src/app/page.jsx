// @ts-nocheck
'use client'
import Menu from "../components/menu/page";
import {SparklesCore} from "@/components/ui/sparkles";
import {GlobeDemo} from "../components/menu/head";
import {useEffect, useState} from "react";
import {AppleCardsCarouselDemo} from "../components/home/home3";
import {TypewriterEffectSmoothDemo} from "../components/home/home4";
import DecryptedText from '../components/ui/decryptedtext'
import Spline from '@splinetool/react-spline';
import ScrollVelocity from '../components/ui/scrollVelocity';
import dynamic from "next/dynamic";

const Home = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('theme') || 'dark';
        setTheme(storedTheme);

        const handleStorageChange = () => {
            setTheme(window.localStorage.getItem('theme') || 'dark');
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
  return (
      <main className="bg-white dark:bg-black">
            <div className="mx-40 mt-32 bg-backdrop-blur-md rounded-full bg-white dark:bg-blue">
                <Menu/>
            </div>
          <div className="bg-white dark:bg-black">
            <div className="flex">
            <div className="w-1/2 px-20">
              <div className={` `}>
                  <button className={` mt-20 p-4 rounded-3xl bg-gray-100 dark:bg-[#171717]`}>On-Chain Rewards for Dev
                      Contributions
                  </button>
              </div>
              <h1 className="text-4xl h lg:text-8xl font-semibold  mx-auto mt-6 relative   bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                  Earn Crypto by Solving Github Issues
              </h1>
              <div className="flex space-x-4">
                <button className="flex text-black items-center justify-center mt-10 p-4 rounded-3xl bg-gray-100 dark:bg-[#14f195]">
                    START CONTRIBUTING
                </button>
                <button className="flex items-center border-2 border-white justify-center mt-10 p-4 rounded-3xl ">
                    LIST BOUNTIES
                </button>
                
              </div>
              <div className="text-xl pt-10">
                GitFund is a decentralized platform that rewards GitHub contributions with cryptocurrency. Developers earn through bounties, while project owners track progress and distribute payouts transparently. It bridges open-source development with blockchain, fostering innovation and collaboration.
                </div>
              </div>
              <div className="w-1/2">
              <Spline scene="https://prod.spline.design/mL7aUBF7uqtTsE5v/scene.splinecode" />
              </div>
              </div>
              <div>
                
            </div>
            <div>
            <ScrollVelocity
            texts={['Code Contribute Collect', 'Hackl Solve Earn']} 
            velocity={100} 
            className="custom-scroll-text"
            />
            </div>
            <GlobeDemo/>
              <AppleCardsCarouselDemo/>
          </div>
{/* Footer Section */}
<footer className="mt-20 py-10 bg-gray-100 dark:bg-[#171717]">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">© 2023 GitFund. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                  <a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms</a>
                  <a href="/privacyPolicy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy</a>
                  <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</a>
                </div>
              </div>
            </div>
          </footer>
      </main>
  )
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
});

