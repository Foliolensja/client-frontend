import React, { useState, useEffect } from "react";
import { Sidebar } from "../../../components/global/Sidebar";
import { TopNav } from "../../../components/global/TopNav";
import { Indices } from "../../../components/dashboard/Indices";
import { JSESummary } from "../../../components/dashboard/JSESummary";
import { MarketActivity } from "../../../components/dashboard/MarketActivity";
import styles from "../../../styles/track/Track.module.css";

const Track = () => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [date, setDate] = useState(yesterday.toISOString().split("T")[0]);
  const [disDate, setDisDate] = useState(today);

  const [name, setName] = useState("");
  useEffect(async () => {
    let res = await fetch("../api/user/me");
    let pData = await res.json();
    setName(pData.user.firstName);
  }, []);

  useEffect(() => {
    let test = new Date(date);
    test.setDate(test.getDate() + 1);
    setDisDate(new Date(test));
  }, [date]);

  return (
    <div className={styles.con}>
      <Sidebar />
      <div className={styles.innerCon}>
        <TopNav
          sectionName="Stock History"
          date={today.toLocaleDateString("en-US", options)}
          username={name}
        />

        <div className={styles.cFlex}>
          <div className={styles.sCon}>
            <h2>Filter Stock</h2>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                console.log(e.target.value);
              }}
            />
            {date ? (
              <p>
                Now showing stock market activity for:{" "}
                {disDate.toLocaleDateString("en-US", options)}
              </p>
            ) : (
              <p>Please select a date to see the stock history</p>
            )}
          </div>
          <Indices date={date} />
          <JSESummary date={date} />
          <div className={styles.spacer}></div>
          <MarketActivity date={date} />
        </div>
      </div>
    </div>
  );
};

export default Track;
