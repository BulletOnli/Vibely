"use client";
import Link from "next/link";
import {
    Button,
    Spacer,
    VStack,
    Avatar,
    HStack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { FaSignOutAlt, FaStore } from "react-icons/fa";
import {
    BsFillGearFill,
    BsGear,
    BsFillPersonFill,
    BsBookmarksFill,
} from "react-icons/bs";
import { MdHelp } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";

import CreatePostTab from "./components/CreatePostTab";
import Post from "./components/Post";
import Notifications from "./components/Notifcations";
import { useThemeStore } from "./store/themeStore";
import Birthdays from "./components/Birthdays";

const NewsFeedPage = () => {
    const { isDarked } = useThemeStore();
    const darkMode = isDarked
        ? "bg-[#242850] text-[#f5f5f5]"
        : "bg-white text-black";
    const hoverColor = isDarked ? "hover:bg-[#282E54]" : "hover:bg-gray-100";

    return (
        <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-8 p-6">
            {/* Left Side */}
            <div className="sticky top-[6rem] z-50 w-[22rem] h-[85vh] hidden lg:flex flex-col gap-3">
                <Link href="/profile">
                    <div
                        className={`${darkMode} w-full flex items-center justify-between p-4 rounded-xl shadow-custom`}
                    >
                        <div className="flex items-center gap-4">
                            <Avatar size="md" name="Gemmuel" />
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
                                    Nueva Ecija, Philippines
                                </small>
                            </div>
                        </div>
                        <BsGear className="text-xl ml-3" />
                    </div>
                </Link>

                <div
                    className={`${darkMode} text-lg w-full flex flex-col p-2 rounded-xl shadow-custom overflow-hidden`}
                >
                    <HStack
                        p={2}
                        rounded="md"
                        _hover={{ bg: isDarked ? "[#383d69]" : "gray.200" }}
                        cursor="pointer"
                    >
                        <BsFillPersonFill size={20} />
                        <Text fontWeight="semibold">Friends</Text>
                    </HStack>
                    <HStack
                        p={2}
                        rounded="md"
                        _hover={{ bg: isDarked ? "[#383d69]" : "gray.200" }}
                        cursor="pointer"
                    >
                        <HiUserGroup size={20} />
                        <Text fontWeight="semibold">Community</Text>
                    </HStack>
                    <HStack
                        p={2}
                        rounded="md"
                        _hover={{ bg: isDarked ? "[#383d69]" : "gray.200" }}
                        cursor="pointer"
                    >
                        <BsBookmarksFill size={20} />
                        <Text fontWeight="semibold">Saved</Text>
                    </HStack>
                    <HStack
                        p={2}
                        rounded="md"
                        _hover={{ bg: isDarked ? "[#383d69]" : "gray.200" }}
                        cursor="pointer"
                    >
                        <FaStore size={20} />
                        <Text fontWeight="semibold">Marketplace</Text>
                    </HStack>
                </div>
            </div>

            {/* Middle  */}
            <div className="w-[16rem] lg:w-[40rem] flex flex-col items-center ">
                <CreatePostTab />
                <div className="w-full flex flex-col gap-6 mt-6">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>

            {/* Right Side */}
            <div className="z-50 sticky top-[6rem] w-[20rem] h-[85vh] hidden lg:flex flex-col gap-3">
                <Birthdays />
                <Notifications />
                <VStack gap={2}>
                    <p
                        className={`${darkMode}  ${hoverColor} font-semibold w-full flex items-center justify-center gap-1 text-center p-2 rounded-lg shadow-custom cursor-pointer`}
                    >
                        <BsFillGearFill />
                        Settings and Privacy
                    </p>
                    <p
                        className={`${darkMode} ${hoverColor} font-semibold w-full flex items-center justify-center gap-1 text-center p-2 rounded-lg shadow-custom cursor-pointer`}
                    >
                        <MdHelp />
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
