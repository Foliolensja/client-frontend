import Link from "next/link";
import React from "react";
import styles from "../../styles/global_components/TopNav.module.css";

export const TopNav = ({ sectionName, date, username }) => {
  return (
    <div className={styles.con}>
      <span className={styles.flexCon}>
        <h1>{sectionName}</h1>
        <p className={styles.date}>{date}</p>
      </span>

      <span>
        <p>Hi {username}</p>
      </span>
    </div>
  );
};
