import {
    Button,
    VStack,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import Birthdays from "./Birthdays";
import Notifications from "./Notifcations";
import { FaSignOutAlt, FaStore } from "react-icons/fa";
import { MdHelp } from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";
import { useThemeStore } from "../store/themeStore";

const NotificationDrawer = ({ isOpen, onClose }) => {
    const { isDarked } = useThemeStore();
    const componentsBg = isDarked
        ? "bg-[#242850] text-[#f5f5f5]"
        : "bg-white text-black";
    const hoverColor = isDarked ? "hover:bg-[#282E54]" : "hover:bg-gray-100";

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent
                bg={isDarked ? "#1A1F40" : "#E9ECEF"}
                color={isDarked ? "#f5f5f5" : "black"}
                p={4}
            >
                <DrawerCloseButton />
                <div className="z-50 sticky top-[6rem] w-[15rem] h-[85vh] flex flex-col gap-3">
                    <Birthdays
                        isDarked={isDarked}
                        componentsBg={componentsBg}
                    />
                    <Notifications
                        isDarked={isDarked}
                        componentsBg={componentsBg}
                    />
                    <VStack gap={2}>
                        <p
                            className={`${componentsBg}  ${hoverColor} font-semibold w-full flex items-center justify-center gap-1 text-center p-2 rounded-lg shadow-custom cursor-pointer`}
                        >
                            <BsFillGearFill />
                            Settings and Privacy
                        </p>
                        <p
                            className={`${componentsBg} ${hoverColor} font-semibold w-full flex items-center justify-center gap-1 text-center p-2 rounded-lg shadow-custom cursor-pointer`}
                        >
                            <MdHelp />
                            Help
                        </p>
                        <Button
                            rightIcon={<FaSignOutAlt />}
                            colorScheme="red"
                            w="full"
                        >
                            Log out
                        </Button>
                    </VStack>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default NotificationDrawer;
