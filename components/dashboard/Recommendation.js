import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import styles from "../../styles/dashboard/components/Recommendation.module.css";
import Piechart from "./Piechart";
import Link from "next/link";
ChartJS.register(ArcElement, Tooltip, Legend);

export const Recommendation = () => {
  const [pData, setPData] = useState([]);
  const [pLabels, setPLabels] = useState([]);
  let portfolio = {};

  useEffect(async () => {
    let res = await fetch("../api/user/me");
    let pData = await res.json();

    let cLabels = [];
    let cData = [];
    console.log(pData);

    portfolio = pData.user.portfolio.indices;

    for (let i = 0; i < portfolio.length; i++) {
      if (portfolio[i].weight * 100 > 1) {
        cLabels.push(portfolio[i].ticker);
        cData.push((portfolio[i].weight * 100).toFixed(2));
      }
      // console.log(cLabels);
    }

    setPData(cData);
    setPLabels(cLabels);
  }, []);

  let options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className={styles.con}>
      <div className={styles.flex}>
        <h2>Personalized Suggestions</h2>
        <Link href={"dashboard/suggestions"}>
          <a>View Portfolio Breakdown</a>
        </Link>
      </div>
      <hr />
      <div className={styles.innerCon}>
        {pData && (
          <Piechart cData={pData} cLabels={pLabels} options={options} />
        )}
      </div>
    </div>
  );
};
