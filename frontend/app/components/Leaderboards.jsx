import { HStack, Avatar, VStack, Button, Spacer, Flex } from "@chakra-ui/react";

const Leaderboards = ({ isDarked, componentsBg }) => {
    return (
        <div
            className={`${componentsBg} w-full flex flex-col p-4 rounded-xl shadow-custom`}
        >
            <h1
                className={`${
                    isDarked ? "text-[#f5f5f5]" : "text-black"
                } text-lg w-full text-start font-semibold mb-4`}
            >
                Top Creators
            </h1>

            <Flex direction="column" gap={3}>
                <HStack w="full">
                    <div className="flex items-center gap-2">
                        <Avatar size="md" name="Gemmuel" src="/tzuyu.jpg" />
                        <div className="flex flex-col gap-0">
                            <h1 className="font-semibold">Gemmuel Dela Pena</h1>
                            <small
                                className={`${
                                    isDarked ? "text-gray-300" : "text-black"
                                } text-xs`}
                            >
                                69,143 Followers
                            </small>
                        </div>
                    </div>
                    <Spacer />
                    <Button size="xs" colorScheme="twitter">
                        Follow
                    </Button>
                </HStack>

                <HStack w="full">
                    <div className="flex items-center gap-2">
                        <Avatar size="md" name="Gemmuel" src="/tzuyu.jpg" />
                        <div className="flex flex-col gap-0">
                            <h1 className="font-semibold">Gemmuel Dela Pena</h1>
                            <small
                                className={`${
                                    isDarked ? "text-gray-300" : "text-black"
                                } text-xs`}
                            >
                                69,143 Followers
                            </small>
                        </div>
                    </div>
                    <Spacer />
                    <Button size="xs" colorScheme="twitter">
                        Follow
                    </Button>
                </HStack>

                <HStack w="full">
                    <div className="flex items-center gap-2">
                        <Avatar size="md" name="Gemmuel" src="/tzuyu.jpg" />
                        <div className="flex flex-col gap-0">
                            <h1 className="font-semibold">Gemmuel Dela Pena</h1>
                            <small
                                className={`${
                                    isDarked ? "text-gray-300" : "text-black"
                                } text-xs`}
                            >
                                69,143 Followers
                            </small>
                        </div>
                    </div>
                    <Spacer />
                    <Button size="xs" colorScheme="twitter">
                        Follow
                    </Button>
                </HStack>
            </Flex>
        </div>
    );
};

export default Leaderboards;
