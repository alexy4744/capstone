import { Box, Button, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";

import { useState } from "react";

import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

import { isAuthError, useAuth } from "../../../providers";

export const ForgotPassword = () => {
  const { forgotPassword } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = (email: string) => {
    forgotPassword(email)
      .then(() => setSuccess(true))
      .catch((error) => {
        setSuccess(false);

        if (isAuthError(error)) {
          return setError(error.message);
        }

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
          Forgot your password?
        </Heading>

        <Box bg={useColorModeValue("white", "gray.700")} boxShadow="lg" p={8} rounded="lg">
          <Stack spacing={4}>
            {success ? (
              <>
                <Text>
                  If an account with that email exists, we sent you an email with instructions on
                  how to reset your password.
                </Text>

                <Button as={ReactRouterLink} colorScheme="teal" to="/login">
                  Back to login
                </Button>
              </>
            ) : (
              <>
                <ForgotPasswordForm onForgotPassword={handleForgotPassword} />

                {error && (
                  <Box color="red.500" fontSize="sm" fontWeight={500}>
                    {error}
                  </Box>
                )}
              </>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
