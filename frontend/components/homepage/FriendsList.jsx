import { Avatar, AvatarBadge, Flex, Spacer, VStack } from "@chakra-ui/react";

const FriendsList = ({ isDarked, componentsBg }) => {
    const hoverColor = isDarked ? "hover:bg-[#282E54]" : "hover:bg-gray-100";

    return (
        <div
            className={`${componentsBg} w-full min-h-[50vh] flex flex-col items-center p-4 rounded-xl shadow-custom`}
        >
            <h1
                className={`${
                    isDarked ? "text-[#f5f5f5]" : "text-black"
                } text-lg w-full text-start font-semibold mb-2`}
            >
                Friends List
            </h1>

            <Flex w="full" direction="column">
                <div
                    className={`w-full flex items-center gap-3 p-1 rounded-md`}
                >
                    <Avatar size="sm" name="Gemmuel">
                        <AvatarBadge boxSize="1em" bg="green.500" />
                    </Avatar>
                    <p className="text-sm ">Gemmuel Dela Pena</p>
                </div>
                <div
                    className={`w-full flex items-center gap-3 p-1 rounded-md`}
                >
                    <Avatar size="sm" name="Clark">
                        <AvatarBadge boxSize="1em" bg="green.500" />
                    </Avatar>
                    <p className="text-sm ">Clark John</p>
                </div>
            </Flex>
        </div>
    );
};

export default FriendsList;
