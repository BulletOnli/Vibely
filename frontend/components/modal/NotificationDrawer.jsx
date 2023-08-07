import {
    Button,
    VStack,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    DrawerHeader,
    HStack,
    Text,
} from "@chakra-ui/react";

import Notifications from "../homepage/Notifcations";
import Leaderboards from "../homepage/Leaderboards";
import { useThemeStore } from "../../lib/zustandStore/themeStore";
import FriendRequests from "../homepage/FriendRequests";
import FriendsList from "../homepage/FriendsList";

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
            >
                <DrawerHeader>
                    <DrawerCloseButton />
                </DrawerHeader>
                <DrawerBody>
                    <VStack>
                        <Leaderboards
                            isDarked={isDarked}
                            componentsBg={componentsBg}
                        />
                        <FriendRequests
                            isDarked={isDarked}
                            componentsBg={componentsBg}
                        />

                        <FriendsList
                            isDarked={isDarked}
                            componentsBg={componentsBg}
                        />
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default NotificationDrawer;
