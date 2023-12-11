import { Button, Flex } from "@chakra-ui/react";

export const DifficultyList = ["easy", "normal", "hard"] as const;
export const DifficultyDictionary = { 1: "easy", 2: "normal", 3: "hard" } as const;
export const TopicList = ["Heart of Algebra", "Problem Solving and Data Analysis", "Passport to Advanced Math", "Geometry", "Trigonometry"] as const;
export const TopicDictionary = {
    "HOA": "Heart of Algebra",
    "PSD": "Problem Solving and Data Analysis",
    "PAM": "Passport to Advanced Math",
    "GEO": "Geometry",
    "TRI": "Trigonometry"
 } as const;
 export const SectionList = ["Calculator Allowed", "No Calculator Allowed"] as const;
 export const SectionDictionary = {
    "true": "Calculator Allowed",
    "false": "No Calculator Allowed"
 } as const;

 const categoryDictionary = {"difficulty" : DifficultyList, "topic" : TopicList, "section" : SectionList } as const;

type CategorySelectorProps = {
    category: "difficulty" | "topic" | "section";
    chosen?: string | string[];
    onClick?: (d: string) => void;
    onClickMultiple?: (t: string[]) => void;
    canDeselect?: boolean;
}

export const CategorySelector = ({ category, chosen, onClick, onClickMultiple, canDeselect = false }: CategorySelectorProps) => {
    const handleClick = (c: string) => {
        if (Array.isArray(chosen) && onClickMultiple) {
            if (chosen.includes(c)) {
                onClickMultiple(chosen.filter(i => i !== c));
            } else {
                onClickMultiple([...chosen, c]);
            }
        } else if (onClick) {
            if (canDeselect && c === chosen) {
                onClick("");
            } else {
                onClick(c);
            }
        }
    }
    const handleVariant = (t: string) => {
        if (Array.isArray(chosen)) {
            return chosen.includes(t) ? "badgeSelected" : "badge";
        } else {
            return chosen === t ? "badgeSelected" : "badge"
        }
    }
    const handleColorScheme = (c : string) => {
        if (category === "difficulty") {
            return c;
        } else if (category === "topic") {
            return "blue";
        } else {
            return "gray";
        }
    }
    return (
        <Flex justifyContent="center" flexWrap="wrap">
            {categoryDictionary[category].map((c) => (
                <Button
                    key={c}
                    variant={handleVariant(c)}
                    colorScheme={handleColorScheme(c)}
                    onClick={() => {
                        handleClick(c);
                    }}
                    whiteSpace="normal"
                    px="3"
                    m="2">
                    {c.toLocaleUpperCase()}
                </Button>
            ))}
        </Flex>
    );
};