/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_AUTH_EMULATOR_HOST?: string;
  readonly VITE_FIREBASE_FIRESTORE_EMULATOR_HOST?: string;
  readonly VITE_FIREBASE_FUNCTIONS_EMULATOR_HOST?: string;
  readonly VITE_DESMOS_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
