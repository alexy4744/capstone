import { PropsWithChildren } from "react";

import { FirebaseApp } from "firebase/app";

import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

import { FirebaseContext } from "./firebase-context";

export const createFirebaseProvider = (app: FirebaseApp) => {
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const functions = getFunctions(app);

  if (import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST) {
    connectAuthEmulator(auth, import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST, {
      disableWarnings: true
    });
  }

  if (import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST) {
    const { hostname, port } = new URL(import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST);

    connectFirestoreEmulator(firestore, hostname, +port);
  }

  if (import.meta.env.VITE_FIREBASE_FUNCTIONS_EMULATOR_HOST) {
    const { hostname, port } = new URL(import.meta.env.VITE_FIREBASE_FUNCTIONS_EMULATOR_HOST);

    connectFunctionsEmulator(functions, hostname, +port);
  }

  return ({ children }: PropsWithChildren) => (
    <FirebaseContext.Provider children={children} value={{ app, auth, firestore, functions }} />
  );
};
