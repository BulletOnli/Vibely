import { Avatar } from "@chakra-ui/react";

const Notifications = () => {
    return (
        <div className="w-full h-full flex flex-col items-center p-4 bg-[#242850] rounded-xl shadow-custom">
            <p className="text-xl w-full text-start font-semibold mb-2">
                Notifications
            </p>

            <div className="w-full flex items-center gap-2 p-2 hover:bg-[#282E54] rounded-md cursor-pointer">
                <Avatar size="sm" />
                <h1 className="text-sm font-semibold text-[#adb5bd]">
                    Gemmuel Dela Pena upload a new post.
                </h1>
            </div>
            <div className="w-full flex items-center gap-2 p-2 hover:bg-[#282E54] rounded-md cursor-pointer">
                <Avatar size="sm" />
                <h1 className="text-sm font-semibold text-[#adb5bd]">
                    Clark post an update.
                </h1>
            </div>
        </div>
    );
};

export default Notifications;
