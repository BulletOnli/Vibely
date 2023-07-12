import { useThemeStore } from "@/app/zustandStore/themeStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = ({ path, icon }) => {
    const pathname = usePathname();
    const { isDarked } = useThemeStore();
    const hover = isDarked ? "hover:bg-[#383d69]" : "hover:bg-gray-300";

    let bg;
    if (pathname === path) {
        //current nav
        if (isDarked) {
            bg = "bg-none shadow-none text-blue-600"; //dark mode
        } else {
            bg = "bg-none shadow-none text-blue-600"; //light mode
        }
    } else {
        //other nav
        if (isDarked) {
            bg = "bg-[#454f7c]"; //dark mode
        } else {
            bg = "bg-white"; //light mode
        }
    }

    return (
        <Link href={`${path}`}>
            <div
                className={`${bg} ${hover} w-[35px] h-[35px]  lg:w-[40px] lg:h-[40px] flex justify-center items-center text-2xl rounded-full shadow-md p-2 hover:shadow-custom`}
            >
                {icon}
            </div>
        </Link>
    );
};

export default Nav;
