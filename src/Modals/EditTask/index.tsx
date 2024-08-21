import { useRef, useEffect, useState } from "react";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import { HeaderProps } from "../../types/index";
import { useTaskContext } from "../../context/AddNewTaskContext";
import { useFormik } from "formik";
import { useBoardContext } from "../../context/AddNewBoardContext";

const EditTask = ({ setShowAddNewTask }: HeaderProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const { boards, activeTab } = useBoardContext();
  const { updateTask, selectedTask, setShowEditTask } = useTaskContext();

  const getColumnId = () => {
    const column = boards[activeTab].columns.find((col) =>
      col.tasks.some((task) => task.id === selectedTask?.id)
    );
    return column ? column.id : null;
  };

  const columnId = getColumnId();
  const selectedTaskColumn = boards[activeTab].columns.find(
    (column) => column.id === columnId
  );

  const formik = useFormik({
    initialValues: {
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      subtasks: selectedTask?.subtasks || [],
      status: selectedTaskColumn?.name || "",
    },
    onSubmit: (values) => {
      if (
        values.title !== "" &&
        values.description !== "" &&
        values.status !== "" &&
        values.subtasks.length > 0 &&
        columnId &&
        selectedTask
      ) {
        const updatedTask = {
          ...selectedTask,
          title: values.title,
          description: values.description,
          subtasks: values.subtasks,
          status: values.status,
        };

        updateTask(
          boards[activeTab].id,
          columnId,
          selectedTask.id,
          updatedTask
        );
        setShowEditTask(false);
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
        setShowEditTask?.(false);
        formik.resetForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formik, setShowEditTask]);

  return (
    <form className="modal-container" onSubmit={formik.handleSubmit}>
      <div className="modal" ref={modalRef}>
        <p className="heading-L">Edit Task</p>
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
          {showMessage && (
            <p className="message body-L">At least 1 subtask is required</p>
          )}
          {formik.values.subtasks.map((subtask, index) => {
            return (
              <div className="column" key={index}>
                <Input
                  placeholder="e.g. Make coffee"
                  type="text"
                  name={`subtasks[${index}].title`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={subtask?.title || ""}
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
                    formik.setFieldValue("subtasks", updatedSubtasks);
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
        <Dropdown label="Status" placeholder="Select" editFormik={formik} />
        <Button
          className="primary-S"
          text="Save Changes"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
            if (formik.isValid) {
              setShowAddNewTask?.(false);
            } else {
              setShowMessage(true);
            }
          }}
        />
      </div>
    </form>
  );
};

export default EditTask;
