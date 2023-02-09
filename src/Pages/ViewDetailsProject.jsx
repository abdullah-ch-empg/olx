import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProjectById } from "../API/project";
import { Card } from "../Components/Card";

export const ViewDetailsProject = () => {
  const apiCallRef = useRef(false);
  const [projectDetails, setProjectDetails] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Project ID ===> ", id);
  useEffect(() => {
    const getProject = async () => {
      try {
        apiCallRef.current = true;
        const {
          data: { project },
        } = await fetchProjectById(id);
        console.log("Data ===> fetchProjectById ", project);
        setProjectDetails(project);
      } catch (error) {
        console.log("error ===> fetchProjectById ===> ", error);
      }
    };
    if (!apiCallRef.current) {
      getProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routeToEditProject = () => {
    navigate("/project/edit", {
      state: {
        projectId: id,
      },
    });
  };
  return (
    <div>
      {projectDetails ? (
        <>
          <button onClick={routeToEditProject}>EDIT</button>
          {/* Project Details */}
          <section>
            <Card value={projectDetails.name + " Project"} />

            {projectDetails.is_active ? <b>ACTIVE</b> : <b>INACTIVE</b>}
            <Card
              heading={"Total Amount"}
              value={projectDetails.total_amount}
            />
            <Card
              heading={"Billed Amount"}
              value={projectDetails.billed_amount}
            />
            <Card
              heading={"Recieved Amount"}
              value={projectDetails.received_amount}
            />
            <Card heading={"Due Amount"} value={projectDetails.due_amount} />
            <Card
              heading={"Overdue Amount"}
              value={projectDetails.overdue_amount}
            />
          </section>
          {/* Unit Information Section */}
          <section>
            <h1>Unit Information</h1>
            <Card heading={"Total Units"} value={projectDetails.total_units} />
            <Card
              heading={"Units Booked"}
              value={projectDetails.units_booked}
            />
            <Card
              heading={"Units Available"}
              value={projectDetails.units_available}
            />
          </section>
        </>
      ) : (
        <h1>Loading.........</h1>
      )}
    </div>
  );
};
