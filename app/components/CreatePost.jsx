import { Avatar, FormControl, Textarea, Button } from "@chakra-ui/react";

const CreatePost = () => {
    return (
        <div className="relative w-full flex flex-col items-center p-4 bg-white rounded-xl shadow-md">
            {/* <Avatar size="sm" name="Gemmuel" pos="absolute" left={4} /> */}
            <h1 className="font-bold text-xl mb-4">Make a Post</h1>
            <FormControl>
                <Textarea
                    placeholder="What's on your mind"
                    mb={3}
                    resize="none"
                />
                <Button w="full" colorScheme="telegram">
                    Post
                </Button>
            </FormControl>
        </div>
    );
};

export default CreatePost;
