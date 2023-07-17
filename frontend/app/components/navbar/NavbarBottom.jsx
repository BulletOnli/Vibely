import { FaHome } from "react-icons/fa";
import {
    BsPeopleFill,
    BsFillBellFill,
    BsPersonCircle,
    BsFillChatFill,
} from "react-icons/bs";
import Nav from "./Nav";
import { useThemeStore } from "@/app/zustandStore/themeStore";
import { useDisclosure } from "@chakra-ui/react";
import NotificationDrawer from "../modal/NotificationDrawer";
import { useUserStore } from "@/app/zustandStore/userStore";

const NavbarBottom = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isDarked } = useThemeStore();
    const bg = isDarked
        ? "bg-[#282E54] text-[#f5f5f5]"
        : "bg-[#E9ECEF] text-black";

    const { currentAccount } = useUserStore();

    return (
        <>
            <div className="fixed bottom-3 z-20 w-full flex justify-center items-center">
                <div
                    className={`${bg} flex items-center justify-center px-4 py-2 gap-4 lg:gap-10 rounded-full shadow-custom2`}
                >
                    <Nav path="/" icon={<FaHome />} />
                    <Nav path="/chat" icon={<BsFillChatFill />} />
                    <Nav
                        path={`/${currentAccount?.username}`}
                        icon={<BsPersonCircle />}
                    />
                    <div className="flex lg:hidden " onClick={onOpen}>
                        <Nav path="#" icon={<BsFillBellFill />} />
                    </div>
                </div>
            </div>

            <NotificationDrawer isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default NavbarBottom;
