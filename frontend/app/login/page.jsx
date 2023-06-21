"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Spacer,
    Text,
    VStack,
} from "@chakra-ui/react";

import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";

const RegisterPage = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[60rem] h-[40rem] flex bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="w-[45%] flex flex-col items-center justify-center bg-blue-500">
                    <img src="/login-logo.svg" alt="Logo" />
                    <p className="text-white font-semibold text-center px-4 mt-[-2rem]">
                        To keep connected with us please login with your
                        personal info
                    </p>
                </div>

                <div className="w-[55%] flex flex-col items-center justify-center p-8">
                    <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
                    <p className="text-center px-4">
                        Please log in to access your account and connect with
                        our vibrant community.
                    </p>
                    <FormControl as="form" mt={6}>
                        <InputGroup mt={2}>
                            <InputLeftElement pointerEvents="none">
                                <BsFillPersonFill className="text-gray-500 text-lg" />
                            </InputLeftElement>
                            <Input placeholder="Username" autoComplete="off" />
                        </InputGroup>

                        <InputGroup mt={4}>
                            <InputLeftElement pointerEvents="none">
                                <BsShieldLockFill className="text-gray-500 text-lg" />
                            </InputLeftElement>
                            <Input type="password" placeholder="Password" />
                        </InputGroup>

                        <HStack w="full" my={4}>
                            <Checkbox size="sm">Remember me</Checkbox>
                            <Spacer />
                            {/* <p className="text-[13px] text-blue-800">
                                Forgot Password?
                            </p> */}
                        </HStack>
                        <Button colorScheme="telegram" w="full">
                            Log in
                        </Button>
                    </FormControl>
                    <p className="w-full flex justify-center gap-1 mt-4 text-sm">
                        Don't have an account?
                        <Link href="/register" className="text-blue-800">
                            Get started
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
