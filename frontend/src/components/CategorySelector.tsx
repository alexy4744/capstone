import { HStack, Box, Flex, Text, Button, SimpleGrid, Container } from "@chakra-ui/react"

export const DifficultySelector = ({ chosenDifficulty, onClick }: { chosenDifficulty?: string, onClick: Function }) => {
    const difficulty: string[] = ["easy", "normal", "hard"];

    return (
        <SimpleGrid spacing="4" minChildWidth="50px">
            {difficulty.map((d, i) => (
                <Button
                    key = {i}
                    variant={chosenDifficulty === d ? "badgeSelected" : "badge"}
                    colorScheme={d}
                    onClick={() => onClick(d)}
                    px="3">
                    {d.toLocaleUpperCase()}
                </Button>
            ))}
        </SimpleGrid>
    );
};

export const TopicSelector = ({ chosenTopic, onClick }: { chosenTopic?: string, onClick: Function }) => {
    const topicList: string[] = ["random", "algebra", "geometery", "trig", "math", "things", "stuff", "Problem Solving and Data Analysis"];

    return (
        <Flex justifyContent="center" flexWrap="wrap">
            {topicList.map((t, i) => (
                <Button
                    key={i}
                    variant={chosenTopic === t ? "badgeSelected" : "badge"}
                    m="1"
                    colorScheme="blue"
                    onClick={() => {
                        onClick(t);
                    }}>
                    <Flex whiteSpace="normal">
                        {t.toLocaleUpperCase()}
                    </Flex>
                </Button>
            ))}
        </Flex>
    );
};