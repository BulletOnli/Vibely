import CreatePostTab from "./CreatePostTab";
import Post from "./Post";

const Feed = () => {
    return (
        <div className="w-[40rem] flex flex-col items-center">
            <CreatePostTab />

            <div className="w-full flex flex-col gap-6 mt-8">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    );
};

export default Feed;
