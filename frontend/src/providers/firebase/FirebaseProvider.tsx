import { PropsWithChildren } from "react";

import { FirebaseApp } from "firebase/app";

import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

import { FirebaseContext } from "./firebase-context";

/**
 * Creates a Firebase provider. This provider should be used at the root of your application. It
 * will provide the Firebase app instance, as well as the auth, firestore, and functions instances
 * to the rest of your application. It will also connect to the Firebase emulators if they are
 * configured in your environment.
 *
 * @param app The Firebase app instance.
 * @returns A Firebase provider that you can use to wrap your application.
 */
export const createFirebaseProvider = (app: FirebaseApp) => {
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const functions = getFunctions(app);

  if (import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST) {
    connectAuthEmulator(auth, import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST, {
      disableWarnings: true,
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
