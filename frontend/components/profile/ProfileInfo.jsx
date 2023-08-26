import { Button, HStack, useDisclosure, useToast } from "@chakra-ui/react";
import { FaShare, FaBirthdayCake } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BsPersonFill } from "react-icons/bs";
import EditProfileInfoModal from "../modal/EditProfileInfoModal";
import ProfilePic from "./ProfilePic";
import { useState } from "react";
import { postRequest } from "@/lib/utils/fetcher";

const ProfileInfo = ({ userData, componentsBg, params, isOtherProfile }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const addFriend = async (userId) => {
        try {
            setIsLoading(true);
            const res = await postRequest(`/user/friends/add?id=${userId}`);
            mutate("/user/friends");
            setIsLoading(false);

            toast({
                title: res.toastNotify,
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast({
                title: error?.response?.data?.message?.replace(/that/g, "this"),
                status: "warning",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    };

    return (
        <>
            <div
                className={`relative lg:sticky lg:top-[9rem] lg:mt-[-7rem] w-[18rem] lg:w-[20rem] lg:flex flex-col items-center lg:gap-3`}
            >
                <div
                    className={`relative ${componentsBg} w-full flex flex-col items-center p-6 rounded-lg shadow-md mt-2 lg:mt-0`}
                >
                    <ProfilePic
                        userData={userData}
                        isOtherProfile={isOtherProfile}
                    />
                    <small className="tracking-wider text-gray-400 my-1">
                        @{userData?.username}
                    </small>
                    <h1 className="text-xl font-bold">
                        {userData?.firstName} {userData?.lastName}
                    </h1>
                    <HStack gap={7} mt={2}>
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">0</p>
                            <p className="text-sm text-gray-400">Following</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">0</p>
                            <p className="text-sm text-gray-400">Followers</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">0</p>
                            <p className="text-sm text-gray-400">Likes</p>
                        </div>
                    </HStack>

                    <HStack mt={5}>
                        {isOtherProfile ? (
                            <>
                                <Button
                                    w="6rem"
                                    size="sm"
                                    colorScheme="telegram"
                                    isLoading={isLoading}
                                    spinnerPlacement="start"
                                    onClick={() => addFriend(userData.key)}
                                >
                                    Add Friend
                                </Button>
                                <Button
                                    w="6rem"
                                    size="sm"
                                    colorScheme="telegram"
                                    isDisabled
                                >
                                    Message
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    w="36"
                                    size="sm"
                                    colorScheme="telegram"
                                    leftIcon={<FiEdit />}
                                    onClick={onOpen}
                                >
                                    Edit Profile
                                </Button>
                                <Button size="sm" colorScheme="telegram">
                                    <FaShare fontSize="16px" />
                                </Button>
                            </>
                        )}
                    </HStack>
                </div>

                <div
                    className={`${componentsBg} w-full flex flex-col gap-2 px-6 py-4 rounded-lg shadow-md mt-3 lg:mt-0`}
                >
                    <p className="text-lg font-semibold">
                        Personal Information
                    </p>
                    <HStack>
                        <BsPersonFill fontSize={18} />
                        <p className="text-sm">{userData?.gender}</p>
                    </HStack>
                    <HStack>
                        <FaBirthdayCake fontSize={18} />
                        <p className="text-sm">{userData?.birthday}</p>
                    </HStack>
                </div>

                <div
                    className={`${componentsBg} w-full flex flex-col gap-2 px-6 py-4 rounded-lg shadow-md`}
                >
                    <p className="text-lg font-semibold">
                        Personal Information
                    </p>
                    <HStack>
                        <BsPersonFill fontSize={18} />
                        <p className="text-sm">{userData?.gender}</p>
                    </HStack>
                    <HStack>
                        <FaBirthdayCake fontSize={18} />
                        <p className="text-sm">{userData?.birthday}</p>
                    </HStack>
                </div>
            </div>

            <EditProfileInfoModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};
export default ProfileInfo;
