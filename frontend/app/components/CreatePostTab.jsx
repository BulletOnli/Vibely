import { Avatar, FormControl, Textarea, Button } from "@chakra-ui/react";
import { useThemeStore } from "../store/themeStore";

const CreatePostTab = () => {
    const { isDarked } = useThemeStore();
    const darkMode = isDarked ? "bg-[#242850]" : "bg-white";

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
                <Button w="full" colorScheme="messenger">
                    Post
                </Button>
            </FormControl>
        </div>
    );
};

export default CreatePostTab;
