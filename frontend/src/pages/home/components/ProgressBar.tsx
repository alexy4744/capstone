import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    Progress,
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepIcon,
    useSteps,
    StepSeparator
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SlCalender } from "react-icons/sl";

const ProgressBar = ({ initalDate }: { initalDate: Date }) => {
    const testDate = new Date()
    testDate.setFullYear(2023, 10, 30)

    const [timeLeftInterval, setTimeLeftInterval] = useState<String[]>([]);
    const [timeLeft, setTimeLeft] = useState<String>("");
    const [longerThan6Months, setLongerThan6Months] = useState<Boolean>(true);
    const [invalidDate, setInvalidDate] = useState<Boolean>(false);
    const [progressPercent, setProgessPercent] = useState<number>(0);
    const [activeStep, setActiveStep] = useState<number>(0);

    useEffect(() => {
        const dateDiff = testDate.getTime() - Date.now()
        setInvalidDate(dateDiff < 0);
        // console.log(`Test Date is ${testDate.getMonth()}/${testDate.getDate()}/${testDate.getFullYear()}`)
        // console.log(`Date Now is ${timeNow.getMonth()}/${timeNow.getDate()}/${timeNow.getFullYear()}`)

        const findInterval = (ms: number, unit: String, intervalSize: number) => {
            let steps: String[] = []
            for (let i = 0; i < intervalSize; i++) {
                steps.push(`${intervalSize - i} ${i == intervalSize - 1 ? `${unit}` : `${unit}s`} left`)
            }
            setTimeLeftInterval(steps);
            const daysLeft = Math.min(Math.floor(dateDiff / ms) + 1, intervalSize);
            setActiveStep(intervalSize - daysLeft);
            setTimeLeft(`${daysLeft} ${daysLeft == 1 ? `${unit}` : `${unit}s`} left`);
            setProgessPercent(((intervalSize - daysLeft) / intervalSize) * 100);
            setLongerThan6Months(false);
        }

        if (dateDiff > 0) { // check if test date have passed
            if (dateDiff < 24 * 60 * 60 * 1000 * 7) { // < 1 week
                findInterval(24 * 60 * 60 * 1000, "day", 7);
            }
            else if (dateDiff < (24 * 60 * 60 * 1000 * 31)) { // < 1 month
                findInterval(24 * 60 * 60 * 1000 * 7, "week", 4);
            }
            else if (dateDiff < (24 * 60 * 60 * 1000 * 31 * 6)) { // < 6 months
                findInterval(24 * 60 * 60 * 1000 * 31, "month", 6);
            }
            else {
                const percentage = ((Date.now() - initalDate.getTime()) / (testDate.getTime() - initalDate.getTime())) * 100;
                setProgessPercent(percentage);
            }
        }
    }, [])

    return (
        <Box w="100%">
            <Flex justifyContent="space-between" pb="5" alignItems="flex-end">
                <Heading py="2">SAT</Heading>
                {!longerThan6Months ? (
                    <Text>{timeLeft}</Text>
                ) : (
                    <Text>{`Test Date: ${testDate.getMonth()}/${testDate.getDate()}/${testDate.getFullYear()}`}</Text>
                )}
            </Flex>
            <Flex position="relative" justifyContent="space-between" mx={["0", "0", "20", "20"]} py="4">
                {invalidDate ? (
                    <Box>
                        <Heading>Invalid Test Date!</Heading>
                        <Text>Please change your test date!</Text>
                    </Box>

                ): (longerThan6Months ? (
                    <Box
                        position="relative"
                        w="80%"
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
                ) : (
                    <Stepper size="sm" index={activeStep} gap="0" w="85%" zIndex="2" colorScheme="green">
                        {timeLeftInterval.map((step, index) => (
                            <Flex key={index} flexDirection="column" justifyContent="center">
                                <Step key={index} >
                                    <StepIndicator bg="white" >
                                        <StepStatus complete={<StepIcon />} />
                                    </StepIndicator>
                                    <StepSeparator />
                                </Step>
                                <Text pt="3" w="80px" textAlign="center">{step}</Text>
                            </Flex>
                        ))}
                    </Stepper>
                ))}
                <Box >
                    <SlCalender size="50" />
                </Box>
            </Flex>
        </Box >
    );
}

export default ProgressBar;