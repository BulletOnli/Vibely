import { deleteRequest, getRequest, postRequest } from "@/lib/utils/fetcher";
import { useThemeStore } from "@/lib/zustandStore/themeStore";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    Input,
    FormControl,
    InputGroup,
    InputRightElement,
    useToast,
    IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { lazy, memo, useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

import Comment from "../Comment";

const CommentsModal = memo(({ onClose, isOpen, commentsData, postId }) => {
    const toast = useToast();
    const { isDarked } = useThemeStore();

    const [isLoading, setIsLoading] = useState(false);
    const [inputComment, setInputComment] = useState("");
    const [comments, setComments] = useState([]);

    // functions to get the user based on id
    const getCommentor = async (id) => {
        const response = await axios.get(
            `https://vibelybackend-1-a9532540.deta.app/user?id=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "vibelyToken"
                    )}`,
                },
            }
        );

        return `${response.data.firstName} ${response.data.lastName}`;
    };

    const addComment = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await postRequest(`/comment/add?id=${postId}`, {
                text: inputComment,
            });
            commentsData?.mutate();
        } catch (error) {
            console.log(error);
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        } finally {
            setIsLoading(false);
            setInputComment("");
        }
    };

    const deleteComment = async (commentKey) => {
        try {
            setIsLoading(true);
            await deleteRequest(
                `/comment/delete?postId=${postId}&id=${commentKey}`
            );
            commentsData?.mutate();
        } catch (error) {
            console.log(error);
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        } finally {
            setIsLoading(false);
            setInputComment("");
        }
    };

    useEffect(() => {
        // map all the data and convert the userId to create a new property
        if (commentsData?.data?.length > 0) {
            Promise.all(
                commentsData?.data?.map((comment) =>
                    getCommentor(comment?.userId).then((res) => ({
                        ...comment,
                        commentorName: res,
                    }))
                )
            ).then((results) => {
                setComments(results);
            });
        }
    }, [commentsData]);

    return (
        <Modal isCentered onClose={onClose} isOpen={isOpen} size="md">
            <ModalOverlay />
            <ModalContent
                color={isDarked ? "white" : "black"}
                bg={isDarked ? "#242850" : "white"}
                h="2xl"
                rounded="xl"
            >
                <ModalHeader textAlign="center">Comments</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        {commentsData?.isLoading && (
                            <h1 className="w-full text-center">
                                Loading comments...
                            </h1>
                        )}
                        {commentsData?.data?.length > 0 ? (
                            comments?.map((comment) => (
                                <Comment
                                    key={comment?.key}
                                    comment={comment}
                                    deleteComment={deleteComment}
                                    postId={postId}
                                    mutate={commentsData?.mutate}
                                />
                            ))
                        ) : (
                            <p>No Comments Available</p>
                        )}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <FormControl
                        as="form"
                        w={{ sm: "xs", lg: "md" }}
                        onSubmit={addComment}
                    >
                        <InputGroup>
                            <Input
                                placeholder="Write a comment"
                                rounded="2xl"
                                autoComplete="off"
                                textAlign="center"
                                bg={isDarked ? "#1A1F40" : "#F0F2F5"}
                                borderWidth={0}
                                onChange={(e) =>
                                    setInputComment(e.target.value)
                                }
                                value={inputComment}
                                isDisabled={isLoading}
                                required
                            />
                            <InputRightElement
                                children={
                                    <IconButton
                                        type="submit"
                                        colorScheme=""
                                        icon={
                                            <BsFillSendFill
                                                fontSize={20}
                                                color="#9CA3AF"
                                            />
                                        }
                                    />
                                }
                            />
                        </InputGroup>
                    </FormControl>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});

export default CommentsModal;
