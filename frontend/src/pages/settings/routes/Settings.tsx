import { Box, Grid, GridItem, Stack } from "@chakra-ui/react";

import { ExamDate } from "../components/ExamDate";
import { FocusTopics } from "../components/FocusTopics";
import { MostPracticedTopics } from "../components/MostPracticedTopics";
import { Preferences } from "../components/Preferences";

export const Settings = () => {
  return (
    <Stack backgroundColor="gray" gap={6} padding={6}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem backgroundColor="white" borderRadius="lg" padding={12}>
          <FocusTopics />
        </GridItem>

        <GridItem backgroundColor="white" borderRadius="lg" padding={12}>
          <ExamDate />
        </GridItem>
      </Grid>

      <Box backgroundColor="white" borderRadius="lg" padding={12}>
        <MostPracticedTopics />
      </Box>

      <Box backgroundColor="white" borderRadius="lg" padding={12}>
        <Preferences />
      </Box>
    </Stack>
  );
};
