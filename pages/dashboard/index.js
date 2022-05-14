import React, { useEffect, useState } from "react";
import { Indices } from "../../components/dashboard/Indices";
import { Sidebar } from "../../components/global/Sidebar";
import { TopNav } from "../../components/global/TopNav";
import { Recommendation } from "../../components/dashboard/Recommendation";
import { JSESummary } from "../../components/dashboard/JSESummary";
import { MarketActivity } from "../../components/dashboard/MarketActivity";
import { useSession, signIn, signOut, getToken } from "next-auth/react";
import { useRouter } from "next/router";

import styles from "../../styles/dashboard/Dashboard.module.css";
console.log("help");
const Dashboard = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    let url = `${window.location.origin}/auth/login`;
    if (!session) {
      router.push(url);
    }
  }, [session]);

  useEffect(async () => {
    let res = await fetch("../api/user/me");
    let pData = await res.json();
    setName(pData.user.firstName);
  }, []);

  // const token = await getToken({ req, secret });
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();

  // console.log(session);
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
          <Indices date={"2022-05-04"} />
          {/* <button onClick={() => signOut()}>Sign out</button> */}
          <div className={styles.cFlex}>
            <div className={styles.lFlex}>
              <Recommendation />
              <JSESummary date={"2022-05-04"} />
            </div>
            <MarketActivity date={"2022-05-04"} />
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Dashboard;
