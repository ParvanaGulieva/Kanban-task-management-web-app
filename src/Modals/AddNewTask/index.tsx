import React, { useRef, useEffect } from "react";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import { AddNewTaskProps } from "types";

const AddNewTask = ({ setAddNewTask }: AddNewTaskProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setAddNewTask(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setAddNewTask]);

  return (
    <div className="modal-container">
      <div className="modal" ref={modalRef}>
        <p className="heading-L">Add New Task</p>
        <Input label="Title" placeholder="e.g. Take coffee break" type="text" />
        <Input
          label="Description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
          type="text"
          className="text-area"
        />
        <div className="add-subtasks">
          <p className="body-M">Subtasks</p>
          <div className="subtask">
            <Input placeholder="e.g. Make coffee" type="text" />
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          <div className="subtask">
            <Input placeholder="e.g. Drink coffee & smile" type="text" />
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          <Button className="secondary" text="+ Add New Subtask" />
        </div>

        <Dropdown label="Status" placeholder="To do" />
      </div>
    </div>
  );
};

export default AddNewTask;
