import React, { useState } from "react";
import Button from "../Button";
import logo from "../../assets/logo-light.svg";
import { AddNewTaskProps } from "types";

const Header = ({ setAddNewTask }: AddNewTaskProps) => {
  const [showMore, setShowMore] = useState(false);

  const handleClickMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="main">
        <p className="heading-XL">Platform Launch</p>
        <div className="btn-container">
          <Button
            className="primary-L"
            text="+ Add New Task"
            onClick={() => setAddNewTask(true)}
          />
          <svg
            onClick={handleClickMore}
            width="5"
            height="20"
            viewBox="0 0 5 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.30769" cy="2.30769" r="2.30769" fill="#828FA3" />
            <circle cx="2.30769" cy="9.99995" r="2.30769" fill="#828FA3" />
            <circle cx="2.30769" cy="17.6923" r="2.30769" fill="#828FA3" />
          </svg>
        </div>
        {showMore && (
          <div className="more-container">
            <p className="body-L">Edit board</p>
            <p className="body-L delete">Delete board</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
