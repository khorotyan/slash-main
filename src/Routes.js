import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import { SignUp, SignIn } from "slash-auth";
import { SignUp, SignIn } from "./components/Authentication";

import Home from "./components/Home";
import Profile from "./components/Profile";
import PrivateRoute from "./components/helpers/PrivateRoute";
import CombinedContext from "./contexts/combinedContext";

const Routes = () => {
  return (
    <CombinedContext>
      <Router>
        <Switch>
          <Route path="/register" exact component={SignUp} />
          <Route path="/login" exact component={SignIn} />

          <PrivateRoute exact path="/profile" component={Profile} />

          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </CombinedContext>
  );
};

export default Routes;
