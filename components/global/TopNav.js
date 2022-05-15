import Link from "next/link";
import React from "react";
import styles from "../../styles/global_components/TopNav.module.css";
import { signOut } from "next-auth/react";

export const TopNav = ({ sectionName, date, username }) => {
  return (
    <div className={styles.con}>
      <span className={styles.flexCon}>
        <h1>{sectionName}</h1>
        <p className={styles.date}>{date}</p>
      </span>

      <span className={styles.spanCon}>
        <p>Hi {username}</p>
        <span>
          <button
            className={styles.btn}
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}`,
              })
            }
          >
            Sign out
          </button>
        </span>
      </span>
    </div>
  );
};
