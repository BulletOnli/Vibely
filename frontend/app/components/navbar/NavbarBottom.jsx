import { FaHome } from "react-icons/fa";
import { BsPeopleFill, BsFillBellFill, BsPersonCircle } from "react-icons/bs";

import Nav from "./Nav";

const NavbarBottom = () => {
    return (
        <div className="fixed bottom-5 z-20 w-full flex justify-center items-center">
            <ul className="flex items-center justify-center px-4 py-2 gap-10 rounded-full bg-[#282E54] shadow-custom2">
                <Nav path="/" icon={<FaHome />} />
                <Nav path="#" icon={<BsPeopleFill />} />
                <Nav path="#" icon={<BsFillBellFill />} />
                <Nav path="/profile" icon={<BsPersonCircle />} />
            </ul>
        </div>
    );
};

export default NavbarBottom;
