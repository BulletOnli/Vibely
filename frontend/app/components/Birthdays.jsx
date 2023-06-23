import { Avatar, HStack, VStack } from "@chakra-ui/react";

const Birthdays = ({ isDarked, componentsBg }) => {
    return (
        <div
            className={`${componentsBg} w-full flex flex-col items-center p-4 rounded-xl shadow-custom`}
        >
            <h1
                className={`${
                    isDarked ? "text-[#f5f5f5]" : "text-black"
                } text-lg w-full text-start font-bold mb-2`}
            >
                Today's Birthday
            </h1>

            <VStack>
                <p
                    className={`${
                        isDarked ? "text-gray-300" : "text-gray-800"
                    } w-full text-center font-semibold rounded-md cursor-pointer`}
                >
                    Gemmuel Dela Pena
                </p>
            </VStack>
        </div>
    );
};

export default Birthdays;
