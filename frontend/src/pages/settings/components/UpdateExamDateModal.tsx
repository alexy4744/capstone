import { FormEvent, useId, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { updateSettings } from "../../../api/settings";

type UpdateExamDateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (examDate: Date) => void;
};

export const UpdateExamDateModal = ({ isOpen, onClose, onSave }: UpdateExamDateModalProps) => {
  const examDateLabelId = useId();
  const formId = useId();

  const [examDateInput, setExamDateInput] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const examDate = new Date(examDateInput);

    updateSettings({ examDate }).then(() => {
      onSave(examDate);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Update Exam Date</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Box as="form" id={formId} onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor={examDateLabelId}>Exam Date</FormLabel>

              <Input
                id={examDateLabelId}
                type="datetime-local"
                onChange={(event) => setExamDateInput(event.target.value)}
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
