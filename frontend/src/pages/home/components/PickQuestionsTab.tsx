import { Flex, Container, Text, Box, Divider, AbsoluteCenter } from "@chakra-ui/react";
import { DifficultySelector, TopicSelector } from "../../../components/CategorySelector";
import { useState } from "react";
import { QuestionCard } from "./QuestionCard";

const PickQuestionsTab = () => {
    const [chosenDifficulty, setChosenDifficulty] = useState<string>();
    const [chosenTopic, setChosenTopic] = useState<string[]>([]);
    return (
        <Flex w="100%">
            <Flex width="200px" bg="gray.50" mr="5" borderRadius="lg">
                <Container py="6">
                    <Text fontSize="lg" fontWeight="semibold">Filter</Text>
                    <Box position='relative' p='5'>
                        <Divider />
                        <AbsoluteCenter px='2' bg="gray.50">
                            Difficulty
                        </AbsoluteCenter>
                    </Box>
                    <DifficultySelector chosenDifficulty={chosenDifficulty} onClick={setChosenDifficulty} canDeselect />
                    <Box position='relative' px='5' pt="8" pb="4">
                        <Divider />
                        <AbsoluteCenter px="1" bg="gray.50">
                            Topics
                        </AbsoluteCenter>
                    </Box>
                    <TopicSelector chosenTopic={chosenTopic} onClickMultiple={setChosenTopic}/>
                </Container>
            </Flex>
            <Flex flex="1" flexDirection="column">
                <QuestionCard />
            </Flex>
        </Flex>
    );
};

export default PickQuestionsTab;