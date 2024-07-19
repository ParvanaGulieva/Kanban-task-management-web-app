import React, { useState } from "react";
import TaskCard from "../../components/TaskCard";
import { DetailedTaskProps } from "../../types";
import AddNewColumn from "../../Modals/AddNewColumn";
import Button from "../../components/Button";
import { useBoardContext } from "../../context/AddNewBoardContext";
import { useTaskContext } from "../../context/AddNewTaskContext";
import DeleteTask from "../../Modals/DeleteTask";
import EditTask from "../../Modals/EditTask";

const Board = ({ setShowDetailedTask, showSidebar }: DetailedTaskProps) => {
  const [showAddColumn, setShowAddColumn] = useState(false);
  const { activeTab, boards } = useBoardContext();
  const {
    setSelectedTask,
    setShowDeleteTask,
    deleteTask,
    showDeleteTask,
    selectedTask,
    showEditTask,
  } = useTaskContext();

  const getColumnId = () => {
    const column = boards[activeTab].columns.find((col) =>
      col.tasks.some((task) => task.id === selectedTask?.id)
    );
    return column ? column.id : null;
  };

  const columnId = getColumnId();

  const gridTemplateColumns = `repeat(${
    boards[activeTab].columns.length + 1
  }, 1fr)`;

  const handleDelete = () => {
    if (columnId !== null && selectedTask && selectedTask?.id !== null) {
      deleteTask(boards[activeTab].id, columnId, selectedTask?.id);
      setShowDetailedTask(false);
      setShowDeleteTask(false);
    }
  };

  return (
    <>
      <div
        className="board-container"
        style={{
          width: showSidebar ? "84%" : "100%",
        }}
      >
        {boards[activeTab].columns.length === 0 ? (
          <div className="empty">
            <p className="heading-L">
              This board is empty. Create a new column to get started.
            </p>
            <Button
              text="+ Add New Column"
              className="primary-L"
              onClick={() => setShowAddColumn(true)}
            />
          </div>
        ) : (
          <div
            className="filled"
            style={{
              display: "grid",
              gap: "2.4rem",
              gridTemplateColumns: gridTemplateColumns,
              padding: "2.4rem",
              height: "100%",
            }}
          >
            {boards[activeTab].columns.map((column, index) => {
              return (
                <div
                  key={index}
                  className={`column ${column.name.toString().toLowerCase()}`}
                >
                  <div className="title">
                    <div className="round"></div>
                    <p className="heading-S">
                      {column.name.toString().toUpperCase()} (
                      {column.tasks.length})
                    </p>
                  </div>
                  {column.tasks.map((task, index) => {
                    return (
                      <TaskCard
                        task={task}
                        key={index}
                        name={task.title}
                        onClick={() => {
                          setShowDetailedTask(true);
                          setSelectedTask(task);
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
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
        )}
      </div>
      {showAddColumn && <AddNewColumn setShowAddColumn={setShowAddColumn} />}
      {showDeleteTask && (
        <DeleteTask
          setShowDelete={setShowDeleteTask}
          handleButton={handleDelete}
        />
      )}

      {showEditTask && <EditTask />}
    </>
  );
};

export default Board;
