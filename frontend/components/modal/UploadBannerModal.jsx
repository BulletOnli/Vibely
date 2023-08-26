import {
    Avatar,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
    Flex,
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import { useThemeStore } from "@/lib/zustandStore/themeStore";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/utils/fetcher";

const EditBannerModal = memo(({ isOpen, onClose, hasBanner, userId }) => {
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState("/pcbg.webp");
    const toast = useToast();
    const { isDarked } = useThemeStore();
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        try {
            setIsLoading(true);
            await postRequest("/user/cover/upload", data);
            mutate();
            setIsLoading(false);
            toast({
                title: "Profile Banner successfully changed",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
            onClose();
            setPreviewImage("");
            router.refresh();
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        const banner = hasBanner
            ? `https://vibelybackend-1-a9532540.deta.app/user/cover/${userId}`
            : "/pcbg.webp";
        setPreviewImage(banner);
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <form onSubmit={handleSubmit}>
                <ModalOverlay />
                <ModalContent
                    color={isDarked ? "white" : "black"}
                    bg={isDarked ? "#242850" : "white"}
                >
                    <ModalHeader>Edit Profile Banner</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction="column" align="center" gap={4}>
                            <div
                                style={{
                                    backgroundImage: `url(${previewImage})`,
                                }}
                                className={`relative w-full h-[10rem] lg:h-[15rem] bg-cover bg-center bg-no-repeat border-2 rounded-2xl shadow-custom`}
                            ></div>
                            <Button w="full" colorScheme="telegram">
                                <label
                                    htmlFor="cover-upload"
                                    className="w-full"
                                >
                                    Upload image
                                </label>
                                <input
                                    onChange={handleImgUpload}
                                    type="file"
                                    accept="image/*"
                                    id="cover-upload"
                                    className="hidden"
                                    name="cover"
                                    required
                                />
                            </Button>
                        </Flex>
                    </ModalBody>

                    <ModalFooter mt={2}>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            isDisabled={!previewImage}
                            type="submit"
                            colorScheme="blue"
                            isLoading={isLoading}
                            spinnerPlacement="start"
                        >
                            Save Changes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
});

export default EditBannerModal;
