import React from "react";
import Button from "../../components/Button";

const Delete = () => {
  return (
    <div className="modal-container">
      <div className="modal delete">
        <p className="heading-L delete-title">Delete this board?</p>
        <p className="body-L">
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="btn-container">
          <Button className="error" text="Delete" />
          <Button className="secondary" text="Cancel" />
        </div>
      </div>
    </div>
  );
};

export default Delete;
