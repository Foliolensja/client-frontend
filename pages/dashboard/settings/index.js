import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "../../../components/global/Sidebar";
import { TopNav } from "../../../components/global/TopNav";
import styles from "../../../styles/settings/Settings.module.css";
import { useState, useEffect } from "react";
import { useSession, getCsrfToken } from "next-auth/react";
import Router, { useRouter } from "next/router";

export default function Settings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [salary, setSalary] = useState(0);
  const [networth, setNetworth] = useState(0);
  const [risk, setRisk] = useState(5);
  const [mode, setMode] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(async () => {
    let res = await fetch("../api/user/me");
    let pData = await res.json();
    let user = pData.user;

    console.log(pData);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setDob(user.dob?.substring(0, 10));
    setNetworth(user.netWorth);
    setSalary(user.salary);
    setRisk(user.riskRating);
  }, []);

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();

  return (
    <div className={styles.con}>
      <Sidebar />
      <div className={styles.innerCon}>
        <TopNav
          sectionName="Portfolio"
          date={today.toLocaleDateString("en-US", options)}
          username={"name"}
        />
        <div className={styles.cFlex}>
          <div className={styles.sCon}>
            <div className={`${styles.section_tab}`}>
              <span className={`${styles.section_sel} ${styles.bl}`}>
                Profile Info
              </span>
              <span className={`${styles.section_sel}`}>Change Password</span>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`${styles.form}`}
            >
              {/* <div> */}
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  onChange={() => setMode(!mode)}
                  value={!mode}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
              {/* </div> */}
              <fieldset disabled={mode}>
                <label htmlFor="">First name</label>
                {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required={true}
                />
                <label>Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  required={true}
                />

                <label>Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  required={true}
                />
                <label>Networth</label>
                <input
                  type="number"
                  value={networth}
                  onChange={(e) => setNetworth(e.target.value)}
                  required={true}
                />
                <label>Salary</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required={true}
                />
                <label>Risk Appetite</label>
                <p className={styles.sublabel}>
                  How much risk are you willing to take
                </p>
                <div className={styles.flex}>
                  <p>Very Low</p>
                  <div className={` ${styles.w_c}`}>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={risk}
                      onChange={(e) => {
                        setRisk(e.target.value);
                      }}
                      required={true}
                    />
                  </div>
                  <p>Very High</p>
                </div>
                <div className={styles.submit}>
                  <input type="submit" value="Sign Up" className={styles.btn} />
                </div>
              </fieldset>
            </form>

            {/* Form end */}
          </div>
        </div>
      </div>
    </div>
  );
}
