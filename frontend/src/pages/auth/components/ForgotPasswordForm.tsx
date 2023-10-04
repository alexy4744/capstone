import { Button, FormErrorMessage, FormLabel, FormControl, Input, Stack } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

type ForgotPasswordFormProps = {
  onForgotPassword: (email: string) => unknown;
};

type ForgotPasswordFormValues = {
  email: string;
};

export const ForgotPasswordForm = ({ onForgotPassword }: ForgotPasswordFormProps) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormValues>();

  const submitHandler = ({ email }: ForgotPasswordFormValues) => onForgotPassword(email);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>

          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email address is required",
              validate: (value) => {
                const pattern = /\S+@\S+\.\S+/;

                if (!pattern.test(value)) {
                  return "Email address is invalid";
                }

                return true;
              },
            })}
          />

          {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
        </FormControl>

        <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};
