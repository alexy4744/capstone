import { PropsWithChildren } from "react";

import { Box, BoxProps } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

type DefaultLayoutProps = { backgroundColor?: string } & BoxProps & PropsWithChildren;

export const DefaultLayout = ({ backgroundColor = "white", children, ...props }: DefaultLayoutProps) => {
  return (
    <Box minH="100vh" backgroundColor={backgroundColor}>
      <header>
        <Navbar />
      </header>
      <main>
        <Box overflowX="clip" {...props}>{children}</Box>
      </main>
    </Box>
  );
};
