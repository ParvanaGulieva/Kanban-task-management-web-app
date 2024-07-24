import React, { useState } from "react";
import DropdownIcon from "../../assets/Dropdown";
import { DropdownProps } from "../../types";
import { useBoardContext } from "../../context/AddNewBoardContext";
import { useTaskContext } from "../../context/AddNewTaskContext";

const Dropdown = ({
  label,
  placeholder,
  editFormik,
  formik,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { boards, activeTab } = useBoardContext();
  const { showEditTask } = useTaskContext();

  const currentFormik = showEditTask ? editFormik : formik;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: { id: number; name: string }) => {
    currentFormik?.setFieldValue("status", option.name);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <label className="body-M">{label}</label>
      <div
        className={isOpen ? "dropdown clicked" : "dropdown"}
        onClick={toggleDropdown}
      >
        {currentFormik?.values.status ? (
          <p className="option">{currentFormik.values.status}</p>
        ) : (
          <p className="placeholder">{placeholder}</p>
        )}
        <DropdownIcon />
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {boards[activeTab].columns.map((option, index) => (
            <li key={index} onClick={() => selectOption(option)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
