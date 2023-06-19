"use client";
import Link from "next/link";
import { Button, Spacer, VStack, Avatar } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { BsFillGearFill, BsGear } from "react-icons/bs";

import CreatePostTab from "./components/CreatePostTab";
import Post from "./components/Post";
import Notifications from "./components/Notifcations";

const NewsFeedPage = () => {
    return (
        <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-8 p-6">
            <div className="sticky top-[6.6rem] z-50 w-[22rem] h-[85vh] hidden lg:flex flex-col">
                <Link href="/profile">
                    <div className="w-full flex items-center justify-between p-4 bg-[#242850] rounded-xl shadow-custom">
                        <div className="flex items-center gap-4">
                            <Avatar size="md" name="Gemmuel" />
                            <div className="flex flex-col gap-0">
                                <h1 className="font-bold text-lg">
                                    Gemmuel Dela Pena
                                </h1>
                                <small className="text-gray-300">
                                    Nueva Ecija, Philippines
                                </small>
                            </div>
                        </div>
                        <BsGear className="text-xl ml-3" />
                    </div>
                </Link>
            </div>

            <div className="w-[20rem] lg:w-[40rem] flex flex-col items-center">
                <CreatePostTab />
                <div className="w-full flex flex-col gap-6 mt-8">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>

            <div className="z-50 sticky top-[6.6rem] w-[20rem] h-[85vh] hidden lg:flex flex-col gap-3">
                <Notifications />
                <VStack gap={2}>
                    <p className="font-semibold w-full flex items-center justify-center gap-1 text-center p-2 bg-[#242850] rounded-lg shadow-custom hover:bg-[#282E54] cursor-pointer">
                        <BsFillGearFill />
                        Settings and Privacy
                    </p>
                    <p className="font-semibold w-full flex items-center justify-center gap-1 text-center p-2 bg-[#242850] rounded-lg shadow-custom hover:bg-[#282E54] cursor-pointer">
                        <FaSignOutAlt />
                        Help
                    </p>
                    <Button
                        rightIcon={<FaSignOutAlt />}
                        colorScheme="red"
                        w="full"
                    >
                        Log out
                    </Button>
                </VStack>
            </div>
        </div>
    );
};

export default NewsFeedPage;
