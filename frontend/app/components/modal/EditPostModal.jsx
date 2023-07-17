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
    useToast,
    Flex,
    FormLabel,
    Input,
    Textarea,
    Image,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useThemeStore } from "@/app/zustandStore/themeStore";
import { putRequest } from "@/app/utils/fetcher";

const EditPostModal = ({ isOpen, onClose, postData, mutate }) => {
    const toast = useToast();
    const { isDarked } = useThemeStore();
    const [previewImage, setPreviewImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [caption, setCaption] = useState(postData?.caption);

    const postPhoto = postData?.hasPhoto
        ? `https://vibelybackend-1-a9532540.deta.app/post/photo?id=${postData?.key}`
        : "https://via.placeholder.com/400";

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
        const photo = data.get("photo");

        //todo hindi gumagana update photo
        try {
            setIsLoading(true);
            await putRequest(`/post/update?id=${postData?.key}`, {
                caption,
            });
            mutate();
            setIsLoading(false);
            toast({
                title: "Post updated!",
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
        setCaption(postData?.caption);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="lg">
            <form onSubmit={handleSubmit}>
                <ModalOverlay />
                <ModalContent
                    color={isDarked ? "white" : "black"}
                    bg={isDarked ? "#242850" : "white"}
                >
                    <ModalHeader>Edit Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel>Caption:</FormLabel>
                        <Textarea
                            placeholder="Share your thoughts..."
                            mb={2}
                            resize="none"
                            name="caption"
                            onChange={(e) => setCaption(e.target.value)}
                            value={caption}
                        />
                        <Flex direction="column" align="center" gap={2}>
                            <div
                                style={{
                                    backgroundImage: `url(${
                                        previewImage || postPhoto
                                    })`,
                                }}
                                className={`relative w-full h-[10rem] lg:h-[15rem] bg-cover bg-center bg-no-repeat border-2 rounded-2xl shadow-custom`}
                            ></div>
                            <Button w="full" colorScheme="telegram">
                                <label
                                    htmlFor="photo-upload"
                                    className="w-full"
                                >
                                    Upload image
                                </label>
                                <input
                                    onChange={handleImgUpload}
                                    type="file"
                                    accept="image/*"
                                    id="photo-upload"
                                    className="hidden"
                                    name="photo"
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

export default EditPostModal;
