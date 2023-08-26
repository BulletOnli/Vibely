"use client";
import Link from "next/link";
import { HStack, Button, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { checkAccessToken } from "@/lib/utils/accessToken";
import LoginForm from "@/components/form/LoginForm";
import Footer from "@/components/Footer";

const LoginPage = () => {
    useEffect(() => {
        if (checkAccessToken()) {
            redirect("/");
        }
    }, []);

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <nav className="absolute top-0 w-full lg:w-[90%] 2xl:w-[70%] flex items-center justify-between px-4 lg:px-12 py-3 lg:py-4 2xl:py-8">
                    <Link href="/">
                        <h1 className="text-xl lg:text-4xl font-extrabold text-blue-600">
                            Vibely
                        </h1>
                    </Link>
                    <HStack gap={4}>
                        <p className="text-sm lg:text-base">Login</p>
                        <Link
                            href="/register"
                            className="text-xl font-semibold"
                        >
                            <Button
                                colorScheme="blue"
                                size={{ base: "sm", lg: "md" }}
                            >
                                Register
                            </Button>
                        </Link>
                    </HStack>
                </nav>

                <div className="w-[30rem] lg:w-[60rem] h-fit lg:h-[40rem] m-4 flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="w-[45%] hidden lg:flex flex-col items-center justify-center bg-blue-500">
                        <Image src="/login-logo.svg" alt="Logo" />
                        <p className="text-white font-semibold text-center px-4 ">
                            To keep connected with us please login with your
                            personal info
                        </p>
                    </div>
                    <div className="lg:w-[55%] flex flex-col items-center justify-center p-6 lg:p-8">
                        <h1 className="text-xl lg:text-3xl font-bold mb-4">
                            Welcome to Vibely!
                        </h1>
                        <p className="text-sm lg:text-base text-center px-4">
                            Please log in to access your account and connect
                            with our vibrant community.
                        </p>
                        <LoginForm />
                        <p className="w-full flex justify-center gap-1 mt-4 text-xs lg:text-sm">
                            Dont have an account?
                            <Link href="/register" className="text-blue-800">
                                Get started
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;
