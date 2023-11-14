import { AbsoluteCenter, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BsCalculatorFill, BsBookFill } from "react-icons/bs";
import { RxDragHandleHorizontal } from "react-icons/rx";
import { CalculatorContent } from "./CalculatorTool";
import { ReferenceContent } from "./ReferenceTool";

export type DrawerStatus = "active" | "inactive" | "stop";

type ToolDrawerProps = {
    drawerStatus: DrawerStatus;
    handleToggle: () => void;
    calculatorOn: boolean;
    referenceOn: boolean;
}

export const ToolDrawer = ({ drawerStatus, handleToggle, calculatorOn }: ToolDrawerProps) => {
    const drawerVariants = {
        stop: {
            height: "0px",
            transition: { duration: 1, type: "spring" }
        },
        active: {
            height: calculatorOn ? "560px" : "360px",
            transition: { duration: 1, type: "spring" }
        },
        inactive: {
            height: "40px",
            transition: { duration: 1, type: "spring" }
        }
    }
    return (
        <motion.div
            variants={drawerVariants}
            animate={drawerStatus}
            style={{
                position: "fixed",
                zIndex: "9",
                right: "10%",
                bottom: "0px",
                width: calculatorOn ? "670px" : "520px",
                backgroundColor: "gray",
                borderRadius: "20px"
            }}
        >
            <Flex
                justifyContent="space-around"
                alignItems="center"
                h="40px"
                border="1px solid gray"
                borderTopRadius="20px"
                bgColor="#F5FBFF"
                onClick={() => handleToggle()}
                cursor="pointer">
                <RxDragHandleHorizontal size="30" />
                {calculatorOn ? <BsCalculatorFill size="30" /> : <BsBookFill size="30" />}
                <RxDragHandleHorizontal size="30" />
            </Flex>
            <AbsoluteCenter mt="20px">
                {drawerStatus === "active" && (
                    <>
                        {calculatorOn ? (
                            <CalculatorContent width="650px" height="500px" />
                        ) : (
                            <ReferenceContent />
                        )}
                    </>
                )}
            </AbsoluteCenter>
        </motion.div>
    );
};