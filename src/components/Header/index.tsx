import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import logo from "../../assets/logo-light.svg";
import { HeaderProps } from "../../types/index";
import Delete from "../../Modals/DeleteBoard";
import { useBoardContext } from "../../context/AddNewBoardContext";
import EditBoard from "../../Modals/EditBoard";

const Header = ({
  setShowAddNewTask,
  setShowDelete,
  showDelete,
}: HeaderProps) => {
  const [showMore, setShowMore] = useState(false);

  const handleClickMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const {
    boards,
    activeTab,
    setActiveTab,
    deleteBoard,
    showEditBoard,
    setShowEditBoard,
  } = useBoardContext();

  const handleDelete = () => {
    deleteBoard(boards[activeTab].id);
    setActiveTab((prev: number) => (prev > 0 ? prev - 1 : 0));
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowMore(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowMore]);

  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="main">
        <p className="heading-XL">{boards[activeTab].name}</p>
        {/* <p className="heading-XL"> title goes here</p> */}
        <div className="btn-container">
          <Button
            className="primary-L"
            text="+ Add New Task"
            onClick={() => setShowAddNewTask?.(true)}
          />
          <svg
            onClick={handleClickMore}
            width="25"
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
          <div className="more-container" ref={modalRef}>
            <p className="body-L" onClick={() => setShowEditBoard?.(true)}>
              Edit board
            </p>
            <p className="body-L delete" onClick={() => setShowDelete?.(true)}>
              Delete board
            </p>
          </div>
        )}

        {showDelete && (
          <Delete
            setShowDelete={setShowDelete}
            showDelete={showDelete}
            handleButton={handleDelete}
          />
        )}

        {showEditBoard && (
          <EditBoard
            setShowEditBoard={setShowEditBoard}
            showEditBoard={showEditBoard}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
