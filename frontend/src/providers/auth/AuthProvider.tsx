import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

import {
  EmailAuthProvider,
  confirmPasswordReset,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  verifyPasswordResetCode,
} from "firebase/auth";

import { AuthContext, CurrentUser } from "./auth-context";

import { useFirebase } from "../firebase/firebase-context";
import { AuthError } from "./auth-error";

type AuthProviderProps = PropsWithChildren<{
  loadingFallback?: ReactNode;
}>;

export const AuthProvider = ({ children, loadingFallback }: AuthProviderProps) => {
  const { auth } = useFirebase();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [ready, setReady] = useState(false);

  const changePassword = async (oldPassword: string, newPassword: string) => {
    const { currentUser } = auth;

    if (!currentUser?.email) {
      throw new Error("User is not signed in.");
    }

    const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);

    await reauthenticateWithCredential(currentUser, credential);
    await updatePassword(currentUser, newPassword);
  };

  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      switch (error.code) {
        // Treat these errors as a success to prevent user enumeration.
        case "auth/invalid-email":
        case "auth/user-not-found":
          return;
        default:
          throw error;
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/wrong-password":
        case "auth/user-not-found":
          throw new AuthError(error.code, "Invalid email or password.");
        case "auth/user-disabled":
          throw new AuthError(
            error.code,
            "Your account has been disabled, please contact support."
          );
        default:
          throw error;
      }
    }
  };

  const logout = async () => {
    await auth.signOut();
  };

  const resetPassword = async (code: string, newPassword: string) => {
    try {
      await verifyPasswordResetCode(auth, code);

      await confirmPasswordReset(auth, code, newPassword);
    } catch (error: any) {
      switch (error.code) {
        case "auth/weak-password":
          throw new AuthError(
            error.code,
            "Your password is too weak. Passwords must be at least 6 characters long."
          );
        case "auth/expired-action-code":
        case "auth/invalid-action-code":
          throw new AuthError(
            error.code,
            "Your password reset link has expired. Please request a new one."
          );
        default:
          throw error;
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(
        user && {
          displayName: user.displayName || "",
          email: user.email || "",
          id: user.uid,
        }
      );

      setReady(user !== null);
    });

    return unsubscribe;
  }, [auth]);

  return (
    <AuthContext.Provider
      children={ready ? children : loadingFallback}
      value={{
        changePassword,
        currentUser,
        forgotPassword,
        login,
        logout,
        resetPassword,
      }}
    />
  );
};
