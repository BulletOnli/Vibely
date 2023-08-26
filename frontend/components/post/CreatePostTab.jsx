import {
    FormControl,
    Textarea,
    Button,
    HStack,
    useToast,
    Image,
} from "@chakra-ui/react";
import { memo, useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { CgCloseO } from "react-icons/cg";
import { postRequest } from "@/lib/utils/fetcher";

const CreatePostTab = memo(({ isDarked, componentsBg, mutate }) => {
    const toast = useToast();
    const postPhotoRef = useRef(null);
    const [previewImage, setPreviewImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [inputCaption, setInputCaption] = useState("");

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

    const handleRemoveImg = () => {
        setPreviewImage("");
        postPhotoRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);
            setIsLoading(true);
            await postRequest("/post/create", data);
            mutate();

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
        } finally {
            setIsLoading(false);
            setInputCaption("");
            setPreviewImage("");
            postPhotoRef.current.value = "";
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
                    name="caption"
                    onChange={(e) => setInputCaption(e.target.value)}
                    value={inputCaption}
                    required
                    maxHeight="10rem"
                />
                {previewImage && (
                    <div className="relative flex justify-center items-center p-2 gap-2 border border-gray-200 rounded-md mb-3">
                        <Image
                            src={previewImage}
                            alt="Image Preview"
                            className="w-[20%]"
                        />
                        <CgCloseO
                            className="absolute top-2 right-2 text-xl text-gray-500 cursor-pointer"
                            onClick={handleRemoveImg}
                        />
                    </div>
                )}
                <HStack w="full">
                    <Button colorScheme="messenger">
                        <label htmlFor="photo">
                            <BiImageAdd size={24} />
                        </label>
                        <input
                            ref={postPhotoRef}
                            onChange={handleImgUpload}
                            name="photo"
                            type="file"
                            accept="image/*"
                            id="photo"
                            className="hidden"
                        />
                    </Button>
                    <Button
                        type="submit"
                        w="full"
                        colorScheme="messenger"
                        isLoading={isLoading}
                        spinnerPlacement="start"
                    >
                        Post
                    </Button>
                </HStack>
            </FormControl>
        </div>
    );
});

CreatePostTab.displayName = "CreatePostTab";

export default CreatePostTab;
