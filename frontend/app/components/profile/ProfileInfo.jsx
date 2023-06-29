"use client";
import { Avatar, Button, HStack, useDisclosure } from "@chakra-ui/react";
import { FaShare, FaBirthdayCake } from "react-icons/fa";
import { FiEdit, FiCamera } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { BsPersonFill, BsFacebook, BsInstagram, BsGlobe } from "react-icons/bs";
import Link from "next/link";
import EditProfileModal from "../modal/EditProfileModal";
import ProfilePic from "./ProfilePic";

const ProfileInfo = ({ componentsBg, params, isOtherProfile }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div
                className={`relative lg:sticky lg:top-[9rem] lg:mt-[-7rem] w-[18rem] lg:w-[20rem] lg:flex flex-col items-center lg:gap-3`}
            >
                <div
                    className={`relative ${componentsBg} w-full flex flex-col items-center p-6 rounded-lg shadow-md`}
                >
                    <ProfilePic />
                    {/* <Avatar size="2xl" src="/tzuyu.jpg" mt="-20" border="2px" /> */}
                    <small className="tracking-wider text-gray-400 my-1">
                        @{params.username}
                    </small>
                    <h1 className="text-xl font-bold">{params.username}</h1>
                    <HStack gap={7} mt={2}>
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">56</p>
                            <p className="text-sm text-gray-400">Following</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">5183</p>
                            <p className="text-sm text-gray-400">Followers</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">84.7K</p>
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
                        <MdLocationOn fontSize={18} />
                        <p className="text-sm">Nueva Ecija, Philippines</p>
                    </HStack>
                    <HStack>
                        <BsPersonFill fontSize={18} />
                        <p className="text-sm">Male</p>
                    </HStack>
                    <HStack>
                        <FaBirthdayCake fontSize={18} />
                        <p className="text-sm">June 20, 2023</p>
                    </HStack>
                </div>

                <div
                    className={`${componentsBg} w-full flex flex-col gap-2 px-6 py-4 rounded-lg shadow-md`}
                >
                    <p className="text-lg font-semibold">
                        Other Social accounts
                    </p>
                    <HStack>
                        <BsFacebook fontSize={16} />
                        <Link href="#">
                            <p className="text-sm text-blue-600 hover:underline">
                                {params.username}
                            </p>
                        </Link>
                    </HStack>
                    <HStack>
                        <BsInstagram fontSize={16} />
                        <Link href="#">
                            <p className="text-sm text-blue-600 hover:underline">
                                {params.username}
                            </p>
                        </Link>
                    </HStack>
                    <HStack>
                        <BsGlobe fontSize={16} />
                        <Link href="#">
                            <p className="text-sm text-blue-600 hover:underline">
                                {params.username}
                            </p>
                        </Link>
                    </HStack>
                </div>
            </div>

            <EditProfileModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default ProfileInfo;
