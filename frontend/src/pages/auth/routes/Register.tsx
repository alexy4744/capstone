import { redirect } from "react-router-dom";
import { useState } from "react";

import { RegisterForm } from "../components/RegisterForm";

import { AuthError, useAuth } from "../../../providers";

export const Register = () => {
  const { register } = useAuth();

  const [error, setError] = useState<string | null>(null);

  const handleRegister = (firstName: string, lastName: string, email: string, password: string) => {
    const displayName = `${firstName.trim()} ${lastName.trim()}`;

    register(displayName, email, password)
      .then(() => redirect("/"))
      .catch((error) => {
        if (error instanceof AuthError) {
          return setError(error.message);
        }

        throw error;
      });
  };

  return (
    <main>
      <h2>Register</h2>

      <RegisterForm onRegister={handleRegister} />

      <p>{error}</p>
    </main>
  );
};
