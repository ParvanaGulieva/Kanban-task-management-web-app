import React, { useState } from "react";
import SubtaskCheckbox from "../../components/SubtaskCheckbox";
import Dropdown from "../../components/Dropdown";

const DetailedTask = () => {
  const [showMore, setShowMore] = useState(false);

  const handleClickMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="modal detailed-task">
      <div className="title-container">
        <p className="heading-L">
          Research pricing points of various competitors and trial different
          business models
        </p>
        <svg
          onClick={handleClickMore}
          width="8"
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
            <p className="body-L">Edit task</p>
            <p className="body-L delete">Delete task</p>
          </div>
        )}
      </div>
      <p className="body-L">
        We know what we're planning to build for version one. Now we need to
        finalise the first pricing model we'll use. Keep iterating the subtasks
        until we have a coherent proposition.
      </p>
      <div className="content">
        <p className="body-M">Subtasks (2 of 3)</p>
        <div className="subtasks">
          <SubtaskCheckbox />
          <SubtaskCheckbox />
          <SubtaskCheckbox />
        </div>
      </div>
      <Dropdown placeholder="Doing" label="Current status" />
    </div>
  );
};

export default DetailedTask;
