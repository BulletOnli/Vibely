"use client";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
    FormLabel,
    Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useThemeStore } from "@/app/zustandStore/themeStore";
import { putRequest } from "@/app/utils/fetcher";

const EditPostModal = ({ isOpen, onClose, postData, mutate }) => {
    const toast = useToast();
    const { isDarked } = useThemeStore();
    const [isLoading, setIsLoading] = useState(false);
    const [caption, setCaption] = useState(postData?.caption);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    </ModalBody>

                    <ModalFooter>
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
