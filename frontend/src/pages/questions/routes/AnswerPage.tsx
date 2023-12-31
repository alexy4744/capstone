import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Box,
    Flex,
    Text,
    Image,
    Button,
    AbsoluteCenter,
    HStack,
    Input,
    Spinner,
    useDisclosure,
} from "@chakra-ui/react";

import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPersonCircleQuestion } from "react-icons/fa6";

import { answerQuestion, getQuestion, getQuestions, Question } from "../../../api/questions";
import { Select } from "chakra-react-select";

import { CalculatorTool } from "../components/CalculatorTool";
import { DrawerStatus, ToolDrawer } from "../components/ToolDrawer";
import { DrawingToolbar } from "../components/DrawingToolbar";
import { ReferenceTool } from "../components/ReferenceTool";
import { Timer } from "../components/Timer";
import { Workspace } from "../components/Workspace";

import { DefaultLayout } from "../../../layout/DefaultLayout";
import { TopicDictionary } from "../../../components/CategorySelector";
import { FeedbackModal } from "../components/FeedbackModal";

const mapDifficultyLevelToText = (difficulty: number) => {
    switch (difficulty) {
        case 1:
            return "easy";
        case 2:
            return "normal";
        case 3:
            return "hard";
        default:
            throw new RangeError("Difficulty level must be between 1 and 3.");
    }
};

