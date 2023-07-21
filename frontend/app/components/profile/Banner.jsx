import { Button, useDisclosure } from "@chakra-ui/react";
import { FiCamera } from "react-icons/fi";
import UploadBannerModal from "../modal/UploadBannerModal";
import useSWR from "swr";
import { getRequest } from "@/app/utils/fetcher";

const Banner = ({ isOtherProfile, userData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const hasBanner = useSWR(`/user/cover/${userData?.key}`, getRequest);
    const banner = hasBanner?.data
        ? `https://vibelybackend-1-a9532540.deta.app/user/cover/${userData?.key}`
        : "/pcbg.png";

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${banner})`,
                }}
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

            <UploadBannerModal
                banner={banner}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default Banner;
