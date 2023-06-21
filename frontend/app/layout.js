"use client";

import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Nav from "./components/Nav";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ChakraProvider>
                    <div className="relative w-full flex flex-col text-black bg-[#e9ecef]">
                        <Navbar />
                        {children}
                        <Nav />
                    </div>
                </ChakraProvider>
            </body>
        </html>
    );
}