const AnswerPage = () => {
    const [queryParameters] = useSearchParams();
    const [question, setQuestion] = useState<Question | null | undefined>(null);
    const [correct, setCorrect] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [calculatorOn, setCalculatorOn] = useState<boolean>(false);
    const [drawerStatus, setDrawerStatus] = useState<DrawerStatus>("stop");
    const [drawingOn, setDrawingOn] = useState<boolean>(false);
    const [eraserOn, setEraserOn] = useState<boolean>(false);
    const [referenceOn, setReferenceOn] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const handleDrawing = (color: string = selectedColor, enable: boolean = !drawingOn) => {
        if (color === "") {
            color = "black";
        }
        setSelectedColor(color);
        setDrawingOn(enable);
        setEraserOn(false);
    };
    const handleSwitchPenTool = () => {
        setEraserOn(!eraserOn);
        setDrawingOn(true);
    };
    const handleCalculatorToolClick = () => {
        setDrawerStatus(!calculatorOn ? "active" : "stop");
        setReferenceOn(false);
        setCalculatorOn(!calculatorOn);
    };
    const handleReferenceToolClick = () => {
        setDrawerStatus(!referenceOn ? "active" : "stop");
        setCalculatorOn(false);
        setReferenceOn(!referenceOn);
    };

    const getNewQuestion = useCallback((isContinue: boolean = false) => {
        const id = queryParameters.get("id");
        if (id && id.match(/^-?\d+$/)) {
            if (isContinue) {
                getQuestions().then((questions) => setQuestion(questions[Math.floor(Math.random() * questions.length)]));
            } else {
                getQuestion(id).then((question) => setQuestion(question));
            }
        } else {
            const calculator = queryParameters.get("calculator");
            const difficulty = queryParameters.get("difficulty");
            const topic = queryParameters.get("topic");
            if (!calculator && !difficulty && !topic) {
                setQuestion(undefined);
            } else {
                getQuestions().then((allQuestions) => {
                    const filteredList = allQuestions
                        .filter(
                            (q) =>
                                (calculator ? `${q.calculator}` === calculator : true) &&
                                (difficulty ? mapDifficultyLevelToText(q.difficulty) === difficulty : true) &&
                                (topic ? q.category === topic.toUpperCase() : true));
                    if (filteredList.length === 0) {
                        setQuestion(undefined);
                    } else {
                        const selectedQuestion = filteredList[Math.floor(Math.random() * filteredList.length)]
                        setQuestion(selectedQuestion);
                    }
                });
            }
        }
    }, [queryParameters]);

    useEffect(() => {
        getNewQuestion();
    }, [getNewQuestion]);

    if (question === null) {
        return (
            <DefaultLayout>
                <Spinner position="absolute" top="50%" left="50%" />
            </DefaultLayout>
        );
    } else if (question === undefined) {
        return (
            <DefaultLayout>
                <AbsoluteCenter textAlign="center">
                    <FaPersonCircleQuestion size="100" />
                    <Text my="10">No questions found</Text>
                    <Button onClick={() => navigate(-1)} >
                        Go Back
                    </Button>
                </AbsoluteCenter>
            </DefaultLayout>
        );
    }

    const difficulty = mapDifficultyLevelToText(question.difficulty);

    const handleAnswerSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!question) {
            throw new Error("Missing question ID from URL.");
        }

        const form = event.currentTarget;

        const answer = form.answer.value;

        if (!answer) {
            throw new Error("Answer cannot be empty.");
        }

        const submission = await answerQuestion(question.id, answer);
        setCorrect(!submission.submitted_answer ? false : true);
        onOpen();
    };
    return (
        <DefaultLayout backgroundColor="gray.50">
            <Breadcrumb
                spacing="8px"
                separator={<MdKeyboardArrowRight />}
                position="relative"
                bg="#F5FBFF"
                px="10"
                py="2"
            >
                <BreadcrumbItem zIndex="9999">
                    <BreadcrumbLink href="#">SAT</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem zIndex="9999">
                    <BreadcrumbLink href="#">
                        {question && !question.calculator && "No "}Calculator Allowed
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                        {question && question.category && TopicDictionary[question.category]}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex w="100%" px="10" py="5">
                <Workspace overflow="auto" {...{ drawingOn, eraserOn, selectedColor }}>
                    <Box>
                        <Image src={question.image} alt={question.title} maxW="50vw" maxH="50vh" userSelect="none" />

                        <form onSubmit={handleAnswerSubmission} style={{ display: "flex" }}>
                            <HStack bgColor="white" position="relative" zIndex={9999} pt="4" pb="6">
                                {question.multiple_choice ? (
                                    <Select
                                        options={["A", "B", "C", "D"].map((choice) => ({
                                            label: choice,
                                            value: choice.toLowerCase(),
                                        }))}
                                        isRequired
                                        isSearchable={false}
                                        placeholder="Select an answer"
                                        name="answer"
                                    />
                                ) : (
                                    <Input type="text" name="answer" />
                                )}

                                <Box>
                                    <Input type="submit" value="Submit" />
                                </Box>
                            </HStack>
                        </form>
                    </Box>
                </Workspace>
                {correct !== null && (
                    <FeedbackModal
                        isOpen={isOpen}
                        onClose={onClose}
                        correct={correct}
                        onNextQuestion={() => { getNewQuestion(true); onClose() }} />
                )}

                {/* Toolbar */}
                <Flex flex="1" flexDirection="column" alignItems="flex-end" py="5" ml="5">
                    <Badge
                        colorScheme={difficulty.toLowerCase()}
                        fontSize={["sm", "sm", "md", "md"]}
                        px="3"
                        zIndex="1"
                    >
                        {difficulty}
                    </Badge>
                    <Box py="5">
                        <Text textAlign="center">Time Passed:</Text>
                        <Timer />
                    </Box>

                    <Box>
                        <Text pb="2">Tools:</Text>
                        <DrawingToolbar
                            {...{ drawingOn, eraserOn, selectedColor, handleDrawing, handleSwitchPenTool }}
                        />
                        <Box mt="60px" py="5">
                            <ReferenceTool {...{ referenceOn, handleReferenceToolClick }} />
                        </Box>
                        {
                            question.calculator && (
                                <Box py="5">
                                    <CalculatorTool {...{ calculatorOn, handleCalculatorToolClick }} />
                                </Box>
                            )
                        }
                    </Box >
                </Flex >

                <ToolDrawer
                    {...{ drawerStatus, calculatorOn, referenceOn }}
                    handleToggle={() => setDrawerStatus(drawerStatus === "active" ? "inactive" : "active")}
                />
            </Flex >
        </DefaultLayout >
    );
};

export default AnswerPage;
