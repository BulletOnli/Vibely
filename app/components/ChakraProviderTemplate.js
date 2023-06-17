"use client";

import { ChakraProvider } from "@chakra-ui/react";

const ChakraProviderTemplate = ({ children }) => {
    return <ChakraProvider>{children}</ChakraProvider>;
};

export default ChakraProviderTemplate;
