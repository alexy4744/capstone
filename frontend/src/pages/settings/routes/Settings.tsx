import { Box, SimpleGrid, Stack } from "@chakra-ui/react";

import { ExamDate } from "../components/ExamDate";
import { FocusTopics } from "../components/FocusTopics";
import { MostPracticedTopics } from "../components/MostPracticedTopics";
import { Preferences } from "../components/Preferences";

import { DefaultLayout } from "../../../layout/DefaultLayout";

export const Settings = () => {
  return (
    <DefaultLayout justifyContent="center" display="flex" backgroundColor="gray.100">
      <Stack gap={6} maxW="max-content" padding={{ base: 4, md: 12 }}>
        <SimpleGrid columns={{ md: 2 }} gap={6}>
          <Box backgroundColor="white" borderRadius="lg" padding={{ base: 8, md: 12 }}>
            <FocusTopics />
          </Box>

          <Box backgroundColor="white" borderRadius="lg" padding={{ base: 8, md: 12 }}>
            <ExamDate />
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={1} gap={6}>
          <Box backgroundColor="white" borderRadius="lg" padding={{ base: 8, md: 12 }}>
            <MostPracticedTopics />
          </Box>

          <Box backgroundColor="white" borderRadius="lg" padding={{ base: 8, md: 12 }}>
            <Preferences />
          </Box>
        </SimpleGrid>
      </Stack>
    </DefaultLayout>
  );
};
