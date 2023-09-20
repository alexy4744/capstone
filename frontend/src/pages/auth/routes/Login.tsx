import { useState } from "react";

import { LoginForm } from "../components/LoginForm";

import { AuthError, useAuth } from "../../../providers";
import { redirect } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();

  const [error, setError] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    login(email, password)
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
      <h2>Login</h2>

      <LoginForm onLogin={handleLogin} />

      <p>{error}</p>
    </main>
  );
};
