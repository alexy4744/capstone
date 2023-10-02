import { Box, Flex, Heading, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";

import { Link as ReactRouterLink, redirect } from "react-router-dom";

import { useState } from "react";

import { RegisterForm } from "../components/RegisterForm";

import { isAuthError, useAuth } from "../../../providers";

export const Register = () => {
  const { register } = useAuth();

  const [error, setError] = useState<string | null>(null);

  const handleRegister = (firstName: string, lastName: string, email: string, password: string) => {
    const displayName = `${firstName.trim()} ${lastName.trim()}`;

    register(displayName, email, password)
      .then(() => redirect("/"))
      .catch((error) => {
        if (isAuthError(error)) {
          return setError(error.message);
        }

        setError("Something went wrong, please try again later.");

        throw error;
      });
  };

  return (
    <Flex
      as="main"
      bg={useColorModeValue("gray.50", "gray.800")}
      align="center"
      justify="center"
      minH="100vh"
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Heading fontSize="4xl" textAlign="center">
          Create your account
        </Heading>

        <Box bg={useColorModeValue("white", "gray.700")} boxShadow="lg" p={8} rounded="lg">
          <Stack spacing={4}>
            <RegisterForm onRegister={handleRegister} />

            {error && (
              <Box color="red.500" fontSize="sm" fontWeight={500}>
                {error}
              </Box>
            )}
          </Stack>
        </Box>

        <Flex justify="center">
          <Text marginRight={1}>Already have an account?</Text>

          <Link as={ReactRouterLink} color="teal.400" fontWeight={500} to="/login">
            Sign in
          </Link>
        </Flex>
      </Stack>
    </Flex>
  );
};
