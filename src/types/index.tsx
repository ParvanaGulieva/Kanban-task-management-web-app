import { MouseEventHandler } from "react";

export interface ButtonProps {
  className: string;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface InputProps {
  className?: string;
  placeholder: string;
  type: string;
  label?: string;
  errorMessage?: string;
}

export interface DropdownProps {
  label?: string;
  placeholder: string;
}

export interface SidebarProps {
  toggleTheme: void;
}

export interface HeaderProps {
  handleAddNewTask: () => void;
}

export interface AddNewTaskProps {
  setAddNewTask: (value: boolean) => void;
}

export interface NewBoardProps {
  setAddNewBoard: (value: boolean) => void;
  setShowDetailedTask?: (value: boolean) => void;
}

export interface DetailedTaskProps {
  setShowDetailedTask: (value: boolean) => void;
}

export interface TaskCardProps {
  onClick: () => void;
}
