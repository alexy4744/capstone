import {
    Box,
    Tooltip
} from "@chakra-ui/react";
import { BsBookFill, BsBook } from "react-icons/bs";
import ReferenceImage from "../../../assets/SAT Reference Sheet.jpg";

export const ReferenceContent = ({ width = "500px" }: { width?: string }) => {
    return (
        <Box w={width}>
            <img src={ReferenceImage} />
        </Box>
    );
};

type ReferenceToolProps = {
    referenceOn: boolean;
    handleReferenceToolClick: () => void;
}

export const ReferenceTool = ({ referenceOn, handleReferenceToolClick }: ReferenceToolProps) => {
    return (
        <Tooltip label='Reference' fontSize='md'>
            <Box as="button" onClick={() => handleReferenceToolClick()}>
                {referenceOn ? <BsBookFill size="30" /> : <BsBook size="30" />}
            </Box>
        </Tooltip>
    );
};