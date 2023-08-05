import { HStack, VStack, Avatar, Spacer, useToast } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useThemeStore } from "../app/zustandStore/themeStore";
import { useUserStore } from "../app/zustandStore/userStore";
import { useEffect, useState } from "react";
import { postRequest } from "@/app/utils/fetcher";
import axios from "axios";

const Comment = ({ comment, deleteComment, postId, mutate }) => {
    const toast = useToast();
    const { isDarked } = useThemeStore();
    const { currentAccount } = useUserStore();
    const [likeState, setLikeState] = useState(null);

    const renderCount = async (commentKey) => {
        const response = await axios.get(
            `https://vibelybackend-1-a9532540.deta.app/comment/getlikescount?id=${commentKey}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "vibelyToken"
                    )}`,
                },
            }
        );
    };

    const likeComment = async (commentKey) => {
        try {
            await postRequest(
                `/comment/like?postId=${postId}&id=${commentKey}`
            );
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
            mutate();
            renderCount(commentKey);
            getLikeState(commentKey);
        }
    };

    const unlikeComment = async (commentKey) => {
        try {
            await postRequest(
                `/comment/unlike?postId=${postId}&id=${commentKey}`
            );
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
            mutate();
            renderCount(commentKey);
            getLikeState(commentKey);
        }
    };

    const getLikeState = async (commentKey) => {
        const response = await axios.get(
            `https://vibelybackend-1-a9532540.deta.app/comment/getlikestate?id=${commentKey}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "vibelyToken"
                    )}`,
                },
            }
        );

        if (response.data?.isLiked) {
            return setLikeState(true);
        } else {
            return setLikeState(response.data?.isLiked);
        }
    };

    useEffect(() => {
        getLikeState(comment.key);
    }, []);

    return (
        <HStack w="full" key={comment.key}>
            <div className="flex items-center gap-3">
                <Avatar
                    size="md"
                    name={comment.userId}
                    src={`https://vibelybackend-1-a9532540.deta.app/user/profile/pic/${comment?.userId}`}
                />
                <div className="flex flex-col gap-0">
                    <h1 className="font-semibold text-sm">
                        {comment.commentorName}
                    </h1>
                    <small
                        className={`${
                            isDarked ? "text-gray-300" : "text-black"
                        } text-sm max-w-sm`}
                    >
                        {comment.text}
                    </small>
                </div>
            </div>
            <Spacer />
            <HStack>
                {currentAccount?.key === comment.userId ? (
                    <BsTrash
                        cursor="pointer"
                        onClick={() => deleteComment(comment.key)}
                    />
                ) : (
                    ""
                )}

                <VStack spacing={0}>
                    {likeState ? (
                        <AiFillHeart
                            size={20}
                            cursor="pointer"
                            onClick={() => unlikeComment(comment.key)}
                        />
                    ) : (
                        <AiOutlineHeart
                            size={20}
                            cursor="pointer"
                            onClick={() => likeComment(comment.key)}
                        />
                    )}
                    <small>{comment.likes}</small>
                </VStack>
            </HStack>
        </HStack>
    );
};

export default Comment;
