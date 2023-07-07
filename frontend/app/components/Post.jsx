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
import CommentsModal from "./modal/CommentsModal";

const Post = ({ componentsBg, isDarked }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div
                className={`${componentsBg} relative w-full h-full flex flex-col items-center p-6 bg-[#242850] rounded-xl shadow-md`}
            >
                <div className="w-full flex items-center justify-between gap-4">
                    <HStack>
                        <Avatar size="sm" name="Gemmuel" />
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Gemmuel Dela Pena</h1>
                            <small className="text-xs text-[#5F6892]">
                                3:14 PM • 5/17/23
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
                            <MenuItem
                                icon={<BsTrash size={18} />}
                                bg={isDarked ? "#242850" : "white"}
                                _hover={{
                                    bg: isDarked ? "#1A1F40" : "#E9ECEF",
                                }}
                                fontSize={14}
                            >
                                Remove Post
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center lg:gap-4 text-center p-3 lg:p-6">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Iste suscipit officia corrupti quae praesentium
                        quam quibusdam doloremque facilis laborum
                    </p>
                    <Image
                        src="/pcbg.png"
                        fallbackSrc="https://via.placeholder.com/150"
                        className="w-full h-[10rem] lg:h-[20rem] object-contain"
                    />
                </div>
                <div className="w-full flex items-center justify-between">
                    <HStack>
                        <Button
                            size="sm"
                            variant="outline"
                            color={isDarked ? "white" : "black"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                        >
                            <AiOutlineHeart fontSize={20} />
                            <Text ml="5px">13</Text>
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            color={isDarked ? "white" : "black"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                        >
                            <BsHandThumbsDown fontSize={18} />
                            <Text ml="5px">1</Text>
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            color={isDarked ? "white" : "black"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                            onClick={onOpen}
                        >
                            <BsChatSquareQuote fontSize={18} />
                            <Text ml="7px">0</Text>
                        </Button>
                    </HStack>

                    <Button
                        size="sm"
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
