import { Avatar, HStack, Icon, Spacer } from "@chakra-ui/react";
import { RxDotFilled } from "react-icons/rx";

const Friend = () => {
    return (
        <div className="w-full flex items-center justify-between p-2 hover:bg-gray-200 rounded-md cursor-pointer">
            <HStack>
                <Avatar size="sm" />
                <h1 className="font-semibold">Gemmuel Dela Pena</h1>
            </HStack>

            <Icon boxSize={6} as={RxDotFilled} color="green" />
        </div>
    );
};

export default Friend;
