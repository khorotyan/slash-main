import React from "react";

import "./GoogleButton.scss";

import googleIcon from "../../../assets/icons/google.svg";

const GoogleButton = ({ label, onClick, margin }) => {
  return (
    <button className="GoogleButton" style={{ margin }} onClick={onClick}>
      <img className="GoogleButton__Icon" src={googleIcon} alt="google icon" />
      <div className="GoogleButton__Wrapper">
        <p className="GoogleButton__Wrapper__Label">{label}</p>
      </div>
    </button>
  );
};

export default GoogleButton;
