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
  const [columns, setColumns] = useState([""]);

  const formik: FormikProps<{
    columns: string[];
  }> = useFormik({
    initialValues: {
      columns: columns,
    },
    validationSchema: newColumnSchema,
    // onSubmit: handleFormSubmit,
  });

  const addColumn = (columnName: string) => {
    setColumns([...columns, columnName]);
    // console.log(columns);
  };

  const handleRemoveButton = (index: number) => {
    const updatedColumns = [...formik.values.columns];
    updatedColumns.splice(index, 1);
    formik.setValues({
      ...formik.values,
      columns: updatedColumns,
    });
  };

  const handleAddAnotherColumn = (e: React.SyntheticEvent<EventTarget>) => {
    console.log(formik.values);
    e.preventDefault();
    formik.setValues({
      ...formik.values,
      columns: [...formik.values.columns, ""],
    });
  };

  return (
    <ColumnContext.Provider
      value={{
        setColumns,
        formik,
        addColumn,
        handleRemoveButton,
        handleAddAnotherColumn,
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
