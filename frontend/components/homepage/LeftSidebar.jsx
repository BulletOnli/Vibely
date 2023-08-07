import Link from "next/link";
import { Avatar, Button, HStack, Image, Text } from "@chakra-ui/react";
import { BsGear } from "react-icons/bs";
import FriendsList from "./FriendsList";
import { useUserStore } from "@/lib/zustandStore/userStore";
import { useThemeStore } from "@/lib/zustandStore/themeStore";

const LeftSidebar = () => {
    const { isDarked, toggleTheme } = useThemeStore();
    const componentsBg = isDarked
        ? "bg-[#242850] text-[#f5f5f5]"
        : "bg-white text-black";
    const { currentAccount, getCurrentAccount } = useUserStore();

    return (
        <div className="sticky top-[5rem] z-50 w-[22rem] h-[85vh] hidden lg:flex flex-col gap-3">
            <Link href={`/${currentAccount?.username}`}>
                <div
                    className={`${componentsBg} w-full flex items-center justify-between p-4 rounded-xl shadow-custom`}
                >
                    <div className="flex items-center gap-3">
                        <Avatar
                            size="md"
                            name={currentAccount?.firstName}
                            src={`https://vibelybackend-1-a9532540.deta.app/user/profile/pic/${currentAccount?.key}`}
                        />
                        <div className="flex flex-col gap-0">
                            <h1 className="font-bold text-lg">
                                {currentAccount?.firstName}{" "}
                                {currentAccount?.lastName}
                            </h1>
                            <small
                                className={
                                    isDarked ? "text-gray-300" : "text-black"
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
                    <Image
                        alt="icon img"
                        src="/friends-icon.png"
                        className="w-8"
                    />
                    <Text fontWeight="semibold">Friends</Text>
                </HStack>
                <HStack
                    p={2}
                    gap={3}
                    rounded="md"
                    _hover={{ bg: isDarked ? "#383d69" : "gray.200" }}
                    cursor="pointer"
                >
                    <Image
                        alt="icon img"
                        src="/group-icon.png"
                        className="w-8"
                    />
                    <Text fontWeight="semibold">Community</Text>
                </HStack>
                <HStack
                    p={2}
                    gap={3}
                    rounded="md"
                    _hover={{ bg: isDarked ? "#383d69" : "gray.200" }}
                    cursor="pointer"
                >
                    <Image
                        alt="icon img"
                        src="/bookmark-icon.png"
                        className="w-8"
                    />
                    <Text fontWeight="semibold">Saved</Text>
                </HStack>
                <HStack
                    p={2}
                    gap={3}
                    rounded="md"
                    _hover={{ bg: isDarked ? "#383d69" : "gray.200" }}
                    cursor="pointer"
                >
                    <Image
                        alt="icon img"
                        src="/store-icon.png"
                        className="w-8"
                    />
                    <Text fontWeight="semibold">Marketplace</Text>
                </HStack>
            </div>

            <FriendsList isDarked={isDarked} componentsBg={componentsBg} />
        </div>
    );
};

export default LeftSidebar;
