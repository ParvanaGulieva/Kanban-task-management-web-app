import React from "react";

export interface Task {
  id: number;
  title: string;
  description: string;
  subtasks: { id: number; title: string; completed: boolean }[];
  status: string;
}

export interface TaskCardProps {
  onClick: () => void;
  name: string;
  task: Task;
  key?: number;
}

const TaskCard = ({ onClick, name, task }: TaskCardProps) => {
  const completedTasksCount = task.subtasks.filter(
    (subtask) => subtask.completed
  ).length;

  const totalTasksCount = task.subtasks.length;

  return (
    <div className="task-card-container" onClick={onClick}>
      <p className="heading-M">{name}</p>
      <p className="body-M">
        {completedTasksCount} of {totalTasksCount} substasks
      </p>
    </div>
  );
};

export default TaskCard;
