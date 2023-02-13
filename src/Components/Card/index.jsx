import React from "react";

import styles from "./Card.module.scss";
export const Card = ({ heading, value, Icon }) => {
  return (
    <>
      {value !== null ? (
        <div className={styles.container}>
          {Icon ? <span className={styles.icon}>{Icon}</span> : null}
          <div className={styles.vertical}>
            <span className={`${styles.fontSM}`}>{heading}</span>
            <span className={`${styles.fontSM}`}>{value}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};
