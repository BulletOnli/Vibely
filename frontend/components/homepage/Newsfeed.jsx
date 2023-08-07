"use client";
import { Box, Button, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import Post from "../post/Post";
import { useState } from "react";
import { useThemeStore } from "@/lib/zustandStore/themeStore";
import PostSkeleton from "../post/PostSkeleton";

const Newsfeed = ({ allPostSWR }) => {
    const { isDarked, toggleTheme } = useThemeStore();
    const componentsBg = isDarked
        ? "bg-[#242850] text-[#f5f5f5]"
        : "bg-white text-black";
    const [postLimit, setPostLimit] = useState(5);

    return (
        <div className="w-full flex flex-col gap-4 mt-6 mb-[5rem] ">
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
                <Button onClick={() => setPostLimit((prev) => prev + 5)}>
                    Load more...
                </Button>
            ) : (
                ""
            )}
        </div>
    );
};

export default Newsfeed;
