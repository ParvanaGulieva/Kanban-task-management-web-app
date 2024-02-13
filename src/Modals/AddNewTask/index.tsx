import React, { useRef, useEffect, useState } from "react";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import { HeaderProps } from "types";
import { taskSchema } from "validation/validation";
import { FormikProps, useFormik } from "formik";

const AddNewTask = ({ setShowAddNewTask }: HeaderProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [subtasks, setSubtasks] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowAddNewTask?.(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowAddNewTask]);

  const handleSubtaskChange = (index: number, value: any) => {
    const updatedSubtasks = [...formik.values.subtasks];
    updatedSubtasks[index] = value;

    formik.setValues({
      ...formik.values,
      subtasks: updatedSubtasks,
    });
  };

  const formik: FormikProps<{
    title: string;
    description: string;
    subtasks: string[];
    status: string;
  }> = useFormik({
    initialValues: {
      title: "",
      description: "",
      subtasks: ["", ""],
      status: "",
    },
    validationSchema: taskSchema,
    // onSubmit: handleFormSubmit,
  });

  const handleCreateTask = () => {
    formik.handleSubmit();
    if (
      formik.isValid &&
      formik.values.description !== "" &&
      formik.values.title !== "" &&
      formik.values.subtasks.length > 0
    ) {
      formik.resetForm();
      // console.log(formik.values);
      setShowAddNewTask?.(false);
    }
  };

  useEffect(() => {
    setShowMessage(formik.values.subtasks.length === 0);
  }, [formik.values.subtasks.length]);

  return (
    <form className="modal-container" onSubmit={formik.handleSubmit}>
      <div className="modal" ref={modalRef}>
        <p className="heading-L">Add New Task</p>
        <Input
          label="Title"
          placeholder="e.g. Take coffee break"
          type="text"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          errorMessage={formik.errors.title}
        />
        <Input
          label="Description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          type="text"
          className="text-area"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          errorMessage={formik.errors.description}
        />
        <div className="add-subtasks">
          <p className="body-M">Subtasks</p>
          {showMessage && (
            <p className="message body-L">At least 1 subtask is required</p>
          )}
          {formik.values.subtasks.map((subtask, index) => (
            <div className="column" key={index}>
              <Input
                placeholder="e.g. Make coffee "
                type="text"
                name={`columns[${index}]`}
                onChange={(e) => handleSubtaskChange(index, e.target.value)}
                onBlur={formik.handleBlur}
                value={formik.values.subtasks[index] || ""}
                errorMessage={formik.errors.subtasks?.[index]}
              />
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  const updatedSubtasks = [...formik.values.subtasks];
                  updatedSubtasks.splice(index, 1);
                  formik.setValues({
                    ...formik.values,
                    subtasks: updatedSubtasks,
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
            text="+ Add New Subtask"
            onClick={(e) => {
              // console.log(formik.values);
              e.preventDefault();
              formik.setValues({
                ...formik.values,
                subtasks: [...formik.values.subtasks, ""],
              });
            }}
          />
        </div>
        <Dropdown label="Status" placeholder="To do" formik={formik} />
        <Button
          className="primary-S"
          text="Create task"
          type="submit"
          onClick={handleCreateTask}
        />
      </div>
    </form>
  );
};

export default AddNewTask;
