import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components/global/Sidebar";
import { TopNav } from "../../../components/global/TopNav";

import styles from "../../../styles/suggestions/Suggestions.module.css";
import Suggestion from "../../../components/dashboard/Suggestion";
import Linechart from "../../../components/dashboard/Linechart";

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

const Track = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [name, setName] = useState("");
  const [labels, setLabels] = useState([]);
  const [lData, setLData] = useState([]);
  const [cValue, setCValue] = useState("");
  const [riskRange, setRiskRange] = useState("");
  const [growth, setGrowth] = useState("");
  const [user, setUser] = useState({});
  const [test, setTest] = useState("Portfolio is generating. Please wait");
  const [gen, isGen] = useState(false);
  const [tSum, setSum] = useState(0);

  const cAge = (dob) => {
    dob = new Date(dob);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const generatePortfolio = async () => {
    let age = cAge(user.dob);
    let payload = {
      age,
      net_worth: user.netWorth,
      salary: user.salary,
      reported_risk: user.riskRating,
      userId: user.id,
    };
    try {
      let res = await fetch("../api/dashboard/generate", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      let data = await res.json();
      console.log(data);
      setGenerating(true);
    } catch (error) {}
  };

  let testData = {};
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();

  useEffect(() => {
    let i = 0;
    let dots = ".";
    let seconds = 0;

    if (user?.generating) {
      setInterval(async () => {
        if (seconds % 30 == 0) {
          let res = await fetch("../api/user/me");
          let pData = await res.json();

          let testUser = pData.user;
          if (testUser?.generating === false) {
            setUser(pData.user);
            setGen(false);
          }
        }
        i = i + 1;
        if (i >= 3) {
          dots = "";
          setTest(test + " " + dots);
          i = 0;
        } else {
          dots = dots + ".";
          setTest(test + " " + dots);
        }
        seconds = seconds + 1;
      }, 1000);
    }
  }, [gen]);

  useEffect(async () => {
    let res = await fetch("../api/user/me");
    let pData = await res.json();
    console.log(pData.user);
    let trackerData = pData.user.tracker?.dates;
    console.log(trackerData);
    let tLabels = [];
    let tData = [];
    let nTest = [];
    let vTest = 0;
    console.log(nTest);
    if (trackerData?.length != 0) {
      for (let i = 0; i < trackerData?.length; i++) {
        tLabels.push(trackerData[i].date);
        // tData.push(trackerData[i].value)
        let x = (trackerData[i].value / trackerData[0].value - 1) * 100;
        tData.push(x.toFixed(2));

        nTest.push(x);
      }
      console.log("nTest", nTest[nTest.length - 1]);
      setGrowth(nTest[nTest.length - 1]?.toFixed(2));
      console.log(250000 * nTest[nTest.length - 1] + 250000);
      vTest = 250000 * (nTest[nTest.length - 1] / 100) + 250000;
    }
    let age = cAge(pData.user.dob);
    // let age = 20;
    let risk = pData.user.riskRating;
    // let risk = 10;
    let networth = pData.user.netWorth;
    // let networth = 1000000;
    let salary = pData.user.salary;
    // let salary = 1000000;
    console.log(age, risk, networth, salary);
    let ageRisk = age < 100 ? age / 100 : 1;
    let riskA = (10 - risk) / 10;
    let nwIncome = salary / networth;
    let riskLevel = (ageRisk + riskA + nwIncome) / 3 + 0.5;

    let sSum = 0;
    let indicList = pData.user.portfolio?.indices;
    // console.log(indicList);

    for (let i = 0; i < indicList.length; i++) {
      if (Number.parseFloat(indicList[i].weight) >= 0.01) {
        sSum = sSum + Number.parseFloat(indicList[i].weight);
      }
    }
    console.log(sSum);
    setSum(sSum);

    console.log("Risk level " + riskLevel);

    let hTag = <p className={`${styles.tag} ${styles.negative}`}>High</p>;
    let mTag = <p className={`${styles.tag}`}>Moderate</p>;
    let lTag = <p className={`${styles.tag} ${styles.positive}`}>Low</p>;

    if (risk > 7) {
      setRiskRange(hTag);
    } else if (risk > 4) {
      setRiskRange(mTag);
    } else {
      setRiskRange(lTag);
    }

    console.log(riskLevel);

    setCValue(vTest.toFixed(2));
    setName(pData.user.firstName);
    setPortfolio(pData.user.portfolio?.indices);
    setLData(tData);
    setLabels(tLabels);
    setUser(pData.user);
  }, []);

  // useEffect(()=>{
  //   testData = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "Growth %",
  //         data: lData,
  //         borderColor: "rgb(255, 99, 132)",
  //         backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       },
  //     ],
  //   };
  // }, [lData])

  return (
    <div className={styles.con}>
      <Sidebar />
      <div className={styles.innerCon}>
        <TopNav
          sectionName="Portfolio Breakdown"
          date={today.toLocaleDateString("en-US", options)}
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
                    tSum={tSum}
                  />
                ))}
            </div>
          </div>
          <div className="">
            <div className={styles.regCon}>
              {gen ? (
                <p>{test}</p>
              ) : (
                <div className={styles.flexSpace}>
                  <p>Do not like your portfolio? Create a new one </p>
                  <button
                    onClick={() => {
                      generatePortfolio();
                    }}
                  >
                    Regenerate Portfolio
                  </button>
                </div>
              )}
            </div>
            <div className={styles.sCon}>
              <p>
                This would have been your portfolio growth if you invested{" "}
                <strong>$250,000</strong> into our suggestion
              </p>
            </div>
            <div className={styles.sGrid}>
              <div className={styles.ssCon}>
                <p>Open Value</p>
                <p className={styles.value}>$250,000.00</p>
              </div>

              <div className={styles.ssCon}>
                <p>Close Value</p>
                <p className={styles.value}>${cValue}</p>
              </div>

              <div className={styles.ssCon}>
                <p>Reported Risk Level</p>
                {riskRange}
              </div>

              <div className={styles.ssCon}>
                <p>Portfolio Growth</p>
                <p
                  className={`${styles.tag} ${
                    growth > 0 ? styles.positive : styles.negative
                  }`}
                >
                  {growth}%
                </p>
              </div>
            </div>

            <div className={styles.sCCon}>
              {lData && (
                <Linechart lData={lData} labels={labels} options={options} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
