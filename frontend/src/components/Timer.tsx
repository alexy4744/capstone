import { Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Timer = () => {
    const [time, setTime] = useState<number>(11890);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        intervalId = setInterval(() => setTime(time + 1), 10);
        return () => clearInterval(intervalId);
    })

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);

    return (
        <Flex justifyContent="center">
            <Text
                fontWeight="bold"
                fontSize={["md", "lg", "xl", "xl"]}
                color={minutes > 1 ? "red.500" : "initial"}
                transition="color 0.3s">
                {hours > 0 && `${hours}:`}
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
            </Text>
        </Flex>
    );
};

export default Timer;