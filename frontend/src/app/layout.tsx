import type { Metadata } from "next";
import "./globals.css";
import {ThemeClient} from "@/components/ThemeClient";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Web3Provider } from "../components/context/Web3Context.js";


export const metadata: Metadata = {
    title: "GitFund",
    description: "Earn Crypto by Solving Github Issues",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en"  suppressHydrationWarning>
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <ThemeClient><Web3Provider>{children}</Web3Provider></ThemeClient>
        </ThemeProvider>
        </body>
        </html>
    );
}
