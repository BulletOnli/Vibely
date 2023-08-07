import {
    Avatar,
    Button,
    HStack,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FaShare } from "react-icons/fa";
import {
    BsHandThumbsDown,
    BsThreeDots,
    BsPersonFillAdd,
    BsTrash,
    BsBookmark,
    BsChatSquareQuote,
    BsHandThumbsDownFill,
} from "react-icons/bs";
import useSWR, { useSWRConfig } from "swr";
import { useUserStore } from "@/lib/zustandStore/userStore";
import Link from "next/link";
import { deleteRequest, getRequest, postRequest } from "@/lib/utils/fetcher";
import { useCallback, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

import CommentsModal from "../modal/CommentsModal";
import EditPostModal from "../modal/EditPostModal";

const Post = ({ componentsBg, isDarked, post, mutate }) => {
    const toast = useToast();
    const editPostDisclosure = useDisclosure();
    const commentsDisclosure = useDisclosure();
    const { currentAccount } = useUserStore();
    const [likeState, setLikeState] = useState(null);
    const [isLoadingLike, setIsLoadingLike] = useState(false);
    const [isLoadingDislike, setIsLoadingDislike] = useState(false);

    const postCreator = useSWR(`/user?id=${post?.userId}`, getRequest);
    const commentsData = useSWR(
        `/comment/fetch?postId=${post?.key}`,
        getRequest
    );

    const isOtherPost =
        currentAccount?.username !== postCreator?.data?.username;

    const renderCount = useCallback(async () => {
        const response = await axios.get(
            `https://vibelybackend-1-a9532540.deta.app/post/likes/getcount?id=${post?.key}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "vibelyToken"
                    )}`,
                },
            }
        );
    }, []);

    const getLikeState = useCallback(async () => {
        const response = await axios.get(
            `https://vibelybackend-1-a9532540.deta.app/post/likes/getstate?id=${post?.key}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "vibelyToken"
                    )}`,
                },
            }
        );

        if (response.data?.isLiked) {
            setLikeState(true);
        } else {
            setLikeState(response.data?.isLiked);
        }
    }, []);

    const likePost = async () => {
        try {
            setIsLoadingLike(true);
            await postRequest(`/post/likes/like?id=${post?.key}`);
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
            getLikeState();
            renderCount();
            setIsLoadingLike(false);
        }
    };

    const unlikePost = async () => {
        try {
            setIsLoadingLike(true);
            await postRequest(`/post/likes/unlike?id=${post?.key}`);
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
            getLikeState();
            renderCount();

            setIsLoadingLike(false);
        }
    };

    const dislikePost = async () => {
        try {
            setIsLoadingDislike(true);
            await postRequest(`/post/likes/dislike?id=${post?.key}`);
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
            getLikeState();
            renderCount();
            mutate();
            setIsLoadingDislike(false);
        }
    };

    const undislikePost = async () => {
        try {
            setIsLoadingDislike(true);
            await postRequest(`/post/likes/undislike?id=${post?.key}`);
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
            getLikeState();
            renderCount();
            setIsLoadingDislike(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteRequest(`/post/delete?id=${post?.key}`);
            mutate();
            toast({
                title: "You've deleted a post",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
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

    useEffect(() => {
        getLikeState();
    }, []);

    return (
        <>
            <div
                className={`${componentsBg} relative w-full h-full flex flex-col items-center p-6 bg-[#242850] rounded-xl shadow-md`}
            >
                <div className="w-full flex items-center justify-between gap-4">
                    <HStack>
                        <Avatar
                            size="sm"
                            name={postCreator?.data?.firstName}
                            src={`https://vibelybackend-1-a9532540.deta.app/user/profile/pic/${postCreator?.data?.key}`}
                        />
                        <div className="flex flex-col">
                            <Link
                                href={`/${postCreator?.data?.username}`}
                                className="hover:underline"
                            >
                                <h1 className="font-semibold">
                                    {postCreator?.data?.firstName}{" "}
                                    {postCreator?.data?.lastName}
                                </h1>
                            </Link>
                            <small className="text-xs text-[#5F6892]">
                                Created at {post?.createdAt?.slice(0, 10)}
                            </small>
                        </div>
                    </HStack>
                    <Menu isLazy>
                        <MenuButton
                            variant="outline"
                            color={isDarked ? "white" : "black"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                        >
                            <BsThreeDots size={20} />
                        </MenuButton>
                        <MenuList
                            bg={isDarked ? "#242850" : "white"}
                            // fontWeight="semibold"
                            zIndex={20}
                        >
                            <MenuItem
                                icon={<BsPersonFillAdd size={18} />}
                                bg={isDarked ? "#242850" : "white"}
                                _hover={{
                                    bg: isDarked ? "#1A1F40" : "#E9ECEF",
                                }}
                                fontSize={14}
                            >
                                Follow
                            </MenuItem>

                            <MenuItem
                                icon={<BsBookmark size={18} />}
                                bg={isDarked ? "#242850" : "white"}
                                _hover={{
                                    bg: isDarked ? "#1A1F40" : "#E9ECEF",
                                }}
                                fontSize={14}
                            >
                                Save Post
                            </MenuItem>

                            {!isOtherPost && (
                                <>
                                    <MenuItem
                                        as={Button}
                                        icon={<BsPersonFillAdd size={18} />}
                                        bg={isDarked ? "#242850" : "white"}
                                        _hover={{
                                            bg: isDarked
                                                ? "#1A1F40"
                                                : "#E9ECEF",
                                        }}
                                        fontSize={14}
                                        onClick={editPostDisclosure.onOpen}
                                    >
                                        Edit Post
                                    </MenuItem>
                                    <MenuItem
                                        as={Button}
                                        icon={<BsTrash size={18} />}
                                        bg={isDarked ? "#242850" : "white"}
                                        _hover={{
                                            bg: isDarked
                                                ? "#1A1F40"
                                                : "#E9ECEF",
                                        }}
                                        fontSize={14}
                                        onClick={handleDelete}
                                    >
                                        Remove Post
                                    </MenuItem>
                                </>
                            )}
                        </MenuList>
                    </Menu>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center lg:gap-4 text-center p-3 lg:p-6">
                    <p>{post?.caption}</p>

                    {post?.hasPhoto && (
                        <Image
                            alt="post img"
                            src={`https://vibelybackend-1-a9532540.deta.app/post/photo?id=${post?.key}`}
                            fallbackSrc="https://via.placeholder.com/150"
                            className="w-full h-[10rem] lg:h-[20rem] object-contain"
                        />
                    )}
                </div>
                <div className="w-full flex items-center justify-between">
                    <HStack>
                        <Button
                            size="xs"
                            variant="outline"
                            color={isDarked ? "white" : "black"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                            isLoading={isLoadingLike}
                            spinnerPlacement="start"
                            onClick={likeState ? unlikePost : likePost}
                        >
                            {likeState ? (
                                <AiFillHeart
                                    fontSize={18}
                                    className="text-red-600"
                                />
                            ) : (
                                <AiOutlineHeart fontSize={18} />
                            )}
                            <Text ml="5px">{post?.likes}</Text>
                        </Button>
                        <Button
                            size="xs"
                            variant="outline"
                            color={isDarked ? "white" : "black"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                            isLoading={isLoadingDislike}
                            spinnerPlacement="start"
                            onClick={
                                likeState === false
                                    ? undislikePost
                                    : dislikePost
                            }
                        >
                            {likeState === false ? (
                                <BsHandThumbsDownFill fontSize={16} />
                            ) : (
                                <BsHandThumbsDown fontSize={16} />
                            )}
                            <Text ml="5px">{post?.dislikes}</Text>
                        </Button>
                        <Button
                            size="xs"
                            variant="outline"
                            color={isDarked ? "white" : "black"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                            onClick={commentsDisclosure.onOpen}
                        >
                            <BsChatSquareQuote fontSize={15} />
                            <Text ml="7px">{commentsData?.data?.length}</Text>
                        </Button>
                    </HStack>

                    <Button
                        size="xs"
                        leftIcon={<FaShare />}
                        colorScheme="gray"
                        variant="outline"
                        color={isDarked ? "white" : "black"}
                        _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                        isDisabled
                    >
                        <p className="hidden lg:block">Repost</p>
                    </Button>
                </div>
            </div>

            <CommentsModal
                onClose={commentsDisclosure.onClose}
                isOpen={commentsDisclosure.isOpen}
                commentsData={commentsData}
                postId={post?.key}
            />

            <EditPostModal
                onClose={editPostDisclosure.onClose}
                isOpen={editPostDisclosure.isOpen}
                postData={post}
                mutate={mutate}
            />
        </>
    );
};

export default Post;
