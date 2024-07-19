import React, { useState, useRef, useEffect } from "react";
import SubtaskCheckbox from "../../components/SubtaskCheckbox";
import { DetailedTaskProps } from "../../types";
import { useTaskContext } from "../../context/AddNewTaskContext";

const DetailedTask = ({ setShowDetailedTask }: DetailedTaskProps) => {
  const [showMore, setShowMore] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { selectedTask, setShowDeleteTask, setShowEditTask } = useTaskContext();

  const handleClickMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowDetailedTask(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowDetailedTask]);

  const completedTasksCount = selectedTask?.subtasks.filter(
    (subtask) => subtask.completed
  ).length;

  return (
    <div className="modal-container">
      <div className="modal detailed-task" ref={modalRef}>
        <div className="title-container">
          <p className="heading-L">{selectedTask?.title}</p>
          <svg
            onClick={handleClickMore}
            width="20"
            height="20"
            viewBox="0 0 5 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.30769" cy="2.30769" r="2.30769" fill="#828FA3" />
            <circle cx="2.30769" cy="9.99995" r="2.30769" fill="#828FA3" />
            <circle cx="2.30769" cy="17.6923" r="2.30769" fill="#828FA3" />
          </svg>
          {showMore && (
            <div className="more-container">
              <p
                className="body-L"
                onClick={() => {
                  setShowEditTask(true);
                  setShowDetailedTask(false);
                }}
              >
                Edit task
              </p>
              <p
                className="body-L delete"
                onClick={() => {
                  setShowDeleteTask(true);
                  setShowDetailedTask(false);
                }}
              >
                Delete task
              </p>
            </div>
          )}
        </div>
        <p className="body-L">{selectedTask?.description}</p>
        <div className="content">
          <p className="body-M">
            Subtasks ({completedTasksCount} of {selectedTask?.subtasks.length})
          </p>
          <div className="subtasks">
            {selectedTask?.subtasks.map((subtask, id) => (
              <SubtaskCheckbox key={id} subtask={subtask} />
            ))}
          </div>
        </div>
        <div className="option-container">
          <p className="body-M">Current Status</p>
          <div className="option">
            <p className="body-L">{selectedTask?.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedTask;
