import { Avatar } from "@chakra-ui/react";
import { useThemeStore } from "../store/themeStore";

const Birthdays = () => {
    const { isDarked } = useThemeStore();
    const darkMode = isDarked ? "bg-[#242850] text-[#adb5bd]" : "bg-white";
    const hoverColor = isDarked ? "hover:bg-[#282E54]" : "hover:bg-gray-100";

    return (
        <div
            className={`${darkMode} w-full flex flex-col items-center p-4 rounded-xl shadow-custom`}
        >
            <h1
                className={`${
                    isDarked ? "text-[#f5f5f5]" : "text-black"
                } text-lg w-full text-start font-bold mb-2`}
            >
                Upcoming Birthdays
            </h1>

            <p
                className={`${hoverColor} text-gray-600 w-full text-center font-semibold p-2 rounded-md cursor-pointer`}
            >
                Gemmuel Dela Pena
            </p>
        </div>
    );
};

export default Birthdays;
