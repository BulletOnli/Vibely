"use client";
import {
    Button,
    FormControl,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
} from "@chakra-ui/react";
import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";

const RegisterForm = () => {
    return (
        <FormControl as="form" mt={4}>
            <HStack mt={2}>
                <Input placeholder="First Name" autoComplete="off" />
                <Input placeholder="Last Name" autoComplete="off" />
            </HStack>
            <HStack mt={2}>
                <Input placeholder="Gender" autoComplete="off" />
                <Input placeholder="Birthday" autoComplete="off" type="date" />
            </HStack>
            <VStack mt={4}>
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <BsFillPersonFill className="text-gray-500 text-lg" />
                    </InputLeftElement>
                    <Input placeholder="Username" autoComplete="off" />
                </InputGroup>

                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <BsShieldLockFill className="text-gray-500 text-lg" />
                    </InputLeftElement>
                    <Input type="password" placeholder="Enter password" />
                </InputGroup>

                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <BsShieldLockFill className="text-gray-500 text-lg" />
                    </InputLeftElement>
                    <Input type="password" placeholder="Confirm Password" />
                </InputGroup>
            </VStack>
            <Button colorScheme="teal" w="full" mt={4}>
                Register
            </Button>
        </FormControl>
    );
};

export default RegisterForm;
