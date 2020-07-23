import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import {
  FirstnameValid,
  LastnameValid,
  EmailValid,
  PasswordValid,
  PasswordsMatch,
} from "../../../utils/paramValidator";
import { Input, Button, GoogleButton } from "../../../atoms";
import { SnackbarContext } from "../../../contexts/snackbarContext";
import { UserContext } from "../../../contexts/userContext";
import apiRequest from "../../../utils/apiRequest";

import "./SignUp.scss";

import Logo from "../../../assets/images/General/logo.webp";

const fieldNames = Object.freeze({
  firstname: "firstname",
  lastname: "lastname",
  email: "email",
  password: "password",
  confirmPassword: "confirmPassword",
});

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldStatuses, setFieldStatuses] = useState({
    firstname: true,
    lastname: true,
    email: true,
    password: true,
    confirmPassword: true,
  });
  const [signUpLoading, setSignUpLoading] = useState(false);

  const history = useHistory();
  const snackbarContext = useContext(SnackbarContext);
  const userContext = useContext(UserContext);

  const handleLogoClick = () => {
    history.push("/");
  };

  const handleSignUp = () => {
    if (
      isFirstnameValid() &&
      isLastnameValid() &&
      isEmailValid() &&
      isPasswordValid() &&
      isConfirmPasswordValid()
    ) {
      setSignUpLoading(true);

      const trimmedFirstname = firstname;
      const trimmedLastname = lastname;
      const trimmedEmail = email;

      apiRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/users/signup`,
        data: {
          firstname: trimmedFirstname,
          lastname: trimmedLastname,
          email: trimmedEmail,
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

          setSignUpLoading(false);

          history.push("/profile");
        })
        .catch((error) => {
          snackbarContext.setSnackbarData(error.response.data);
          setSignUpLoading(false);
        });
    } else {
      setFieldStatuses({
        firstname: isFirstnameValid(),
        lastname: isLastnameValid(),
        email: isLastnameValid(),
        password: isPasswordValid(),
        confirmPassword: isConfirmPasswordValid(),
      });
    }
  };

  const handleFieldChange = (fieldName, event) => {
    const value = event.target.value;

    switch (fieldName) {
      case fieldNames.firstname:
        setFirstname(value);
        break;
      case fieldNames.lastname:
        setLastname(value);
        break;
      case fieldNames.email:
        setEmail(value);
        break;
      case fieldNames.password:
        setPassword(value);
        break;
      case fieldNames.confirmPassword:
        setConfirmPassword(value);
        break;
      default:
        break;
    }

    // If the field was invalid in the previous state then check for its validity
    if (!fieldStatuses[fieldName]) {
      setFieldStatuses({
        ...fieldStatuses,
        [fieldName]: isFieldValid(fieldName, value),
      });
    }
  };

  const isFieldValid = (fieldName, value) => {
    switch (fieldName) {
      case fieldNames.firstname:
        return isFirstnameValid(value);
      case fieldNames.lastname:
        return isLastnameValid(value);
      case fieldNames.email:
        return isEmailValid(value);
      case fieldNames.password:
        return isPasswordValid(value);
      case fieldNames.confirmPassword:
        return isConfirmPasswordValid(value);
      default:
        return false;
    }
  };

  const isFirstnameValid = (paramFirstname) => {
    if (!paramFirstname) {
      paramFirstname = firstname;
    }

    return FirstnameValid(paramFirstname);
  };

  const isLastnameValid = (paramLastname) => {
    if (!paramLastname) {
      paramLastname = lastname;
    }

    return LastnameValid(paramLastname);
  };

  const isEmailValid = (paramEmail) => {
    if (!paramEmail) {
      paramEmail = email;
    }

    return EmailValid(paramEmail);
  };

  const isPasswordValid = (paramPassword) => {
    if (!paramPassword) {
      paramPassword = password;
    }

    return PasswordValid(paramPassword);
  };

  const isConfirmPasswordValid = (paramConfirmPassword) => {
    if (!paramConfirmPassword) {
      paramConfirmPassword = confirmPassword;
    }

    return PasswordsMatch(password, paramConfirmPassword);
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
    <div className="SignUp">
      <div className="SignUp__Info">
        <img
          className="SignUp__Info__Logo"
          src={Logo}
          alt="Slash logo"
          onClick={handleLogoClick}
        />
        <p className="SignUp__Info__Text">
          <span className="SignUp__Info__Text__Primary">Welcome! </span>
          Join our amazing Slash community!
        </p>
      </div>
      <div className="SignUp__Actions">
        <div className="SignUp__Actions__Wrapper">
          <h4 className="SignUp__Actions__Wrapper__Title">Sign Up</h4>
          <Input
            placeholder="First name"
            type="text"
            value={firstname}
            onChange={(event) => handleFieldChange(fieldNames.firstname, event)}
            onBlur={(event) => handleFocusOut(fieldNames.firstname, event)}
            error={!fieldStatuses.firstname}
            helperText={
              !fieldStatuses.firstname && "Please enter your first name."
            }
          />
          <Input
            placeholder="Last name"
            type="text"
            value={lastname}
            onChange={(event) => handleFieldChange(fieldNames.lastname, event)}
            onBlur={(event) => handleFocusOut(fieldNames.lastname, event)}
            error={!fieldStatuses.lastname}
            helperText={
              !fieldStatuses.lastname && "Please enter your last name."
            }
            marginTop="12px"
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => handleFieldChange(fieldNames.email, event)}
            onBlur={(event) => handleFocusOut(fieldNames.email, event)}
            error={!fieldStatuses.email}
            helperText={!fieldStatuses.email && "Please enter your email."}
            marginTop="12px"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => handleFieldChange(fieldNames.password, event)}
            onBlur={(event) => handleFocusOut(fieldNames.password, event)}
            error={!fieldStatuses.password}
            helperText={
              !fieldStatuses.password && "Please enter a valid password."
            }
            marginTop="12px"
          />
          <Input
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              handleFieldChange(fieldNames.confirmPassword, event)
            }
            onBlur={(event) =>
              handleFocusOut(fieldNames.confirmPassword, event)
            }
            error={!fieldStatuses.confirmPassword}
            helperText={
              !fieldStatuses.confirmPassword && "Please confirm your password."
            }
            marginTop="12px"
          />

          <Button
            label="Create Account"
            loading={signUpLoading}
            onClick={handleSignUp}
            fontSize="1.3rem"
            width="100%"
            height="46px"
            borderRadius="50px"
            margin="12px 0 0 0"
          />
          <div className="SignUp__Actions__Wrapper__Other">
            <div className="SignUp__Actions__Wrapper__Other__Or">
              <div className="SignUp__Actions__Wrapper__Other__Or__Line"></div>
              <p className="SignUp__Actions__Wrapper__Other__Or__Text">OR</p>
            </div>
            <GoogleButton label="Sign up with Google" margin="24px 0 16px 0" />
            <div className="SignUp__Actions__Wrapper__Other__SignIn">
              Already have an account?{" "}
              <Link
                className="SignUp__Actions__Wrapper__Other__SignIn__Primary"
                to="/login"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
