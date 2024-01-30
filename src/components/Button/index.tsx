import React from "react";
import { ButtonProps } from "../../types";

const Button = ({ className }: ButtonProps) => {
  return <button className={className}>Hello</button>;
};

export default Button;
