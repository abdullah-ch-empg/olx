import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editProjectById, fetchProjectById } from "../../API/project";
import { Card } from "../../Components/Card";
import Modal from "react-modal";
import styles from "./ViewDetails.module.scss";
import { HiCheck } from "react-icons/hi";

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
    setStatus("");
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
  const handleChange = () => {
    setStatus(!projectDetails.is_active);
    openModal();
  };
  return (
    <div>
      {projectDetails ? (
        <section className={`${styles.container}`}>
          {/* Project Details */}

          <section className={`${styles.amountInformation} ${styles.heading}`}>
            {/* header */}
            <div
              className={` ${styles.heading} ${styles.horizantal} ${styles.spaceBetween}`}
            >
              <div className={`${styles.horizantal} ${styles.center}`}>
                <Card value={projectDetails.name + " Project"} />
                <span>
                  {projectDetails.is_active ? <b>ACTIVE</b> : <b>INACTIVE</b>}
                </span>
              </div>
              <div className={`${styles.horizantal} ${styles.center}`}>
                {/* Edit Project */}
                <button
                  className={`${styles.editBtn}`}
                  onClick={routeToEditProject}
                >
                  EDIT
                </button>
                {/* change status */}
                <button onClick={handleChange}>
                  Change Status to{" "}
                  {!projectDetails.is_active ? <b>Active</b> : <b>In Active</b>}
                </button>
              </div>
            </div>

            <div className={`${styles.horizantal}`}>
              {/* body */}
              <Card
                Icon={<HiCheck />}
                heading={"Total Amount"}
                value={projectDetails.total_amount}
              />
              <Card
                Icon={<HiCheck />}
                heading={"Billed Amount"}
                value={projectDetails.billed_amount}
              />
              <Card
                Icon={<HiCheck />}
                heading={"Recieved Amount"}
                value={projectDetails.received_amount}
              />
              <Card heading={"Due Amount"} value={projectDetails.due_amount} />
              <Card
                Icon={<HiCheck />}
                heading={"Overdue Amount"}
                value={projectDetails.overdue_amount}
              />
            </div>
          </section>
          {/* Unit Information Section */}
          <section className={`${styles.unitContainer}`}>
            <div className={`${styles.unitHeading}`}>Unit Information</div>
            <div className={`${styles.horizantal}`}>
              <Card
                Icon={<HiCheck />}
                heading={"Total Units"}
                value={projectDetails.total_units}
              />
              <Card
                Icon={<HiCheck />}
                heading={"Units Booked"}
                value={projectDetails.units_booked}
              />
              <Card
                Icon={<HiCheck />}
                heading={"Units Available"}
                value={projectDetails.units_available}
              />
            </div>
          </section>
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            // style={customStyles}
            contentLabel="STATUS"
          >
            <div>
              <button onClick={handleActiveStatus}>Confirm</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </Modal>
        </section>
      ) : (
        <h1>Loading.........</h1>
      )}
    </div>
  );
};
