import React from "react";
import { InputProps } from "../../types";

const Input = ({ label, errorMessage, ...rest }: InputProps) => {
  return (
    <div className="form">
      {label && <p className="label body-M">{label}</p>}
      <input {...rest} />
      {errorMessage && typeof errorMessage === "string" && (
        <p className="message body-L">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
