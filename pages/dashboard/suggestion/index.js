import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components/global/Sidebar";
import { TopNav } from "../../../components/global/TopNav";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import styles from "../../../styles/suggestions/Suggestions.module.css";
import Suggestion from "../../../components/dashboard/Suggestion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Portfolio Performance",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Growth %",
      data: [0.3, 2, 4, 5, 2, 6, 14, 0.3, 2, 4, 5, 2, 6, 14],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Track = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [name, setName] = useState("");

  useEffect(async () => {
    let res = await fetch("../api/user/me");
    let pData = await res.json();
    console.log(pData.user);
    setName(pData.user.firstName);
    setPortfolio(pData.user.portfolio.indices);
  }, []);

  return (
    <div className={styles.con}>
      <Sidebar />
      <div className={styles.innerCon}>
        <TopNav
          sectionName="Portfolio Breakdown"
          date="Thursday February 11, 2022"
          username={name}
        />
        <div className={styles.cFlex}>
          <div className={styles.sugCon}>
            <h2>Portfolio Breakdown</h2>
            <div className={styles.tableCon}>
              <div className={styles.header}>
                <p>Symbol</p>

                <p>Portfolio Percentage</p>
              </div>
              {portfolio &&
                portfolio.map((index) => (
                  <Suggestion
                    ticker={index.ticker}
                    weight={index.weight}
                    key={index.ticker}
                  />
                ))}
            </div>
          </div>
          <div className="">
            <div className={styles.sCon}>
              <p>
                This would have been your portfolio growth if you invested{" "}
                <strong>$250,000</strong> into our suggestion
              </p>
            </div>
            <div className={styles.sGrid}>
              <div className={styles.ssCon}>
                <p>Open Value</p>
                <p className={styles.value}>250,000.00</p>
              </div>

              <div className={styles.ssCon}>
                <p>Close Value</p>
                <p className={styles.value}>520,000.00</p>
              </div>

              <div className={styles.ssCon}>
                <p>Risk Level</p>
                <p>High</p>
              </div>

              <div className={styles.ssCon}>
                <p>YoY Return</p>
                <p>21.74%</p>
              </div>
            </div>

            <div className={styles.sCCon}>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
