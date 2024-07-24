import React from "react";
import { ButtonProps } from "../../types";

const Button = ({ className, text, onClick, type, disabled }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
