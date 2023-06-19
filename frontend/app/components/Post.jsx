import { Avatar, Button, HStack, Text } from "@chakra-ui/react";
import { FaShare } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandThumbsDown } from "react-icons/bs";
import { useThemeStore } from "../store/themeStore";

const Post = () => {
    const { isDarked } = useThemeStore();
    const darkMode = isDarked
        ? "bg-[#242850] text-[#f5f5f5]"
        : "bg-white text-black";

    return (
        <div
            className={`${darkMode} relative w-full h-[20rem] lg:h-[25rem] flex flex-col items-center p-6 bg-[#242850] rounded-xl shadow-md`}
        >
            <div className="w-full flex items-center justify-between gap-4">
                <HStack>
                    <Avatar size="sm" name="Gemmuel" />
                    <div className="flex flex-col">
                        <h1 className="font-semibold">Gemmuel Dela Pena</h1>
                        <small className="text-xs text-[#5F6892]">
                            3:14 PM • 5/17/23
                        </small>
                    </div>
                </HStack>
                <Button
                    size="xs"
                    variant="outline"
                    color={isDarked ? "white" : "black"}
                    _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                >
                    Follow
                </Button>
            </div>
            <div className="w-full h-full flex justify-center items-center text-center p-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
                suscipit officia corrupti quae praesentium quam quibusdam
                doloremque facilis laborum qui!
            </div>
            <div className="w-full flex items-center justify-between">
                <HStack>
                    <Button
                        size="sm"
                        variant="outline"
                        color={isDarked ? "white" : "black"}
                        _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                    >
                        <AiOutlineHeart fontSize={20} />
                        <Text mx={1}>13</Text>
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        color={isDarked ? "white" : "black"}
                        _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                    >
                        <BsHandThumbsDown fontSize={18} />
                        <Text mx={1}>1</Text>
                    </Button>
                </HStack>
                <Button
                    size="sm"
                    leftIcon={<FaShare />}
                    colorScheme="gray"
                    variant="outline"
                    color={isDarked ? "white" : "black"}
                    _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                >
                    Repost
                </Button>
            </div>
        </div>
    );
};

export default Post;
