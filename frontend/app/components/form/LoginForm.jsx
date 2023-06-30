"use client";
import {
    Button,
    Checkbox,
    FormControl,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";

const LoginForm = () => {
    const toast = useToast();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/user/register",
                { username, password }
            );
            localStorage.setItem("vibelyToken", response.data.token);

            setUsername("");
            setPassword("");
            toast({
                title: "Login Success!",
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
        <FormControl as="form" mt={6} onSubmit={handleSubmit}>
            <InputGroup mt={2}>
                <InputLeftElement pointerEvents="none">
                    <BsFillPersonFill className="text-gray-500 text-lg" />
                </InputLeftElement>
                <Input
                    id="loginUsername"
                    required
                    placeholder="Username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </InputGroup>

            <InputGroup mt={2}>
                <InputLeftElement pointerEvents="none">
                    <BsShieldLockFill className="text-gray-500 text-lg" />
                </InputLeftElement>
                <Input
                    id="loginPassword"
                    required
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </InputGroup>

            <HStack w="full" my={3}>
                <Checkbox size="sm">Remember me</Checkbox>
                <Spacer />
                <p className="text-[13px] text-blue-800">Forgot Password?</p>
            </HStack>
            <Button type="submit" colorScheme="telegram" w="full">
                Log in
            </Button>
        </FormControl>
    );
};

export default LoginForm;
