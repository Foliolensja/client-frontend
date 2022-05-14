import React from "react";
import styles from "../../styles/auth/Auth.module.css";

const StepTwo = ({ name }) => {
  const handleChange = (e) => {
    setRisk(e.target.value);
  };

  return (
    <div>
      <h1>Hi {name}</h1>
      <p className={styles.subtitle}>
        Now let's learn a bit more about you and how you invest
      </p>

      <form action="">
        <label htmlFor="">Date of Birth</label>
        <input type="date" name="" id="" />
        <label>Networth</label>
        <input type="number" name="" id="" />
        <label>Salary</label>
        <input type="number" name="" id="" />
        <label>Risk Appetite</label>
        <p className={styles.sublabel}>How much risk are you willing to take</p>
        <div className={styles.flex}>
          <p>Very Low</p>
          <div className={`${styles.flex} ${styles.w_c}`}>
            <input type="radio" value={1} name="test" />
            <input type="radio" value={2} name="test" />
            <input type="radio" value={3} name="test" />
            <input type="radio" value={4} name="test" />
            <input type="radio" value={5} name="test" />
          </div>
          <p>Very High</p>
        </div>

        <div className={styles.submit}>
          <input type="submit" value="Continue" className={styles.btn} />
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
