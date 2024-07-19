import { MouseEventHandler } from "react";
import { FormikProps } from "formik";

export interface ButtonProps {
  className: string;
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface InputProps {
  className?: string;
  placeholder: string;
  type: string;
  label?: string;
  errorMessage?: string;
  name: string;
  value: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DropdownProps {
  label?: string;
  placeholder: string;
  formik: FormikProps<{
    title: string;
    description: string;
    subtasks: string[];
    status: string;
  }>;
}

export interface SidebarProps {
  toggleTheme: () => void;
  boards: string[];
  handleAddNewBoard: (boardName: string) => void;
}

export interface HeaderProps {
  handleAddNewTask?: () => void;
  setShowAddNewTask?: (value: boolean) => void;
  setShowDelete?: (value: boolean) => void;
  showDelete?: boolean;
}

export interface NewBoardProps {
  // setAddNewBoard?: (value: boolean) => void;
  setShowNewBoardModal: (value: boolean) => void;
  formik: FormikProps<{
    name: string;
    columns: string[];
  }>;
  handleAddNewColumnButton: (e: React.SyntheticEvent) => void;
}

export interface DetailedTaskProps {
  setShowDetailedTask: (value: boolean) => void;
}

export interface TaskCardProps {
  onClick: () => void;
}

export interface NewColumnProps {
  setShowAddColumn: (value: boolean) => void;
}
