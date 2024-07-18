import { useBoardContext } from "context/AddNewBoardContext";
import { useTaskContext } from "context/AddNewTaskContext";
import React, { useEffect, useState } from "react";

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

interface SubtaskCheckboxProps {
  subtask: Subtask;
}

const SubtaskCheckbox: React.FC<SubtaskCheckboxProps> = ({ subtask }) => {
  const { updateSubtaskStatus } = useTaskContext();
  const [checked, setChecked] = useState(subtask.completed);
  const { boards, activeTab } = useBoardContext();

  useEffect(() => {
    setChecked(subtask.completed);
  }, [subtask.completed]);

  const handleCheckboxChange = () => {
    const currentBoard = boards[activeTab];
    const column = currentBoard.columns.find((col) =>
      col.tasks.some((task) => task.subtasks.some((s) => s.id === subtask.id))
    );
    if (column) {
      const task = column.tasks.find((task) =>
        task.subtasks.some((s) => s.id === subtask.id)
      );
      if (task) {
        updateSubtaskStatus(
          currentBoard.id,
          column.id,
          task.id,
          subtask.id,
          !checked
        );
        setChecked(!checked);
      }
    }
  };

  return (
    <div className="subtask-container" onClick={() => handleCheckboxChange()}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className="checkmark"></span>
      <p className="body-M">{subtask.title}</p>
    </div>
  );
};

export default SubtaskCheckbox;
