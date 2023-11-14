import { Heading, Stack, Switch } from "@chakra-ui/react";

import { usePreferences } from "../../../hooks/use-preferences";

export const Preferences = () => {
  const { preferences, updatePreferences } = usePreferences();

  return (
    <Stack gap={6} overflow="hidden">
      <Heading fontSize="3xl">Preferences:</Heading>

      <Switch
        alignItems="center"
        display="flex"
        isChecked={preferences.timerRed}
        onChange={() => updatePreferences({ timerRed: !preferences.timerRed })}
      >
        Timer turns red after 2 minute passes
      </Switch>

      <Switch
        alignItems="center"
        display="flex"
        isChecked={preferences.showCorrectAnswer}
        onChange={() => updatePreferences({ showCorrectAnswer: !preferences.showCorrectAnswer })}
      >
        Show correct answer before proceeding to next question
      </Switch>
    </Stack>
  );
};
