import Button from "../../components/Button";
import React from "react";

const Board = () => {
  return (
    <div className="board-container">
      <p className="heading-L">
        This board is empty. Create a new column to get started.
      </p>
      <Button text="+ Add New Column" className="primary-L" />
    </div>
  );
};

export default Board;
