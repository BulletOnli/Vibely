import { Button } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";

const Banner = ({ isOtherProfile }) => {
    const [previewImage, setPreviewImage] = useState("/pcbg.png");

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
        <div
            style={{ backgroundImage: `url(${previewImage})` }}
            className={` relative w-full lg:w-[70rem] h-[10rem] lg:h-[20rem] bg-cover bg-center bg-no-repeat rounded-2xl shadow-custom`}
        >
            {!isOtherProfile && (
                <Button
                    size="sm"
                    leftIcon={<FiCamera />}
                    colorScheme="blackAlpha"
                    position="absolute"
                    bottom={3}
                    right={3}
                >
                    <label htmlFor="banner-upload">Edit Banner</label>
                </Button>
            )}
            <input
                onChange={handleImgUpload}
                type="file"
                accept="image/*"
                id="banner-upload"
                className="hidden"
            />
        </div>
    );
};

export default Banner;
