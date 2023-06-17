import {
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
    return (
        <div className="sticky z-50 top-0 w-full flex items-center justify-between px-8 py-4 bg-white rounded-bl-3xl rounded-br-3xl shadow-custom">
            <div className="w-full flex items-center gap-2">
                <h1 className="text-2xl font-bold mr-12">Logo</h1>
            </div>

            <FormControl as="form" w="sm">
                <InputGroup>
                    <InputLeftElement children={<AiOutlineSearch />} />
                    <Input placeholder="Search" rounded="full" />
                </InputGroup>
            </FormControl>
        </div>
    );
};

export default Navbar;
