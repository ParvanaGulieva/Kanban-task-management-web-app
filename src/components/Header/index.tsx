import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import LogoDark from "../../assets/LogoDark";
import LogoLight from "../../assets/LogoLight";
import { HeaderProps } from "../../types/index";
import Delete from "../../Modals/DeleteBoard";
import { useBoardContext } from "../../context/AddNewBoardContext";
import EditBoard from "../../Modals/EditBoard";

const Header = ({
  setShowAddNewTask,
  setShowDelete,
  showDelete,
  theme,
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
        <div className="logo">{theme ? <LogoLight /> : <LogoDark />}</div>
      </div>
      <div className="main">
        <p className="heading-XL">{boards[activeTab].name}</p>
        {/* <p className="heading-XL"> title goes here</p> */}
        <div className="btn-container">
          <Button
            className="primary-L"
            text="+ Add New Task"
            onClick={() => setShowAddNewTask?.(true)}
            disabled={boards[activeTab].columns.length === 0}
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

        {showEditBoard && <EditBoard />}
      </div>
    </div>
  );
};

export default Header;
