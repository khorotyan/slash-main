import React from "react";
import { Link } from "react-router-dom";

import "./OutlineButton.scss";

const OutlineButton = ({
  label,
  onClick,
  toLink,
  margin,
  padding,
  fontSize,
  width,
  height,
}) => {
  return (
    <Link onClick={onClick} to={toLink}>
      <button
        className="OutlineButton"
        style={{ margin, padding, fontSize, width, height }}
        onClick={onClick}
      >
        {label}
      </button>
    </Link>
  );
};

export default OutlineButton;
