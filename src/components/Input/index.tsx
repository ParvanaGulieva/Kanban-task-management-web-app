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
      {label && <p className="label body-M">{label}</p>}

      <input type={type} placeholder={placeholder} className={className} />
      {errorMessage && <p className="message body-L">{errorMessage}</p>}
    </div>
  );
};

export default Input;
