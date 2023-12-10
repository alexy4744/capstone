import { getAuth } from "firebase/auth";

const BASE_URL = new URL(import.meta.env.VITE_API_BASE_URL);

const auth = getAuth();

export const callApi = async (endpoint: string, options: RequestInit = {}) => {
  const url = new URL(endpoint, BASE_URL);

  const headers = new Headers(options.headers);

  const token = auth.currentUser?.getIdToken();

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
};
