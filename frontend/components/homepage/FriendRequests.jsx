import {
    HStack,
    Avatar,
    VStack,
    Button,
    Spacer,
    Flex,
    Image,
    IconButton,
} from "@chakra-ui/react";
import { memo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";

const FriendRequests = memo(({ isDarked, componentsBg }) => {
    return (
        <div
            className={`${componentsBg} w-full flex flex-col p-4 rounded-xl shadow-custom`}
        >
            <h1
                className={`${
                    isDarked ? "text-[#f5f5f5]" : "text-black"
                } text-lg w-full text-start font-semibold mb-4`}
            >
                Wishing to be your friend
            </h1>

            <Flex direction="column" gap={3}>
                <HStack w="full">
                    <HStack>
                        <Avatar size="sm" />
                        <h1 className="text-sm font-semibold">
                            Gemmuel Dela Pena
                        </h1>
                    </HStack>
                    <Spacer />
                    <IconButton
                        size="xs"
                        colorScheme="blue"
                        icon={<BsCheck2 size={18} />}
                    />

                    <IconButton
                        size="xs"
                        colorScheme="red"
                        icon={<AiOutlineClose size={18} />}
                    />
                </HStack>
            </Flex>
        </div>
    );
});

FriendRequests.displayName = "FriendRequests";

export default FriendRequests;
