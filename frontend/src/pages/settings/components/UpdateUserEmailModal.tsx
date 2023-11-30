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
  Text,
} from "@chakra-ui/react";

import { useAuth } from "../../../providers";

type UpdateUserEmailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newEmail: string) => void;
};

export const UpdateUserEmailModal = ({ isOpen, onClose, onSave }: UpdateUserEmailModalProps) => {
  const { changeEmail } = useAuth();

  const [newEmail, setNewEmail] = useState<string>("");

  const formId = useId();
  const newEmailLabelId = useId();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    changeEmail(newEmail).then(() => {
      onSave(newEmail);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Update Email Address</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Text>
            Changing your email address will require you to verify your new email address before you
            can log in with it.
          </Text>

          <Box as="form" id={formId} mt={4} onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor={newEmailLabelId}>New Email Address</FormLabel>

              <Input
                id={newEmailLabelId}
                type="text"
                onChange={(event) => setNewEmail(event.target.value)}
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
