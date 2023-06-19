import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = ({ path, icon }) => {
    const pathname = usePathname();

    return (
        <Link href={`${path}`}>
            <li
                className={`${
                    pathname === path ? "activeNav" : ""
                } w-[40px] h-[40px] flex justify-center items-center text-2xl rounded-full shadow-md p-2 bg-[#454f7c] hover:bg-[#383d69] hover:shadow-custom`}
            >
                {icon}
            </li>
        </Link>
    );
};

export default Nav;
