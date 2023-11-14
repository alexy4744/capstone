import { useEffect, useState } from "react";

import { Flex, Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { FaPencil } from "react-icons/fa6";

type ExamDateProps = {
  editable?: boolean
  showLocation?: boolean
}

export const ExamDate = ({ editable = false, showLocation = true }: ExamDateProps) => {
  const [examDate, setExamDate] = useState<string | null>(null);
  const [examTime, setExamTime] = useState<string | null>(null);
  const [examLocation, setExamLocation] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Call API to get user's exam date and location
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    });

    setExamDate(date);
    setExamTime(time);
    setExamLocation("Hunter College");
  }, []);

  return (
    <Stack gap={5}>
      <Flex justifyContent="space-between">
        <Heading fontSize="lg" letterSpacing="wide" pl="10%">
          SAT Exam Date:
        </Heading>
        {editable && (
          <Button variant="link" colorScheme="blue" size="lg" marginLeft="4">
            <Box marginRight="1">
              <FaPencil />
            </Box>
            Edit
          </Button>
        )}
      </Flex>
      {examDate && (
        <Stack direction="row" wrap="wrap" columnGap={5} justifyContent="center" alignItems="center">
          <Text fontSize="3xl" textAlign="center">{examDate || "No exam date set"}</Text>
          <Text fontSize="xl" textAlign="center">{examTime || ""}</Text>
        </Stack>
      )}

      {showLocation && (
        <>
          <Heading fontSize="lg" letterSpacing="wide" pl="10%">Location:</Heading>
          <Text fontSize="2xl" textAlign="center">{examLocation}</Text>
        </>
      )}
    </Stack>
  );
};
