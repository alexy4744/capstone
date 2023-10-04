import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar"

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Box>
            <Box zIndex={9999}>
                <Navbar />
            </Box>
            <main>{children}</main>
        </Box>
    );
}

export default HomeLayout;