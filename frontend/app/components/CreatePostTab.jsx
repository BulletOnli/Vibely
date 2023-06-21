import {
    Avatar,
    FormControl,
    Textarea,
    Button,
    HStack,
    Input,
} from "@chakra-ui/react";
import { useThemeStore } from "../store/themeStore";
import { useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { CgCloseO } from "react-icons/cg";

const CreatePostTab = () => {
    const { isDarked } = useThemeStore();
    const darkMode = isDarked ? "bg-[#242850]" : "bg-white";
    const inputImgRef = useRef(null);
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

    return (
        <div
            className={`${darkMode} relative w-full flex flex-col items-center p-4 rounded-xl shadow-md`}
        >
            <h1 className="font-bold text-xl mb-4">Make a Post</h1>
            <FormControl>
                <Textarea
                    placeholder="Share your thoughts..."
                    mb={3}
                    resize="none"
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
                        <label htmlFor="file-upload">
                            <BiImageAdd size={24} />
                        </label>
                    </Button>
                    <input
                        ref={inputImgRef}
                        onChange={handleImgUpload}
                        type="file"
                        accept="image/*"
                        id="file-upload"
                        className="hidden"
                    />
                    <Button w="full" colorScheme="messenger">
                        Post
                    </Button>
                </HStack>
            </FormControl>
        </div>
    );
};

export default CreatePostTab;
