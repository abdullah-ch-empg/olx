import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProjects } from "../../API/project";
// import { useDispatch } from "react-redux";
import { getAllProjects } from "./projectSlice";

const Project = () => {
  const navigate = useNavigate();
  const apiCallRef = useRef(false);
  const [listing, setListing] = useState(null);
  //   const dispatch = useDispatch();

  useEffect(() => {
    const getProjects = async () => {
      apiCallRef.current = true;
      const response = await fetchProjects();
      console.log("response ===> getProjects ==> ", response.data);
      setListing(response.data);
      //   dispatch(getAllProjects());
    };
    if (!apiCallRef.current) {
      getProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    navigate("/dashboard/new");
  };

  return (
    <div>
      {/* Project */}
      <button onClick={handleClick}>CTA</button>
      <h1>
        There willl be a listing here........
        {listing?.projects ? (
          <h1> Length of Projects === {listing?.projects.length}</h1>
        ) : null}
      </h1>
    </div>
  );
};

export default Project;
