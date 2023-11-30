import { Flex, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";

export const ProgressBar = ({ initialDate, testDate }: { initialDate?: number, testDate?: Date }) => {
    const [progressPercent, setProgessPercent] = useState<number>(30);

    useEffect(() => {
        if (initialDate && testDate) {
            const initialDifference = testDate.getTime() - initialDate;
            const currentDifference = testDate.getTime() - Date.now();
            if (initialDifference > 0 && currentDifference > 0) {
                setProgessPercent((1 - (currentDifference / initialDifference)) * 100);
            }
        }
    }, [initialDate, testDate])

    const renderer: CountdownRendererFn = ({ days, hours, minutes, completed }) => {
        if (completed) {
            return <Text>Exam is over!</Text>
        } else {
            if (!initialDate) {
                if (70 - days > 0) {
                    setProgessPercent(100 - days);
                }
            }
            if (days > 31) {
                const monthsRemaining = Math.round(days / 30.4167);
                return <Text>{monthsRemaining} month{monthsRemaining === 1 ? "" : "s"} left</Text>
            } else if (days > 0) {
                return <Text>{days} day{days === 1 ? "" : "s"} left</Text>
            } else if (hours > 0) {
                return <Text>{hours} hour{hours === 1 ? "" : "s"} left</Text>
            } else {
                return <Text>{minutes} min{minutes === 1 ? "" : "s"} left</Text>
            }
        }
    };

    return (
        <Box w="100%" px="5%">
            {testDate && (
                <Flex justifyContent={progressPercent < 50 ? "flex-end" : "flex-start"}>
                    <Countdown date={testDate} renderer={renderer} />
                </Flex>
            )}
            <Box
                position="relative"
                w="100%"
                h="40px"
                borderRadius="xl"
                style={{ border: "3px solid #BFD5BB" }}
            >
                <Box
                    position="absolute"
                    w={`${progressPercent}%`}
                    h="34px"
                    bg="linear-gradient(90deg, #8FBC8B 35%, #BFD5BB 86%);"
                    borderRadius="lg" />
            </Box>
        </Box>
    );
};