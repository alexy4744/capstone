import { useLocalStorage } from "@uidotdev/usehooks";

export type Preferences = {
  showCorrectAnswer?: boolean;
  timerRed?: boolean;
};

export const usePreferences = () => {
  const [preferences, setPreferences] = useLocalStorage<Preferences>("preferences", {
    showCorrectAnswer: true,
    timerRed: true,
  });

  const updatePreferences = (newPreferences: Partial<Preferences>) => {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      ...newPreferences,
    }));
  };

  return {
    preferences,
    updatePreferences,
  };
};
