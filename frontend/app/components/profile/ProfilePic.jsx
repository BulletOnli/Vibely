import { Avatar } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { FiCamera } from "react-icons/fi";

const ProfilePic = () => {
    const [previewImage, setPreviewImage] = useState("/tzuyu.jpg");

    const handleImgUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setPreviewImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Avatar
                position="relative"
                size="2xl"
                mt="-20"
                border="2px"
                src={previewImage}
            >
                <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-2 w-7 h-7 flex items-center justify-center  border-2 bg-[#DAE0E6] border-white rounded-full cursor-pointer"
                >
                    <FiCamera className="text-base text-black" />
                </label>
            </Avatar>
            <input
                onChange={handleImgUpload}
                type="file"
                accept="image/*"
                id="profile-upload"
                className="hidden"
            />
        </>
    );
};

export default ProfilePic;
