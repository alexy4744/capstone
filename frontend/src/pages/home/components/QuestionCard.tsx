import { Box, Flex, Container, Badge, Text } from "@chakra-ui/react";
import { IoCalculator } from "react-icons/io5";
import { AiOutlineStop } from "react-icons/ai";

type QuestionCardProps = {
    difficulty: string;
    calculator: boolean;
    category: string;
    description: string;
}

export const QuestionCard = ({ difficulty, calculator, category, description }: QuestionCardProps) => {
    return (
        <Box
            flexDirection="column"
            bg="#F3F3F3"
            pt="5"
            borderRadius="lg"
            minH="100px"
            borderColor="gray.500">
            <Container maxW="6xl">
                <Flex justifyContent="space-between" py="2">
                    <Flex alignSelf="center">
                        <Box position="relative">
                            <IoCalculator size="30"/>
                        </Box>
                        {!calculator && (
                            <Box position="absolute">
                                <AiOutlineStop size="30" color="#E82B49"/>
                            </Box>
                        )}
                        <Text fontWeight="bold" mx="3">
                            {!calculator && "NO "} CALCULATOR {calculator && "ALLOWED"}
                        </Text>
                    </Flex>
                    <Box>
                        <Badge colorScheme="blue" px="3" mr="3">{category}</Badge>
                        <Badge colorScheme={difficulty} px="3" mx="3">{difficulty}</Badge>
                    </Box>
                </Flex>
                <Box px="3" pb="5">
                    {description}
                </Box>
            </Container>
        </Box>
    );
};