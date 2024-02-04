import React from "react";
import { ButtonProps } from "../../types";

const Button = ({ className, text, onClick }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
