import React from "react";
import Button from "../Button";
import moreIcon from "../../assets/more.png";

const Header = () => {
  return (
    <div className="header-container">
      <p className="heading-XL">Platform Launch</p>
      <div className="btn-container">
        <Button className="primary-L" text="+ Add New Task" />
        <img src={moreIcon} alt="more" />
      </div>
    </div>
  );
};

export default Header;
