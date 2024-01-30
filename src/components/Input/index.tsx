import React from "react";
import { InputProps } from "../../types";

const Input = ({
  label,
  placeholder,
  type,
  className,
  errorMessage,
}: InputProps) => {
  return (
    <div className="form">
      <p className="label body-M">{label}</p>
      <input type={type} placeholder={placeholder} className={className} />
      <p className="message body-L">{errorMessage}</p>
    </div>
  );
};

export default Input;
