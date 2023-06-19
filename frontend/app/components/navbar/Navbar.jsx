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

const Navbar = () => {
    return (
        <div className="sticky z-50 top-0 w-full bg-[#242850] flex items-center justify-between px-8 py-4 rounded-bl-3xl rounded-br-3xl shadow-custom">
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
                        <Input placeholder="Search" rounded="full" />
                    </InputGroup>
                </FormControl>
                <Icon as={BsFillMoonStarsFill} boxSize={5} mx={3} />
            </HStack>
        </div>
    );
};

export default Navbar;
