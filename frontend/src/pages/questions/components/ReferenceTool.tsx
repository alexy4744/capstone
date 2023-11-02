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

export const ReferenceTool = () => {
    const [referenceOn, setReferenceOn] = useState<boolean>(false);
    return (
        <Popover placement="left" isOpen={referenceOn}>
            <PopoverTrigger>
                <Tooltip label='Reference' fontSize='md'>
                    <Box as="button" onClick={() => setReferenceOn(!referenceOn)}>
                        {referenceOn ? <BsBookFill size="30" /> : <BsBook size="30" />}
                    </Box>
                </Tooltip>
            </PopoverTrigger>
            <PopoverContent height="320px" width="500px">
                <PopoverArrow />
                <PopoverCloseButton onClick={() => setReferenceOn(!referenceOn)} />
                <PopoverBody>
                    <img src={ReferenceImage} height={1000} />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};