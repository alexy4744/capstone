import { Text, Flex, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Tooltip, Badge, ChakraComponent } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsPen, BsPenFill, BsBook, BsBookFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";
import Timer from "../components/Timer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScribblePad } from "../components/ScribblePad";

const AnswerPage = () => {
    const param = useParams();
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [drawingOn, setDrawingOn] = useState<boolean>(false);
    const [referenceOn, setReferenceOn] = useState<boolean>(false);

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

    const handleDrawing = () => {
        setDrawingOn(!drawingOn);
    }

    return (
        <HomeLayout bgColor="gray.50">
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
                    <BreadcrumbLink href='#'>No Calculator Allowed</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex w="100%" px="10" py="5">
                <Box
                    w="90%"
                    m="2"
                    bg="white"
                    minH="600px"
                    borderRadius="lg"
                    zIndex="1"
                    ref={ref}>
                    <ScribblePad width={width} height={height} enabled={drawingOn}/>
                </Box>
                <Flex flex="1" flexDirection="column" alignItems="flex-end" py="5">
                    {/* <Box position="absolute" top="-10%" left="-40%" style={{ rotate: "30deg", border: "1px solid red" }}>
                            <Box
                                position="relative"
                                bg="hard.50"
                                w="300px"
                                h="50px"
                                zIndex="-9999">
                                <Badge
                                    position="absolute"
                                    colorScheme="hard"
                                    px="3"
                                    fontSize={["sm", "sm", "md", "md"]}
                                    zIndex="1">
                                    hard
                                </Badge>
                            </Box>
                        </Box> */}

                    <Badge
                        colorScheme="hard"
                        px="3"
                        fontSize={["sm", "sm", "md", "md"]}
                        zIndex="1">
                        hard
                    </Badge>
                    <Box py="5">
                        <Text>Time Passed:</Text>
                        <Timer />
                    </Box>
                    <Box>
                        <Text>Tools:</Text>
                        <Box py="5" onClick={() => handleDrawing()}>
                            <Tooltip label='Drawing Board' fontSize='md'>
                                <span>
                                    {drawingOn ? <BsPenFill size="30" /> : <BsPen size="30" />}
                                </span>
                            </Tooltip>
                        </Box>
                        <Box py="5" onClick={() => setReferenceOn(!referenceOn)}>
                            <Tooltip label='Reference' fontSize='md'>
                                <span>
                                    {referenceOn ? <BsBookFill size="30" /> : <BsBook size="30" />}
                                </span>
                            </Tooltip>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </HomeLayout>
    );
};

export default AnswerPage;

