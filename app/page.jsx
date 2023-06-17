"use client";
import Feed from "./components/Feed";
import FriendsList from "./components/FriendsList";
import Sidebar from "./components/Sidebar";

const NewsFeedPage = () => {
    return (
        <div className="relative w-full flex justify-between gap-8 p-6">
            <Sidebar />
            <Feed />
            <div className="sticky top-[6.6rem] w-[22rem] h-full flex flex-col gap-3">
                <p className="text-xl w-full text-start font-semibold mb-4">
                    Friends
                </p>
                <FriendsList />
            </div>
        </div>
    );
};

export default NewsFeedPage;
