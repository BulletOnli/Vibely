import {
    Avatar,
    Button,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import { FaShare } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import {
    BsHandThumbsDown,
    BsThreeDots,
    BsPersonFillAdd,
    BsTrash,
    BsBookmark,
} from "react-icons/bs";

const Post = ({ componentsBg, isDarked }) => {
    return (
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
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                            fontSize={14}
                        >
                            Follow
                        </MenuItem>
                        <MenuItem
                            icon={<BsBookmark size={18} />}
                            bg={isDarked ? "#242850" : "white"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                            fontSize={14}
                        >
                            Save Post
                        </MenuItem>
                        <MenuItem
                            icon={<BsTrash size={18} />}
                            bg={isDarked ? "#242850" : "white"}
                            _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                            fontSize={14}
                        >
                            Remove Post
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center gap-4 text-center p-4 lg:p-6">
                <img src="/tzuyu.jpg" alt="" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Iste suscipit officia corrupti quae praesentium quam
                    quibusdam doloremque facilis laborum qui!
                </p>
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
                        <Text mx={1}>13</Text>
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        color={isDarked ? "white" : "black"}
                        _hover={{ bg: isDarked ? "#1A1F40" : "#E9ECEF" }}
                    >
                        <BsHandThumbsDown fontSize={18} />
                        <Text mx={1}>1</Text>
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
                    Repost
                </Button>
            </div>
        </div>
    );
};

export default Post;
