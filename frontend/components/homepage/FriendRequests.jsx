import { getRequest } from "@/lib/utils/fetcher";
import {
    HStack,
    Avatar,
    VStack,
    Button,
    Spacer,
    Flex,
    Image,
    IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import useSWR from "swr";

const FriendRequests = ({ isDarked, componentsBg }) => {
    const [requestList, setRequestList] = useState([]);

    //todo: may duplicate name, idk why
    const friendRequestsQuery = useSWR("/user/friends/list", getRequest);

    const getRequestorName = async (id) => {
        const response = await axios.get(
            `https://vibelybackend-1-a9532540.deta.app/user?id=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "vibelyToken"
                    )}`,
                },
            }
        );

        return response.data;
    };

    useEffect(() => {
        // get the requestor detials
        if (friendRequestsQuery.data?.length >= 1) {
            Promise.all(
                friendRequestsQuery.data?.map((request) =>
                    getRequestorName(request.senderId)
                )
            ).then((res) => setRequestList([...res]));
        }
    }, [friendRequestsQuery.data]);

    return (
        <div
            className={`${componentsBg} w-full flex flex-col p-4 rounded-xl shadow-custom`}
        >
            <h1
                className={`${
                    isDarked ? "text-[#f5f5f5]" : "text-black"
                } text-lg w-full text-start font-semibold mb-4`}
            >
                Wishing to be your friend
            </h1>

            <Flex direction="column" gap={3}>
                {requestList.map((request) => (
                    <HStack w="full" key={request.key}>
                        <HStack>
                            <Avatar size="sm" name={request.firstName} />
                            <h1 className="text-sm font-semibold">
                                {request.firstName} {request.lastName}
                            </h1>
                        </HStack>
                        <Spacer />
                        <IconButton
                            size="xs"
                            colorScheme="blue"
                            icon={<BsCheck2 size={18} />}
                        />

                        <IconButton
                            size="xs"
                            colorScheme="red"
                            icon={<AiOutlineClose size={18} />}
                        />
                    </HStack>
                ))}
            </Flex>
        </div>
    );
};

export default FriendRequests;
