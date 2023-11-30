import { Box, Flex, Container, Heading, Badge } from "@chakra-ui/react"

export const QuestionCard = () => {
    return (
        <Box
            flexDirection="column"
            bg="#F3F3F3"
            pt="5"
            borderRadius="lg"
            minH="100px"
            borderColor="gray.500">
            <Container maxW="6xl">
                <Flex justifyContent="space-between">
                    <Heading fontWeight="semibold" fontSize="lg">SAT- No Calculator Allowed</Heading>
                    <Badge colorScheme="hard" px="3">Hard</Badge>
                </Flex>
            </Container>
        </Box>
    );
};