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

type UpdateExamLocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (examLocation: string) => void;
};

export const UpdateExamLocationModal = ({
  isOpen,
  onClose,
  onSave,
}: UpdateExamLocationModalProps) => {
  const examLocationLabelId = useId();
  const formId = useId();

  const [examLocation, setExamLocation] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    updateSettings({ examLocation }).then(() => {
      onSave(examLocation);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Update Exam Location</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Box as="form" id={formId} onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor={examLocationLabelId}>Exam Location</FormLabel>

              <Input
                id={examLocationLabelId}
                type="text"
                onChange={(event) => setExamLocation(event.target.value)}
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
