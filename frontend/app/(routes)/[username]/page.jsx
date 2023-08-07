"use client";
import { Button } from "@chakra-ui/react";
import { useThemeStore } from "@/lib/zustandStore/themeStore";
import Post from "@/components/post/Post";
import ProfileInfo from "@/components/profile/ProfileInfo";
import Banner from "@/components/profile/Banner";

import useSWR from "swr";
import { getRequest } from "@/lib/utils/fetcher";
import { memo, useState } from "react";
import PostSkeleton from "@/components/post/PostSkeleton";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import { useUserStore } from "@/lib/zustandStore/userStore";

const ProfilePage = memo(({ params }) => {
    const { isDarked } = useThemeStore();
    const componentsBg = isDarked ? "bg-[#242850]" : "bg-white";
    const { currentAccount } = useUserStore();
    const [postLimit, setPostLimit] = useState(10);

    const userProfileSWR = useSWR(
        `/user?username=${params.username}`,
        getRequest
    );

    const allPostSWR = useSWR(
        `/post/all?id=${userProfileSWR?.data?.key}`,
        getRequest
    );

    const isOtherProfile = params.username !== currentAccount?.username;

    if (
        !userProfileSWR?.data ||
        (Object.keys(userProfileSWR?.data).length === 0 && isOtherProfile)
    ) {
        if (userProfileSWR?.isLoading) {
            return <LoadingPage />;
        }
        return <ErrorPage />;
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center p-6">
            {/* Banner */}
            <Banner
                userData={userProfileSWR?.data}
                isOtherProfile={isOtherProfile}
            />
            <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-6">
                <ProfileInfo
                    userData={userProfileSWR?.data}
                    componentsBg={componentsBg}
                    params={params}
                    isOtherProfile={isOtherProfile}
                />

                <div className="w-[18rem] lg:w-[40rem] h-full flex flex-col items-center lg:mt-5">
                    <h1 className="w-full text-2xl font-bold mb-4 ">
                        Vibely Timeline
                    </h1>
                    <div className="w-full flex flex-col items-center gap-4 mb-[5rem]">
                        {allPostSWR?.isLoading && (
                            <>
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                            </>
                        )}
                        {allPostSWR?.data?.slice(0, postLimit).map((post) => (
                            <Post
                                post={post}
                                isDarked={isDarked}
                                componentsBg={componentsBg}
                                key={post?.key}
                                mutate={allPostSWR?.mutate}
                            />
                        ))}
                        {postLimit <= allPostSWR?.data?.length ? (
                            <Button
                                onClick={() => setPostLimit((prev) => prev + 5)}
                            >
                                Load more...
                            </Button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfilePage;
