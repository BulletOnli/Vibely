import { useThemeStore } from "@/app/store/themeStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = ({ path, icon }) => {
    const pathname = usePathname();
    const { isDarked } = useThemeStore();
    const hover = isDarked ? "hover:bg-[#383d69]" : "hover:bg-gray-300";

    const bg =
        pathname === path
            ? isDarked
                ? "bg-[#383d69]"
                : "bg-gray-300"
            : isDarked
            ? "bg-[#454f7c]"
            : "bg-gray-200";

    return (
        <Link href={`${path}`}>
            <li
                className={`${bg} ${hover} w-[40px] h-[40px] flex justify-center items-center text-2xl rounded-full shadow-md p-2 hover:shadow-custom`}
            >
                {icon}
            </li>
        </Link>
    );
};

export default Nav;
