import React, { ReactNode, createContext, useContext, useState } from "react";
import { useBoardContext } from "./AddNewBoardContext";
import { FormikProps, useFormik } from "formik";
import { useTaskSchema } from "../validation/validation";

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

interface Task {
  id: number;
  title: string;
  description: string;
  subtasks: Subtask[];
  status: string;
}

interface TaskContextType {
  addTask: (boardId: number, columnId: number, task: Task) => void;
  updateTask: (
    boardId: number,
    columnId: number,
    taskId: number,
    task: Task
  ) => void;
  deleteTask: (boardId: number, columnId: number, taskId: number) => void;
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  formik: FormikProps<{
    title: string;
    description: string;
    subtasks: Subtask[];
    status: string;
    columnId: number | null;
  }>;
  completedTasks: string[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<string[]>>;
  updateSubtaskStatus: (
    boardId: number,
    columnId: number,
    taskId: number,
    subtaskId: number,
    completed: boolean
  ) => void;
  showDeleteTask: boolean;
  setShowDeleteTask: React.Dispatch<React.SetStateAction<boolean>>;
  showEditTask: boolean;
  setShowEditTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

type TaskProviderProps = { children: ReactNode };

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const { setBoards } = useBoardContext();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const taskSchema = useTaskSchema();
  const { boards, activeTab } = useBoardContext();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      subtasks: [{ id: Date.now(), title: "", completed: false }],
      status: "",
    },
    validationSchema: taskSchema,
    onSubmit: (values) => {
      const column = boards[activeTab].columns.find(
        (column) => column.name === values.status
      );

      const columnId = column!.id;
      if (
        formik.isValid &&
        formik.values.title !== "" &&
        formik.values.description !== "" &&
        formik.values.status !== ""
      ) {
        addTask(boards[activeTab].id, columnId, {
          id: Date.now(),
          title: values.title,
          description: values.description,
          subtasks: values.subtasks,
          status: values.status,
        });
        formik.resetForm();
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const addTask = (boardId: number, columnId: number, task: Task) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? { ...column, tasks: [...column.tasks, task] }
                  : column
              ),
            }
          : board
      );
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return updatedBoards;
    });
  };

  const updateTask = (
    boardId: number,
    currentColumnId: number,
    taskId: number,
    updatedTask: Task
  ) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) => {
        if (board.id !== boardId) return board;

        const currentColumn = board.columns.find(
          (column) => column.id === currentColumnId
        );
        if (!currentColumn) return board;

        const updatedCurrentColumn = {
          ...currentColumn,
          tasks: currentColumn.tasks.filter((task) => task.id !== taskId),
        };

        const newColumn = board.columns.find(
          (column) => column.name === updatedTask.status
        );
        if (!newColumn) return board;

        const updatedNewColumn = {
          ...newColumn,
          tasks: [...newColumn.tasks, updatedTask],
        };

        const updatedColumns = board.columns.map((column) => {
          if (column.id === currentColumnId) return updatedCurrentColumn;
          if (column.id === newColumn.id) return updatedNewColumn;
          return column;
        });

        return {
          ...board,
          columns: updatedColumns,
        };
      });

      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return updatedBoards;
    });
  };

  const deleteTask = (boardId: number, columnId: number, taskId: number) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.filter((task) => task.id !== taskId),
                    }
                  : column
              ),
            }
          : board
      );
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return updatedBoards;
    });
  };

  const updateSubtaskStatus = (
    boardId: number,
    columnId: number,
    taskId: number,
    subtaskId: number,
    completed: boolean
  ) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) =>
                        task.id === taskId
                          ? {
                              ...task,
                              subtasks: task.subtasks.map((subtask) =>
                                subtask.id === subtaskId
                                  ? { ...subtask, completed }
                                  : subtask
                              ),
                            }
                          : task
                      ),
                    }
                  : column
              ),
            }
          : board
      );
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return updatedBoards;
    });
  };

  return (
    <TaskContext.Provider
      value={{
        addTask,
        updateTask,
        deleteTask,
        selectedTask,
        setSelectedTask,
        formik,
        completedTasks,
        setCompletedTasks,
        updateSubtaskStatus,
        showDeleteTask,
        setShowDeleteTask,
        showEditTask,
        setShowEditTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export default TaskContext;
