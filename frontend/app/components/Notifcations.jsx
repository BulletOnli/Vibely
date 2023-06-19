import { Avatar } from "@chakra-ui/react";
import { useThemeStore } from "../store/themeStore";

const Notifications = () => {
    const { isDarked } = useThemeStore();
    const darkMode = isDarked ? "bg-[#242850] text-[#adb5bd]" : "bg-white";
    const hoverColor = isDarked ? "hover:bg-[#282E54]" : "hover:bg-gray-100";

    return (
        <div
            className={`${darkMode} w-full h-full flex flex-col items-center p-4 rounded-xl shadow-custom`}
        >
            <p className="text-xl w-full text-start font-semibold mb-2">
                Notifications
            </p>

            <div
                className={`${hoverColor} w-full flex items-center gap-2 p-2 rounded-md cursor-pointer`}
            >
                <Avatar size="sm" />
                <h1 className="text-sm font-semibold ">
                    Gemmuel Dela Pena upload a new post.
                </h1>
            </div>
            <div
                className={`${hoverColor} w-full flex items-center gap-2 p-2 rounded-md cursor-pointer`}
            >
                <Avatar size="sm" />
                <h1 className="text-sm font-semibold ">
                    Clark post an update.
                </h1>
            </div>
        </div>
    );
};

export default Notifications;
