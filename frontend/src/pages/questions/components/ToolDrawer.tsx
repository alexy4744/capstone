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
            display: "none",
            height: "0px",
            transition: { duration: 1, type: "spring" }
        },
        active: {
            display: "block",
            height: calculatorOn ? "560px" : "360px",
            transition: { duration: 1, type: "spring" }
        },
        inactive: {
            display: "block",
            height: "40px",
            transition: { duration: 1, type: "spring" }
        }
    }
    return (
        <motion.div
            variants={drawerVariants}
            animate={drawerStatus}
            style={{
                display: "none",
                position: "fixed",
                zIndex: "9",
                right: "10%",
                bottom: "0px",
                width: calculatorOn ? "670px" : "520px",
                height: "0px",
                backgroundColor: "#F5FBFF",
                border: "1px solid gray",
                borderRadius: "20px"
            }}
        >
            <Flex
                justifyContent="space-around"
                alignItems="center"
                h="40px"
                borderBottom="1px solid gray"
                borderTopRadius="20px"
                bgColor="gray.50"
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