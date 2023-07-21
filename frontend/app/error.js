"use client";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Error({ error }) {
    const router = useRouter();

    return (
        <div className="w-full h-screen flex flex-col items-center">
            <h1 className="text-7xl mt-[10rem] font-bold">500</h1>
            <h2 className="mt-4 text-2xl font-semibold text-[#00CCCC]">
                Ooops, Internal Server Error
            </h2>

            <Button mt={7} colorScheme="teal" onClick={() => router.refresh()}>
                Refresh
            </Button>
        </div>
    );
}
