import React, { useState } from "react";

import { userLSKey } from "../constants/localStorageKeys";

export const UserContext = React.createContext({
  localUser: {},
  loginUser: () => {},
  updateUser: () => {},
  logoutUser: () => {},
});

const UserContextProvider = (props) => {
  const loadLocalStorageUser = () => {
    const jsonUser = localStorage.getItem(userLSKey);

    if (jsonUser) {
      return JSON.parse(jsonUser);
    }

    return null;
  };

  const [user, setUser] = useState(loadLocalStorageUser());

  const handleUserLogin = ({
    firstname,
    lastname,
    username,
    about,
    email,
    countryCode,
    state,
    city,
    followers,
    following,
    accessToken,
    refreshToken,
  }) => {
    const userObj = {
      firstname,
      lastname,
      username,
      about,
      email,
      countryCode,
      state,
      city,
      followers,
      following,
      accessToken,
      refreshToken,
    };

    setUser(userObj);
    localStorage.setItem(userLSKey, JSON.stringify(userObj));
  };

  const handleUserUpdate = ({ firstname, lastname }) => {
    const userCopy = user;

    if (firstname) userCopy.firstname = firstname;
    if (lastname) userCopy.lastname = lastname;

    setUser(userCopy);
    localStorage.setItem(userLSKey, JSON.stringify(userCopy));
  };

  const handleUserLogout = () => {
    setUser(null);
    localStorage.removeItem(userLSKey);
  };

  return (
    <UserContext.Provider
      value={{
        localUser: user,
        loginUser: handleUserLogin,
        updateUser: handleUserUpdate,
        logoutUser: handleUserLogout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
