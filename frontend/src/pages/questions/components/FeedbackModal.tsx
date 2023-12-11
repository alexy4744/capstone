import { Text, Modal, ModalOverlay, ModalContent, ModalBody, Container, ModalFooter, Button, Flex } from "@chakra-ui/react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

type FeedbackModalProps = {
    isOpen: boolean;
    onClose: () => void;
    correct: boolean;
    onNextQuestion: () => void;
}

export const FeedbackModal = ({ isOpen, onClose, correct, onNextQuestion }: FeedbackModalProps) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent border={`3px solid ${correct ? "#96BC71" : "#D65757"}`}>
                <ModalBody>
                    <Container centerContent>
                        <Flex alignItems="center" mt="3">
                            {correct ? <AiFillCheckCircle size="40" color="#96BC71" /> : <AiFillCloseCircle size="40" color="#D65757" />}
                            <Text mx="5" fontWeight="semibold" fontSize="lg">
                                {correct ? "Correct Answer!" : "Incorrect Answer"}
                            </Text>
                        </Flex>
                    </Container>
                </ModalBody>

                <ModalFooter>
                    <Flex w="100%" mt="3" justifyContent="space-between" alignItems="flex-end">
                        <Button size="sm" as={Link} colorScheme="gray" mr={3} to="/">
                            Back to Home Page
                        </Button>
                        <Button colorScheme={correct ? "easy" : "blue"} mr={3} onClick={correct ? () => onNextQuestion() : () => onClose()}>
                            {correct ? "Next Question" : "Try Again"}
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
};