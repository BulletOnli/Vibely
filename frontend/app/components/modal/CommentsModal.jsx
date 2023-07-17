import { deleteRequest, getRequest, postRequest } from "@/app/utils/fetcher";
import { useThemeStore } from "@/app/zustandStore/themeStore";
import { useUserStore } from "@/app/zustandStore/userStore";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    SimpleGrid,
    HStack,
    VStack,
    Avatar,
    Spacer,
    Input,
    FormControl,
    InputGroup,
    InputRightElement,
    useToast,
    IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillSendFill, BsTrash } from "react-icons/bs";
import useSWR from "swr";

const CommentsModal = ({ onClose, isOpen, commentsData, postId }) => {
    const toast = useToast();
    const { isDarked } = useThemeStore();
    const { currentAccount } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [isLiked, setIsLiked] = useState({});

    //userId - usernames ng commenter
    // /user?id=1a5bf639-a3a3-4583-ad8e-bfdf40cb7d51

    // const commentor = useSWR(
    //     `/user?id=1a5bf639-a3a3-4583-ad8e-bfdf40cb7d51
    // `,
    //     getRequest
    // );

    async function getCommentor(id) {
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

        return response.data.username;
    }

    const addComment = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            await postRequest(`/comment/add?id=${postId}`, {
                text: commentText,
            });
            commentsData?.mutate();
            setIsLoading(false);
            setCommentText("");
            toast({
                title: "You've created a post",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    };

    const deleteComment = async (commentKey) => {
        try {
            setIsLoading(true);
            await deleteRequest(
                `/comment/delete?postId=${postId}&id=${commentKey}`
            );
            commentsData?.mutate();
            setIsLoading(false);
            setCommentText("");
            toast({
                title: "You've deleted your comment",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    };

    const likeComment = async (commentKey) => {
        try {
            setIsLoading(true);
            const res = await postRequest(
                `/comment/like?postId=${postId}&id=${commentKey}`
            );
            // console.log(res);
            // console.log(commentsData?.data);
            setIsLiked(res);
            commentsData?.mutate();
            setIsLoading(false);
            setCommentText("");
            toast({
                title: "You've liked a comment",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    };

    const unlikeComment = async (commentKey) => {
        // console.log(commentsData?.data);
        try {
            setIsLoading(true);
            await postRequest(
                `/comment/unlike?postId=${postId}&id=${commentKey}`
            );
            commentsData?.mutate();
            setIsLoading(false);
            setCommentText("");
            toast({
                title: "You've created a post",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
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
                        {commentsData?.data?.length !== 0 ? (
                            commentsData?.data?.map((comment) => (
                                <HStack w="full" key={comment.key}>
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            size="md"
                                            name={comment.userId}
                                            src={`https://vibelybackend-1-a9532540.deta.app/user/profile/pic/${comment?.userId}`}
                                        />
                                        <div className="flex flex-col gap-0">
                                            <h1 className="font-semibold text-sm">
                                                {comment.userId}
                                            </h1>
                                            <small
                                                className={`${
                                                    isDarked
                                                        ? "text-gray-300"
                                                        : "text-black"
                                                } text-sm max-w-sm`}
                                            >
                                                {comment.text}
                                            </small>
                                        </div>
                                    </div>
                                    <Spacer />
                                    <HStack>
                                        {currentAccount?.key ===
                                        comment.userId ? (
                                            <BsTrash
                                                cursor="pointer"
                                                onClick={() =>
                                                    deleteComment(comment.key)
                                                }
                                            />
                                        ) : (
                                            ""
                                        )}

                                        <VStack spacing={0}>
                                            {isLiked.commentId ===
                                            comment.key ? (
                                                <AiFillHeart
                                                    size={20}
                                                    cursor="pointer"
                                                    onClick={() => {
                                                        unlikeComment(
                                                            comment.key
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <AiOutlineHeart
                                                    size={20}
                                                    cursor="pointer"
                                                    onClick={() => {
                                                        likeComment(
                                                            comment.key
                                                        );
                                                    }}
                                                />
                                            )}
                                            <small>{comment.likes}</small>
                                        </VStack>
                                    </HStack>
                                </HStack>
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
                                onChange={(e) => setCommentText(e.target.value)}
                                value={commentText}
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
};

export default CommentsModal;
