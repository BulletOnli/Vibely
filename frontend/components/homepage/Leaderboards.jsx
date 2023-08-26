import {
    HStack,
    Avatar,
    VStack,
    Button,
    Spacer,
    Flex,
    Image,
} from "@chakra-ui/react";
import { memo } from "react";

const Leaderboards = memo(({ isDarked, componentsBg }) => {
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
                        <Image
                            alt="medal img"
                            src="/top1.png"
                            className="w-10"
                        />
                        <div className="flex flex-col gap-0">
                            <h1 className="font-semibold">John Doe</h1>
                            <small
                                className={`${
                                    isDarked ? "text-gray-300" : "text-black"
                                } text-xs`}
                            >
                                100 Followers
                            </small>
                        </div>
                    </div>
                    <Spacer />
                    <Button size="xs" colorScheme="telegram">
                        Follow
                    </Button>
                </HStack>

                <HStack w="full">
                    <div className="flex items-center gap-2">
                        <Image
                            alt="medal img"
                            src="/top2.png"
                            className="w-10"
                        />
                        <div className="flex flex-col gap-0">
                            <h1 className="font-semibold">John Doe</h1>
                            <small
                                className={`${
                                    isDarked ? "text-gray-300" : "text-black"
                                } text-xs`}
                            >
                                200 Followers
                            </small>
                        </div>
                    </div>
                    <Spacer />
                    <Button size="xs" colorScheme="telegram">
                        Follow
                    </Button>
                </HStack>

                <HStack w="full">
                    <div className="flex items-center gap-2">
                        <Image
                            alt="medal img"
                            src="/top3.png"
                            className="w-10"
                        />
                        <div className="flex flex-col gap-0">
                            <h1 className="font-semibold">John Doe</h1>
                            <small
                                className={`${
                                    isDarked ? "text-gray-300" : "text-black"
                                } text-xs`}
                            >
                                300 Followers
                            </small>
                        </div>
                    </div>
                    <Spacer />
                    <Button size="xs" colorScheme="telegram">
                        Follow
                    </Button>
                </HStack>
            </Flex>
        </div>
    );
});

export default Leaderboards;
