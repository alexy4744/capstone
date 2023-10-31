import { useEffect, useState } from "react";

import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { FaPencil } from "react-icons/fa6";

export const ExamDate = () => {
  const [examDate, setExamDate] = useState<Date | null>(null);
  const [examLocation, setExamLocation] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Call API to get user's exam date and location
    setExamDate(new Date());
    setExamLocation("Hunter College");
  }, []);

  return (
    <Stack gap={5}>
      <Heading size="lg">
        SAT Exam Date:
        <Button variant="link" colorScheme="blue" size="lg" marginLeft="4">
          <Box marginRight="1">
            <FaPencil />
          </Box>
          Edit
        </Button>
      </Heading>

      <Text fontSize="xl">
        {examDate?.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        {examDate?.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          timeZoneName: "long",
        })}{" "}
      </Text>

      <Heading size="lg">SAT Exam Location:</Heading>

      <Text fontSize="xl">{examLocation}</Text>
    </Stack>
  );
};
