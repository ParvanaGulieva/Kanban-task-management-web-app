import Button from "../../components/Button";
import React from "react";
import TaskCard from "../../components/TaskCard";
import { NewBoardProps } from "types";

const Board = ({ setAddNewBoard, setShowDetailedTask }: NewBoardProps) => {
  return (
    <div className="board-container">
      {/* <div className="empty">
        <p className="heading-L">
          This board is empty. Create a new column to get started.
        </p>
        <Button text="+ Add New Column" className="primary-L" />
      </div> */}
      <div className="filled">
        <div className="column to-do">
          <div className="title">
            <div className="round"></div>
            <p className="heading-S">TODO (4)</p>
          </div>
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
        </div>
        <div className="column doing">
          <div className="title">
            <div className="round"></div>
            <p className="heading-S">DOING (4)</p>
          </div>
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
        </div>
        <div className="column done">
          <div className="title">
            <div className="round"></div>
            <p className="heading-S">DONE (4)</p>
          </div>
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
          <TaskCard
            onClick={() => setShowDetailedTask && setShowDetailedTask(true)}
          />
        </div>
        <div className="new-column" onClick={() => setAddNewBoard(true)}>
          <p className="heading-XL">+ New Column</p>
        </div>
      </div>
    </div>
  );
};

export default Board;
