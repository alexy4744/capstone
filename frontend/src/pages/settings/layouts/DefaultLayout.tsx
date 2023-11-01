import { PropsWithChildren } from "react";

import Navbar from "../../../components/Navbar";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>{children}</main>
    </>
  );
};
