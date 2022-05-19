import React, { useEffect, useState } from "react";
import { Indices } from "../../components/dashboard/Indices";
import { Sidebar } from "../../components/global/Sidebar";
import { TopNav } from "../../components/global/TopNav";
import { Recommendation } from "../../components/dashboard/Recommendation";
import { JSESummary } from "../../components/dashboard/JSESummary";
import { MarketActivity } from "../../components/dashboard/MarketActivity";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/Dashboard.module.css";

const Dashboard = () => {
  const { data: session } = useSession();
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    let url = `${window.location.origin}/auth/login`;
    if (!session) {
      router.push(url);
    }
  }, [session]);

  useEffect(async () => {
    let res = await fetch("../api/user/me");
    let pData = await res.json();

    let dateRes = await fetch("../api/dashboard/date");
    let dateData = await dateRes.json();

    setDate(dateData);
    setName(pData.user.firstName);
  }, []);

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();

  if (session) {
    return (
      <div className={styles.con}>
        <Sidebar />
        <div className={styles.innerCon}>
          <TopNav
            sectionName="Portfolio"
            date={today.toLocaleDateString("en-US", options)}
            username={name}
          />
          <Indices date={date?.date} />
          <div className={styles.cFlex}>
            <div className={styles.lFlex}>
              <Recommendation />
              <JSESummary date={date?.date} />
            </div>
            <MarketActivity date={date?.date} />
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Dashboard;
