import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { MdKeyboardArrowRight } from "react-icons/md";

import { Select } from "chakra-react-select";

import { answerQuestion, getQuestion, Question } from "../../../api/questions";

import { CalculatorTool } from "../components/CalculatorTool";
import { DrawerStatus, ToolDrawer } from "../components/ToolDrawer";
import { DrawingToolbar } from "../components/DrawingToolbar";
import { ReferenceTool } from "../components/ReferenceTool";
import { Timer } from "../components/Timer";
import { Workspace } from "../components/Workspace";

import { DefaultLayout } from "../../../layout/DefaultLayout";

const mapDifficultyLevelToText = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return "Easy";
    case 2:
      return "Medium";
    case 3:
      return "Hard";
    default:
      throw new RangeError("Difficulty level must be between 1 and 3.");
  }
};

const AnswerPage = () => {
  const { id: questionId } = useParams();

  const [question, setQuestion] = useState<Question | null>(null);

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

  const handleAnswerSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!questionId) {
      throw new Error("Missing question ID from URL.");
    }

    const form = event.currentTarget;

    const answer = form.answer.value;

    if (!answer) {
      throw new Error("Answer cannot be empty.");
    }

    const submission = await answerQuestion(questionId, answer);

    if (!submission.submitted_answer) {
      return alert("Incorrect answer. Please try again.");
    }

    alert("Correct answer!");
  };

  useEffect(() => {
    if (!questionId) {
      throw new Error("Missing question ID from URL.");
    }

    getQuestion(questionId).then(setQuestion);
  }, [questionId]);

  if (!question) {
    return (
      <DefaultLayout>
        <Spinner position="absolute" top="50%" left="50%" />
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
          <BreadcrumbLink href="#">
            {question.calculator ? "Calculator Allowed" : "No Calculator Allowed"}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex w="100%" px="10" py="5">
        <Workspace {...{ drawingOn, eraserOn, selectedColor }}>
          <Box>
            <Image src={question.image} alt={question.title} />

            <form onSubmit={handleAnswerSubmission} style={{ display: "flex" }}>
              <HStack bgColor="white" position="relative" zIndex={9999}>
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

            {question.calculator && (
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
