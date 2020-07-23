import React from "react";

import "./Input.scss";

const Input = ({ value, error, helperText, marginTop, ...inputProps }) => {
  return (
    <div className="CustomInput" style={{ marginTop: marginTop }}>
      <input
        className="CustomInput__Input"
        value={value}
        error={error ? 1 : 0}
        {...inputProps}
      />
      {error && <p className="CustomInput__HelperText">{helperText}</p>}
    </div>
  );
};

export default Input;
