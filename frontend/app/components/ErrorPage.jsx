"use client";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center">
            <h1 className="text-blue-600 text-7xl mt-[10rem] font-bold">404</h1>
            <h2 className="mt-4 text-2xl font-semibold">
                Ooops, page not found
            </h2>
            <Link href="/" className="mt-10">
                <Button colorScheme="blue">Go to Homepage</Button>
            </Link>
        </div>
    );
};

export default ErrorPage;
