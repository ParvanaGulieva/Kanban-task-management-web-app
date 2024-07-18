import React from "react";
import { ButtonProps } from "../../types";

// check forwardRef

const Button = ({ className, text, onClick, type }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
