import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./Button.scss";

const Button = ({
  label,
  loading,
  disabled,
  onClick,
  toLink,
  margin,
  padding,
  fontSize,
  width,
  height,
  borderRadius,
}) => {
  const buttonComponent = (
    <button
      className="CustomButton"
      disabled={loading || disabled}
      style={{ padding, fontSize, width, height, borderRadius }}
    >
      {!loading ? (
        label
      ) : (
        <CircularProgress className="CustomButton__Progressbar" />
      )}
    </button>
  );

  if (!toLink) {
    return (
      <div style={{ width, height, margin }} onClick={onClick}>
        {buttonComponent}
      </div>
    );
  }

  return (
    <Link style={{ width, height, margin }} onClick={onClick} to={toLink}>
      {buttonComponent}
    </Link>
  );
};

export default Button;
