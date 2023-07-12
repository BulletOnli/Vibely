"use client";
import {
    FormControl,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Text,
    useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import {
    BsFillMoonStarsFill,
    BsSunFill,
    BsFillPersonFill,
} from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { FiHelpCircle } from "react-icons/fi";
import {
    MdOutlineLogout,
    MdOutlineListAlt,
    MdOutlineEmail,
} from "react-icons/md";

import { useThemeStore } from "@/app/zustandStore/themeStore";
import { useUserStore } from "@/app/zustandStore/userStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const toast = useToast();
    const router = useRouter();
    const { toggleTheme, isDarked } = useThemeStore();
    const darkMode = isDarked
        ? "bg-[#242850] text-[#f5f5f5]"
        : "bg-white text-black";

    const { getCurrentAccount } = useUserStore();

    const handleLogout = () => {
        localStorage.removeItem("vibelyToken");
        router.push("/login");
        toast({
            title: "Successfully logout!",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 2000,
        });
    };

    useEffect(() => {
        getCurrentAccount();
    }, []);

    return (
        <div
            className={`${darkMode} sticky z-50 top-0 w-full flex items-center justify-between px-4 lg:px-12 py-2 rounded-bl-[2rem] rounded-br-[2rem] shadow-md`}
        >
            <Link href="/">
                <h1
                    className={`${
                        isDarked ? "text-white" : "text-blue-600"
                    } text-xl  lg:text-2xl font-extrabold tracking-wide mr-4`}
                >
                    Vibely
                </h1>
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
                        textAlign="center"
                        bg={isDarked ? "#1A1F40" : "#F0F2F5"}
                        borderWidth={0}
                    />
                </InputGroup>
            </FormControl>

            <HStack>
                {/* <Icon as={BsFillBellFill} boxSize={5} mx={3} cursor="pointer" /> */}
                <Icon
                    as={isDarked ? BsSunFill : BsFillMoonStarsFill}
                    boxSize={5}
                    mx={3}
                    onClick={toggleTheme}
                    cursor="pointer"
                />
                <Menu>
                    <MenuButton
                        as={Button}
                        size={{ sm: "xs", lg: "sm" }}
                        rightIcon={<BiChevronDown />}
                        variant="outline"
                        color={isDarked ? "white" : "black"}
                        _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                        _active={{ bg: isDarked ? "#242850" : "white" }}
                    >
                        <BsFillPersonFill size={20} />
                    </MenuButton>
                    <MenuList bg={isDarked ? "#242850" : "white"}>
                        <MenuItem
                            icon={<MdOutlineEmail size={18} />}
                            bg={isDarked ? "#242850" : "white"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                        >
                            Feature Request
                        </MenuItem>
                        <MenuItem
                            icon={<MdOutlineListAlt size={18} />}
                            bg={isDarked ? "#242850" : "white"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                        >
                            Terms & Policies
                        </MenuItem>
                        <MenuItem
                            icon={<FiHelpCircle size={18} />}
                            bg={isDarked ? "#242850" : "white"}
                            _hover={{
                                bg: isDarked ? "#1A1F40" : "#E9ECEF",
                            }}
                        >
                            About us
                        </MenuItem>
                        <MenuItem
                            as={Text}
                            icon={<MdOutlineLogout size={18} />}
                            bg={isDarked ? "#242850" : "white"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                            onClick={handleLogout}
                        >
                            Log Out
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </div>
    );
};

export default Navbar;
