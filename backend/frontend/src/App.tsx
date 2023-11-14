import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { initializeApp } from "firebase/app";

import { AuthProvider, createFirebaseProvider } from "./providers";

import { router } from "./router";

import theme from "./theme/theme.tsx";
import "./App.css";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAUpRECV3GBh5gMfkwsrMHSWMUwagGeRbA",
  authDomain: "math-study-app.firebaseapp.com",
  projectId: "math-study-app",
  storageBucket: "math-study-app.appspot.com",
  messagingSenderId: "386660766385",
  appId: "1:386660766385:web:760de96be39154adefc890",
  measurementId: "G-SMRD2T6P9Y",
});

export const App = () => {
  const FirebaseProvider = createFirebaseProvider(firebaseApp);

  return (
    <ChakraProvider theme={theme}>
      <FirebaseProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </FirebaseProvider>
    </ChakraProvider>
  );
};
