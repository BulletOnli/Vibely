"use client";
import Link from "next/link";
import { Avatar, HStack, Text } from "@chakra-ui/react";
import { BsGear } from "react-icons/bs";

import CreatePostTab from "./components/CreatePostTab";
import Post from "./components/Post";
import Notifications from "./components/Notifcations";
import Birthdays from "./components/Birthdays";
import { useThemeStore } from "./store/themeStore";

const NewsFeedPage = () => {
    const { isDarked, toggleTheme } = useThemeStore();
    const componentsBg = isDarked
        ? "bg-[#242850] text-[#f5f5f5]"
        : "bg-white text-black";
    const hoverColor = isDarked ? "hover:bg-[#282E54]" : "hover:bg-gray-100";

    return (
        <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-center gap-6 p-6">
            {/* Left Side */}
            <div className="sticky top-[5rem] z-50 w-[22rem] h-[85vh] hidden lg:flex flex-col gap-3">
                <Link href="/profile">
                    <div
                        className={`${componentsBg} w-full flex items-center justify-between p-4 rounded-xl shadow-custom`}
                    >
                        <div className="flex items-center gap-4">
                            <Avatar size="md" name="Gemmuel" src="/tzuyu.jpg" />
                            <div className="flex flex-col gap-0">
                                <h1 className="font-bold text-lg">
                                    Gemmuel Dela Pena
                                </h1>
                                <small
                                    className={
                                        isDarked
                                            ? "text-gray-300"
                                            : "text-black"
                                    }
                                >
                                    @gemmuel
                                </small>
                            </div>
                        </div>
                        <BsGear className="text-xl ml-3" />
                    </div>
                </Link>

                <div
                    className={`${componentsBg} text-lg w-full flex flex-col p-2 rounded-xl shadow-custom overflow-hidden`}
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
                    isDarked={isDarked}
                    componentsBg={componentsBg}
                />
                <div className="w-full flex flex-col gap-6 mt-6">
                    <Post isDarked={isDarked} componentsBg={componentsBg} />
                    <Post isDarked={isDarked} componentsBg={componentsBg} />
                    <Post isDarked={isDarked} componentsBg={componentsBg} />
                    <Post isDarked={isDarked} componentsBg={componentsBg} />
                    <Post isDarked={isDarked} componentsBg={componentsBg} />
                    <Post isDarked={isDarked} componentsBg={componentsBg} />
                </div>
            </div>

            {/* Right Side */}
            <div className="z-10 sticky top-[5rem] w-[20rem] h-[85vh] hidden lg:flex flex-col gap-3">
                <Birthdays isDarked={isDarked} componentsBg={componentsBg} />
                <Notifications
                    isDarked={isDarked}
                    componentsBg={componentsBg}
                />
            </div>
        </div>
    );
};

export default NewsFeedPage;
