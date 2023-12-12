import { Box, Flex, Text, Heading, Link, Stack, useColorModeValue } from "@chakra-ui/react";

import { Link as ReactRouterLink, redirect } from "react-router-dom";

import { useState } from "react";

import { LoginForm } from "../components/LoginForm";

import { isAuthError, useAuth } from "../../../providers";

export const Login = () => {
  const { login } = useAuth();

  const [error, setError] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    login(email, password)
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
          Sign in to your account
        </Heading>

        <Box bg={useColorModeValue("white", "gray.700")} boxShadow="lg" p={8} rounded="lg">
          <Stack spacing={4}>
            <LoginForm onLogin={handleLogin} />

            {error && (
              <Box color="red.500" fontSize="sm" fontWeight={500}>
                {error}
              </Box>
            )}
          </Stack>
        </Box>

        <Flex justify="center">
          <Link as={ReactRouterLink} color="teal.400" fontWeight={500} to="/forgot-password">
            Forgot password?
          </Link>
          <Text mx="3">/</Text>
          <Link as={ReactRouterLink} color="teal.400" fontWeight={500} to="/register">
            Register
          </Link>
        </Flex>
      </Stack>
    </Flex>
  );
};
