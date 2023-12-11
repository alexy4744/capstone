import {
    Button,
    Container,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { CategorySelector } from "./CategorySelector";

type TopicModalProps = {
    type: string,
    topic: string,
    onClick: (t: string) => void
}

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
                {topic.toUpperCase()}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select Your Preference</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Container>
                            {type === "Recommended" && (
                                <CategorySelector category="section" onClick={handleClose} hasRandom/>
                            )}
                            {(type === "Difficulty" || type === "Topic") && (
                                <CategorySelector category="topic" onClick={handleClose} hasRandom={type !== "Topic"}/>
                            )}
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