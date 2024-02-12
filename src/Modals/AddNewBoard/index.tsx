import React, { useRef, useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { NewBoardProps } from "types";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { boardSchema } from "../../validation/validation";

const AddNewBoard = ({ setShowNewBoardModal }: NewBoardProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState(["To do", "Doing"]);

  const handleFormSubmit = (
    values: { name: string; columns: string[] },
    actions: FormikHelpers<{ name: string; columns: string[] }>
  ) => {
    console.log("Form submitted with values:", values);
    actions.setSubmitting(false);
  };

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

  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const handleColumnChange = (index: number, value: any) => {
    const updatedColumns = [...formik.values.columns];
    updatedColumns[index] = value;

    formik.setValues({
      ...formik.values,
      columns: updatedColumns,
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowNewBoardModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowNewBoardModal]);

  const handleCreateBoard = () => {
    formik.handleSubmit();
    if (
      formik.isValid &&
      formik.values.name !== "" &&
      formik.values.columns.length > 0
    ) {
      formik.resetForm();
      setShowNewBoardModal(false);
    }
    // console.log(formik.errors);
  };

  return (
    <form className="modal-container" onSubmit={formik.handleSubmit}>
      <div className="modal" ref={modalRef}>
        <p className="heading-L">Add New Board</p>
        <Input
          type="text"
          placeholder="e.g. Web Design"
          label="Name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          errorMessage={formik.errors.name}
        />
        <div className="columns">
          <p className="body-M">Columns</p>
          {formik.values.columns.map((column, index) => (
            <div className="column" key={index}>
              <Input
                placeholder="Column "
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
                  const updatedColumns = [...formik.values.columns];
                  updatedColumns.splice(index, 1);
                  formik.setValues({
                    ...formik.values,
                    columns: updatedColumns,
                  });
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
          <Button
            className="secondary"
            text="+ Add New Column"
            onClick={(e) => {
              // console.log(formik.values);
              e.preventDefault();
              formik.setValues({
                ...formik.values,
                columns: [...formik.values.columns, ""],
              });
            }}
          />
        </div>
        <Button
          type="submit"
          className="primary-S"
          text="Create New Board"
          onClick={handleCreateBoard}
        />
      </div>
    </form>
  );
};

export default AddNewBoard;
