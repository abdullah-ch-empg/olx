import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, selectProjects } from "./projectSlice";

const Project = () => {
  const listing = useSelector(selectProjects);
  const navigate = useNavigate();
  const apiCallRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProjects = async () => {
      apiCallRef.current = true;
      dispatch(getAllProjects());
    };
    if (!apiCallRef.current) {
      getProjects();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "Project",
        selector: (row) => row.name,
      },
      {
        name: "status",
        selector: (row) => (row.is_active ? "Active" : "In Active"),
      },
      {
        name: "City",
        selector: (row) => row.city?.name,
      },
      {
        name: "Total Units",
        selector: (row) => row.total_units,
      },
      {
        name: "Units Booked",
        selector: (row) => row.units_booked,
      },
      {
        name: "Units Available",
        selector: (row) => row.units_available,
      },
      {
        name: "Total Amount",
        selector: (row) => row.total_amount,
      },
      {
        name: "Actions",
        button: true,
        cell: (row) => (
          <button
            // className="btn btn-outline btn-xs"
            onClick={() => handleViewDetails(row)}
          >
            View Details
          </button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const handleClick = () => {
    navigate("/dashboard/new");
  };

  const handleViewDetails = (row) => {
    // console.log("row ===> handleViewDetails ===> ", row);
    // dispatch(resetProjects());
    navigate(`/dashboard/view-details/${row.id}`);
  };

  return (
    <div>
      {/* Project */}
      <h1>
        <button onClick={handleClick}>Add A New Project</button>
      </h1>
      {listing && listing?.projects ? (
        <>
          <DataTable columns={columns} data={listing.projects} />
        </>
      ) : (
        "Loading Listing........"
      )}
    </div>
  );
};

export default Project;
