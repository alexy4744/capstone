import { useState, useEffect } from "react";

import { Badge, Box, Flex, HStack, Spinner } from "@chakra-ui/react";

import { UserStatistics, getUserStatistics } from "../../../api/statistics";

import { PieChart } from "../../../components/PieChart";

import { easy, normal, hard } from "../../../theme/colors";

const getColor = (difficulty: string) => {
    switch (difficulty) {
        case "easy":
            return easy;
        case "normal":
            return normal;
        case "hard":
            return hard;
        default:
            throw new RangeError("Difficulty level must be between easy, normal or hard.");
    }
};

export const DifficultyStats = ({ uniformColor = false }: { uniformColor?: boolean }) => {
    const [statistics, setStatistics] = useState<UserStatistics | null>(null);

    useEffect(() => {
        getUserStatistics().then(setStatistics);
    }, []);

    return (
        <HStack h="full" w="full" justifyContent="space-around" py="2">
            {statistics ? (
                Object.keys(statistics).map((difficulty) => {
                    const { totalCorrect, totalIncorrect } = statistics[difficulty as keyof UserStatistics];

                    const total = totalCorrect + totalIncorrect;

                    const color = getColor(difficulty);

                    return (
                        <Box key={difficulty} w="160px">
                            <Flex w="100%" justifyContent="center" alignItems={uniformColor ? "flex-start" : "flex-end"}>
                                <Box w="100%">
                                    <PieChart
                                        questionNum={total}
                                        slices={
                                            total > 0
                                                ? [
                                                    {
                                                        label: "Correct",
                                                        percentage: (totalCorrect / total) * 100,
                                                        color: uniformColor ? "#e2ab93" : color[300],
                                                    },
                                                    {
                                                        label: "Incorrect",
                                                        percentage: (totalIncorrect / total) * 100,
                                                        color: uniformColor ? "#eccbbe" : color[100],
                                                    },
                                                ]
                                                : [
                                                    {
                                                        label: "Not attempted yet",
                                                        percentage: 100,
                                                        color: uniformColor ? "#eccbbe" : color[100],
                                                    },
                                                ]
                                        }
                                    />
                                </Box>

                                <Box
                                    display={["none", "none", "block", "block"]}
                                    style={{ rotate: uniformColor ? "20deg" : "-20deg" }}
                                    mb="10"
                                >
                                    <Badge fontSize={["sm", "sm", "md", "md"]} mx="2" colorScheme={difficulty}>
                                        {difficulty}
                                    </Badge>
                                </Box>
                            </Flex>
                        </Box>
                    );
                })
            ) : (
                <Spinner />
            )}
        </HStack>
    );
};
