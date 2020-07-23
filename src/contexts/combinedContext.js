import React from "react";

import SnackbarContextProvider from "./snackbarContext";
import UserContextProvider from "./userContext";
import { SnackbarProvider } from "../atoms";

const CombinedContext = (props) => (
  <SnackbarProvider>
    <SnackbarContextProvider>
      <UserContextProvider>{props.children}</UserContextProvider>
    </SnackbarContextProvider>
  </SnackbarProvider>
);

export default CombinedContext;
