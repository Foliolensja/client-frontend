import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard/components/Recommendation.module.css";
const PortfolioGen = ({ user, setUser }) => {
  const [gen, isGen] = useState(true);
  const [test, setTest] = useState(
    "Portfolio is generating. This process usually takes around 3-5 minutes. Please wait"
  );

  useEffect(() => {
    let i = 0;
    let dots = ".";
    let seconds = 0;

    setInterval(async () => {
      if (seconds % 30 == 0) {
        let res = await fetch("../api/user/me");
        let pData = await res.json();

        let testUser = pData.user;
        if (testUser?.generating === false) {
          setUser(pData.user);
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
  }, []);

  return (
    <div className={styles.flexCon}>
      <div>
        <div className={styles.loader}></div>
      </div>
      {test}
    </div>
  );
};

export default PortfolioGen;
