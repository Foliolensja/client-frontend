import React, { useState } from "react";
import styles from "../../styles/dashboard/components/Indices.module.css";

export const MIndex = ({ index, name }) => {
  let percentType = true;
  if (index.change_percent.includes("-")) {
    percentType = false;
  }

  return (
    <div className={styles.indexCon}>
      <span className={styles.spacer}>
        <p className={styles.title}>{name}</p>
        <p className={percentType ? styles.positive : styles.negative}>
          {percentType ? "+" : ""}
          {index.change_percent}
        </p>
      </span>
      <span className={styles.spacer}>
        <p>Points</p>
        <p className={styles.title}>{index.points.toLocaleString()}</p>
      </span>
      <span className={styles.spacer}>
        <p>Volume Traded</p>
        <p className={styles.title}>{index.volume.toLocaleString()}</p>
      </span>
    </div>
  );
};
