import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";

import { FaPencil } from "react-icons/fa6";

type ExamDetailsProps = {
  editable?: boolean;
  examDate?: Date | null;
  examLocation?: string | null;
  onEditDate?: () => void;
  onEditLocation?: () => void;
  showDate?: boolean;
  showLocation?: boolean;
};

export const ExamDetails = ({
  editable = false,
  examDate,
  examLocation,
  onEditDate = () => undefined,
  onEditLocation = () => undefined,
  showDate = true,
  showLocation = true,
}: ExamDetailsProps) => {
  return (
    <Stack gap={5}>
      {showDate && (
        <>
          <Flex ml={4}>
            <Heading fontSize="lg" letterSpacing="wide">
              SAT Exam Date:
            </Heading>

            {editable && (
              <Button onClick={onEditDate} variant="link" colorScheme="blue" size="lg" ml={3}>
                <Box marginRight="1">
                  <FaPencil />
                </Box>
                Edit
              </Button>
            )}
          </Flex>

          {examDate ? (
            <Stack
              direction="row"
              wrap="wrap"
              columnGap={5}
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="3xl" textAlign="center">
                {examDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </Text>

              <Text fontSize="xl" textAlign="center">
                {examDate.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  timeZoneName: "short",
                })}
              </Text>
            </Stack>
          ) : (
            <Text fontSize="2xl" textAlign="center">
              Not yet set
            </Text>
          )}
        </>
      )}

      {showLocation && (
        <>
          <Flex ml={4}>
            <Heading fontSize="lg" letterSpacing="wide">
              SAT Exam Location:
            </Heading>

            {editable && (
              <Button onClick={onEditLocation} variant="link" colorScheme="blue" size="lg" ml={3}>
                <Box marginRight="1">
                  <FaPencil />
                </Box>
                Edit
              </Button>
            )}
          </Flex>

          <Text fontSize="2xl" textAlign="center">
            {examLocation || "Not yet set"}
          </Text>
        </>
      )}
    </Stack>
  );
};
