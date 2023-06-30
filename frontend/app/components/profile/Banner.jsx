import { Button, useDisclosure } from "@chakra-ui/react";
import { FiCamera } from "react-icons/fi";
import UploadBannerModal from "../modal/UploadBannerModal";

const Banner = ({ isOtherProfile }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div
                style={{ backgroundImage: `url(/pcbg.png)` }}
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
                        onClick={onOpen}
                    >
                        Edit Banner
                    </Button>
                )}
            </div>

            <UploadBannerModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default Banner;
