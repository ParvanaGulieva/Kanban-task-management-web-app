import React, { useRef, useEffect } from "react";
import Button from "../../components/Button";
import { HeaderProps } from "../../types";
import { useTaskContext } from "../../context/AddNewTaskContext";

const DeleteTask = ({ setShowDelete, handleButton }: HeaderProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { selectedTask } = useTaskContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowDelete?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowDelete]);

  return (
    <div className="modal-container">
      <div className="modal delete" ref={modalRef}>
        <p className="heading-L delete-title">Delete this task?</p>
        <p className="body-L">
          Are you sure you want to delete the ‘{selectedTask?.title}’ task and
          its subtasks? This action cannot be reversed.
        </p>
        <div className="btn-container">
          <Button
            className="secondary"
            text="Cancel"
            onClick={() => setShowDelete?.(false)}
          />
          <Button
            className="error"
            text="Delete"
            onClick={(e) => {
              e.preventDefault();
              if (handleButton) {
                handleButton();
              }
              //   console.log("hello");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
