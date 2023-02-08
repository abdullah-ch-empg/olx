import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "../API/project";

export const ViewDetailsProject = () => {
  const apiCallRef = useRef(false);

  const { id } = useParams();
  console.log("Project ID ===> ", id);
  useEffect(() => {
    const getProject = async () => {
      try {
        apiCallRef.current = true;
        const {
          data: { project },
        } = await fetchProjectById(id);
        console.log("Data ===> fetchProjectById ", project);
      } catch (error) {
        console.log("error ===> fetchProjectById ===> ", error);
      }
    };
    if (!apiCallRef.current) {
      getProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>ViewDetailsProject</div>;
};
