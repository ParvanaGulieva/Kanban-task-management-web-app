import React, { useState } from "react";
import icon from "../../assets/dropdown.png";
import { DropdownProps } from "types";

const Dropdown = ({ label, placeholder }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <label className="body-M">{label}</label>
      <div
        className={isOpen ? "dropdown clicked" : "dropdown"}
        onClick={toggleDropdown}
      >
        <p>{placeholder}</p>
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
