import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";

import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPersonCircleQuestion } from "react-icons/fa6";

import { getQuestion, getQuestions, Question } from "../../../api/questions";

import { CalculatorTool } from "../components/CalculatorTool";
import { DrawerStatus, ToolDrawer } from "../components/ToolDrawer";
import { DrawingToolbar } from "../components/DrawingToolbar";
import { ReferenceTool } from "../components/ReferenceTool";
import { Timer } from "../components/Timer";
import { Workspace } from "../components/Workspace";

import { DefaultLayout } from "../../../layout/DefaultLayout";
import { TopicDictionary } from "../../../components/CategorySelector";

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
    const navigate = useNavigate();

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

    useEffect(() => {
        const id = queryParameters.get("id");
        if (id && !isNaN(id)) {
            getQuestion(id).then((question) => setQuestion(question));
        } else {
            const calculator = queryParameters.get("calculator");
            const difficulty = queryParameters.get("difficulty");
            const topic = queryParameters.get("topic");
            if (!calculator && !difficulty && !topic) {
                setQuestion(undefined);
            } else {
                getQuestions().then((allQuestions) => {
                    const filteredList = allQuestions
                        .filter((q) =>
                            (calculator ? `${q.calculator}` === calculator : true)
                            && (difficulty ? mapDifficultyLevelToText(q.difficulty) === difficulty : true)
                            && (topic ? q.category === topic.toUpperCase() : true));
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

    if (question === null) {
        return (<DefaultLayout>
            <Flex justifyContent="center" alignSelf="center">
                Loading...
            </Flex>
        </DefaultLayout>);
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
                    <BreadcrumbLink href="#">{question && !question.calculator && "No "}Calculator Allowed</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem zIndex="9999">
                    <BreadcrumbLink href="#">{question && question.category && TopicDictionary[question.category]}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <Flex w="100%" px="10" py="5">
                <Workspace {...{ drawingOn, eraserOn, selectedColor }}>
                    <Box>
                        <Image src={question.image} alt={question.title} />
                    </Box>
                </Workspace>

                {/* Toolbar */}
                <Flex flex="1" flexDirection="column" alignItems="flex-end" py="5">
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

                        {question && question.calculator && (
                            <Box py="5">
                                <CalculatorTool {...{ calculatorOn, handleCalculatorToolClick }} />
                            </Box>
                        )}
                    </Box>
                </Flex>

                <ToolDrawer
                    {...{ drawerStatus, calculatorOn, referenceOn }}
                    handleToggle={() => setDrawerStatus(drawerStatus === "active" ? "inactive" : "active")}
                />
            </Flex>
        </DefaultLayout>
    );
};

export default AnswerPage;
