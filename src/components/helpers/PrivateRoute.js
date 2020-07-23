import React from "react";
import { Route } from "react-router-dom";

import { userLSKey } from "../../constants/localStorageKeys";

const PrivateRoute = ({ component: Component, ...inputProps }) => (
  <Route
    {...inputProps}
    render={(props) =>
      localStorage.getItem(userLSKey) ? (
        <Component {...props} />
      ) : (
        (window.location.href = "/login")
      )
    }
  />
);
export default PrivateRoute;
