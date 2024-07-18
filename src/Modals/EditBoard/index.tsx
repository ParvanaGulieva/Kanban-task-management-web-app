import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useBoardContext } from "../../context/AddNewBoardContext";
import { useFormik } from "formik";

const EditBoard = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const { boards, activeTab, updateBoard, setShowEditBoard, updateColumn } =
    useBoardContext();

  const formik = useFormik({
    initialValues: {
      name: boards[activeTab].name,
      columns: boards[activeTab].columns.map((column) => column.name),
    },
    onSubmit: (values) => {
      if (values.columns.length > 0) {
        updateBoard(boards[activeTab].id, values.name, values.columns);
        setShowEditBoard(false);
      }
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.name) {
        errors.name = "Required";
      }

      return errors;
    },
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowEditBoard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowEditBoard]);

  useEffect(() => {
    setShowMessage(formik.values.columns.length === 0);
  }, [formik.values.columns.length]);

  return (
    <form className="modal-container" onSubmit={formik.handleSubmit}>
      <div className="modal" ref={modalRef}>
        <p className="heading-L">Edit Board</p>
        <Input
          type="text"
          placeholder="e.g. Web Design"
          label="Board Name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          errorMessage={formik.errors.name}
        />
        <div className="columns">
          <p className="body-M">Board Columns</p>
          {showMessage && (
            <p className="message body-L">At least 1 column is required</p>
          )}
          {formik.values.columns.map((column, index: number) => (
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
          <Button
            className="secondary"
            text="+ Add New Column"
            onClick={(event) => {
              event.preventDefault();
              formik.setFieldValue("columns", [...formik.values.columns, ""]);
            }}
          />
        </div>
        <Button
          type="submit"
          className="primary-S"
          text="Save Changes"
          onClick={() => {
            formik.handleSubmit();
          }}
        />
      </div>
    </form>
  );
};

export default EditBoard;
