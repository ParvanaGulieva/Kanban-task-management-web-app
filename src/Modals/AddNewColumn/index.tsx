import React, { useRef, useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { NewColumnProps } from "../../types";
import { useColumnContext } from "../../context/AddNewColumnContext";
import { newColumnSchema } from "../../validation/validation";
import { useFormik } from "formik";
import { useBoardContext } from "../../context/AddNewBoardContext";

const AddNewColumn = ({ setShowAddColumn }: NewColumnProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const { addColumn } = useColumnContext();
  const { boards, activeTab } = useBoardContext();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowAddColumn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowAddColumn]);

  const boardColumnNames = boards[activeTab].columns.map((col) =>
    col.name.toLowerCase()
  );

  const formik = useFormik({
    initialValues: {
      columns: [{ name: "" }],
    },
    validationSchema: newColumnSchema,
    onSubmit: (values) => {
      if (
        formik.isValid &&
        formik.values.columns.length > 0 &&
        values.columns[values.columns.length - 1].name !== ""
      ) {
        values.columns.forEach((column) => {
          if (column.name !== "") {
            addColumn(boards[activeTab].id, column.name);
          }
        });
        formik.resetForm();
        setShowAddColumn(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => {
      const errors = { columns: [] };
      const columnNames = values.columns.map((col) => col.name.toLowerCase());

      values.columns.forEach((column, index) => {
        if (
          boardColumnNames.includes(column.name.toLowerCase()) ||
          columnNames.indexOf(column.name.toLowerCase()) !== index
        ) {
          errors.columns[index] = "Column name must be unique";
        }
      });

      if (errors.columns.length) {
        setErrorMessage("Column names must be unique");
      } else {
        setErrorMessage("");
      }

      return errors.columns.length ? errors : {};
    },
  });

  const totalColumns =
    boards[activeTab].columns.length + formik.values.columns.length;

  useEffect(() => {
    setShowMessage(formik.values.columns.length === 0);
  }, [formik.values.columns.length]);

  console.log(typeof formik.errors.columns?.[0]?.name);
  return (
    <form className="modal-container" onSubmit={formik.handleSubmit}>
      <div className="modal" ref={modalRef}>
        <p className="heading-L">Add New Column</p>
        {errorMessage && <p className="body-L message">{errorMessage}</p>}
        <div className="add-subtasks">
          {formik.values.columns.map((column, index) => (
            <div className="column" key={index}>
              <Input
                placeholder="e.g. Make coffee"
                type="text"
                name={`columns[${index}].name`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={column.name || ""}
                errorMessage={formik.errors.columns?.[index]?.name}
              />
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  formik.setFieldValue(
                    "columns",
                    formik.values.columns.filter((_, i) => i !== index)
                  );
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
            onClick={() => {
              formik.setFieldValue("columns", [
                ...formik.values.columns,
                { name: "" },
              ]);
            }}
            disabled={totalColumns >= 5}
          />
        </div>
        <Button
          className="primary-S"
          text="Create Columns"
          type="submit"
          onClick={() => formik.handleSubmit()}
        />
      </div>
    </form>
  );
};

export default AddNewColumn;
