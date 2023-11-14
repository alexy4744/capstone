import { Flex, Box, Text} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";

export const ProgressBar = ({ initialDate }: { initialDate?: number }) => {
    const [progressPercent, setProgessPercent] = useState<number>(50);

    const testDate = Date.parse("04 Dec 2024 01:00:00 EST");

    useEffect(() => {
        if (initialDate) {
            const initialDifference = testDate - initialDate;
            const currentDifference = testDate - Date.now();
            if (initialDifference > 0 && currentDifference > 0) {
                setProgessPercent((currentDifference / initialDifference)*100);
            }
        }
    }, [initialDate, testDate])

    const renderer: CountdownRendererFn = ({ days, hours, minutes, completed }) => {
        if (completed) {
            return <Text>Exam is over!</Text>
        } else {
            if (days > 31) {
                const timeRemaining = Math.round(days / 30.4167);
                return <Text>{timeRemaining} month{timeRemaining === 1 ? "" : "s"} left</Text>
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
            <Flex justifyContent={progressPercent < 50 ? "flex-end" : "flex-start"}>
                <Countdown date={testDate} renderer={renderer} />
            </Flex>
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