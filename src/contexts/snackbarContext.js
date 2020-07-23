import React, { useState } from "react";
import { useSnackbar } from "notistack";

import SnackbarStatus from "../constants/enums/snackbarStatus";

export const SnackbarContext = React.createContext({
  snackbarData: null,
  setSnackbarData: () => {},
});

const SnackbarContextProvider = (props) => {
  const [data, setData] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const handleSnackbarDataSet = (newData, status = SnackbarStatus.error) => {
    enqueueSnackbar(newData.message, { variant: status });
    setData(newData.message);
  };

  return (
    <SnackbarContext.Provider
      value={{ snackbarData: data, setSnackbarData: handleSnackbarDataSet }}
    >
      {props.children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
