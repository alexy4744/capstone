import { getAuth } from "firebase/auth";

export const callApi = async (endpoint: string, options: RequestInit = {}) => {
  const auth = getAuth();

  const token = await auth.currentUser?.getIdToken();

  const url = new URL(endpoint, import.meta.env.VITE_API_BASE_URL);

  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
};
