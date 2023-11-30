import { FormEvent, useEffect, useId, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { Select } from "chakra-react-select";

import { getAvailableFocusTopics } from "../../../api/focus-topics";
import { updateSettings } from "../../../api/settings";

type UpdateFocusTopicsModalProps = {
  currentFocusTopics: string[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (focusTopics: string[]) => void;
};

export const UpdateFocusTopicsModal = ({
  currentFocusTopics,
  isOpen,
  onClose,
  onSave,
}: UpdateFocusTopicsModalProps) => {
  const [availableFocusTopics, setAvailableFocusTopics] = useState<string[]>([]);
  const [selectedFocusTopics, setSelectedFocusTopics] = useState<string[]>([]);

  const focusTopicsLabelId = useId();
  const formId = useId();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    updateSettings({ focusTopics: selectedFocusTopics }).then(() => {
      onSave(selectedFocusTopics);
    });
  };

  useEffect(() => {
    getAvailableFocusTopics().then((topics) => {
      setAvailableFocusTopics(topics.map((topic) => topic.name));
    });
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Update Focus Topics</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Text>
            Select the topics you want to focus on. We'll send you questions related to these
            topics.
          </Text>

          <Box as="form" id={formId} mt={4} onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor={focusTopicsLabelId}>Focus Topics</FormLabel>

              <Select
                id={focusTopicsLabelId}
                options={availableFocusTopics.map((topic) => ({ label: topic, value: topic }))}
                defaultValue={currentFocusTopics.map((topic) => ({ label: topic, value: topic }))}
                onChange={(selectedOptions) => {
                  setSelectedFocusTopics(
                    selectedOptions.map((selectedOption) => selectedOption.value)
                  );
                }}
                isMulti
                useBasicStyles
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button form={formId} type="submit" colorScheme="blue" marginTop="4">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
