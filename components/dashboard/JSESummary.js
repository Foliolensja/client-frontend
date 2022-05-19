import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard/components/JSESummary.module.css";

export const JSESummary = ({ date }) => {
  const [act, setAct] = useState(null);
  const [activities, setActivities] = useState(null);
  useEffect(async () => {
    let res = await fetch(`../api/dashboard/activities`, {
      method: "POST",
      body: JSON.stringify({ date: date }),
    });
    let pData = await res.json();
    setActivities(pData.activities);
  }, [date]);

  useEffect(() => {
    if (activities != null) {
      let total =
        activities["advancing"].length +
        activities["declining"].length +
        activities["trading_firm"].length;
      setAct({
        adv: activities["advancing"].length,
        dec: activities["declining"].length,
        t: activities["trading_firm"].length,
        total,
      });
    }
  }, [activities]);
  return (
    <div className={styles.con}>
      <h2>JSE Summary</h2>
      <hr />
      <div className={styles.innerCon}>
        {act ? (
          <p>
            Overall Market activity resulted from trading in {act.total} stocks
            of which {act.adv} advanced, {act.dec} declined and {act.t} traded
            firm.
          </p>
        ) : (
          <p className={styles.nodata}>There is no summary for {date}</p>
        )}
      </div>
    </div>
  );
};
