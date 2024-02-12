import Button from "../../components/Button";
import React, { useState } from "react";
import TaskCard from "../../components/TaskCard";
import { DetailedTaskProps } from "types";
import AddNewColumn from "../../Modals/AddNewColumn";

const Board = ({ setShowDetailedTask }: DetailedTaskProps) => {
  const [showAddColumn, setShowAddColumn] = useState(false);
  return (
    <>
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
          <div
            className="new-column-container"
            onClick={() => {
              setShowAddColumn(true);
            }}
          >
            <div className="new-column">
              <p className="heading-XL">+ New Column</p>
            </div>
          </div>
        </div>
      </div>
      {showAddColumn && <AddNewColumn setShowAddColumn={setShowAddColumn} />}
    </>
  );
};

export default Board;
