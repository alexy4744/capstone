import { createContext, useContext } from "react";

export type CurrentUser = {
  displayName: string;
  email: string;
  id: string;
};

export type AuthContext = {
  currentUser: CurrentUser | null;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => Promise<void>;
  resetPassword: (code: string, newPassword: string) => Promise<string | void>;
};

export const AuthContext = createContext<AuthContext>({
  currentUser: null,
  changePassword: () => Promise.reject(),
  forgotPassword: () => Promise.reject(),
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
  resetPassword: () => Promise.reject(),
});

export const useAuth = () => useContext(AuthContext);
