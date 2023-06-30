"use client";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";

const RegisterForm = () => {
    const toast = useToast();
    const [personalDetails, setPersonalDetails] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalDetails((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/user/login",
                personalDetails
            );
            localStorage.setItem("vibelyToken", response.data.token);
            console.log(response.data);

            setPersonalDetails({});
            toast({
                title: "Account Created successfuly!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Oops! Something went wrong.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    };

    return (
        <FormControl as="form" mt={4} onSubmit={handleSubmit}>
            <HStack mt={2}>
                <Input
                    id="firstName"
                    required
                    name="firstName"
                    placeholder="First Name"
                    autoComplete="off"
                    onChange={handleChange}
                />
                <Input
                    id="lastName"
                    required
                    name="lastName"
                    placeholder="Last Name"
                    autoComplete="off"
                    onChange={handleChange}
                />
            </HStack>
            <VStack mt={3}>
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <BsFillPersonFill className="text-gray-500 text-lg" />
                    </InputLeftElement>
                    <Input
                        id="username"
                        required
                        name="username"
                        placeholder="Username"
                        autoComplete="off"
                        onChange={handleChange}
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <BsShieldLockFill className="text-gray-500 text-lg" />
                    </InputLeftElement>
                    <Input
                        id="password"
                        required
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <BsShieldLockFill className="text-gray-500 text-lg" />
                    </InputLeftElement>
                    <Input
                        id="confirmPassword"
                        required
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                    />
                </InputGroup>
            </VStack>
            <HStack mt={4}>
                <Flex w="full" direction="column">
                    <FormLabel fontSize="sm" fontWeight="normal" mb={1}>
                        Gender
                    </FormLabel>
                    <Select id="gender" name="gender" onChange={handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Select>
                </Flex>
                <Flex w="full" direction="column">
                    <FormLabel fontSize="sm" fontWeight="normal" mb={1}>
                        Birthday
                    </FormLabel>
                    <Input
                        id="birthday"
                        required
                        name="birthday"
                        placeholder="Select Date"
                        size="md"
                        type="date"
                        onChange={handleChange}
                    />
                </Flex>
            </HStack>
            <Button type="submit" colorScheme="telegram" w="full" mt={4}>
                Register
            </Button>
        </FormControl>
    );
};

export default RegisterForm;
