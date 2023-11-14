import {
    Box,
    Tooltip
} from "@chakra-ui/react";
import { BsCalculatorFill, BsCalculator } from "react-icons/bs";
import { useEffect } from "react";

type CalculatorContentProps = {
    width?: string;
    height?: string;
}

export const CalculatorContent = ({ width = "600px", height = "400px" }: CalculatorContentProps) => {
    const script = document.createElement("script");
    console.log("the src would be ", import.meta.env.VITE_DESMOS_API)
    console.log("and the other things he defined ", import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST)
    if (import.meta.env.VITE_DESMOS_API) {
        script.src = import.meta.env.VITE_DESMOS_API;
        script.async = true;
        script.onload = () => {
            const elt = document.getElementById('calculator');
            if (elt && elt.childElementCount === 0) {
                const calculator = Desmos.GraphingCalculator(elt);
                calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });
            }
        }
    }

    useEffect(() => {
        document.body.appendChild(script);
        return () => { document.body.removeChild(script) };
    }, [script])

    return (
        <div id="calculator" style={{ width: width, height: height }}></div>
    );
};

type CalculatorToolProps = {
    calculatorOn: boolean;
    handleCalculatorToolClick: () => void;
}

export const CalculatorTool = ({ calculatorOn, handleCalculatorToolClick }: CalculatorToolProps) => {

    return (
        <Tooltip label='Calculator (Desmos)' fontSize='md'>
            <Box as="button" onClick={() => handleCalculatorToolClick()}>
                {calculatorOn ? <BsCalculatorFill size="30" /> : <BsCalculator size="30" />}
            </Box>
        </Tooltip>
    );
};