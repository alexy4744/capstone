import { FormErrorMessage, FormLabel, FormControl, Input, Button } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

type LoginFormProps = {
  onLogin: (email: string, password: string) => unknown;
};

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>();

  const submitHandler = ({ email, password }: LoginFormValues) => onLogin(email, password);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
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
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>

        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Login
      </Button>
    </form>
  );
};
