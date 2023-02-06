import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDesignation,
  getDesignationsUser,
  deleteDesignation,
} from "./designationSlice";

export const Designation = () => {
  const designations = useSelector(selectDesignation);
  const dispatch = useDispatch();
  const apiCallRef = useRef(false);

  useEffect(() => {
    const getUserDesignations = () => {
      apiCallRef.current = true;
      dispatch(getDesignationsUser());
    };
    if (!apiCallRef.current) {
      getUserDesignations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (designation) => {
    dispatch(deleteDesignation(designation.id));
  };
  return (
    <>
      <h2>Designations</h2>
      {designations ? (
        <ul>
          {designations.map((designation) => (
            <span key={designation.id}>
              <li>{designation.name}</li>
              <button onClick={() => handleDelete(designation)}> Delete</button>
            </span>
          ))}
        </ul>
      ) : (
        <h1>Loading...........</h1>
      )}
    </>
  );
};
