import React from "react";

export const Card = ({ heading, value }) => {
  return (
    <>
      {value !== null ? (
        <>
          <span>{heading}</span>
          <span>{value}</span>
        </>
      ) : null}
    </>
  );
};
