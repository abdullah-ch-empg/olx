import React from "react";
import { useSelector } from "react-redux";
import { selectClients } from "../Features/Client/clientSlice";
import { selectDesignation } from "../Features/Designation/designationSlice";

export const Public = () => {
  const designations = useSelector(selectDesignation);
  const clients = useSelector(selectClients);

  return (
    <div>
      I am a Public Page, anybody can access me :-)
      {clients ? (
        <ul>
          {clients?.product_categories.map((designation) => (
            <span key={designation.id}>
              <li>{designation.name}</li>
            </span>
          ))}
        </ul>
      ) : (
        <h1>NOT PERSISTED Client's Product Categories...........</h1>
      )}
      <h1>PERSISTED DESIGNATION DATA</h1>
      {designations ? (
        <ul>
          {designations.map((designation) => (
            <span key={designation.id}>
              <li>{designation.name}</li>
              {/* <button onClick={() => handleDelete(designation)}> Delete</button> */}
            </span>
          ))}
        </ul>
      ) : (
        <h1>Loading...........</h1>
      )}
    </div>
  );
};
