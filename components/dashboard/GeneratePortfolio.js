import React from "react";
import styles from "../../styles/dashboard/components/Recommendation.module.css";

const GeneratePortfolio = ({ user, setGenerating }) => {
  const cAge = (dob) => {
    dob = new Date(dob);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };
  const generatePortfolio = async () => {
    let age = cAge(user.dob);
    let payload = {
      age,
      net_worth: user.netWorth,
      salary: user.salary,
      reported_risk: user.riskRating,
      userId: user.id,
    };
    try {
      let res = await fetch("../api/dashboard/generate", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      let data = await res.json();
      console.log(data);
      setGenerating(true);
    } catch (error) {}
  };

  return (
    <div className={styles.genCon}>
      <svg
        width="130"
        height="130"
        viewBox="0 0 130 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="65" cy="65" r="65" fill="#EDEBFC" />
        <path
          d="M69.5607 108.78C93.6433 106.362 111.206 84.8787 108.787 60.7962C106.369 36.7136 84.8857 19.1513 60.8031 21.5697C36.7205 23.988 19.1582 45.4713 21.5766 69.5538C23.9949 93.6364 45.4782 111.199 69.5607 108.78Z"
          fill="#4C35E6"
        />
        <path
          opacity="0.1"
          d="M69.5541 108.781C62.7115 109.468 55.8032 108.535 49.3879 106.058C42.9726 103.581 37.2303 99.6282 32.6255 94.5204C28.0207 89.4126 24.6826 83.2928 22.8811 76.6559C21.0796 70.0191 20.8653 63.0514 22.2555 56.3163C23.6458 49.5812 26.6015 43.2679 30.8837 37.8868C35.166 32.5057 40.6545 28.2079 46.9054 25.341C53.1564 22.474 59.9943 21.1184 66.8662 21.3837C73.7381 21.6491 80.4511 23.5279 86.4624 26.8683C78.2895 22.7318 68.8996 21.6796 60.0139 23.9047C51.1282 26.1297 43.3421 31.483 38.0832 38.983C32.8243 46.483 30.4448 55.6272 31.3809 64.7393C32.3171 73.8514 36.5062 82.3208 43.1803 88.5948C49.8544 94.8688 58.5662 98.5271 67.7187 98.8989C76.8712 99.2708 85.8511 96.3313 93.0122 90.6193C100.173 84.9074 105.036 76.8058 106.708 67.7996C108.38 58.7935 106.75 49.4864 102.117 41.5845C106.149 47.8976 108.496 55.139 108.933 62.6172C109.371 70.0955 107.884 77.561 104.614 84.3009C101.345 91.0409 96.4027 96.8304 90.2592 101.117C84.1156 105.403 76.9759 108.043 69.5216 108.784L69.5541 108.781Z"
          fill="black"
        />
        <path
          d="M44.107 64.7866C47.4988 64.446 49.9722 61.4204 49.6316 58.0287C49.291 54.637 46.2654 52.1636 42.8736 52.5042C39.4819 52.8447 37.0085 55.8704 37.3491 59.2621C37.6897 62.6538 40.7153 65.1272 44.107 64.7866Z"
          fill="#121314"
        />
        <path
          d="M85.7523 60.6045C89.144 60.2639 91.6174 57.2383 91.2768 53.8466C90.9363 50.4548 87.9106 47.9814 84.5189 48.322C81.1272 48.6626 78.6538 51.6882 78.9944 55.08C79.335 58.4717 82.3606 60.9451 85.7523 60.6045Z"
          fill="#121314"
        />
        <path
          d="M73.38 53.762C73.6264 56.2154 72.888 58.6663 71.3274 60.5753C69.7667 62.4844 67.5116 63.6953 65.0582 63.9417C62.6047 64.1881 60.1539 63.4497 58.2448 61.8891C56.3357 60.3284 55.1248 58.0733 54.8784 55.6199L73.38 53.762Z"
          fill="#121314"
        />
        <path
          d="M71.9169 59.7644C71.1582 60.9296 70.1479 61.9098 68.9602 62.6328C67.7726 63.3558 66.438 63.8032 65.0545 63.9421C63.6711 64.081 62.2742 63.9079 60.9665 63.4355C59.6588 62.9631 58.4738 62.2033 57.4986 61.2123C59.3332 59.2893 61.7954 58.0863 64.4398 57.8207C67.0843 57.5552 69.7365 58.2446 71.9169 59.7644Z"
          fill="#DD6A57"
        />
      </svg>

      <h2>Welcome to foliolens</h2>
      <p>Please generate your new portfolio</p>
      <button
        onClick={() => {
          generatePortfolio();
        }}
      >
        Generate Portfolio
      </button>
    </div>
  );
};

export default GeneratePortfolio;
