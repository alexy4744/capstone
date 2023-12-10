import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";

import { MdKeyboardArrowRight } from "react-icons/md";

import { getQuestion, Question } from "../../../api/questions";

import { CalculatorTool } from "../components/CalculatorTool";
import { DrawerStatus, ToolDrawer } from "../components/ToolDrawer";
import { DrawingToolbar } from "../components/DrawingToolbar";
import { ReferenceTool } from "../components/ReferenceTool";
import { Timer } from "../components/Timer";
import { Workspace } from "../components/Workspace";

import { DefaultLayout } from "../../../layout/DefaultLayout";

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

  useEffect(() => {
    if (!questionId) {
      throw new Error("Missing question ID from URL.");
    }

    getQuestion(questionId).then(setQuestion);
  }, [questionId]);

  if (!question) {
    return <DefaultLayout>Loading...</DefaultLayout>;
  }

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
          <BreadcrumbLink href="#">Calculator Allowed</BreadcrumbLink>
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
          <Badge colorScheme="hard" px="3" fontSize={["sm", "sm", "md", "md"]} zIndex="1">
            hard
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

            <Box py="5">
              <CalculatorTool {...{ calculatorOn, handleCalculatorToolClick }} />
            </Box>
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
