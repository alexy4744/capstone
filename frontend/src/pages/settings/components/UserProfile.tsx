import { Avatar, Box, Button, Stack, Tag, Text } from "@chakra-ui/react";
import { FaPencil } from "react-icons/fa6";

import { CurrentUser } from "../../../providers";

type FocusTopicsProps = {
  currentUser: CurrentUser;
  editable?: boolean;
  focusTopics: string[];
  onEditFocusTopics?: () => void;
  onEditEmail?: () => void;
};

export const UserProfile = ({
  currentUser,
  editable = false,
  focusTopics,
  onEditFocusTopics = () => undefined,
  onEditEmail = () => undefined,
}: FocusTopicsProps) => {
  return (
    <Stack gap={8}>
      <Stack direction="row" gap={6} align="center">
        <Avatar size={"lg"} name={currentUser.displayName} src="https://bit.ly/broken-link" />

        <Stack gap={0}>
          <Text fontSize="2xl" fontWeight="bold" textTransform="capitalize">
            {currentUser.displayName}
          </Text>

          <Stack direction="row" gap={4}>
            <Text>{currentUser.email}</Text>

            {editable && (
              <Button onClick={onEditEmail} variant="link" colorScheme="blue" size="lg">
                <Box marginRight="1">
                  <FaPencil />
                </Box>
                Edit
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack gap={3}>
        <Stack direction="row" gap={4}>
          <Text fontWeight="bold" fontSize="lg">
            Focus topics:
          </Text>

          <Button onClick={onEditFocusTopics} variant="link" colorScheme="blue">
            <Box marginRight="1">
              <FaPencil />
            </Box>
            Edit
          </Button>
        </Stack>

        {focusTopics.length > 0 ? (
          <Stack direction="row" gap={4} wrap="wrap">
            {focusTopics.map((focusTopic) => (
              <Tag key={focusTopic} colorScheme="blue" fontWeight="bold" whiteSpace="nowrap">
                {focusTopic}
              </Tag>
            ))}
          </Stack>
        ) : (
          <Text>No focus topics set</Text>
        )}
      </Stack>
    </Stack>
  );
};
