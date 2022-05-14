import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard/components/MarketActivity.module.css";
import { MActivityInfo } from "./MActivityInfo";

export const MarketActivity = ({ date }) => {
  const [activities, setActivities] = useState(null);
  const [actType, setActType] = useState("advancing");
  useEffect(async () => {
    let res = await fetch(
      `https://foliolens-backend.herokuapp.com/trading-days/${date}`
    );
    if (date) {
      try {
        let data = await res.json();

        setActivities(data);
      } catch (error) {
        setActivities(null);
      }
    } else {
      setActivities(null);
    }
  }, [date]);

  let aTypes = ["advancing", "declining", "trading_firm"];
  // console.log(activities);

  const onChange = (type) => {
    setActType(aTypes[type]);
  };

  return (
    <div className={styles.con}>
      <h2>Latest Market Activity</h2>
      <hr />
      <ul>
        <li
          className={actType == "advancing" ? styles.active : ""}
          onClick={() => {
            onChange(0);
          }}
        >
          Advancing
        </li>
        <li
          className={actType == "declining" ? styles.active : ""}
          onClick={() => {
            onChange(1);
          }}
        >
          Declining
        </li>
        <li
          className={actType == "trading_firm" ? styles.active : ""}
          onClick={() => {
            onChange(2);
          }}
        >
          Trading Firm
        </li>
      </ul>

      <div className={styles.tableCon}>
        <div className={styles.header}>
          <p>Symbol</p>
          <p>Closing Price</p>
          <p>Price Change</p>
          <p>Percentage</p>
        </div>
        {activities ? (
          activities[actType].map((activity) => {
            return (
              <MActivityInfo
                activity={activity}
                key={activity.name}
                // name={index}
              />
            );
          })
        ) : (
          <p className={styles.nodata}>
            There is no market activity data for {date}
          </p>
        )}
      </div>
    </div>
  );
};
