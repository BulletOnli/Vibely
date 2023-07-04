import {
    FormControl,
    Textarea,
    Button,
    HStack,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { CgCloseO } from "react-icons/cg";

const CreatePostTab = ({ isDarked, componentsBg }) => {
    const toast = useToast();
    const [previewImage, setPreviewImage] = useState("");

    const handleImgUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        try {
            const response = await axios.post(
                "http://localhost:8080/user/create/post",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "vibelyToken"
                        )}`,
                    },
                }
            );
            toast({
                title: "You've created a post",
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
        <div
            className={`${componentsBg} relative w-full flex flex-col items-center p-4 rounded-xl shadow-md`}
        >
            <h1 className="font-bold text-xl mb-2">Make a Vibely Post</h1>
            <FormControl as="form" onSubmit={handleSubmit}>
                <Textarea
                    placeholder="Share your thoughts..."
                    mb={2}
                    resize="none"
                    name="caption"
                />
                {previewImage && (
                    <div className="relative flex justify-center items-center p-2 gap-2 border border-gray-200 rounded-md mb-3">
                        <img
                            src={previewImage}
                            alt="Image Preview"
                            className="w-[20%]"
                        />
                        <CgCloseO
                            className="absolute top-2 right-2 text-xl text-gray-500 cursor-pointer"
                            onClick={() => setPreviewImage("")}
                        />
                    </div>
                )}
                <HStack w="full">
                    <Button colorScheme="messenger">
                        <label htmlFor="uploadPhoto">
                            <BiImageAdd size={24} />
                        </label>
                        <input
                            onChange={handleImgUpload}
                            name="uploadPhoto"
                            type="file"
                            accept="image/*"
                            id="uploadPhoto"
                            className="hidden"
                        />
                    </Button>
                    <Button type="submit" w="full" colorScheme="messenger">
                        Post
                    </Button>
                </HStack>
            </FormControl>
        </div>
    );
};

export default CreatePostTab;
