import {
    Container,
    Flex,
    Box,
    Text,
    Tabs,
    Tab,
    TabPanel,
    TabPanels,
    TabList,
    Heading,
    Badge,
    SimpleGrid
} from "@chakra-ui/react"
import { easy, normal, hard } from "../theme/colors";
import HomeLayout from "../components/HomeLayout";
import ProgressBar from "../components/ProgressBar";
import { PieChart, PieChartProps } from "../components/PieChart";
import { useEffect, useState } from "react";
import Card from "../components/SuggestionCard";
import PickQuestionsTab from "../components/PickQuestionsTab";

const HomePage = () => {
    const [pieData, setPieData] = useState<PieChartProps["slices"][] | null>();
    const difficulty: string[] = ["easy", "normal", "hard"];
    useEffect(() => {
        setPieData([
            [{ color: easy[100], label: "test", percentage: 50 }, { color: easy[300], label: "testing", percentage: 50 }],
            [{ color: normal[100], label: "test", percentage: 70 }, { color: normal[300], label: "testing", percentage: 30 }],
            [{ color: hard[100], label: "test", percentage: 30 }, { color: hard[300], label: "testing", percentage: 70 }]
        ]);
    }, [])

    return (
        <HomeLayout>
            <Flex h="450px" bg="#CBEFFF">
                <Container py="10" maxW="6xl" centerContent >
                    <ProgressBar initalDate={new Date("2022-10-22")} />
                    <Flex w="100%" justifyContent="space-around" py="2">
                        {pieData && (pieData.map((slices, i) => (
                            <Box w="170px" h="100%">
                                <Flex w="100%" justifyContent="center">
                                    <Box w="100px">
                                        <PieChart slices={slices} />
                                    </Box>
                                </Flex>
                                <Text textAlign="center" fontWeight="bold" pt="5" fontSize={["sm", "md", "md", "md"]}>
                                    Answered 10
                                    <Badge mx="2" colorScheme={difficulty[i]} >{difficulty[i]}</Badge>
                                    Questions
                                </Text>

                            </Box>
                        )))}
                    </Flex>
                </Container>
            </Flex>
            <Container maxW="6xl" py="10">
                <Heading fontWeight="semibold" fontSize="2xl">How do you want to study today?</Heading>
                <Tabs pt="10">
                    <TabList justifyContent="space-around">
                        <Tab>Recommended</Tab>
                        <Tab>Pick Questions</Tab>
                        <Tab>Discussion</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <SimpleGrid minChildWidth="320px" spacing="40px">
                                <Card type="Difficulty" />
                                <Card type="Recommended" />
                                <Card type="Topic" />
                            </SimpleGrid>
                        </TabPanel>
                        <TabPanel>
                            <PickQuestionsTab />
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </HomeLayout>
    );
}

export default HomePage;