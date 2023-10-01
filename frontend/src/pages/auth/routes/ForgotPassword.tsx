import { useState } from "react";

import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

import { AuthError, useAuth } from "../../../providers";

export const ForgotPassword = () => {
  const { forgotPassword } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = (email: string) => {
    forgotPassword(email)
      .then(() => setSuccess(true))
      .catch((error) => {
        setSuccess(false);

        if (error instanceof AuthError) {
          return setError(error.message);
        }

        throw error;
      });
  };

  return (
    <main>
      <h2>Forgot Password</h2>

      {success ? (
        <p>If an account with that email exists, a password reset link will be sent to it.</p>
      ) : (
        <>
          <ForgotPasswordForm onForgotPassword={handleForgotPassword} />

          <p>{error}</p>
        </>
      )}
    </main>
  );
};
