import { Avatar, useDisclosure } from "@chakra-ui/react";
import { FiCamera } from "react-icons/fi";
import UploadProfileModal from "../modal/UploadProfileModal";
import useSWR from "swr";
import { getRequest } from "@/lib/utils/fetcher";

const ProfilePic = ({ isOtherProfile, userData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const hasProfile = useSWR(`/user/cover/${userData?.key}`, getRequest);
    const profilePic = hasProfile?.data
        ? `https://vibelybackend-1-a9532540.deta.app/user/profile/pic/${userData?.key}`
        : "";

    return (
        <>
            <Avatar
                position="relative"
                size="2xl"
                mt="-20"
                border="2px"
                name={userData?.firstName}
                src={profilePic}
            >
                {!isOtherProfile && (
                    <div className="absolute bottom-0 right-2 w-7 h-7 flex items-center justify-center  border-2 bg-[#DAE0E6] border-white rounded-full cursor-pointer">
                        <FiCamera
                            className="text-base text-black"
                            onClick={onOpen}
                        />
                    </div>
                )}
            </Avatar>

            <UploadProfileModal
                profilePic={profilePic}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default ProfilePic;
