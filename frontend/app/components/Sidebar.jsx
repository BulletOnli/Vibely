import { Button, Spacer, VStack, Stack, HStack } from "@chakra-ui/react";
import ProfileTab from "./ProfileTab";
import { FaSignOutAlt } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";

const Sidebar = () => {
    return (
        <div className="sticky top-[6.6rem] z-50 w-[22rem] h-[85vh] flex flex-col">
            <ProfileTab />
            <Spacer />
            <VStack gap={2} mt={8}>
                <p className="font-semibold w-full flex items-center justify-center gap-1 text-center p-2 bg-white rounded-lg shadow-custom hover:bg-gray-100 cursor-pointer">
                    <BsFillGearFill />
                    Settings and Privacy
                </p>

                <p className="font-semibold w-full flex items-center justify-center gap-1 text-center p-2 bg-white rounded-lg shadow-custom hover:bg-gray-100 cursor-pointer">
                    <FaSignOutAlt />
                    Help
                </p>
                <Button rightIcon={<FaSignOutAlt />} colorScheme="red" w="full">
                    Log out
                </Button>
            </VStack>
        </div>
    );
};

export default Sidebar;
