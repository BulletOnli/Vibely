import { Avatar, Button, HStack, useDisclosure } from "@chakra-ui/react";
import { FaShare, FaBirthdayCake } from "react-icons/fa";
import { FiEdit, FiCamera } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { BsPersonFill, BsFacebook, BsInstagram, BsGlobe } from "react-icons/bs";
import Link from "next/link";
import EditProfileInfoModal from "../modal/EditProfileInfoModal";
import ProfilePic from "./ProfilePic";
import { getRequest } from "@/app/api/fetcher";

const ProfileInfo = ({ data, componentsBg, params, isOtherProfile }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // const profilePic = useSWR(`/user/profile/pic/${username}`, getRequest);

    return (
        <>
            <div
                className={`relative lg:sticky lg:top-[9rem] lg:mt-[-7rem] w-[18rem] lg:w-[20rem] lg:flex flex-col items-center lg:gap-3`}
            >
                <div
                    className={`relative ${componentsBg} w-full flex flex-col items-center p-6 rounded-lg shadow-md`}
                >
                    <ProfilePic
                        firstName={data?.firstName}
                        isOtherProfile={isOtherProfile}
                    />
                    <small className="tracking-wider text-gray-400 my-1">
                        @{data?.username}
                    </small>
                    <h1 className="text-xl font-bold">
                        {data?.firstName} {data?.lastName}
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
                                >
                                    Follow
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
                    className={`${componentsBg} w-full flex flex-col gap-2 px-6 py-4 rounded-lg shadow-md`}
                >
                    <p className="text-lg font-semibold">
                        Personal Information
                    </p>
                    <HStack>
                        <BsPersonFill fontSize={18} />
                        <p className="text-sm">{data?.gender}</p>
                    </HStack>
                    <HStack>
                        <FaBirthdayCake fontSize={18} />
                        <p className="text-sm">{data?.birthday}</p>
                    </HStack>
                </div>

                {/* <div
                    className={`${componentsBg} w-full flex flex-col gap-2 px-6 py-4 rounded-lg shadow-md`}
                >
                    <p className="text-lg font-semibold">
                        Other Social accounts
                    </p>
                    <HStack>
                        <BsFacebook fontSize={16} />
                        <Link href="#">
                            <p className="text-sm text-blue-600 hover:underline">
                                {username}
                            </p>
                        </Link>
                    </HStack>
                    <HStack>
                        <BsInstagram fontSize={16} />
                        <Link href="#">
                            <p className="text-sm text-blue-600 hover:underline">
                                {username}
                            </p>
                        </Link>
                    </HStack>
                    <HStack>
                        <BsGlobe fontSize={16} />
                        <Link href="#">
                            <p className="text-sm text-blue-600 hover:underline">
                                {username}
                            </p>
                        </Link>
                    </HStack>
                </div> */}
            </div>

            <EditProfileInfoModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default ProfileInfo;
