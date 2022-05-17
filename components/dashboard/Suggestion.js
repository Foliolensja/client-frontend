import React from "react";
import styles from "../../styles/suggestions/Suggestions.module.css";

const Suggestion = ({ ticker, weight, tSum }) => {
  // console.log(ticker, weight, tSum);
  // let ticker_weight = (Number.parseFloat(weight) / tSum) * 100;
  // let pro_weight = (Number.parseFloat(weight) * 100).toFixed(2);
  let pro_weight = (
    (Number.parseFloat(weight) * 100) /
    Number.parseFloat(tSum)
  ).toFixed(2);
  // let pro_weight = ticker_weight.toFixed(2);
  if (pro_weight > 1) {
    return (
      <div className={styles.contentCon}>
        <p>{ticker}</p>
        <p className={styles.weight}>{pro_weight}%</p>
      </div>
    );
  }
  return "";
};

export default Suggestion;
