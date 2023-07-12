"use client";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { useThemeStore } from "@/app/zustandStore/themeStore";
import Post from "@/app/components/post/Post";
import ProfileInfo from "@/app/components/profile/ProfileInfo";
import Banner from "@/app/components/profile/Banner";

import useSWR from "swr";
import { getRequest } from "@/app/api/fetcher";

const ProfilePage = ({ params }) => {
    const { isDarked } = useThemeStore();
    const componentsBg = isDarked ? "bg-[#242850]" : "bg-white";

    const userProfileSWR = useSWR(
        `/user?username=${params.username}`,
        getRequest
    );
    const allPostSWR = useSWR(
        `/post/all?id=${userProfileSWR?.data?.key}`,
        getRequest
    );

    const isOtherProfile = params.username !== "gemmuel"; //account username

    return (
        <div className="w-full min-h-screen flex flex-col items-center p-6">
            {/* Banner */}
            <Banner isOtherProfile={isOtherProfile} />
            <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-6">
                <ProfileInfo
                    data={userProfileSWR?.data}
                    componentsBg={componentsBg}
                    params={params}
                    isOtherProfile={isOtherProfile}
                />

                <div className="w-[18rem] lg:w-[40rem] h-full flex flex-col items-center lg:mt-5">
                    <h1 className="w-full text-2xl font-bold mb-4 ">
                        Vibely Timeline
                    </h1>
                    <div className="w-full flex flex-col items-center gap-4">
                        {allPostSWR?.data
                            ?.map((post) => (
                                <Post
                                    post={post}
                                    isDarked={isDarked}
                                    componentsBg={componentsBg}
                                    key={post?.key}
                                    mutate={allPostSWR?.mutate}
                                />
                            ))
                            .reverse()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
