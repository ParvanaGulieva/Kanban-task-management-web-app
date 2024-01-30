import { MouseEventHandler } from "react";

export interface ButtonProps {
  className: string;
}

export interface InputProps {
  className?: string;
  placeholder: string;
  type: string;
  label: string;
  errorMessage?: string;
}

export interface DropdownProps {
  className?: string;
  placeholder: string;
  type: string;
  label: string;
  errorMessage?: string;
}
