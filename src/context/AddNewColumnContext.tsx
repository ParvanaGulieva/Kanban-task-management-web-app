import React, { createContext, useState, useContext, ReactNode } from "react";
import { FormikProps, useFormik } from "formik";
import { newColumnSchema } from "validation/validation";

const ColumnContext = createContext<ColumnContextType | undefined>(undefined);

interface ColumnContextType {
  columns: string[];
}

type ColumnProviderProps = {
  children: ReactNode;
};

export const ColumnProvider: React.FC<ColumnProviderProps> = ({ children }) => {
  const [columns, setColumns] = useState(["TODO", "DOING", "DONE"]);
  const [newColumns, setNewColumns] = useState([""]);

  const formik: FormikProps<{
    columns: string[];
  }> = useFormik({
    initialValues: {
      columns: newColumns,
    },
    validationSchema: newColumnSchema,
    // onSubmit: handleFormSubmit,
  });

  const addColumn = (columnNames: string[]) => {
    setNewColumns([
      ...newColumns,
      ...columnNames.filter((column) => column !== ""),
    ]);
  };

  const handleRemoveButton = (index: number) => {
    const updatedColumns = [...newColumns];
    updatedColumns.splice(index, 1);
    setNewColumns(updatedColumns);
  };

  const handleAddNewColumnButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const updatedColumns = [...newColumns, ""];
    // setNewColumns(updatedColumns);
    // console.log(newColumns);
    console.log("handleAddNewColumnButton");
  };

  const handleColumnChange = (index: number, value: any) => {
    // const updatedColumns = [...newColumns];
    // updatedColumns[index] = value;
    // setNewColumns(updatedColumns);
    console.log("handlecolumnchange");
  };

  return (
    <ColumnContext.Provider
      value={{
        setColumns,
        formik,
        addColumn,
        handleRemoveButton,
        handleAddNewColumnButton,
        handleColumnChange,
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
};
export const useColumnContext = () => {
  const context = useContext(ColumnContext);
  if (!context) {
    throw new Error("useColumnContext must be used within a ColumnProvider");
  }
  return context;
};

export default ColumnContext;
