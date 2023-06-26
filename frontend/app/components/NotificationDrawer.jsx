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
import Birthdays from "./Birthdays";
import Notifications from "./Notifcations";

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
                <DrawerHeader>
                    <DrawerCloseButton />
                </DrawerHeader>
                <DrawerBody>
                    <VStack>
                        <div
                            className={`${componentsBg} text-lg w-full flex flex-col p-2 rounded-xl shadow-custom overflow-hidden`}
                        >
                            <HStack
                                p={2}
                                gap={3}
                                rounded="md"
                                _hover={{
                                    bg: isDarked ? "#383d69" : "gray.200",
                                }}
                                cursor="pointer"
                            >
                                <img src="/friends-icon.png" className="w-8" />
                                <Text fontWeight="semibold" fontSize="sm">
                                    Friends
                                </Text>
                            </HStack>
                            <HStack
                                p={2}
                                gap={3}
                                rounded="md"
                                _hover={{
                                    bg: isDarked ? "#383d69" : "gray.200",
                                }}
                                cursor="pointer"
                            >
                                <img src="/group-icon.png" className="w-8" />
                                <Text fontWeight="semibold" fontSize="sm">
                                    Community
                                </Text>
                            </HStack>
                            <HStack
                                p={2}
                                gap={3}
                                rounded="md"
                                _hover={{
                                    bg: isDarked ? "#383d69" : "gray.200",
                                }}
                                cursor="pointer"
                            >
                                <img src="/bookmark-icon.png" className="w-8" />
                                <Text fontWeight="semibold" fontSize="sm">
                                    Saved
                                </Text>
                            </HStack>
                            <HStack
                                p={2}
                                gap={3}
                                rounded="md"
                                _hover={{
                                    bg: isDarked ? "#383d69" : "gray.200",
                                }}
                                cursor="pointer"
                            >
                                <img src="/store-icon.png" className="w-8" />
                                <Text fontWeight="semibold" fontSize="sm">
                                    Marketplace
                                </Text>
                            </HStack>
                        </div>

                        <Birthdays
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
