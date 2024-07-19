import React, { useRef, useEffect } from "react";
import Button from "../../components/Button";
import { HeaderProps } from "../../types";
import { useBoardContext } from "../../context/AddNewBoardContext";

const DeleteBoard = ({ setShowDelete, handleButton }: HeaderProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { boards, activeTab } = useBoardContext();

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

  const handleButtonClick = () => {
    if (handleButton) {
      handleButton();
    }
    if (setShowDelete) {
      setShowDelete(false);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal delete" ref={modalRef}>
        <p className="heading-L delete-title">Delete this board?</p>
        <p className="body-L">
          Are you sure you want to delete the ‘{boards[activeTab].name}’ board?
          This action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="btn-container">
          <Button
            className="secondary"
            text="Cancel"
            onClick={() => setShowDelete?.(false)}
          />
          <Button className="error" text="Delete" onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default DeleteBoard;
