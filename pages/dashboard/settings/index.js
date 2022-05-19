import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "../../../components/global/Sidebar";
import { TopNav } from "../../../components/global/TopNav";
import styles from "../../../styles/settings/Settings.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Settings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [salary, setSalary] = useState(0);
  const [networth, setNetworth] = useState(0);
  const [risk, setRisk] = useState(0);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [mode, setMode] = useState(true);
  const [sent, setSent] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [generating, setGenerating] = useState(true);
  const [active, setActive] = useState(true);

  const { data: session } = useSession();

  useEffect(async () => {
    let res = await fetch("../api/user/me");
    let pData = await res.json();
    let user = pData.user;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setDob(user.dob?.substring(0, 10));
    setNetworth(user.netWorth);
    setSalary(user.salary);
    setRisk(user.riskRating);
    setEmail(user.email);
    setId(user.id);
  }, []);

  useEffect(async () => {
    let res = await fetch("../api/user/me");
    let pData = await res.json();
    let user = pData.user;
    if (sent) {
      if (user.updated) {
        setUpdated(true);
        setGenerating(false);
      }
    }
  }, [sent]);

  const cAge = (dob) => {
    dob = new Date(dob);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const generatePortfolio = async () => {
    let uAge = cAge(dob);
    let payload = {
      age: uAge,
      net_worth: networth,
      salary: salary,
      reported_risk: risk,
      userId: id,
    };
    try {
      let res = await fetch("../api/dashboard/generate", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      let data = await res.json();

      setGenerating(true);
      setSent(false);
    } catch (error) {}
  };

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let person = {
      email,
      firstName,
      lastName,
      dob,
      salary: parseFloat(salary),
      netWorth: parseFloat(networth),
      riskRating: parseInt(risk),
      id,
    };

    try {
      let res = await fetch("../api/user/updateme", {
        method: "POST",
        body: JSON.stringify(person),
      });
      let data = await res.json();
    } catch (error) {}

    setSent(true);
  };

  return (
    <div className={styles.con}>
      <Sidebar />
      <div className={styles.innerCon}>
        <TopNav
          sectionName="Portfolio"
          date={today.toLocaleDateString("en-US", options)}
          username={firstName}
        />
        <div className={styles.cFlex}>
          <div className={styles.sCon}>
            <div className={`${styles.section_tab}`}>
              <span
                className={`${styles.section_sel} ${styles.bl} ${
                  active ? styles.active : ""
                }`}
                onClick={() => {
                  setActive(!active);
                }}
              >
                Profile Info
              </span>
              {/* <span
                className={`${styles.section_sel}  ${
                  active ? "" : styles.active
                }`}
                onClick={() => {
                  setActive(!active);
                }}
              >
                Change Password
              </span> */}
            </div>
            {/* Profile Info Tab */}

            {active && (
              <div>
                {updated && !generating && (
                  <div className={styles.topFlex}>
                    <p>
                      Seems you have recently updated your portfolio, you do
                      want to regenerate your portfolio
                    </p>
                    <button
                      onClick={() => {
                        generatePortfolio();
                      }}
                    >
                      Regenerate Portfolio
                    </button>
                  </div>
                )}

                {/* Form */}
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className={`${styles.form}`}
                >
                  <div className={styles.flex_con}>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        onChange={() => setMode(!mode)}
                        value={!mode}
                      />
                      <span
                        className={`${styles.slider} ${styles.round}`}
                      ></span>
                    </label>
                    <p>Enable editing</p>
                  </div>
                  {sent && (
                    <div className={styles.status}>
                      <p>Your profile has been successfully updated</p>
                    </div>
                  )}
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
                    <label>Net Worth</label>
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
                    <p>Risk Level: {risk}</p>
                    <div className={styles.flex}>
                      <p>Very Low</p>
                      <div className={` ${styles.w_c}`}>
                        <input
                          type="range"
                          min={0}
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
                      <input
                        type="submit"
                        value="Update"
                        className={styles.btn}
                      />
                    </div>
                  </fieldset>
                </form>
              </div>
            )}
            {/* Form end */}
          </div>
        </div>
      </div>
    </div>
  );
}
