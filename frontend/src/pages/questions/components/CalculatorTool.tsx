import {
    Box,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
} from "@chakra-ui/react";
import { BsCalculatorFill, BsCalculator } from "react-icons/bs";
import { useState, useEffect } from "react";

type CalculatorContentProps = {
    width?: string;
    height?: string;
}

export const CalculatorContent = ({ width = "600px", height = "400px" }: CalculatorContentProps) => {
    const url = "https://www.desmos.com/api/v1.6/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => {
        var elt = document.getElementById('calculator');
        if (elt && elt.childElementCount === 0) {
            var calculator = Desmos.GraphingCalculator(elt);
            calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });
        }
    }

    useEffect(() => {
        document.body.appendChild(script);
        return () => { document.body.removeChild(script) };
    }, [])

    return (
        <div id="calculator" style={{ width: width, height: height }}></div>
    );
};

type CalculatorToolProps = {
    calculatorOn: boolean; 
    handleCalculatorToolClick: Function
}

export const CalculatorTool = ({ calculatorOn, handleCalculatorToolClick }: CalculatorToolProps) => {

    return (
        // <Popover placement="left" isOpen={calculatorOn}>
        //     <PopoverTrigger>
        //         <Tooltip label='Calculator (Desmos)' fontSize='md'>
        //             <Box as="button" onClick={() => setCalculatorOn(!calculatorOn)}>
        //                 {calculatorOn ? <BsCalculatorFill size="30" /> : <BsCalculator size="30" />}
        //             </Box>
        //         </Tooltip>
        //     </PopoverTrigger>
        //     <PopoverContent width="650px" height="450px">
        //         <PopoverArrow />
        //         <PopoverCloseButton onClick={() => setCalculatorOn(!calculatorOn)} />
        //         <PopoverBody>
        //             <div id="calculator" style={{ width: "600px", height: "400px" }}></div>
        //         </PopoverBody>
        //     </PopoverContent>
        // </Popover>
        <Tooltip label='Calculator (Desmos)' fontSize='md'>
            <Box as="button" onClick={() => handleCalculatorToolClick()}>
                {calculatorOn ? <BsCalculatorFill size="30" /> : <BsCalculator size="30" />}
            </Box>
        </Tooltip>
    );
};


// export const CalculatorTool = () => {
//     useEffect (() => {
//         console.log("within calulator tool component ");
//     }, [])
//     const Point = () => {
//         const a = useHelperExpression({ latex: "a" });

//         let label;
//         if (a > 0)
//             label = "positive x-axis"
//         else if (a < 0)
//             label = "negative x-axis"
//         else
//             label = "origin";

//         return (
//             <Expression id="point" latex="(a,0)" label={label} showLabel />
//         );
//     }
//     return (
//         <GraphingCalculator
//             attributes={{ style: { height: "100vh", width: "100vw" } }}
//             fontSize={18} keypad projectorMode
//         >
//             <Expression id="slider" latex="a=3" />
//             <Point />
//         </GraphingCalculator>
//     );
// }