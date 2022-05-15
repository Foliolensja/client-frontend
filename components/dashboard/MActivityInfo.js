import React from "react";
import styles from "../../styles/dashboard/components/MarketActivity.module.css";

export const MActivityInfo = ({ activity }) => {
  let percentType = true;
  if (activity.change.includes("-")) {
    percentType = false;
  }
  if (activity.change == "0") {
    percentType = false;
  }

  return (
    <div className={styles.contentCon}>
      <p>{activity.ticker}</p>
      <p>{activity.c_price}</p>
      <p>{activity.price_change}</p>
      <p className={percentType ? styles.positive : styles.negative}>
        {percentType ? "+" : ""} {activity.change}%
      </p>
    </div>
  );
};
