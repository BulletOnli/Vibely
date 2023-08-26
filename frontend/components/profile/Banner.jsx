import { Button, useDisclosure } from "@chakra-ui/react";
import { FiCamera } from "react-icons/fi";
import UploadBannerModal from "../modal/UploadBannerModal";
import useSWR from "swr";
import { getRequest } from "@/lib/utils/fetcher";
import { memo } from "react";

const Banner = memo(({ isOtherProfile, userData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const hasBanner = useSWR(`/user/cover/${userData?.key}`, getRequest);
    const banner = hasBanner?.data
        ? `https://vibelybackend-1-a9532540.deta.app/user/cover/${userData?.key}`
        : "/pcbg.webp";

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${banner})`,
                }}
                className={` relative w-full lg:w-[70rem] h-[10rem] lg:h-[20rem] bg-cover bg-center bg-no-repeat lg:rounded-2xl shadow-custom`}
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
                userId={userData?.key}
                hasBanner={hasBanner}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
});

export default Banner;
