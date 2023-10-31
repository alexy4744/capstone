import { useEffect, useState } from "react";

import { Box, Grid, GridItem, Heading, Stack, Tag, VStack } from "@chakra-ui/react";

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

      <Grid templateColumns="repeat(3, 1fr)" gap={12}>
        {topicStats.map(({ name, totalCorrect, totalIncorrect }) => (
          <GridItem key={name} as={VStack}>
            <Box w="250px">
              <PieChart
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
              justifyContent="center"
              marginTop="8"
              padding="3"
              textAlign="center"
              variant="solid"
              w="full"
            >
              {name}
            </Tag>
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
};
