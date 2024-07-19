import React, { useState } from "react";

const SubtaskCheckbox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="subtask-container"
      onClick={() => {
        setChecked(!checked);
      }}
    >
      <input type="checkbox" checked={checked} />
      <span className="checkmark"></span>
      <p className="body-M">Subtask Checkbox</p>
    </div>
  );
};

export default SubtaskCheckbox;
