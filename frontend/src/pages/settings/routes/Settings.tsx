import { useEffect, useState } from "react";

import { Box, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";

import { Settings as SavedSettings, getSettings } from "../../../api/settings";

import { ExamDetails } from "../components/ExamDetails";
import { Preferences } from "../components/Preferences";
import { UpdateExamDateModal } from "../components/UpdateExamDateModal";
import { UpdateExamLocationModal } from "../components/UpdateExamLocationModal";
import { UpdateFocusTopicsModal } from "../components/UpdateFocusTopicsModal";
import { UpdateUserEmailModal } from "../components/UpdateUserEmailModal";
import { UserProfile } from "../components/UserProfile";

import { DefaultLayout } from "../../../layout/DefaultLayout";

import { useCurrentUser } from "../../../providers";
import { DifficultyStats } from "../../home/components/DifficultyStats";

export const Settings = () => {
  const currentUser = useCurrentUser();

  const [settings, setSettings] = useState<SavedSettings | null>(null);

  const {
    isOpen: isUpdateEmailModalOpened,
    onOpen: onUpdateEmailModalOpen,
    onClose: onUpdateEmailModalClose,
  } = useDisclosure();

  const {
    isOpen: isUpdateExamDateModalOpened,
    onOpen: onUpdateExamDateModalOpen,
    onClose: onUpdateExamDateModalClose,
  } = useDisclosure();

  const {
    isOpen: isUpdateExamLocationModalOpened,
    onOpen: onUpdateExamLocationModalOpen,
    onClose: onUpdateExamLocationModalClose,
  } = useDisclosure();

  const {
    isOpen: isUpdateFocusTopicsModalOpened,
    onOpen: onUpdateFocusTopicsModalOpen,
    onClose: onUpdateFocusTopicsModalClose,
  } = useDisclosure();

  useEffect(() => {
    getSettings().then(setSettings);
  }, [
    isUpdateExamDateModalOpened,
    isUpdateExamLocationModalOpened,
    isUpdateFocusTopicsModalOpened,
  ]);

  return (
    <DefaultLayout justifyContent="center" display="flex" backgroundColor="gray.50">
      <Stack gap={6} maxW="6xl" padding={{ base: 4, md: 12 }}>
        <SimpleGrid columns={{ md: 2 }} gap={10}>
          <Box backgroundColor="white" borderRadius="lg" padding={{ base: 4, md: 6 }}>
            <UserProfile
              currentUser={currentUser}
              editable
              focusTopics={settings?.focusTopics || []}
              onEditEmail={onUpdateEmailModalOpen}
              onEditFocusTopics={onUpdateFocusTopicsModalOpen}
            />
          </Box>

          <Box backgroundColor="white" borderRadius="lg" padding={{ base: 4, md: 6 }}>
            <ExamDetails
              editable
              examDate={settings?.examDate?.toDate()}
              examLocation={settings?.examLocation}
              onEditDate={onUpdateExamDateModalOpen}
              onEditLocation={onUpdateExamLocationModalOpen}
            />
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={1} gap={6}>
          <Box backgroundColor="white" borderRadius="lg" padding={{ base: 8, md: 12 }}>
            <Text fontWeight="bold" fontSize="xl">Your Current Progress:</Text>
            <DifficultyStats uniformColor/>
          </Box>

          <Box backgroundColor="white" borderRadius="lg" padding={{ base: 8, md: 12 }}>
            <Preferences />
          </Box>
        </SimpleGrid>
      </Stack>

      <UpdateExamDateModal
        isOpen={isUpdateExamDateModalOpened}
        onClose={onUpdateExamDateModalClose}
        onSave={onUpdateExamDateModalClose}
      />

      <UpdateExamLocationModal
        isOpen={isUpdateExamLocationModalOpened}
        onClose={onUpdateExamLocationModalClose}
        onSave={onUpdateExamLocationModalClose}
      />

      <UpdateFocusTopicsModal
        currentFocusTopics={settings?.focusTopics || []}
        isOpen={isUpdateFocusTopicsModalOpened}
        onClose={onUpdateFocusTopicsModalClose}
        onSave={onUpdateFocusTopicsModalClose}
      />

      <UpdateUserEmailModal
        isOpen={isUpdateEmailModalOpened}
        onClose={onUpdateEmailModalClose}
        onSave={onUpdateEmailModalClose}
      />
    </DefaultLayout>
  );
};
