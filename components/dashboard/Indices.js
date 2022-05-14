import React, { useEffect, useState } from "react";
import { MIndex } from "./MIndex";
import styles from "../../styles/dashboard/components/Indices.module.css";

export const Indices = ({ date }) => {
  const [indices, setIndices] = useState(null);
  const [indexNames, setIndexNames] = useState([]);
  useEffect(async () => {
    let res = await fetch(
      `https://foliolens-backend.herokuapp.com/indices/${date}`
    );
    if (res.ok) {
      if (date) {
        try {
          let data = await res.json();
          console.log(date);
          setIndices(data);
        } catch (error) {
          console.log("Can't find data");
          setIndices(null);
        }
      } else {
        setIndices(null);
      }
    } else {
    }
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
