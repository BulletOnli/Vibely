"use client";
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
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
import { MdWarningAmber } from "react-icons/md";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { postRequest, registerUser } from "@/app/api/fetcher";

const RegisterForm = () => {
    const router = useRouter();
    const toast = useToast();
    const [personalDetails, setPersonalDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

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
            setIsError(false);
            setIsLoading(true);

            await registerUser("/user/register", personalDetails);
            mutate("/user/register");

            setIsLoading(false);
            setPersonalDetails({});
            router.push("/");
            toast({
                title: "Account Created successfuly!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError(true);
            setErrorMessage(error.response.data.message);
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
        <FormControl
            as="form"
            mt={4}
            onSubmit={handleSubmit}
            isInvalid={isError}
        >
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
                        <option value="">---</option>
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
            {isError &&
                errorMessage?.map((message, index) => (
                    <FormErrorMessage
                        key={index}
                        fontWeight="medium"
                        mb={-2}
                        gap={1}
                    >
                        <MdWarningAmber size={18} />
                        {message}
                    </FormErrorMessage>
                ))}
            <Button
                type="submit"
                colorScheme="telegram"
                w="full"
                mt={4}
                isLoading={isLoading}
                spinnerPlacement="start"
            >
                Register
            </Button>
        </FormControl>
    );
};

export default RegisterForm;
