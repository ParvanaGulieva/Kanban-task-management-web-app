import React, { useState } from "react";
import icon from "../../assets/dropdown.png";
import { DropdownProps } from "types";

const Dropdown = ({ label, placeholder, formik }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    formik.setFieldValue("status", option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <label className="body-M">{label}</label>
      <div
        className={isOpen ? "dropdown clicked" : "dropdown"}
        onClick={toggleDropdown}
      >
        {formik.values.status ? (
          <p className="option">{formik.values.status}</p>
        ) : (
          <p className="placeholder">{placeholder}</p>
        )}
        <img src={icon} alt="dropdownIcon" />
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          <li onClick={() => selectOption("To do")}>To do</li>
          <li onClick={() => selectOption("Doing")}>Doing</li>
          <li onClick={() => selectOption("Done")}>Done</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
