import { Text, Flex, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Badge } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { DefaultLayout } from "../../../layout/DefaultLayout";
import { Timer } from "../components/Timer";
import { useState } from "react";
import { DrawingToolbar } from "../components/DrawingToolbar";
import { ReferenceTool } from "../components/ReferenceTool";
import { CalculatorTool } from "../components/CalculatorTool";
import { DrawerStatus, ToolDrawer } from "../components/ToolDrawer";
import { Workspace } from "../components/Workspace";

const AnswerPage = () => {
    // const param = useParams();

    const [drawingOn, setDrawingOn] = useState<boolean>(false);
    const [eraserOn, setEraserOn] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [drawerStatus, setDrawerStatus] = useState<DrawerStatus>("stop");
    const [calculatorOn, setCalculatorOn] = useState<boolean>(false);
    const [referenceOn, setReferenceOn] = useState<boolean>(false);

    const handleDrawing = (color: string = selectedColor, enable: boolean = !drawingOn) => {
        if (color === "") {
            color = "black";
        }
        setSelectedColor(color);
        setDrawingOn(enable);
        setEraserOn(false);
    }
    const handleSwitchPenTool = () => {
        setEraserOn(!eraserOn);
        setDrawingOn(true);
    }
    const handleCalculatorToolClick = () => {
        setDrawerStatus(!calculatorOn ? "active" : "stop");
        setReferenceOn(false);
        setCalculatorOn(!calculatorOn);
    }
    const handleReferenceToolClick = () => {
        setDrawerStatus(!referenceOn ? "active" : "stop");
        setCalculatorOn(false);
        setReferenceOn(!referenceOn);
    }

    return (
        <DefaultLayout backgroundColor="gray.50">
            <Breadcrumb
                spacing='8px'
                separator={<MdKeyboardArrowRight />}
                position="relative"
                bg="#F5FBFF"
                px="10"
                py="2">
                <BreadcrumbItem zIndex="9999">
                    <BreadcrumbLink href='#'>SAT</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem zIndex="9999">
                    <BreadcrumbLink href='#'>Calculator Allowed</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex w="100%" px="10" py="5">
                <Workspace {...{drawingOn, eraserOn, selectedColor}} >
                    <Text>test</Text>
                </Workspace>

                {/* Toolbar */}
                <Flex flex="1" flexDirection="column" alignItems="flex-end" py="5">
                    <Badge
                        colorScheme="hard"
                        px="3"
                        fontSize={["sm", "sm", "md", "md"]}
                        zIndex="1">
                        hard
                    </Badge>
                    <Box py="5" >
                        <Text textAlign="center">Time Passed:</Text>
                        <Timer />
                    </Box>
                    <Box>
                        <Text pb="2">Tools:</Text>
                        <DrawingToolbar {... { drawingOn, eraserOn, selectedColor, handleDrawing, handleSwitchPenTool }} />
                        <Box mt="60px" py="5">
                            <ReferenceTool {... {referenceOn, handleReferenceToolClick}}/>
                        </Box>
                        <Box py="5">
                            <CalculatorTool {... {calculatorOn, handleCalculatorToolClick}}/>
                        </Box>
                    </Box>
                </Flex>
                <ToolDrawer {... {drawerStatus, calculatorOn, referenceOn}} handleToggle={() => setDrawerStatus(drawerStatus === "active" ? "inactive" : "active")}/>
            </Flex>
        </DefaultLayout>
    );
};

export default AnswerPage;

