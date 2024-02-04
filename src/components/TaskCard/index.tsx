import React from "react";
import { TaskCardProps } from "types";

const TaskCard = ({ onClick }: TaskCardProps) => {
  return (
    <div className="task-card-container" onClick={onClick}>
      <p className="heading-M">Build UI for onboarding flow</p>
      <p className="body-M">0 of 6 substasks</p>
    </div>
  );
};

export default TaskCard;
