import { Flex, Button, Box, Container, Heading, Text } from "@chakra-ui/react";
import TopicModal from "../../../components/TopicModal";
import { CategorySelector } from "../../../components/CategorySelector";
import { useEffect, useState } from "react";
import { BsPencilFill } from "react-icons/bs";

type cardTypeDetails = {
    type: string,
    title: string,
    description: string,
}

export const SuggestionCard = ({ type = "Difficulty" }: { type: string }) => {
    const [topic, setTopic] = useState<string>("SELECT");
    const [chosenDifficulty, setChosenDifficulty] = useState<string>("easy");
    const [cardType, setCardType] = useState<cardTypeDetails>();

    useEffect(() => {
        if (type === "Recommended") {
            setCardType({
                type: "Recommended",
                title: "Recommended For Me",
                description: "Topics would be picked based on your previous performance to target your weaknesses"
            });
        }
        else if (type === "Topic") {
            setCardType({
                type: "Topic",
                title: "Topic Based Questions",
                description: "Questions would all focus on the selected topic"
            });
        } else {
            setCardType({
                type: "Difficulty",
                title: "Difficulty Based Questions",
                description: "All Questions would be"
            });
        }
    }, [type]);

    return (
        <Flex
            flexDirection="column"
            justifyContent="space-between"
            bg="#F3F3F3"
            pt="10"
            borderRadius="lg"
            minH="50px"
            w="320px"
            borderBottom="10px dotted"
            borderColor="gray.500">
            <Container centerContent>
                <Flex flexDirection="column" gap="4">
                    <Heading fontSize="xl" fontWeight="semibold">{cardType?.title}</Heading>
                    <Text px="2">{cardType?.description}</Text>
                    {cardType?.type === "Difficulty" && (
                        <CategorySelector category="difficulty" chosen={chosenDifficulty} onClick={setChosenDifficulty} />
                    )}
                    <Text fontWeight="semibold">{cardType?.type === "Recommended" ? "Section" : "For"}</Text>
                    <Flex justifyContent="center">
                        <TopicModal type={cardType?.type ? cardType.type : "Difficulty"} topic={topic} onClick={setTopic} />
                    </Flex>
                </Flex>
            </Container>
            <Flex
                position="relative"
                pt="5"
                justifyContent="flex-end">
                <Button variant="startQuestion" pr="16">
                    START →
                    <Box position="absolute" right="-10px">
                        <BsPencilFill size="50" />
                    </Box>
                </Button>
            </Flex>
        </Flex>
    );
}