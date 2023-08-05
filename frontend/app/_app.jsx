"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import NavbarBottom from "../components/navbar/NavbarBottom";
import { useThemeStore } from "./zustandStore/themeStore";
import NextTopLoader from "nextjs-toploader";

export function App({ children }) {
    const pathname = usePathname();
    const hideComponents = pathname === "/login" || pathname === "/register";

    const { isDarked } = useThemeStore();
    const mainBg = isDarked
        ? "bg-[#1A1F40] text-[#f5f5f5]"
        : "bg-[#DAE0E6] text-black";

    return (
        <>
            <NextTopLoader />
            <ChakraProvider>
                <div className={`${mainBg} relative w-full  flex flex-col`}>
                    {!hideComponents && <Navbar />}
                    {children}
                    {!hideComponents && <NavbarBottom />}
                </div>
            </ChakraProvider>
        </>
    );
}
