import { Box, Grid, GridItem } from "@chakra-ui/react";

import { ExamDate } from "../components/ExamDate";
import { FocusTopics } from "../components/FocusTopics";

export const Settings = () => {
  return (
    <Box backgroundColor="gray">
      <Grid templateColumns="repeat(2, 1fr)" gap={6} padding={6}>
        <GridItem backgroundColor="white" borderRadius="lg" padding={12}>
          <FocusTopics />
        </GridItem>

        <GridItem backgroundColor="white" borderRadius="lg" padding={12}>
          <ExamDate />
        </GridItem>
      </Grid>
    </Box>
  );
};
