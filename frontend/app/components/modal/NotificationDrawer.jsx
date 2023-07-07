"use client";
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

import Notifications from "../Notifcations";
import Leaderboards from "../Leaderboards";
import { useThemeStore } from "../../store/themeStore";

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
                        <Notifications
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
