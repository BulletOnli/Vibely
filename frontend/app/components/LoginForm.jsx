import {
    Button,
    Checkbox,
    FormControl,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
} from "@chakra-ui/react";
import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";

const LoginForm = () => {
    return (
        <FormControl as="form" mt={6}>
            <InputGroup mt={2}>
                <InputLeftElement pointerEvents="none">
                    <BsFillPersonFill className="text-gray-500 text-lg" />
                </InputLeftElement>
                <Input placeholder="Username" autoComplete="off" />
            </InputGroup>

            <InputGroup mt={2}>
                <InputLeftElement pointerEvents="none">
                    <BsShieldLockFill className="text-gray-500 text-lg" />
                </InputLeftElement>
                <Input type="password" placeholder="Password" />
            </InputGroup>

            <HStack w="full" my={3}>
                <Checkbox size="sm">Remember me</Checkbox>
                <Spacer />
                {/* <p className="text-[13px] text-blue-800">Forgot Password?</p> */}
            </HStack>
            <Button colorScheme="telegram" w="full">
                Log in
            </Button>
        </FormControl>
    );
};

export default LoginForm;
