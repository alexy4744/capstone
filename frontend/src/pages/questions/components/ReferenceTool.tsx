import {
    Box,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody
} from "@chakra-ui/react";
import { BsBookFill, BsBook } from "react-icons/bs";
import { useState } from "react";
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
    handleReferenceToolClick: Function;
}

export const ReferenceTool = ({ referenceOn, handleReferenceToolClick }: ReferenceToolProps) => {
    return (
        // <Popover placement="left" isOpen={referenceOn}>
        //     <PopoverTrigger>
        //         <Tooltip label='Reference' fontSize='md'>
        //             <Box as="button" onClick={() => handleReferenceToolClick()}>
        //                 {referenceOn ? <BsBookFill size="30" /> : <BsBook size="30" />}
        //             </Box>
        //         </Tooltip>
        //     </PopoverTrigger>
        //     <PopoverContent height="320px" width="500px">
        //         <PopoverArrow />
        //         <PopoverCloseButton onClick={() => setReferenceOn(!referenceOn)} />
        //         <PopoverBody>
        //             <img src={ReferenceImage} height={1000} />
        //         </PopoverBody>
        //     </PopoverContent>
        // </Popover>
        <Tooltip label='Reference' fontSize='md'>
            <Box as="button" onClick={() => handleReferenceToolClick()}>
                {referenceOn ? <BsBookFill size="30" /> : <BsBook size="30" />}
            </Box>
        </Tooltip>
    );
};