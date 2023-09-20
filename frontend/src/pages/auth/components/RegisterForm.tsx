import { FormErrorMessage, FormLabel, FormControl, Input, Button } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

type RegisterFormProps = {
  onRegister: (email: string, password: string) => unknown;
};

type RegisterFormValues = {
  confirmPassword: string;
  email: string;
  password: string;
};

export const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterFormValues>();

  const submitHandler = ({ email, password }: RegisterFormValues) => onRegister(email, password);

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
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
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
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Register
      </Button>
    </form>
  );
};
