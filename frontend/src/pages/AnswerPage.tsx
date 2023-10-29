import { Text, Flex, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Tooltip, Badge, Popover, useDisclosure, PopoverTrigger, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverBody, PopoverFooter, ButtonGroup, Button, Divider } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsPen, BsPenFill, BsBook, BsBookFill, BsEraserFill, BsFillCheckCircleFill } from "react-icons/bs";
import { PiCircleDuotone } from "react-icons/pi";
import { useParams } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";
import Timer from "../components/Timer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScribblePad } from "../components/ScribblePad";
import ReferenceImage from "../assets/SAT Reference Sheet.jpg";

const AnswerPage = () => {
    const param = useParams();

    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [drawingOn, setDrawingOn] = useState<boolean>(false);
    const [eraserOn, setEraserOn] = useState<boolean>(false);
    const colors: string[] = ["red", "blue", "green", "black"];
    const [selectedColor, setSelectedColor] = useState<string>("");

    const [referenceOn, setReferenceOn] = useState<boolean>(false);

    const [isToolOpen, setIsToolOpen] = useState<boolean>(false);

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
                <Flex
                    position="relative"
                    w="90%"
                    h={height}
                    m="2"
                    bg="white"
                    minH="600px"
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
                        <Box position="relative">
                            <Flex
                                position="absolute"
                                right="25%"
                                alignItems="center"
                                flexDirection="row-reverse"
                                height="50px"
                                onMouseEnter={() => setIsToolOpen(true)}
                                onMouseLeave={() => setIsToolOpen(false)}>

                                <Box onClick={() => handleDrawing(selectedColor)}>
                                    {eraserOn ? <BsEraserFill size="30" /> :
                                        drawingOn ? <BsPenFill size="30" color={selectedColor} /> : <BsPen size="30" color={selectedColor} />
                                    }
                                </Box>
                                {isToolOpen && (
                                    <Flex
                                        mr="2"
                                        px="3"
                                        py="1"
                                        alignItems="center"
                                        justifyContent="space-around"
                                        borderBottom="2px"
                                        borderBottomLeftRadius="xl"
                                        borderTopLeftRadius="xl"
                                        width="200px"
                                        height="50px"
                                        bg="rgba(170, 170, 169, 0.3)"
                                        zIndex="1">
                                        {colors.map((c) => (
                                            (c === selectedColor) ?
                                                <BsFillCheckCircleFill size="33" px="2" color={c} /> :
                                                <PiCircleDuotone size="40" color={c} onClick={() => handleDrawing(c, true)} />
                                        ))}
                                        <Divider mx="2" orientation="vertical" />
                                        <Box onClick={() => { setEraserOn(!eraserOn); setDrawingOn(true) }}>
                                            {eraserOn ?
                                                <BsPenFill size="30" color={selectedColor} /> :
                                                <BsEraserFill size="30" />
                                            }
                                        </Box>
                                    </Flex>
                                )}
                            </Flex>
                        </Box>
                        <Box mt="60px" py="5" onClick={() => setReferenceOn(!referenceOn)}>
                            <Tooltip label='Reference' fontSize='md'>
                                <Popover placement="left" isOpen={referenceOn}>
                                    <PopoverTrigger>
                                        <Box as="button">
                                            {referenceOn ? <BsBookFill size="30" /> : <BsBook size="30" />}
                                        </Box>
                                    </PopoverTrigger>
                                    <PopoverContent height="320px" width="500px">
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                            <img src={ReferenceImage} height={1000} />
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Tooltip>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </HomeLayout>
    );
};

export default AnswerPage;

