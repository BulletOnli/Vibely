import { useThemeStore } from "@/app/store/themeStore";
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
} from "@chakra-ui/react";

import { AiOutlineHeart } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";

const CommentsModal = ({ onClose, isOpen }) => {
    const { isDarked } = useThemeStore();

    return (
        <Modal isCentered onClose={onClose} isOpen={isOpen} size="md">
            <ModalOverlay />
            <ModalContent
                color={isDarked ? "white" : "black"}
                bg={isDarked ? "#242850" : "white"}
                h="2xl"
            >
                <ModalHeader textAlign="center">Comments</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={3}>
                        <HStack w="full">
                            <div className="flex items-center gap-3">
                                <Avatar
                                    size="md"
                                    name="Gemmuel"
                                    src="/tzuyu.jpg"
                                />
                                <div className="flex flex-col gap-0">
                                    <h1 className="font-semibold text-sm">
                                        Gemmuel Dela Pena
                                    </h1>
                                    <small
                                        className={`${
                                            isDarked
                                                ? "text-gray-300"
                                                : "text-black"
                                        } text-sm max-w-sm`}
                                    >
                                        Have a great day!
                                    </small>
                                </div>
                            </div>
                            <Spacer />
                            <VStack spacing={0}>
                                <AiOutlineHeart size={20} cursor="pointer" />
                                <small>10</small>
                            </VStack>
                        </HStack>

                        <HStack w="full">
                            <div className="flex items-center gap-3">
                                <Avatar
                                    size="md"
                                    name="Gemmuel"
                                    src="/tzuyu.jpg"
                                />
                                <div className="flex flex-col gap-0">
                                    <h1 className="font-semibold text-sm">
                                        Gemmuel Dela Pena
                                    </h1>
                                    <small
                                        className={`${
                                            isDarked
                                                ? "text-gray-300"
                                                : "text-black"
                                        } text-sm max-w-xs`}
                                    >
                                        Thanks for sharing your thoughts
                                    </small>
                                </div>
                            </div>
                            <Spacer />
                            <VStack spacing={0}>
                                <AiOutlineHeart size={20} cursor="pointer" />
                                <small>23</small>
                            </VStack>
                        </HStack>

                        <HStack w="full">
                            <div className="flex items-center gap-3">
                                <Avatar
                                    size="md"
                                    name="Gemmuel"
                                    src="/tzuyu.jpg"
                                />
                                <div className="flex flex-col gap-0">
                                    <h1 className="font-semibold text-sm">
                                        Gemmuel Dela Pena
                                    </h1>
                                    <small
                                        className={`${
                                            isDarked
                                                ? "text-gray-300"
                                                : "text-black"
                                        } text-sm max-w-xs`}
                                    >
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Suscipit,
                                        reprehenderit.
                                    </small>
                                </div>
                            </div>
                            <Spacer />
                            <VStack spacing={0}>
                                <AiOutlineHeart size={20} cursor="pointer" />
                                <small>12</small>
                            </VStack>
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <FormControl as="form" w={{ sm: "xs", lg: "md" }}>
                        <InputGroup>
                            <Input
                                placeholder="Write a comment"
                                rounded="2xl"
                                autoComplete="off"
                                textAlign="center"
                                bg={isDarked ? "#1A1F40" : "#F0F2F5"}
                                borderWidth={0}
                            />
                            <InputRightElement
                                children={
                                    <BsFillSendFill
                                        fontSize={20}
                                        color="#9CA3AF"
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
