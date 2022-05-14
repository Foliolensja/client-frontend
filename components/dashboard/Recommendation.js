import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import styles from "../../styles/dashboard/components/Recommendation.module.css";
import Piechart from "./Piechart";
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
      cLabels.push(portfolio[i].ticker);
      cData.push(portfolio[i].weight);
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
      <h2>Personalized Suggestions</h2>
      <hr />
      <div className={styles.innerCon}>
        {pData && (
          <Piechart cData={pData} cLabels={pLabels} options={options} />
        )}
      </div>
    </div>
  );
};
