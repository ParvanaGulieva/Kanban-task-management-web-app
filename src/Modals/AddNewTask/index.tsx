import React, { useRef, useEffect } from "react";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import { HeaderProps } from "../../types/index";
import { useTaskContext } from "../../context/AddNewTaskContext";
import { useBoardContext } from "context/AddNewBoardContext";
import { useFormik } from "formik";
import { useTaskSchema } from "validation/validation";

const AddNewTask = ({ setShowAddNewTask }: HeaderProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { addTask } = useTaskContext();
  const { boards, activeTab } = useBoardContext();
  const taskSchema = useTaskSchema();

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
        if (setShowAddNewTask) {
          setShowAddNewTask(false);
        }
      }
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.title) {
        errors.title = "Required";
      }
      if (!values.description) {
        errors.description = "Required";
      }
      if (!values.status) {
        errors.status = "Required";
      }
      if (values.subtasks.length === 0) {
        errors.subtasks = "At least one subtask is required";
      }
      return errors;
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
        setShowAddNewTask?.(false);
        formik.resetForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowAddNewTask, formik]);

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
        <TextArea
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
          {formik.values.subtasks.length === 0 &&
            typeof formik.errors.subtasks === "string" && (
              <p className="message body-L">{formik.errors.subtasks}</p>
            )}
          {formik.values.subtasks.map((subtask, index) => {
            return (
              <div className="column" key={index}>
                <Input
                  placeholder="e.g. Make coffee "
                  type="text"
                  name={`subtasks[${index}].title`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subtasks[index].title || ""}
                  errorMessage={formik.errors.subtasks?.[index]?.title}
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
            );
          })}
          {formik.values.subtasks.length === 5 && (
            <p className="message body-L">Maximum 5 subtasks allowed</p>
          )}
          <Button
            className="secondary"
            text="+ Add New Subtask"
            onClick={(e) => {
              e.preventDefault();
              formik.setFieldValue("subtasks", [
                ...formik.values.subtasks,
                { id: Date.now(), title: "", completed: false },
              ]);
            }}
            disabled={formik.values.subtasks.length >= 5}
          />
        </div>
        <Dropdown label="Status" placeholder="Select" formik={formik} />
        <Button
          className="primary-S"
          text="Create task"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        />
      </div>
    </form>
  );
};

export default AddNewTask;
