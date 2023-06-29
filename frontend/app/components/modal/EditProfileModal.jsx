import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
    VStack,
    Flex,
    HStack,
    Select,
    Avatar,
} from "@chakra-ui/react";

const EditProfileModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />

                <ModalBody pb={6}>
                    <FormControl>
                        <h1 className="w-full mb-2 text-lg font-bold">
                            Personal Information
                        </h1>
                        <HStack>
                            <Flex w="full" direction="column">
                                <FormLabel mb={1}>First name</FormLabel>
                                <Input
                                    size="sm"
                                    placeholder="First name"
                                    autoComplete="off"
                                    mb={2}
                                />
                            </Flex>
                            <Flex w="full" direction="column">
                                <FormLabel mb={1}>Last name</FormLabel>
                                <Input
                                    size="sm"
                                    placeholder="Last name"
                                    autoComplete="off"
                                    mb={2}
                                />
                            </Flex>
                        </HStack>
                        <HStack>
                            <Flex w="full" direction="column">
                                <FormLabel mb={1}>Location</FormLabel>
                                <Input
                                    size="sm"
                                    placeholder="Location"
                                    autoComplete="off"
                                    mb={2}
                                />
                            </Flex>
                            <Flex w="full" direction="column">
                                <FormLabel mb={1}>Birthday</FormLabel>
                                <Input
                                    size="sm"
                                    placeholder="Birthday"
                                    autoComplete="off"
                                    mb={2}
                                    type="date"
                                />
                            </Flex>
                        </HStack>
                        <FormLabel mb={1}>Gender</FormLabel>
                        <Select size="sm" id="gender" name="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Select>

                        <h1 className="w-full mt-4 mb-2 text-lg font-bold">
                            Social accounts
                        </h1>
                        <FormLabel mb={1}>Facebook</FormLabel>
                        <Input
                            size="sm"
                            placeholder="Facebook"
                            autoComplete="off"
                            mb={2}
                        />
                        <FormLabel mb={1}>Instagram</FormLabel>
                        <Input
                            size="sm"
                            placeholder="Instagram"
                            autoComplete="off"
                            mb={2}
                        />
                        <FormLabel mb={1}>Website</FormLabel>
                        <Input
                            size="sm"
                            placeholder="Website"
                            autoComplete="off"
                            mb={2}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileModal;
