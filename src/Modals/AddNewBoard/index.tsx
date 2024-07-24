import React, { useRef, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useBoardContext } from "../../context/AddNewBoardContext";
import { useFormik } from "formik";
import { boardSchema } from "../../validation/validation";

const AddNewBoard = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { setShowNewBoardModal, addBoard } = useBoardContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      columns: ["Todo", "Doing", "Done"],
    },
    validationSchema: boardSchema,
    onSubmit: (values) => {
      addBoard(values.name, values.columns);
      setShowNewBoardModal(false);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowNewBoardModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowNewBoardModal]);

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
          {formik.values.columns.length !== 0 && (
            <p className="body-M">Columns</p>
          )}
          {formik.values.columns.map((column, index) => (
            <div className="column" key={index}>
              <Input
                placeholder="Column "
                type="text"
                name={`columns[${index}]`}
                onChange={formik.handleChange}
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
          {formik.values.columns.length === 5 && (
            <p className="message body-L">Maximum 5 columns allowed</p>
          )}
          <Button
            className="secondary"
            text="+ Add New Column"
            onClick={() => {
              formik.setFieldValue("columns", [...formik.values.columns, ""]);
            }}
            disabled={formik.values.columns.length >= 5}
          />
        </div>
        <Button
          type="submit"
          className="primary-S"
          text="Create New Board"
          onClick={() => {
            formik.handleSubmit();
          }}
        />
      </div>
    </form>
  );
};

export default AddNewBoard;
