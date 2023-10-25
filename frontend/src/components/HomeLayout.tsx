import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar"

const HomeLayout = ({ bgColor, children }: { bgColor?: string, children: ReactNode }) => {
    return (
        <Box bg={bgColor} minH="100vh" overflowX="hidden">
            <Box zIndex={9999}>
                <Navbar />
            </Box>
            <main>{children}</main>
        </Box>
    );
}

export default HomeLayout;