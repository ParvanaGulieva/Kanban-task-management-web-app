import React, { useRef, useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { NewColumnProps } from "types";
import { FormikProps } from "formik";
import { useContext } from "react";
import ColumnContext from "context/AddNewColumnContext";

const AddNewColumn = ({ setShowAddColumn }: NewColumnProps) => {
  const {
    formik,
    addColumn,
    handleRemoveButton,
    handleAddNewColumnButton,
    handleColumnChange,
  }: {
    formik: FormikProps<{ columns: string[] }>;
    addColumn: (columnName: string) => void;
    handleRemoveButton: (index: number) => void;
    handleAddNewColumnButton: (e: React.SyntheticEvent<EventTarget>) => void;
    handleColumnChange: (index: number, value: string) => void;
  } = useContext(ColumnContext) as any;

  const modalRef = useRef<HTMLDivElement>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowAddColumn(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowAddColumn]);

  const handleCreateColumn = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    console.log("handleCreateColumn");
    // formik.handleSubmit();
    // if (
    //   formik.isValid &&
    //   formik.values.columns.length > 0 &&
    //   formik.values.columns[formik.values.columns.length - 1] !== ""
    // ) {
    //   addColumn(formik.values.columns[-1]);
    //   formik.resetForm();
    //   setShowAddColumn(false);
    // }

    // console.log(formik.values.columns);
  };

  useEffect(() => {
    setShowMessage(formik.values.columns.length === 0);
  }, [formik.values.columns.length]);

  return (
    <form className="modal-container">
      <div className="modal" ref={modalRef}>
        <p className="heading-L">Add New Column</p>
        <div className="add-subtasks">
          {formik.values.columns.map((column: string, index: number) => (
            <div className="column" key={index}>
              <Input
                placeholder="e.g. Make coffee "
                type="text"
                name={`columns[${index}]`}
                onChange={(e) => handleColumnChange(index, e.target.value)}
                onBlur={formik.handleBlur}
                value={formik.values.columns[index] || ""}
                errorMessage={formik.errors.columns?.[index]}
              />
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  handleRemoveButton(index);
                }}
              >
                <rect
                  x="12.728"
                  width="3"
                  height="18"
                  transform="rotate(45 12.728 0)"
                  fill="#828FA3"
                />
                <rect
                  y="2.12132"
                  width="3"
                  height="18"
                  transform="rotate(-45 0 2.12132)"
                  fill="#828FA3"
                />
              </svg>
            </div>
          ))}
          {showMessage && (
            <p className="message body-L">At least 1 column is required</p>
          )}

          <Button
            className="secondary"
            text="+ Add New Column"
            onClick={handleAddNewColumnButton}
          />
        </div>
        <Button
          className="primary-S"
          text="Create Columns"
          type="submit"
          onClick={handleCreateColumn}
        />
      </div>
    </form>
  );
};

export default AddNewColumn;
