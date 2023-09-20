import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { FirebaseApp } from "firebase/app";

import { AuthProvider, createFirebaseProvider } from "./providers";

import { router } from "./router";

import "./App.css";

export const createApp = (firebaseApp: FirebaseApp) => () => {
  const FirebaseProvider = createFirebaseProvider(firebaseApp);

  return (
    <FirebaseProvider>
      <ChakraProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ChakraProvider>
    </FirebaseProvider>
  );
};
