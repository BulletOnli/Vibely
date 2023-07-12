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
import { AiOutlineHeart } from "react-icons/ai";
import {
    BsHandThumbsDown,
    BsThreeDots,
    BsPersonFillAdd,
    BsTrash,
    BsBookmark,
    BsChatSquareQuote,
} from "react-icons/bs";
import CommentsModal from "../modal/CommentsModal";
import useSWR from "swr";
import { useUserStore } from "@/app/zustandStore/userStore";
import Link from "next/link";
import { deleteRequest, getRequest } from "@/app/api/fetcher";

const Post = ({ componentsBg, isDarked, post, mutate }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { currentAccount } = useUserStore();

    const postCreator = useSWR(`/user?id=${post?.userId}`, getRequest);
    // const photoSWR = useSWR(`/post/photo?id=${post?.key}`, getRequest);
    // const postPhoto = photoSWR?.data
    //     ? Buffer.from(photoSWR?.data).toString("base64")
    //     : null;

    const isOtherPost =
        currentAccount?.username !== postCreator?.data?.username;

    const handleDelete = async () => {
        try {
            //todo MAY CORS ERROR KAPAG NAG DEDELETE
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

    return (
        <>
            <div
                className={`${componentsBg} relative w-full h-full flex flex-col items-center p-6 bg-[#242850] rounded-xl shadow-md`}
            >
                <div className="w-full flex items-center justify-between gap-4">
                    <HStack>
                        <Avatar size="sm" name={postCreator?.data?.firstName} />
                        <div className="flex flex-col">
                            <Link
                                href={`/profile/${postCreator?.data?.username}`}
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
                                <MenuItem
                                    as={Button}
                                    icon={<BsTrash size={18} />}
                                    bg={isDarked ? "#242850" : "white"}
                                    _hover={{
                                        bg: isDarked ? "#1A1F40" : "#E9ECEF",
                                    }}
                                    fontSize={14}
                                    onClick={handleDelete}
                                >
                                    Remove Post
                                </MenuItem>
                            )}
                        </MenuList>
                    </Menu>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center lg:gap-4 text-center p-3 lg:p-6">
                    <p>{post?.caption}</p>

                    {/* {post?.hasPhoto && (
                        <Image
                            // src="/pcbg.png"
                            src={`data:image/jpg;base64,${postPhoto}`}
                            fallbackSrc="https://via.placeholder.com/150"
                            className="w-full h-[10rem] lg:h-[20rem] object-contain"
                        />
                    )} */}
                </div>
                <div className="w-full flex items-center justify-between">
                    <HStack>
                        <Button
                            size="xs"
                            variant="outline"
                            color={isDarked ? "white" : "black"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                        >
                            <AiOutlineHeart fontSize={18} />
                            <Text ml="5px">{post?.likes}</Text>
                        </Button>
                        <Button
                            size="xs"
                            variant="outline"
                            color={isDarked ? "white" : "black"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                        >
                            <BsHandThumbsDown fontSize={16} />
                            <Text ml="5px">{post?.dislikes}</Text>
                        </Button>
                        <Button
                            size="xs"
                            variant="outline"
                            color={isDarked ? "white" : "black"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                            onClick={onOpen}
                        >
                            <BsChatSquareQuote fontSize={15} />
                            <Text ml="7px">0</Text>
                        </Button>
                    </HStack>

                    <Button
                        size="xs"
                        leftIcon={<FaShare />}
                        colorScheme="gray"
                        variant="outline"
                        color={isDarked ? "white" : "black"}
                        _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                    >
                        <p className="hidden lg:block">Repost</p>
                    </Button>
                </div>
            </div>

            <CommentsModal onClose={onClose} isOpen={isOpen} />
        </>
    );
};

export default Post;
