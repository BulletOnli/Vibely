import { Avatar, useDisclosure } from "@chakra-ui/react";
import { FiCamera } from "react-icons/fi";
import UploadProfileModal from "../modal/UploadProfileModal";

const ProfilePic = ({ isOtherProfile, firstName }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Avatar
                position="relative"
                size="2xl"
                mt="-20"
                border="2px"
                name={firstName}
                // src="/tzuyu.jpg"
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

            <UploadProfileModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default ProfilePic;
