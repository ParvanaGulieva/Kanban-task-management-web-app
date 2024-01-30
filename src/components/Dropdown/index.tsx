import React, { useState } from "react";
import icon from "../../assets/dropdown.png";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={isOpen ? "dropdown clicked" : "dropdown"}
        onClick={toggleDropdown}
      >
        <p>Doing</p>
        <img src={icon} alt="dropdownIcon" />
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          <li onClick={() => selectOption("Net 1 Day")}>Net 1 Day</li>
          <li onClick={() => selectOption("Net 7 Days")}>Net 7 Days</li>
          <li onClick={() => selectOption("Net 14 Days")}>Net 14 Days</li>
          <li onClick={() => selectOption("Net 30 Days")}>Net 30 Days</li>
        </ul>
      )}
    </>
  );
};

export default Dropdown;
