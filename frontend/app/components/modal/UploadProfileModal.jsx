"use client";
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
import { useState, useRef } from "react";
import axios from "axios";
import { useThemeStore } from "@/app/store/themeStore";

const EditProfilePicModal = ({ isOpen, onClose }) => {
    const [previewImage, setPreviewImage] = useState("");
    const { isDarked } = useThemeStore();
    const toast = useToast();

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
            const response = await axios.post(
                "http://localhost:8080/user/profile/upload",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "vibelyToken"
                        )}`,
                    },
                }
            );
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

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
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
                                src={previewImage || "/tzuyu.jpg"}
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
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isDisabled={!previewImage}
                        >
                            Save Changes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default EditProfilePicModal;
