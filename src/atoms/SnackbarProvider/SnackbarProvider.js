import React from "react";
import { SnackbarProvider as MUISnackbarProvider } from "notistack";

import "./SnackbarProvider.scss";

const SnackbarProvider = (props) => {
  return (
    <MUISnackbarProvider
      classes={{
        root: "CustomSnackbarProvider__Root",
        variantError: "CustomSnackbarProvider__Variant",
        variantSuccess: "CustomSnackbarProvider__Variant",
        variantInfo: "CustomSnackbarProvider__Variant",
        variantWarning: "CustomSnackbarProvider__Variant",
      }}
      maxSnack={3}
      hideIconVariant
    >
      {props.children}
    </MUISnackbarProvider>
  );
};

export default SnackbarProvider;
