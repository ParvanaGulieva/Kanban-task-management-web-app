import { FormikProps } from "formik";

export type ButtonTypes = "button" | "submit" | "reset";

export interface ButtonProps {
  className: string;
  text: string;
  type?: ButtonTypes;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export interface InputProps {
  className?: string;
  placeholder: string;
  type: string;
  label?: string;
  errorMessage?: string;
  name: string;
  value?: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TaskFormValues {
  title: string;
  description: string;
  subtasks: { id: number; title: string; completed: boolean }[];
  status: string;
}

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

export interface DropdownProps {
  label?: string;
  placeholder: string;
  editFormik?: FormikProps<TaskFormValues>;
  formik?: FormikProps<{
    title: string;
    description: string;
    subtasks: Subtask[];
    status: string;
    columnId: number | null;
  }>;
}

export interface SidebarProps {
  toggleTheme: () => void;
  setShowSidebar: (value: boolean) => void;
  showSidebar: boolean;
}

export interface HeaderProps {
  handleAddNewTask?: () => void;
  setShowAddNewTask?: (value: boolean) => void;
  setShowDelete?: (value: boolean) => void;
  showDelete?: boolean;
  handleButton?: () => void;
  showEditBoard?: boolean;
  setShowEditBoard?: (value: boolean) => void;
  handleDelete?: () => void;
  theme?: boolean;
}

export interface NewBoardProps {
  setShowNewBoardModal?: (value: boolean) => void;
  showEditBoard?: boolean;
  setShowEditBoard?: (value: boolean) => void;
  formik?: FormikProps<{
    name: string;
    columns: string[];
  }>;
  handleAddNewColumnButton?: (e: React.SyntheticEvent) => void;
}

export interface DetailedTaskProps {
  setShowDetailedTask: (value: boolean) => void;
  showSidebar?: boolean;
}

export interface NewColumnProps {
  setShowAddColumn: (value: boolean) => void;
}
