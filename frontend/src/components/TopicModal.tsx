import {
    Flex,
    Box,
    Button,
    Container,
    Divider,
    AbsoluteCenter,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    HStack,
    Badge,
    SimpleGrid
} from "@chakra-ui/react";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { TopicSelector } from "./CategorySelector";

type TopicModalProps = {
    type: string,
    topic: string,
    onClick: Function
}

const topicList: string[] = ["random", "algebra", "geometery", "trig", "math", "things", "stuff"];

const TopicModal = ({ type = "Difficulty", topic, onClick }: TopicModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    function handleClose(t: string) {
        onClick(t);
        onClose();
    }

    return (
        <>
            <Button
                onClick={onOpen}
                rightIcon={<TfiArrowCircleDown />}
                colorScheme="gray"
                whiteSpace="normal"
                variant="dropDown">
                {topic.toLocaleUpperCase()}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select Your Preference</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Container>
                            {type != "Topic" ? (
                                <SimpleGrid spacing="20px">
                                    <Button onClick={() => {
                                        handleClose("Calculator Allowed");
                                    }}>
                                        Calculator Allowed
                                    </Button>
                                    <Button onClick={() => {
                                        handleClose("Calculator Not Allowed");
                                    }}>
                                        Calculator Not Allowed
                                    </Button>
                                </SimpleGrid>
                            ) : <></>}
                            {type === "Difficulty" ? (
                                <Box position='relative' padding='10'>
                                    <Divider />
                                    <AbsoluteCenter bg='white' px='4'>
                                        Topics
                                    </AbsoluteCenter>
                                </Box>
                            ) : <></>}
                            {type === "Difficulty" || type === "Topic" ? (
                                <>
                                    {/* <SimpleGrid minChildWidth="80px" spacing="20px">
                                        {topicList.map((t) => (
                                            <Button
                                                variant="badgeSelected"
                                                colorScheme="gray"
                                                onClick={() => {
                                                    onClick(t);
                                                    onClose();
                                                }}>
                                                {t.toLocaleUpperCase()}
                                            </Button>
                                        ))}
                                    </SimpleGrid> */}
                                    <TopicSelector onClick={handleClose} />
                                </>
                            ) : <></>}
                        </Container>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TopicModal;