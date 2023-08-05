"use client";
import Link from "next/link";
import LoginForm from "../../../components/form/LoginForm";
import Footer from "../../../components/Footer";
import { HStack, Button, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { checkAccessToken } from "../../utils/accessToken";
import { redirect } from "next/navigation";

const LoginPage = () => {
    useEffect(() => {
        if (checkAccessToken()) {
            redirect("/");
        }
    }, []);

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <nav className="absolute top-0 lg:w-[90%] 2xl:w-[70%] flex items-center justify-between px-4 lg:px-12 py-3 lg:py-4 2xl:py-8">
                    <Link href="/">
                        <h1 className="text-4xl font-extrabold text-blue-600">
                            Vibely
                        </h1>
                    </Link>
                    <HStack gap={4}>
                        <p>Login</p>
                        <Link
                            href="/register"
                            className="text-xl font-semibold"
                        >
                            <Button colorScheme="blue">Register</Button>
                        </Link>
                    </HStack>
                </nav>
                <div className="w-[60rem] h-[40rem] flex bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="w-[45%] flex flex-col items-center justify-center bg-blue-500">
                        <Image src="/login-logo.svg" alt="Logo" />
                        <p className="text-white font-semibold text-center px-4 ">
                            To keep connected with us please login with your
                            personal info
                        </p>
                    </div>
                    <div className="w-[55%] flex flex-col items-center justify-center p-8">
                        <h1 className="text-3xl font-bold mb-4">
                            Welcome to Vibely!
                        </h1>
                        <p className="text-center px-4">
                            Please log in to access your account and connect
                            with our vibrant community.
                        </p>
                        <LoginForm />
                        <p className="w-full flex justify-center gap-1 mt-4 text-sm">
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
