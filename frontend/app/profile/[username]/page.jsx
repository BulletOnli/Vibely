"use client";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { useThemeStore } from "@/app/store/themeStore";
import Post from "@/app/components/Post";
import ProfileInfo from "@/app/components/profile/ProfileInfo";
import Banner from "@/app/components/profile/Banner";

const ProfilePage = ({ params }) => {
    const { isDarked } = useThemeStore();
    const componentsBg = isDarked ? "bg-[#242850]" : "bg-white";
    const isOtherProfile = params.username !== "gemmuel"; //my username

    return (
        <div className="w-full flex flex-col items-center justify-center p-6">
            {/* Banner */}
            <Banner isOtherProfile={isOtherProfile} />
            <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-6">
                <ProfileInfo
                    componentsBg={componentsBg}
                    params={params}
                    isOtherProfile={isOtherProfile}
                />

                <div className="w-[18rem] lg:w-[40rem] h-full flex flex-col items-center lg:mt-5">
                    <h1 className="w-full text-2xl font-bold mb-4">
                        Vibely Timeline
                    </h1>
                    <div className="w-full flex flex-col items-center gap-4">
                        <Post isDarked={isDarked} componentsBg={componentsBg} />
                        <Post isDarked={isDarked} componentsBg={componentsBg} />
                        <Post isDarked={isDarked} componentsBg={componentsBg} />
                        <Post isDarked={isDarked} componentsBg={componentsBg} />
                        <Post isDarked={isDarked} componentsBg={componentsBg} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
