import { FaHome } from "react-icons/fa";
import { BsPeopleFill, BsFillBellFill, BsPersonCircle } from "react-icons/bs";

const Nav = () => {
    return (
        <div className="fixed bottom-4 w-full flex justify-center items-center">
            <ul className="flex items-center justify-center px-4 py-2 gap-12 rounded-full bg-[#e9ecef] shadow-custom2">
                <li className="w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-full shadow-md p-2 bg-white hover:cursor-pointer hover:bg-gray-50 hover:shadow-custom">
                    <FaHome />
                </li>
                <li className="w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-full shadow-md p-2 bg-white hover:cursor-pointer hover:bg-gray-50 hover:shadow-custom">
                    <BsPeopleFill />
                </li>
                <li className="w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-full shadow-md p-2 bg-white hover:cursor-pointer hover:bg-gray-50 hover:shadow-custom">
                    <BsFillBellFill />
                </li>
                <li className="w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-full shadow-md p-2 bg-white hover:cursor-pointer hover:bg-gray-50 hover:shadow-custom">
                    <BsPersonCircle />
                </li>
            </ul>
        </div>
    );
};

export default Nav;
