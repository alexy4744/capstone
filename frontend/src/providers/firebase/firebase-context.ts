import { Auth } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
import { Functions } from "firebase/functions";

import { createContext, useContext } from "react";

export type FirebaseContext = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  functions: Functions;
};

export const FirebaseContext = createContext<FirebaseContext | null>(null);

/**
 * A hook to access the Firebase context, which contains the Firebase app, auth,
 * firestore, and functions instances.
 * @returns The Firebase context
 * @throws If the Firebase context is not available
 */
export const useFirebase = () => {
  const firebase = useContext(FirebaseContext);

  if (!firebase) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }

  return firebase;
};
