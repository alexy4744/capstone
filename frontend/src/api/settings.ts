import { Timestamp, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { Override } from "../types/override";

const SETTINGS_COLLECTION = "settings";

export type Settings = {
  examDate: Timestamp | null;
  examLocation: string | null;
  focusTopics: string[];
};

export const createDefaultSettings = async () => {
  const auth = getAuth();

  if (!auth.currentUser) {
    throw new Error("User must be logged in before calling createSettings()");
  }

  const firestore = getFirestore();

  const settingsRef = doc(firestore, SETTINGS_COLLECTION, auth.currentUser.uid);

  const defaultSettings = {
    examDate: null,
    examLocation: null,
    focusTopics: [],
  };

  await setDoc(settingsRef, defaultSettings);

  return defaultSettings;
};

/**
 * Retrieves the user's settings. If the user does not have any settings, it will create a new settings document with default values.
 */
export const getSettings = async () => {
  const auth = getAuth();

  if (!auth.currentUser) {
    throw new Error("User must be logged in before calling getSettings()");
  }

  const firestore = getFirestore();

  const settingsRef = doc(firestore, SETTINGS_COLLECTION, auth.currentUser.uid);

  const settings = await getDoc(settingsRef);

  if (!settings.exists()) {
    return createDefaultSettings();
  }

  return settings.data() as Settings;
};

/**
 * Updates the user's settings.
 * @param settings The new settings to update to.
 */
export const updateSettings = async (
  settings: Partial<
    Override<
      Settings,
      {
        examDate: Date | null;
      }
    >
  >
) => {
  const auth = getAuth();

  if (!auth.currentUser) {
    throw new Error("User must be logged in before calling updateSettings()");
  }

  const firestore = getFirestore();

  const settingsRef = doc(firestore, SETTINGS_COLLECTION, auth.currentUser.uid);

  await setDoc(
    settingsRef,
    {
      ...settings,
      examDate: settings.examDate ? Timestamp.fromDate(settings.examDate) : null,
    },
    {
      merge: true,
    }
  );

  return settings;
};
