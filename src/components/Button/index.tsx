import React from "react";
import { ButtonProps } from "../../types";

const Button = ({ className, text }: ButtonProps) => {
  return <button className={className}>{text}</button>;
};

export default Button;
