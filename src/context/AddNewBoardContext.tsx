import React, { createContext, useState, useContext, ReactNode } from "react";
import { FormikProps, useFormik } from "formik";
import { boardSchema } from "validation/validation";

const BoardContext = createContext<BoardContextType | undefined>(undefined);

interface BoardContextType {
  boards: string[];
  addBoard: (boardName: string) => void;
}

type BoardProviderProps = {
  children: ReactNode;
};

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [columns, setColumns] = useState(["To do", "Doing"]);
  const [boards, setBoards] = useState([
    "Platform Lunch",
    "Marketing Plan",
    "Roadmap",
  ]);

  const formik: FormikProps<{
    name: string;
    columns: string[];
  }> = useFormik({
    initialValues: {
      name: "",
      columns: columns,
    },
    validationSchema: boardSchema,
    // onSubmit: handleFormSubmit,
  });

  const addBoard = (boardName: string) => {
    setBoards([...boards, boardName]);
    // console.log(boards);
  };

  const handleColumnChange = (index: number, value: any) => {
    const updatedColumns = [...formik.values.columns];
    updatedColumns[index] = value;

    formik.setValues({
      ...formik.values,
      columns: updatedColumns,
    });
  };

  const handleRemoveButton = (index: number) => {
    const updatedColumns = [...formik.values.columns];
    updatedColumns.splice(index, 1);
    formik.setValues({
      ...formik.values,
      columns: updatedColumns,
    });
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        addBoard,
        columns,
        setColumns,
        formik,
        handleColumnChange,
        handleRemoveButton,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};

export default BoardContext;
