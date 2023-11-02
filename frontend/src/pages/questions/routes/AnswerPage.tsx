import { Text, Flex, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Badge } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useParams } from "react-router-dom";
import { DefaultLayout } from "../../../layout/DefaultLayout";
import { Timer } from "../components/Timer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScribblePad } from "../components/ScribblePad";
import { DrawingToolbar } from "../components/DrawingToolbar";
import { ReferenceTool } from "../components/ReferenceTool";
import { CalculatorTool } from "../components/CalculatorTool";
import { GraphingCalculator } from "desmos-react";

const AnswerPage = () => {
    const param = useParams();

    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [drawingOn, setDrawingOn] = useState<boolean>(false);
    const [eraserOn, setEraserOn] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string>("");

    const handleResize = () => {
        if (ref.current) {
            setWidth(ref.current.clientWidth);
            setHeight(ref.current.clientHeight);
        }
    }
    useLayoutEffect(() => {
        handleResize();
    }, [])
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    })

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

    return (
        <DefaultLayout backgroundColor="gray.50">
            <Breadcrumb
                spacing='8px'
                separator={<MdKeyboardArrowRight />}
                position="relative"
                bg="#F5FBFF"
                px="10"
                py="2"
                zIndex="1">
                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>SAT</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Calculator Allowed</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex w="100%" px="10" py="5">
                <Flex
                    position="relative"
                    w="90%"
                    h={height}
                    m="2"
                    bg="white"
                    minH="624px"
                    borderRadius="lg"
                    zIndex="1"
                    ref={ref}>
                    <Box position="absolute">
                        <ScribblePad
                            width={width}
                            height={height}
                            enabled={drawingOn}
                            penColor={selectedColor}
                            tool={eraserOn ? "eraser" : "pen"}
                            strokeWidth={eraserOn ? 20 : 5} />
                    </Box>
                    <Flex w="100%" justifyContent="flex-end" alignSelf="flex-end" p="5">
                        <Button
                            variant="link"
                            size="sm"
                            onClick={() => setHeight(height + 500)}>
                            Expand workspace
                        </Button>
                    </Flex>
                </Flex>

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
                            <ReferenceTool />
                        </Box>
                        <Box py="5">
                            <CalculatorTool />
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </DefaultLayout>
    );
};

export default AnswerPage;

