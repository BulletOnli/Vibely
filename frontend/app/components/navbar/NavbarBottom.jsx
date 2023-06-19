import { FaHome } from "react-icons/fa";
import { BsPeopleFill, BsFillBellFill, BsPersonCircle } from "react-icons/bs";

import Nav from "./Nav";
import { useThemeStore } from "@/app/store/themeStore";

const NavbarBottom = () => {
    const { isDarked } = useThemeStore();
    const darkMode = isDarked
        ? "bg-[#1A1F40] text-[#f5f5f5]"
        : "bg-white text-black";

    return (
        <div className="fixed bottom-5 z-20 w-full flex justify-center items-center">
            <ul
                className={`${darkMode} flex items-center justify-center px-4 py-2 gap-10 rounded-full shadow-custom2`}
            >
                <Nav path="/" icon={<FaHome />} />
                <Nav path="#" icon={<BsPeopleFill />} />
                <Nav path="#" icon={<BsFillBellFill />} />
                <Nav path="/profile" icon={<BsPersonCircle />} />
            </ul>
        </div>
    );
};

export default NavbarBottom;
