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

const cAge = (dob)=>{
  dob = new Date(dob)
  var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}


const Track = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [name, setName] = useState("");
  const [labels, setLabels] = useState([])
  const [lData, setLData] = useState([])
  const [cValue, setCValue] = useState("")
  const [riskRange, setRiskRange] = useState("")
  const [growth, setGrowth] = useState("")

  let testData = {}

  useEffect(async () => {
    let res = await fetch("../api/user/me");
    let pData = await res.json();
    console.log(pData.user);
    let trackerData = pData.user.tracker.dates;
    let tLabels = []
    let tData = []
    let nTest = []
    for (let i = 0; i < trackerData.length; i++) {
      tLabels.push(trackerData[i].date)
      // tData.push(trackerData[i].value)
      let x = (((trackerData[i].value)/(trackerData[0].value) - 1)*100)
      tData.push(x.toFixed(2))

      nTest.push(x)
      
    }
    let age = cAge(pData.user.dob);
    let risk = pData.user.riskRating 
    let networth = pData.user.netWorth
    let salary = pData.user.salary
    console.log(age, risk, networth, salary);
    let ageRisk = age < 100 ? age/100: 1
    let riskA = (10-risk)/10
    let nwIncome = salary/networth
    let riskLevel = (ageRisk + riskA + nwIncome)/3+ 0.5

    let hTag = <p className={`${styles.tag} ${styles.negative}`}>High</p>
    let mTag = <p className={`${styles.tag}`}>Moderate</p>
    let lTag = <p className={`${styles.tag} ${styles.positive}`}>Low</p>
    if(riskLevel > 1.1){
      setRiskRange(hTag)
    }else if(riskLevel > 0.7){
      setRiskRange(mTag)
    }else{
      setRiskRange(lTag)
    }
    setGrowth(nTest[nTest.length-1].toFixed(2))

    
    console.log(riskLevel);
    console.log((250000 *nTest[nTest.length-1] + 250000));
    let vTest = (250000 *(nTest[nTest.length-1]/100) + 250000)
    setCValue(vTest.toFixed(2))
    setName(pData.user.firstName);
    setPortfolio(pData.user.portfolio.indices);
    setLData(tData)
    setLabels(tLabels)
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
                <p className={`${styles.tag} ${growth > 0? styles.positive: styles.negative}`}>{growth}%</p>
              </div>
            </div>

            <div className={styles.sCCon}>
              {lData &&
              <Linechart lData={lData} labels={labels} options={options}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
