import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const PostSkeleton = () => {
    return (
        <Box w="full" padding="6" boxShadow="lg" bg="white" rounded="xl">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
    );
};

export default PostSkeleton;
