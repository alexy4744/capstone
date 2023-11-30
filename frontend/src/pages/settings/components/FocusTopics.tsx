import { useEffect, useState } from "react";

import { Avatar, Button, Container, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { FaPencil } from "react-icons/fa6";

import { useCurrentUser } from "../../../providers";
import { TopicSelector } from "../../../components/CategorySelector";

export const FocusTopics = () => {
  const { displayName, email } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [topics, setTopics] = useState<string[]>([]);

  // const handleSelect = (t: string) => {
  //   if (topics.includes(t)) {
  //     setTopics(topics.filter(i => i !== t));
  //   } else {
  //     const newTopics = topics;
  //     newTopics.push(t);
  //     setTopics(newTopics);
  //   }
  // }

  useEffect(() => {
    // TODO: Call API to get user's focus topics
    // setTopics([
    //   "Hearts of Algebra",
    //   "Problem Solving and Data Analysis",
    //   "Geometry",
    //   "Trigonometry",
    // ]);
  }, []);


  return (
    <Stack gap={8}>
      <Stack direction="row" gap={6} align="center">
        <Avatar size={"lg"} src={"https://bit.ly/dan-abramov"} />

        <Stack gap={0}>
          <Text fontSize="2xl" fontWeight="bold" textTransform="capitalize">
            {displayName}
          </Text>

          <Text>{email}</Text>
        </Stack>
      </Stack>

      <Stack gap={3}>
        <Stack direction="row" gap={4}>
          <Text fontWeight="bold" fontSize="lg">
            Focus topics:
          </Text>

          <Button onClick={onOpen} variant="link" colorScheme="blue" leftIcon={<FaPencil />}>
            Edit
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Select Your Focus Topics</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Container>
                  <TopicSelector chosenTopic={topics} onClickMultiple={(t) => { setTopics(t) }} />
                </Container>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>

        <Stack direction="row" gap={4} wrap="wrap">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant="badge"
              colorScheme="blue"
              fontWeight="bold"
              whiteSpace="nowrap"
            >
              {topic}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
