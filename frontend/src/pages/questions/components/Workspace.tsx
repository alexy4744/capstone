import { useRef, useState, useLayoutEffect, useEffect, PropsWithChildren } from "react";
import { Flex, Box, Button, BoxProps } from "@chakra-ui/react";
import { ScribblePad } from "./ScribblePad";

type WorkspaceProps = {
    drawingOn: boolean;
    selectedColor: string;
    eraserOn: boolean;
} & BoxProps & PropsWithChildren

export const Workspace = ({ drawingOn, selectedColor, eraserOn, children, ...props }: WorkspaceProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
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

    return (
        <Flex
            position="relative"
            w="90%"
            h={height}
            m="2"
            bg="white"
            minH="75vh"
            borderRadius="lg"
            zIndex="1"
            ref={ref}
            {...props}>
            <Box position="absolute">
                <ScribblePad
                    width={width}
                    height={height}
                    enabled={drawingOn}
                    penColor={selectedColor}
                    tool={eraserOn ? "eraser" : "pen"}
                    strokeWidth={eraserOn ? 20 : 5} />
            </Box>
            <Flex p="10">
                {children}
            </Flex>
            <Flex w="100%" justifyContent="flex-end" alignSelf="flex-end" p="5">
                <Button
                    variant="link"
                    size="sm"
                    onClick={() => setHeight(height + 500)}>
                    Expand workspace
                </Button>
            </Flex>
        </Flex>
    );
};