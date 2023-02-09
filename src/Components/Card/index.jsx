import React from "react";

import styles from "./Card.module.css";
export const Card = ({ heading, value }) => {
  return (
    <>
      {value !== null ? (
        <div className={styles.container}>
          <span className={styles.icon}>ICON</span>
          <div className={styles.vertical}>
            <span>{heading}</span>
            <span>{value}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};
