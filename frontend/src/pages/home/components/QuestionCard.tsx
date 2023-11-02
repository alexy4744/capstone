import { Box, Flex, Container, Heading, Button, Badge } from "@chakra-ui/react"

const QuestionCard = () => {
    return (
        <Box
            flexDirection="column"
            bg="#F3F3F3"
            pt="5"
            borderRadius="lg"
            minH="100px"
            borderColor="gray.500"
            onClick={()=>console.log("it works")}>
            <Container maxW="6xl">
                <Flex justifyContent="space-between">
                    <Heading fontWeight="semibold" fontSize="lg">SAT- No Calculator Allowed</Heading>
                    <Badge colorScheme="hard" px="3">Hard</Badge>
                </Flex>
            </Container>
        </Box>
    );
};

export default QuestionCard;