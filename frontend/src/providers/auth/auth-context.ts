import { createContext, useContext } from "react";

export type CurrentUser = {
  /**
   * The user's display name.
   * @remarks This is not guaranteed to be unique.
   * @example "John Doe"
   */
  displayName: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * The user's unique ID.
   */
  id: string;
};

export type AuthContext = {
  /**
   * The current user, or null if no user is logged in.
   */
  currentUser: CurrentUser | null;

  /**
   * Change the current user's password.
   * @param oldPassword The user's current password
   * @param newPassword The user's new password
   * @returns A promise that resolves when the password has been changed
   * successfully, or rejects with an error message if the password change
   * failed.
   */
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;

  /**
   * Send a password reset email to the given email address.
   * @param email The email address to send the password reset email to
   * @returns A promise that resolves when the password reset email has been
   * sent successfully, or rejects with an error message if the email failed to
   * send.
   * @remarks This function will not throw an error if the email address is not
   * found in the database.
   */
  forgotPassword: (email: string) => Promise<void>;

  /**
   * Log in with the given email and password.
   * @param email The email address to log in with
   * @param password The password to log in with
   * @returns A promise that resolves if the login was successful, or rejects
   * with an error message if the login failed.
   */
  login: (email: string, password: string) => Promise<void>;

  /**
   * Log out the current user.
   * @returns A promise that resolves when the user has been logged out
   * successfully, or rejects with an error message if the logout failed. This
   * does not revoke the user's token.
   */
  logout: () => Promise<void>;

  /**
   * Register a new user with the given email and password.
   * @param email The email address to register with
   * @param password The password to register with
   * @returns A promise that resolves if the registration was successful, or rejects
   * with an error message if the registration failed.
   */
  register: (email: string, password: string) => Promise<void>;

  /**
   * Reset the user's password with the given code and new password.
   * @param code The password reset code
   * @param newPassword The new password
   * @returns A promise that resolves if the password was reset successfully,
   * or rejects with an error message if the password reset failed.
   */
  resetPassword: (code: string, newPassword: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContext>({
  currentUser: null,
  changePassword: () => Promise.reject(),
  forgotPassword: () => Promise.reject(),
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
  register: () => Promise.reject(),
  resetPassword: () => Promise.reject(),
});

/**
 * Hook to get the current auth context.
 * @returns The current auth context
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Hook to get the current user. Will throw an error if no user is found.
 * @returns The current user
 */
export const useCurrentUser = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    throw new Error("No current user found, did you forget to use AuthProvider?");
  }

  return currentUser;
};
