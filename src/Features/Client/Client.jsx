import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClients, selectClients, selectClientsLoading } from "./clientSlice";

export const Client = () => {
  const clients = useSelector(selectClients);
  const isLoading = useSelector(selectClientsLoading);

  const dispatch = useDispatch();
  const apiCallRef = useRef(false);

  console.log("clients ===> ", clients);
  useEffect(() => {
    const fetchClients = () => {
      apiCallRef.current = true;
      dispatch(getClients());
    };
    if (!apiCallRef.current) {
      fetchClients();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1>Client</h1>
      {isLoading ? (
        <ul>
          {clients?.product_categories.map((designation) => (
            <span key={designation.id}>
              <li>{designation.name}</li>
            </span>
          ))}
        </ul>
      ) : (
        <h1>Loading Client's Product Categories...........</h1>
      )}
    </>
  );
};
