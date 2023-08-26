"use client";
import Link from "next/link";
import { Button, HStack, Image } from "@chakra-ui/react";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/form/RegisterForm";

const RegisterPage = () => {
    return (
        <>
            <div className="relative w-full h-screen flex justify-center items-center">
                <nav className="absolute top-0 w-full lg:w-[90%] 2xl:w-[70%] flex items-center justify-between px-4 lg:px-12 py-3 lg:py-4 2xl:py-8">
                    <Link href="/">
                        <h1 className="text-xl lg:text-4xl font-extrabold text-blue-600">
                            Vibely
                        </h1>
                    </Link>
                    <HStack gap={4}>
                        <p className="text-sm lg:text-base">Register</p>
                        <Link href="/login" className="text-xl font-semibold">
                            <Button
                                colorScheme="blue"
                                size={{ base: "sm", lg: "md" }}
                            >
                                Login
                            </Button>
                        </Link>
                    </HStack>
                </nav>

                <div className="w-[30rem] lg:w-[60rem] h-fit lg:h-[40rem] m-4 flex bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="w-[45%] hidden lg:flex flex-col items-center justify-center bg-blue-500">
                        <Image src="/register-logo.svg" alt="Logo" />
                        <p className="text-white font-semibold text-center px-4">
                            Enter your personal details and start journey with
                            us
                        </p>
                    </div>
                    <div className="w-full lg:w-[55%] flex flex-col items-center justify-center p-4 lg:p-8">
                        <h1 className="text-xl lg:text-3xl text-center font-bold mb-4">
                            Create a Vibely account
                        </h1>
                        <p className="text-sm lg:text-base text-center px-4">
                            Join our exclusive Social Media Platform and connect
                            with a vibrant community!
                        </p>
                        <RegisterForm />
                        <p className="w-full flex justify-center gap-1 mt-4 text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-800">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default RegisterPage;
