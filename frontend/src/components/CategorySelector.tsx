import { Flex, Button, SimpleGrid } from "@chakra-ui/react";

export const DifficultyList = ["easy", "normal", "hard"] as const;

type DifficultySelectorProps = {
    chosenDifficulty?: string;
    onClick: (d: string) => void;
    canDeselect?: boolean;
}

export const DifficultySelector = ({ chosenDifficulty, onClick, canDeselect = false }: DifficultySelectorProps) => {

    return (
        <SimpleGrid spacing="4" minChildWidth="50px">
            {DifficultyList.map((d, i) => (
                <Button
                    key={i}
                    variant={chosenDifficulty === d ? "badgeSelected" : "badge"}
                    colorScheme={d}
                    onClick={() => onClick((canDeselect && d === chosenDifficulty) ? "" : d)}
                    px="3">
                    {d.toLocaleUpperCase()}
                </Button>
            ))}
        </SimpleGrid>
    );
};

type TopicSelectorProps = {
    chosenTopic?: string | string[];
    onClick?: (t: string) => void;
    onClickMultiple?: (t: string[]) => void;
    canDeselect?: boolean;
}

export const TopicSelector = ({ chosenTopic, onClick, onClickMultiple, canDeselect = false }: TopicSelectorProps) => {
    const topicList: string[] = ["random", "algebra", "geometery", "trig", "math", "things", "stuff", "Problem Solving and Data Analysis"];
    const handleClick = (t: string) => {
        if (Array.isArray(chosenTopic) && onClickMultiple) {
            if (chosenTopic.includes(t)) {
                onClickMultiple(chosenTopic.filter(i => i !== t));
            } else {
                onClickMultiple([...chosenTopic, t]);
            }
        } else if (onClick) {
            if (canDeselect && t === chosenTopic) {
                onClick("");
            } else {
                onClick(t);
            }
        }
    }
    const handleVariant = (t: string) => {
        if (Array.isArray(chosenTopic)) {
            return chosenTopic.includes(t) ? "badgeSelected" : "badge";
        } else {
            return chosenTopic === t ? "badgeSelected" : "badge"
        }
    }

    return (
        <Flex justifyContent="center" flexWrap="wrap">
            {topicList.map((t, i) => (
                <Button
                    key={i}
                    variant={handleVariant(t)}
                    m="1"
                    colorScheme="blue"
                    onClick={() => {
                        handleClick(t)
                    }}>
                    <Flex whiteSpace="normal">
                        {t.toLocaleUpperCase()}
                    </Flex>
                </Button>
            ))}
        </Flex>
    );
};