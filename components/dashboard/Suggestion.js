import React from "react";
import styles from "../../styles/suggestions/Suggestions.module.css";

const Suggestion = ({ ticker, weight }) => {
  return (
    <div className={styles.contentCon}>
      <p>{ticker}</p>
      <p className={styles.weight}>{weight}%</p>
    </div>
  );
};

export default Suggestion;
