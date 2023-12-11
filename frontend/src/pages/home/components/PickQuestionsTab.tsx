import { Flex, Container, Text, Box, Divider, AbsoluteCenter } from "@chakra-ui/react";
import { CategorySelector, DifficultyList, TopicList, DifficultyDictionary, TopicDictionary, SectionList, SectionDictionary } from "../../../components/CategorySelector";
import { useEffect, useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { Question, getQuestions } from "../../../api/questions";
import { Link } from "react-router-dom";

const PickQuestionsTab = () => {
    const [chosenSection, setChosenSection] = useState<string[]>([...SectionList]);
    const [chosenDifficulty, setChosenDifficulty] = useState<string[]>([...DifficultyList]);
    const [chosenTopic, setChosenTopic] = useState<string[]>([...TopicList]);
    const [allQuestions, setAllQuestions] = useState<Question[]>([]);

    useEffect(() => {
        getQuestions().then((questions) => {
            setAllQuestions([...questions]);
        });
    }, [])

    return (
        <Flex w="100%">
            <Flex width="230px" bg="gray.50" mr="5" borderRadius="lg">
                <Container py="6">
                    <Text fontSize="lg" fontWeight="semibold">Filter</Text>
                    <Box position='relative' p='5'>
                        <Divider />
                        <AbsoluteCenter px='2' bg="gray.50">
                            Section
                        </AbsoluteCenter>
                    </Box>
                    <CategorySelector category="section" chosen={chosenSection} onClickMultiple={setChosenSection} />
                    <Box position='relative' p='5'>
                        <Divider />
                        <AbsoluteCenter px='2' bg="gray.50">
                            Difficulty
                        </AbsoluteCenter>
                    </Box>
                    <CategorySelector category="difficulty" chosen={chosenDifficulty} onClickMultiple={setChosenDifficulty} />
                    <Box position='relative' px='5' pt="8" pb="4">
                        <Divider />
                        <AbsoluteCenter px="2" bg="gray.50">
                            Topics
                        </AbsoluteCenter>
                    </Box>
                    <CategorySelector category="topic" chosen={chosenTopic} onClickMultiple={setChosenTopic} />
                </Container>
            </Flex>
            <Flex flex="1" flexDirection="column">
                {allQuestions
                    .filter((q) => (
                        chosenSection.includes(SectionDictionary[`${q.calculator}`]))
                        && chosenDifficulty.includes(DifficultyDictionary[q.difficulty])
                        && chosenTopic.includes(TopicDictionary[q.category]))
                    .map((q, i) => (
                        <Box key={i} m="1" as={Link} to={`questions/${q.id}`}>
                            <QuestionCard
                                difficulty={DifficultyDictionary[q.difficulty]}
                                calculator={q.calculator}
                                category={TopicDictionary[q.category]}
                                description={q.title}
                            />
                        </Box>
                    ))
                }
            </Flex>
        </Flex>
    );
};

export default PickQuestionsTab;