import { useEffect, useState } from "react";

import { Avatar, Box, Button, Stack, Tag, Text } from "@chakra-ui/react";
import { FaPencil } from "react-icons/fa6";

import { useCurrentUser } from "../../../providers";

export const FocusTopics = () => {
  const { displayName, email } = useCurrentUser();

  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    // TODO: Call API to get user's focus topics
    setTopics([
      "Hearts of Algebra",
      "Problem Solving and Data Analysis",
      "Geometry",
      "Trigonometry",
    ]);
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

          <Button variant="link" colorScheme="blue">
            <Box marginRight="1">
              <FaPencil />
            </Box>
            Edit
          </Button>
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
