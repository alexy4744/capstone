import { PropsWithChildren } from "react";

import { Box, BoxProps } from "@chakra-ui/react";

import Navbar from "../../../components/Navbar";

type DefaultLayoutProps = BoxProps & PropsWithChildren;

export const DefaultLayout = ({ children, ...props }: DefaultLayoutProps) => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Box {...props}>{children}</Box>
      </main>
    </>
  );
};
