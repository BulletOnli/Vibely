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
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[60rem] h-[40rem] flex bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="w-[45%] flex flex-col items-center justify-center bg-teal-500">
                    <img src="/register-logo.svg" alt="Logo" />
                    <p className="text-white font-semibold text-center px-4">
                        Enter your personal details and start journey with us
                    </p>
                </div>
                <div className="w-[55%] flex flex-col items-center justify-center p-8">
                    <h1 className="text-3xl font-bold mb-4">
                        Create your account
                    </h1>
                    <p className="text-center px-4">
                        Join our exclusive Social Media Platform and connect
                        with a vibrant community!
                    </p>
                    <FormControl as="form" mt={4}>
                        <HStack mt={2}>
                            <Input
                                placeholder="First Name"
                                autoComplete="off"
                            />
                            <Input placeholder="Last Name" autoComplete="off" />
                        </HStack>
                        <HStack mt={2}>
                            <Input placeholder="Gender" autoComplete="off" />
                            <Input
                                placeholder="Birthday"
                                autoComplete="off"
                                type="date"
                            />
                        </HStack>
                        <VStack mt={4}>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <BsFillPersonFill className="text-gray-500 text-lg" />
                                </InputLeftElement>
                                <Input
                                    placeholder="Username"
                                    autoComplete="off"
                                />
                            </InputGroup>

                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <BsShieldLockFill className="text-gray-500 text-lg" />
                                </InputLeftElement>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                />
                            </InputGroup>

                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <BsShieldLockFill className="text-gray-500 text-lg" />
                                </InputLeftElement>
                                <Input
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </InputGroup>
                        </VStack>
                        <Button colorScheme="teal" w="full" mt={4}>
                            Register
                        </Button>
                    </FormControl>
                    <p className="w-full flex justify-center gap-1 mt-4 text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-800">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;