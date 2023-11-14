import { Box, Flex, Divider } from "@chakra-ui/react";
import { BsEraserFill, BsPenFill, BsPen, BsFillCheckCircleFill } from "react-icons/bs";
import { PiCircleDuotone } from "react-icons/pi";
import { useState } from "react";

type DrawingToolbarProps = {
    selectedColor: string;
    drawingOn: boolean;
    eraserOn: boolean;
    handleDrawing: (s: string, b?: boolean) => void;
    handleSwitchPenTool: () => void;
}

export const DrawingToolbar = ({ selectedColor, drawingOn, eraserOn, handleDrawing, handleSwitchPenTool } : DrawingToolbarProps) => {
    const colors: string[] = ["red", "blue", "green", "black"];
    const [isToolOpen, setIsToolOpen] = useState<boolean>(false);

    return (
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
                        <Box onClick={() => handleSwitchPenTool()}>
                            {eraserOn ?
                                <BsPenFill size="30" color={selectedColor} /> :
                                <BsEraserFill size="30" />
                            }
                        </Box>
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};