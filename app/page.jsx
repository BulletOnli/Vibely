"use client";

import CreatePost from "./components/CreatePost";
import FriendsList from "./components/FriendsList";
import Post from "./components/Post";
import ProfileTab from "./components/ProfileTab";

const NewsFeedPage = () => {
    return (
        <div className="relative w-full flex justify-between gap-8 p-6">
            <div className="sticky top-[6.6rem] w-[22rem] h-full flex flex-col ">
                <ProfileTab />

                <FriendsList />
            </div>
            <div className="w-[40rem] flex flex-col items-center">
                <CreatePost />

                <div className="w-full flex flex-col gap-6 mt-8">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
            <div className="sticky top-[6.6rem] w-[22rem] h-full flex flex-col gap-3">
                <div className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-custom">
                    idk
                </div>
                <div className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-custom">
                    idk
                </div>
                <div className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-custom">
                    idk
                </div>
                <div className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-custom">
                    idk
                </div>
            </div>
        </div>
    );
};

export default NewsFeedPage;
