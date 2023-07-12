"use client";
import Link from "next/link";
import { Avatar, HStack, Text } from "@chakra-ui/react";
import { BsGear } from "react-icons/bs";

import CreatePostTab from "./components/post/CreatePostTab";
import Post from "./components/post/Post";
import Notifications from "./components/Notifcations";
import { useThemeStore } from "./zustandStore/themeStore";
import Leaderboards from "./components/Leaderboards";

import useSWR from "swr";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "./zustandStore/userStore";
import { getRequest } from "./api/fetcher";

const NewsFeedPage = () => {
    const router = useRouter();
    const { isDarked, toggleTheme } = useThemeStore();
    const componentsBg = isDarked
        ? "bg-[#242850] text-[#f5f5f5]"
        : "bg-white text-black";

    const allPostSWR = useSWR("/post/fetch", getRequest);

    const { currentAccount, getCurrentAccount } = useUserStore();

    useEffect(() => {
        getCurrentAccount();
        const token = localStorage.getItem("vibelyToken");
        if (!token) {
            router.push("/login");
        }
    }, []);

    return (
        <div className="relative w-full min-h-screen h-[150rem] flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-6 p-6">
            {/* Left Side */}
            <div className="sticky top-[5rem] z-50 w-[22rem] h-[85vh] hidden lg:flex flex-col gap-3">
                {/* change this into dynamic username */}
                <Link href={`/profile/${currentAccount?.username}`}>
                    <div
                        className={`${componentsBg} w-full flex items-center justify-between p-4 rounded-xl shadow-custom`}
                    >
                        <div className="flex items-center gap-3">
                            <Avatar
                                size="md"
                                name={currentAccount?.firstName}
                                // src="/tzuyu.jpg"
                            />
                            <div className="flex flex-col gap-0">
                                <h1 className="font-bold text-lg">
                                    {currentAccount?.firstName}{" "}
                                    {currentAccount?.lastName}
                                </h1>
                                <small
                                    className={
                                        isDarked
                                            ? "text-gray-300"
                                            : "text-black"
                                    }
                                >
                                    @{currentAccount?.username}
                                </small>
                            </div>
                        </div>
                        <BsGear className="text-xl ml-3" />
                    </div>
                </Link>
                <div
                    className={`${componentsBg} w-full flex flex-col p-2 rounded-xl shadow-custom overflow-hidden`}
                >
                    <HStack
                        p={2}
                        gap={3}
                        rounded="md"
                        _hover={{ bg: isDarked ? "#383d69" : "gray.200" }}
                        cursor="pointer"
                    >
                        <img src="/friends-icon.png" className="w-8" />
                        <Text fontWeight="semibold">Friends</Text>
                    </HStack>
                    <HStack
                        p={2}
                        gap={3}
                        rounded="md"
                        _hover={{ bg: isDarked ? "#383d69" : "gray.200" }}
                        cursor="pointer"
                    >
                        <img src="/group-icon.png" className="w-8" />
                        <Text fontWeight="semibold">Community</Text>
                    </HStack>
                    <HStack
                        p={2}
                        gap={3}
                        rounded="md"
                        _hover={{ bg: isDarked ? "#383d69" : "gray.200" }}
                        cursor="pointer"
                    >
                        <img src="/bookmark-icon.png" className="w-8" />
                        <Text fontWeight="semibold">Saved</Text>
                    </HStack>
                    <HStack
                        p={2}
                        gap={3}
                        rounded="md"
                        _hover={{ bg: isDarked ? "#383d69" : "gray.200" }}
                        cursor="pointer"
                    >
                        <img src="/store-icon.png" className="w-8" />
                        <Text fontWeight="semibold">Marketplace</Text>
                    </HStack>
                </div>
            </div>

            {/* Middle  */}
            <div className="w-[18rem] lg:w-[40rem] flex flex-col items-center ">
                <CreatePostTab
                    mutate={allPostSWR?.mutate}
                    isDarked={isDarked}
                    componentsBg={componentsBg}
                />
                <div className="w-full flex flex-col gap-4 mt-6">
                    {allPostSWR?.data?.map((post) => (
                        <Post
                            post={post}
                            isDarked={isDarked}
                            componentsBg={componentsBg}
                            key={post?.key}
                            mutate={allPostSWR?.mutate}
                        />
                    ))}
                </div>
            </div>

            {/* Right Side */}
            <div className="z-10 sticky top-[5rem] w-[20rem] h-[85vh] hidden lg:flex flex-col gap-3">
                <Leaderboards isDarked={isDarked} componentsBg={componentsBg} />
                <Notifications
                    isDarked={isDarked}
                    componentsBg={componentsBg}
                />
            </div>
        </div>
    );
};

export default NewsFeedPage;
