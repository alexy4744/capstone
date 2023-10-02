import { Button, FormErrorMessage, FormLabel, FormControl, Input, Stack } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

type RegisterFormProps = {
  onRegister: (firstName: string, lastName: string, email: string, password: string) => unknown;
};

type RegisterFormValues = {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterFormValues>();

  const submitHandler = ({ email, firstName, lastName, password }: RegisterFormValues) => {
    return onRegister(firstName, lastName, email, password);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={4}>
        <Stack direction="row">
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>

            <Input
              id="firstName"
              type="text"
              placeholder="First Name"
              {...register("firstName", {
                required: "First name is required",
              })}
            />

            {errors.firstName && <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>

            <Input
              id="lastName"
              type="text"
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />

            {errors.lastName && <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>}
          </FormControl>
        </Stack>

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

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>

          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />

          {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>

          <Input
            id="confirm-password"
            type="password"
            placeholder="Password"
            {...register("confirmPassword", {
              required: "Password confirmation is required",
              validate: (value, form) => {
                if (value !== form.password) {
                  return "Passwords do not match";
                }

                return true;
              },
            })}
          />

          {errors.confirmPassword && (
            <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
          Register
        </Button>
      </Stack>
    </form>
  );
};
