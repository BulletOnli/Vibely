"use client";
import Link from "next/link";
import LoginForm from "../components/LoginForm";

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
                    <LoginForm />
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
