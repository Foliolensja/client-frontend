import React, { useEffect, useState } from "react";
import { MIndex } from "./MIndex";
import styles from "../../styles/dashboard/components/Indices.module.css";

export const Indices = ({ date }) => {
  const [indices, setIndices] = useState(null);
  const [indexNames, setIndexNames] = useState([]);

  useEffect(async () => {
    let res = await fetch(`../api/dashboard/indices`, {
      method: "POST",
      body: JSON.stringify({ date: date }),
    });
    let pData = await res.json();
    setIndices(pData.indices);
  }, [date]);

  useEffect(() => {
    if (indices != null && typeof indices === "object") {
      setIndexNames(Object.keys(indices.index_info));
    }
  }, [indices]);

  // console.log(indices);

  return (
    <div className={styles.con}>
      <h2>Indices</h2>
      <div className={styles.innerCon}>
        {indices ? (
          indexNames.map((index) => {
            return (
              <MIndex
                index={indices.index_info[index]}
                key={index}
                name={index}
              />
            );
          })
        ) : (
          <p>No Indices data is available for {date}</p>
        )}
      </div>
    </div>
  );
};
