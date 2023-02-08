import React from "react";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/new");
  };
  return (
    <div>
      {/* Project */}
      <button onClick={handleClick}>CTA</button>
    </div>
  );
};

export default Project;
