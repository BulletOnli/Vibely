"use client";
import { useThemeStore } from "../lib/zustandStore/themeStore";
import useSWR from "swr";
import { lazy, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useUserStore } from "../lib/zustandStore/userStore";
import { getRequest } from "../lib/utils/fetcher";
import { checkAccessToken } from "../lib/utils/accessToken";

import CreatePostTab from "../components/post/CreatePostTab";
import Newsfeed from "@/components/homepage/Newsfeed";

const LeftSidebar = lazy(() => import("@/components/homepage/LeftSidebar"));
const Leaderboards = lazy(() => import("../components/homepage/Leaderboards"));
const FriendRequests = lazy(() =>
    import("../components/homepage/FriendRequests")
);

const Homepage = () => {
    const { isDarked, toggleTheme } = useThemeStore();
    const componentsBg = isDarked
        ? "bg-[#242850] text-[#f5f5f5]"
        : "bg-white text-black";
    const { currentAccount, getCurrentAccount } = useUserStore();

    const allPostSWR = useSWR(`/post/fetch?`, getRequest);

    useEffect(() => {
        if (!checkAccessToken()) {
            redirect("/login");
        }
    }, [currentAccount]);

    return (
        <div className="relative w-full min-h-screen h-full flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-6 p-6">
            {/* Left Side */}
            <LeftSidebar />

            {/* Middle  */}
            <div className="w-[18rem] lg:w-[40rem] flex flex-col items-center ">
                <CreatePostTab
                    mutate={allPostSWR?.mutate}
                    isDarked={isDarked}
                    componentsBg={componentsBg}
                />

                <Newsfeed allPostSWR={allPostSWR} />
            </div>

            {/* Right Side */}
            <div className="z-10 sticky top-[5rem] w-[20rem] h-[85vh] hidden lg:flex flex-col gap-3">
                <Leaderboards isDarked={isDarked} componentsBg={componentsBg} />
                <FriendRequests
                    isDarked={isDarked}
                    componentsBg={componentsBg}
                />
            </div>
        </div>
    );
};

export default Homepage;
