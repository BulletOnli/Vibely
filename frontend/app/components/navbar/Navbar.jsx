import {
    FormControl,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";

import { useThemeStore } from "@/app/store/themeStore";

const Navbar = () => {
    const { toggleTheme, isDarked } = useThemeStore();
    const darkMode = isDarked
        ? "bg-[#242850] text-[#f5f5f5]"
        : "bg-white text-black";

    return (
        <div
            className={`${darkMode} sticky z-50 top-0 w-full flex items-center justify-between px-4 lg:px-8 py-3 rounded-bl-[2rem] rounded-br-[2rem] shadow-custom`}
        >
            <Link href="/">
                <h1 className="text-xl lg:text-2xl font-bold">Logo</h1>
            </Link>

            <FormControl as="form" w={{ sm: "xs", lg: "md" }}>
                <InputGroup>
                    <InputLeftElement
                        children={
                            <AiOutlineSearch fontSize={20} color="#9CA3AF" />
                        }
                    />
                    <Input
                        placeholder="Search for creators"
                        rounded="full"
                        autoComplete="off"
                        variant="outline"
                        textAlign="center"
                    />
                </InputGroup>
            </FormControl>

            <Icon
                as={isDarked ? BsSunFill : BsFillMoonStarsFill}
                boxSize={5}
                mx={3}
                onClick={toggleTheme}
                cursor="pointer"
            />
        </div>
    );
};

export default Navbar;
