import { Avatar, Button, HStack, Text } from "@chakra-ui/react";
import { FaShare } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandThumbsDown } from "react-icons/bs";

const Post = () => {
    return (
        <div className="relative w-full h-[25rem] flex flex-col items-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-full  flex items-center gap-4">
                <Avatar size="sm" name="Gemmuel" />
                <div className="flex flex-col">
                    <h1 className="font-semibold">Gemmuel Dela Pena</h1>
                    <small className="text-xs">3:14 PM • 5/17/23</small>
                </div>
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
                        className="flex justify-center items-center rounded-full border"
                    >
                        <AiOutlineHeart fontSize={20} />
                        <Text mx={1}>1</Text>
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        className="flex justify-center items-center rounded-full border"
                    >
                        <BsHandThumbsDown fontSize={18} />
                        <Text mx={1}>1</Text>
                    </Button>
                </HStack>

                <Button
                    size="sm"
                    variant="outline"
                    className="flex justify-center items-center rounded-full border"
                >
                    <FaShare fontSize={18} />
                </Button>
                {/* <Button size="sm" leftIcon={<FaShare />} colorScheme="gray">
                    Repost
                </Button> */}
            </div>
        </div>
    );
};

export default Post;
