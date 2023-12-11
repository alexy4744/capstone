import { Flex, Button, Box, Container, Heading, Text } from "@chakra-ui/react";
import TopicModal from "../../../components/TopicModal";
import { CategorySelector } from "../../../components/CategorySelector";
import { useEffect, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Settings as SavedSettings, getSettings } from "../../../api/settings";

type cardTypeDetails = {
    type: "Recommended" | "Topic" | "Difficulty";
    title: string;
    description: string;
}

const mapTopicsToAbbreviation = (t: string) => {
    switch (t.toLowerCase()) {
        case "heart of algebra":
            return "hoa";
        case "hearts of algebra":
            return "hoa";
        case "problem solving and data analysis":
            return "psd";
        case "passport to advanced math":
            return "pam";
        case "geometry":
            return "geo";
        case "trigonometry":
            return "tri";
    }
}

export const SuggestionCard = ({ type = "Difficulty" }: { type: string }) => {
    const [settings, setSettings] = useState<SavedSettings | null>(null);

    const [topic, setTopic] = useState<string>("Random");
    const [chosenSection, setChosenSection] = useState<string>("Random");
    const [chosenDifficulty, setChosenDifficulty] = useState<string>(type === "Difficulty" ? "easy" : "");
    const [cardType, setCardType] = useState<cardTypeDetails>();
    useEffect(() => {
        getSettings().then(setSettings);
    }, []);

    useEffect(() => {
        if (type === "Recommended") {
            setCardType({
                type: "Recommended",
                title: "Recommended For Me",
                description: "Topics would be picked based on your focus topics to target your weaknesses"
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

    const searchParams = () => {
        let searchParams = "";
        let abbreviate = mapTopicsToAbbreviation(topic);
        if (abbreviate !== undefined) {
            searchParams += `topic=${abbreviate}&`;
        } else if (type === "Recommended" && settings?.focusTopics && settings?.focusTopics.length > 0) {
            const randomFocusTopic = settings?.focusTopics[Math.floor(Math.random() * settings.focusTopics.length)];
            abbreviate = mapTopicsToAbbreviation(randomFocusTopic);
            if (abbreviate) {
                searchParams += `topic=${abbreviate}&`;
            }
        }
        if (chosenDifficulty !== "") {
            searchParams += `difficulty=${chosenDifficulty.toLowerCase()}&`;
        }
        if (chosenSection !== "" && chosenSection !== "Random") {
            searchParams += `calculator=${chosenSection === "Calculator Allowed" ? "true" : "false"}`
        }
        return searchParams;
    }

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
                    <Text fontWeight="semibold">For</Text>
                    <Flex justifyContent="center">
                        <TopicModal type={type} topic={type === "Recommended" ? chosenSection : topic} onClick={type === "Recommended" ? setChosenSection : setTopic} />
                    </Flex>
                </Flex>
            </Container>
            <Flex
                position="relative"
                pt="5"
                justifyContent="flex-end">
                <Button as={Link} variant="startQuestion" pr="16" to={`questions?${searchParams()}`}>
                    START →
                    <Box position="absolute" right="-10px">
                        <BsPencilFill size="50" />
                    </Box>
                </Button>
            </Flex>
        </Flex>
    );
}