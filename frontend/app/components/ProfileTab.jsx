"use client";
import { Avatar } from "@chakra-ui/react";
import { BsGear } from "react-icons/bs";

const ProfileTab = () => {
    return (
        <div className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-custom">
            <div className="flex items-center gap-4">
                <Avatar size="md" name="Gemmuel" />
                <div className="flex flex-col gap-0">
                    <h1 className="font-bold text-lg">Gemmuel Dela Pena</h1>
                    <small>Nueva Ecija, Philippines</small>
                </div>
            </div>
            <BsGear className="text-xl ml-3" />
        </div>
    );
};

export default ProfileTab;
