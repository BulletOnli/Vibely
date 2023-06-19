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
import { BsFillMoonStarsFill } from "react-icons/bs";

import { useThemeStore } from "@/app/store/themeStore";

const Navbar = () => {
    const { toggleTheme, isDarked } = useThemeStore();
    const darkMode = isDarked
        ? "bg-[#242850] text-[#f5f5f5]"
        : "bg-white text-black";

    return (
        <div
            className={`${darkMode} sticky z-50 top-0 w-full flex items-center justify-between px-8 py-4 rounded-bl-3xl rounded-br-3xl shadow-custom`}
        >
            <div className="w-full flex items-center gap-2">
                <Link href="/">
                    <h1 className="text-2xl font-bold">Logo</h1>
                </Link>
            </div>

            <HStack>
                <FormControl as="form" w={{ sm: "xs" }}>
                    <InputGroup>
                        <InputLeftElement
                            children={
                                <AiOutlineSearch
                                    fontSize={20}
                                    color="#9CA3AF"
                                />
                            }
                        />
                        <Input
                            placeholder="Search"
                            rounded="full"
                            autoComplete="off"
                        />
                    </InputGroup>
                </FormControl>
                <Icon
                    as={BsFillMoonStarsFill}
                    boxSize={5}
                    mx={3}
                    onClick={toggleTheme}
                />
            </HStack>
        </div>
    );
};

export default Navbar;
