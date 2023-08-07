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
    FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { loginUser, postRequest } from "@/lib/utils/fetcher";
import { useUserStore } from "@/lib/zustandStore/userStore";

const LoginForm = () => {
    const router = useRouter();
    const toast = useToast();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const getCurrentAccount = useUserStore((state) => state.getCurrentAccount);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsError(false);
            setIsLoading(true);

            await loginUser("/user/login", { username, password });
            mutate("/user/login");
            getCurrentAccount();
            setIsLoading(false);
            setUsername("");
            setPassword("");
            router.push("/");
            toast({
                title: "Login Success!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        } catch (error) {
            console.log(error.response.data.message);
            setIsLoading(false);
            setIsError(true);
            toast({
                title: `Oops! ${error.response.data.message}.`,
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
            mt={6}
            onSubmit={handleSubmit}
            isInvalid={isError}
        >
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
            <Button
                type="submit"
                colorScheme="telegram"
                w="full"
                isLoading={isLoading}
                spinnerPlacement="start"
            >
                Log in
            </Button>
        </FormControl>
    );
};

export default LoginForm;
