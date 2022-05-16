import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "../../../components/global/Sidebar";
import { TopNav } from "../../../components/global/TopNav";
import styles from "../../../styles/settings/Settings.module.css";

export default function Settings() {
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
      </div>
    </div>
  );
}
