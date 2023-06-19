"use client";

import { Button, HStack, VStack } from "@chakra-ui/react";
import Post from "../components/Post";
import { FaShare } from "react-icons/fa";

const ProfilePage = () => {
    return (
        <div className="relative w-full h-[80rem] flex justify-center gap-10 p-8">
            <div className="sticky top-[6.6rem] w-[25rem] h-[60%] flex flex-col items-center rounded-lg p-6 bg-[#242850]">
                <img
                    src="/tzuyu.jpg"
                    alt=""
                    className="w-[11rem] rounded-full"
                />
                <h1 className="text-xl font-bold mt-2">Gemmuel Dela Pena</h1>
                <HStack gap={7} mt={2}>
                    <div className="flex flex-col items-center">
                        <p className="text-lg font-bold">56</p>
                        <p className="text-sm text-gray-400">Following</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-lg font-bold">5183</p>
                        <p className="text-sm text-gray-400">Followers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-lg font-bold">84.7K</p>
                        <p className="text-sm text-gray-400">Likes</p>
                    </div>
                </HStack>

                <HStack mt={3}>
                    <Button size="sm" colorScheme="facebook">
                        Edit Profile
                    </Button>
                    <Button size="sm" colorScheme="facebook">
                        Add Friend
                    </Button>
                    {/* <Button size="sm" colorScheme="facebook">
                        <FaShare fontSize="16px" />
                    </Button> */}
                </HStack>
            </div>
            <div className="w-[40rem] h-full flex flex-col items-center gap-2">
                <h1 className="w-full text-2xl font-bold mb-2">Timeline</h1>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    );
};

export default ProfilePage;
