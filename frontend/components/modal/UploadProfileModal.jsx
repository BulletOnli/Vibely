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
    Flex,
    useToast,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useThemeStore } from "@/lib/zustandStore/themeStore";
import { postRequest } from "@/lib/utils/fetcher";
import { mutate } from "swr";
import { useUserStore } from "@/lib/zustandStore/userStore";

const UploadProfileModal = ({ profilePic, isOpen, onClose }) => {
    const [previewImage, setPreviewImage] = useState("");
    const { isDarked } = useThemeStore();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const { currentAccount } = useUserStore();

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
            await postRequest(
                `/user/profile/upload?id=${currentAccount.key}`,
                data
            );
            mutate();
            setIsLoading(false);
            toast({
                title: "Profile successfuly changed",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
            onClose();
            setPreviewImage("");
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

    const handleClose = () => {
        setPreviewImage("");
        setIsLoading(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <ModalOverlay />
                <ModalContent
                    color={isDarked ? "white" : "black"}
                    bg={isDarked ? "#242850" : "white"}
                >
                    <ModalHeader>Edit Profile Picture</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction="column" align="center" gap={4}>
                            <Avatar
                                size="2xl"
                                src={previewImage || profilePic}
                                border="2px"
                            />
                            <Button w="full" colorScheme="telegram">
                                <label
                                    htmlFor="profile-upload"
                                    className="w-full"
                                >
                                    Upload image
                                </label>
                                <input
                                    onChange={handleImgUpload}
                                    name="profile"
                                    type="file"
                                    accept="image/*"
                                    id="profile-upload"
                                    className="hidden"
                                    required
                                />
                            </Button>
                        </Flex>
                    </ModalBody>

                    <ModalFooter mt={2}>
                        <Button mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isDisabled={!previewImage}
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
};

export default UploadProfileModal;
