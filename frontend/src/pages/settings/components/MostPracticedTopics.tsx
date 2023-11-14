import { useEffect, useState } from "react";

import { Box, Heading, SimpleGrid, Stack, Tag } from "@chakra-ui/react";

import { PieChart } from "../../../components/PieChart";

type TopicStats = {
  name: string;
  totalCorrect: number;
  totalIncorrect: number;
  totalQuestions: number;
};

export const MostPracticedTopics = () => {
  const [topicStats, setTopicStats] = useState<TopicStats[]>([]);

  useEffect(() => {
    // TODO: Call API to get user's most practiced topics
    setTopicStats([
      {
        name: "Problem Solving and Data Analysis",
        totalIncorrect: 0.24,
        totalCorrect: 0.76,
        totalQuestions: 120,
      },
      {
        name: "Trigonometry",
        totalIncorrect: 0.5,
        totalCorrect: 0.5,
        totalQuestions: 100,
      },
      {
        name: "Geometry",
        totalIncorrect: 0.63,
        totalCorrect: 0.37,
        totalQuestions: 90,
      },
    ]);
  }, []);

  return (
    <Stack gap={10}>
      <Heading size="lg">Most Practiced Topics This Week:</Heading>

      <SimpleGrid columns={{ lg: 3 }} gap={12}>
        {topicStats.map(({ name, totalCorrect, totalIncorrect }) => (
          <Stack align="center">
            <Box w="200px">
              <PieChart
              questionNum={10}
                slices={[
                  {
                    label: "Correct",
                    percentage: totalCorrect,
                    color: "#e2ab93",
                  },
                  {
                    label: "Incorrect",
                    percentage: totalIncorrect,
                    color: "#eccbbe",
                  },
                ]}
              />
            </Box>

            <Tag
              bgColor="#eccbbe"
              color="#565656"
              fontSize="lg"
              fontWeight="bold"
              h="full"
              justifyContent="center"
              marginTop="8"
              padding="3"
              textAlign="center"
              variant="solid"
              w="full"
            >
              {name}
            </Tag>
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
