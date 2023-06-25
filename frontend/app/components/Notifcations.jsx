import { Avatar } from "@chakra-ui/react";

const Notifications = ({ isDarked, componentsBg }) => {
    const hoverColor = isDarked ? "hover:bg-[#282E54]" : "hover:bg-gray-100";

    return (
        <div
            className={`${componentsBg} w-full min-h-[50vh] flex flex-col items-center p-4 rounded-xl shadow-custom`}
        >
            <h1
                className={`${
                    isDarked ? "text-[#f5f5f5]" : "text-black"
                } text-lg w-full text-start font-semibold mb-2`}
            >
                Notifications
            </h1>

            <div
                className={`${hoverColor} w-full flex items-center gap-2 p-2 rounded-md cursor-pointer`}
            >
                <Avatar size="sm" />
                <p className="text-sm ">Gemmuel Dela Pena upload a new post.</p>
            </div>
            <div
                className={`${hoverColor} w-full flex items-center gap-2 p-2 rounded-md cursor-pointer`}
            >
                <Avatar size="sm" />
                <h1 className="text-sm ">Clark post an update.</h1>
            </div>
        </div>
    );
};

export default Notifications;
