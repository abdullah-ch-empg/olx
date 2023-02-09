import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editProjectById, fetchProjectById } from "../API/project";
import { Card } from "../Components/Card";
import Modal from "react-modal";

export const ViewDetailsProject = () => {
  const apiCallRef = useRef(false);
  const [status, setStatus] = useState("");
  const [projectDetails, setProjectDetails] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
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
      Modal.setAppElement("body");
      getProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const routeToEditProject = () => {
    navigate("/project/edit", {
      state: {
        projectId: id,
      },
    });
  };

  const handleActiveStatus = async () => {
    try {
      await editProjectById(
        {
          ...projectDetails,
          is_active: status,
        },
        id
      );
      setProjectDetails((prevState) => ({ ...prevState, is_active: status }));

      closeModal();
    } catch (error) {
      console.log("handleActiveStatus ===> ", error);
    }

    // make the API call
  };
  const handleChange = (e) => {
    console.log(
      "HANDLE SELECT ===> Name ===> Value ",
      e.target.name,
      e.target.value
    );
    setStatus(e.target.value);
    openModal();
  };
  return (
    <div>
      {projectDetails ? (
        <>
          <button onClick={routeToEditProject}>EDIT</button>
          {/* change status */}
          {/* Project Details */}
          <select onChange={handleChange} value={status} name="status">
            <option disabled value={""}>
              Please Select a status
            </option>

            <option value={true}>Active</option>
            <option value={false}>In-Active</option>
          </select>
          <section>
            <Modal
              isOpen={modalIsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              // style={customStyles}
              contentLabel="STATUS"
            >
              <div>I am a modal</div>
              <div>
                <button onClick={handleActiveStatus}>Confirm</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </Modal>
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
