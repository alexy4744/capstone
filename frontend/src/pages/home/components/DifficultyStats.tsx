import { Badge, Box, Flex, HStack } from "@chakra-ui/react";
import { PieChart, PieChartProps } from "../../../components/PieChart";
import { DifficultyList } from "../../../components/CategorySelector";
import { useState, useEffect } from "react";
import { easy, normal, hard } from "../../../theme/colors";

export const DifficultyStats = () => {
    const [pieData, setPieData] = useState<PieChartProps["slices"][] | null>();
    useEffect(() => {
        setPieData([
            [{ color: easy[300], label: "Correct", percentage: 50 }, { color: easy[100], label: "Incorrect", percentage: 50 }],
            [{ color: normal[300], label: "Correct", percentage: 70 }, { color: normal[100], label: "Incorrect", percentage: 30 }],
            [{ color: hard[300], label: "Correct", percentage: 30 }, { color: hard[100], label: "Incorrect", percentage: 70 }]
        ]);
    }, [])
    
    return (
        <HStack w="100%" justifyContent="space-around" py="2">
            {pieData && (pieData.map((slices, i) => (
                <Box key={i} w="160px">
                    <Flex w="100%" justifyContent="center" alignItems="flex-end">
                        <Box w="100%">
                            <PieChart questionNum={10} slices={slices} />
                        </Box>
                        <Box display={["none", "none", "block", "block"]} style={{ rotate: "-20deg" }} mb="10">
                            <Badge fontSize={["sm", "sm", "md", "md"]} mx="2" colorScheme={DifficultyList[i]} >{DifficultyList[i]}</Badge>
                        </Box>
                    </Flex>
                </Box>
            )))}
        </HStack>
    );
};