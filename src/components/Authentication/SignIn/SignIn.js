import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import { Input, Button, GoogleButton } from "../../../atoms";
import apiRequest from "../../../utils/apiRequest";
import { SnackbarContext } from "../../../contexts/snackbarContext";
import { UserContext } from "../../../contexts/userContext";
import { EmailValid } from "../../../utils/paramValidator";

import "./SignIn.scss";

import Logo from "../../../assets/images/General/logo.webp";

const fieldNames = Object.freeze({
  email: "email",
  password: "password",
});

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);
  const [fieldStatuses, setFieldStatuses] = useState({
    email: true,
  });

  const snackbarContext = useContext(SnackbarContext);
  const userContext = useContext(UserContext);
  const history = useHistory();

  const handleLogoClick = () => {
    history.push("/");
  };

  const handleSignIn = () => {
    if (isEmailValid()) {
      setSignInLoading(true);

      apiRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/users/signin`,
        data: {
          email,
          password,
        },
      })
        .then((result) => {
          userContext.loginUser({
            firstname: result.data.user.firstname,
            lastname: result.data.user.lastname,
            username: result.data.user.username,
            about: result.data.user.about,
            email: result.data.user.email,
            countryCode: result.data.user.countryCode,
            state: result.data.user.state,
            city: result.data.user.city,
            followers: result.data.user.followers,
            following: result.data.user.following,
            accessToken: result.data.token.accessToken,
            refreshToken: result.data.token.refreshToken,
          });

          setSignInLoading(false);

          history.push("/profile");
        })
        .catch((error) => {
          snackbarContext.setSnackbarData(error.response.data);
          setSignInLoading(false);
        });
    } else {
      setFieldStatuses({
        email: isEmailValid(),
      });
    }
  };

  const handleFieldChange = (fieldName, event) => {
    const value = event.target.value;

    switch (fieldName) {
      case fieldNames.email:
        setEmail(value);
        break;
      case fieldNames.password:
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const isEmailValid = (paramEmail) => {
    if (!paramEmail) {
      paramEmail = email;
    }

    return EmailValid(paramEmail);
  };

  const isFieldValid = (fieldName, value) => {
    switch (fieldName) {
      case fieldNames.email:
        return isEmailValid(value);
      default:
        return false;
    }
  };

  const handleFocusOut = (fieldName, event) => {
    if (fieldName in fieldStatuses) {
      setFieldStatuses({
        ...fieldStatuses,
        [fieldName]: isFieldValid(fieldName, event.target.value),
      });
    }
  };

  return (
    <div className="SignIn">
      <div className="SignIn__Info">
        <img
          className="SignIn__Info__Logo"
          src={Logo}
          alt="Slash logo"
          onClick={handleLogoClick}
        />
        <p className="SignIn__Info__Text">
          <span className="SignIn__Info__Text__Primary">Welcome! </span>
          Join our amazing Slash community!
        </p>
      </div>
      <div className="SignIn__Actions">
        <div className="SignIn__Actions__Wrapper">
          <h4 className="SignIn__Actions__Wrapper__Title">Sign In</h4>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => handleFieldChange(fieldNames.email, event)}
            onBlur={(event) => handleFocusOut(fieldNames.email, event)}
            error={!fieldStatuses.email}
            helperText={!fieldStatuses.email && "Please enter your email."}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => handleFieldChange(fieldNames.password, event)}
            marginTop="12px"
          />
          <Link
            className="SignIn__Actions__Wrapper__ForgotPassword"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
          <Button
            label="Login"
            loading={signInLoading}
            onClick={handleSignIn}
            fontSize="1.3rem"
            width="100%"
            height="46px"
            borderRadius="50px"
          />
          <div className="SignIn__Actions__Wrapper__Other">
            <div className="SignIn__Actions__Wrapper__Other__Or">
              <div className="SignIn__Actions__Wrapper__Other__Or__Line"></div>
              <p className="SignIn__Actions__Wrapper__Other__Or__Text">OR</p>
            </div>
            <GoogleButton label="Sign in with Google" margin="24px 0 16px 0" />
            <div className="SignIn__Actions__Wrapper__Other__SignUp">
              Don't have an account?{" "}
              <Link
                className="SignIn__Actions__Wrapper__Other__SignUp__Primary"
                to="/register"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
