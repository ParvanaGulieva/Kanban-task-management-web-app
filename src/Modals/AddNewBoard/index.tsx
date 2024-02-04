import React, { useRef, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { NewBoardProps } from "types";

const AddNewBoard = ({ setAddNewBoard }: NewBoardProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setAddNewBoard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setAddNewBoard]);

  return (
    <div className="modal-container">
      <div className="modal" ref={modalRef}>
        <p className="heading-L">Add New Board</p>
        <Input type="text" placeholder="e.g. Web Design" label="Name" />
        <div className="columns">
          <p className="body-M">Columns</p>
          <div className="column">
            <Input placeholder="To do" type="text" />
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
          <div className="column">
            <Input placeholder="Doing" type="text" />
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
          <Button className="secondary" text="+ Add New Column" />
        </div>
        <Button className="primary-S" text="Create New Board" />
      </div>
    </div>
  );
};

export default AddNewBoard;
