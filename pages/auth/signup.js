import Link from "next/link";
import { useState, useEffect } from "react";
import StepOne from "../../components/auth/StepOne";
import StepThree from "../../components/auth/StepThree";
import StepTwo from "../../components/auth/StepTwo";
import styles from "../../styles/auth/Auth.module.css";
import { useSession, getCsrfToken } from "next-auth/react";
import Router, { useRouter } from "next/router";

export default function Login({ csrfToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [salary, setSalary] = useState(0);
  const [networth, setNetworth] = useState(0);
  const [risk, setRisk] = useState(5);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  // useEffect(() => {
  //   console.log(risk);
  // }, [risk]);
  useEffect(() => {
    let url = `${window.location.origin}/dashboard`;
    if (session) {
      router.push(url);
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      console.log("Password not the same");
      setError(true);
      setErrorText("Password and Confirm Password not the same");
    } else if (Number.parseFloat(networth) < Number.parseFloat(salary)) {
      console.log("Your net worth cannot be less than your average salary");
      setError(true);
      setErrorText("Your net worth cannot be less than your annual salary");
    } else if (networth == 0) {
      console.log("Your net worth cannot be 0 dollars");
      setError(true);
      setErrorText("Your net worth cannot be 0 dollars");
    } else if (salary == 0) {
      console.log("Your salary cannot be 0 dollars");
      setError(true);
      setErrorText("Your salary cannot be 0 dollars");
    } else {
      let person = {
        email,
        password,
        firstName,
        lastName,
        dob,
        salary: parseFloat(salary),
        netWorth: parseFloat(networth),
        riskRating: parseInt(risk),
      };

      console.log(person.email);
      // let res = await fetch("../api/auth/signup", {method: "POST", body})
      try {
        let res = await fetch("../api/auth/signup", {
          method: "POST",
          body: JSON.stringify(person),
        });
        let data = await res.json();
        console.log(data);
        if (data?.status == "Credentials taken") {
          setError(true);
          setErrorText("Email already taken");
          return;
        }
        router.push({
          pathname: "/auth/login",
          query: {
            status: "user_created",
          },
        });
      } catch (error) {}
    }
  };

  return (
    <div className={styles.container}>
      <nav>
        <svg
          width="144"
          height="24"
          viewBox="0 0 144 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M57.6065 3.16051V5.40636H51.4503V10.7118H57.6065V12.9577H51.4503V20.5198H49.1869V3.16051H57.6065Z"
            fill="#4C35E6"
          />
          <path
            d="M65.6871 8.44424C67.4074 8.44424 68.8726 9.0482 70.0827 10.2561C71.3001 11.464 71.9088 12.9215 71.9088 14.6285C71.9088 16.3355 71.3001 17.7929 70.0827 19.0008C68.8726 20.2088 67.4074 20.8127 65.6871 20.8127C63.974 20.8127 62.5088 20.2088 61.2914 19.0008C60.074 17.7929 59.4653 16.3355 59.4653 14.6285C59.4653 12.9215 60.074 11.464 61.2914 10.2561C62.5088 9.0482 63.974 8.44424 65.6871 8.44424ZM65.6871 10.7552C64.6082 10.7552 63.686 11.1349 62.9206 11.8944C62.1625 12.6539 61.7834 13.5652 61.7834 14.6285C61.7834 15.699 62.1625 16.6103 62.9206 17.3626C63.686 18.1148 64.6082 18.4909 65.6871 18.4909C66.7659 18.4909 67.6844 18.1148 68.4426 17.3626C69.208 16.6103 69.5907 15.699 69.5907 14.6285C69.5907 13.5652 69.208 12.6539 68.4426 11.8944C67.6844 11.1349 66.7659 10.7552 65.6871 10.7552Z"
            fill="#4C35E6"
          />
          <path
            d="M76.8074 3.14966V20.5198H74.5331V3.14966H76.8074Z"
            fill="#4C35E6"
          />
          <path
            d="M82.5371 9.3556V20.5198H80.2737V9.3556H82.5371ZM81.3999 4.76624C81.8373 4.76624 82.2127 4.91813 82.5262 5.22192C82.8396 5.52571 82.9964 5.89821 82.9964 6.33943C82.9964 6.78064 82.8396 7.15314 82.5262 7.45693C82.2127 7.76072 81.8373 7.91261 81.3999 7.91261C80.9698 7.91261 80.5981 7.76072 80.2846 7.45693C79.9712 7.15314 79.8144 6.78064 79.8144 6.33943C79.8144 5.89821 79.9712 5.52571 80.2846 5.22192C80.5981 4.91813 80.9698 4.76624 81.3999 4.76624Z"
            fill="#4C35E6"
          />
          <path
            d="M91.58 8.44424C93.3003 8.44424 94.7656 9.0482 95.9756 10.2561C97.193 11.464 97.8017 12.9215 97.8017 14.6285C97.8017 16.3355 97.193 17.7929 95.9756 19.0008C94.7656 20.2088 93.3003 20.8127 91.58 20.8127C89.8669 20.8127 88.4017 20.2088 87.1843 19.0008C85.9669 17.7929 85.3582 16.3355 85.3582 14.6285C85.3582 12.9215 85.9669 11.464 87.1843 10.2561C88.4017 9.0482 89.8669 8.44424 91.58 8.44424ZM91.58 10.7552C90.5011 10.7552 89.579 11.1349 88.8135 11.8944C88.0554 12.6539 87.6763 13.5652 87.6763 14.6285C87.6763 15.699 88.0554 16.6103 88.8135 17.3626C89.579 18.1148 90.5011 18.4909 91.58 18.4909C92.6588 18.4909 93.5773 18.1148 94.3355 17.3626C95.1009 16.6103 95.4836 15.699 95.4836 14.6285C95.4836 13.5652 95.1009 12.6539 94.3355 11.8944C93.5773 11.1349 92.6588 10.7552 91.58 10.7552Z"
            fill="#4C35E6"
          />
          <path
            d="M100.426 20.5198V3.16051H102.689V18.2631H108.944V20.5198H100.426Z"
            fill="#4C35E6"
          />
          <path
            d="M114.378 17.9918C114.757 18.3246 115.446 18.4909 116.445 18.4909C117.524 18.4909 118.446 18.1148 119.211 17.3626C119.306 17.2613 119.499 17.0371 119.791 16.6899L122.054 17.4928C121.5 18.2522 121.099 18.7549 120.852 19.0008C119.634 20.2088 118.165 20.8127 116.445 20.8127C114.732 20.8127 113.267 20.2088 112.049 19.0008C110.832 17.7929 110.223 16.3355 110.223 14.6285C110.223 12.9215 110.832 11.464 112.049 10.2561C113.267 9.0482 114.732 8.44424 116.445 8.44424C117.918 8.44424 119.208 8.88545 120.316 9.76788C120.498 9.91978 120.677 10.0825 120.852 10.2561C120.925 10.3284 121.132 10.5563 121.475 10.9396L120.338 12.0788L114.378 17.9918ZM118.162 11.0481C117.907 10.8528 117.334 10.7552 116.445 10.7552C115.373 10.7552 114.455 11.1349 113.69 11.8944C112.931 12.6466 112.552 13.558 112.552 14.6285C112.552 15.5037 112.651 16.0715 112.848 16.3319L118.162 11.0481Z"
            fill="#4C35E6"
          />
          <path
            d="M126.953 12.3501V20.5198H124.679V9.3556H126.953V10.6575C127.427 9.38453 128.378 8.74802 129.807 8.74802C131.024 8.74802 131.99 9.17839 132.705 10.0391C133.426 10.8926 133.798 11.9667 133.82 13.2614V20.5198H131.557V13.3482C131.557 12.7045 131.32 12.1548 130.846 11.6991C130.372 11.2362 129.807 11.0047 129.151 11.0047C128.502 11.0047 127.941 11.229 127.467 11.6774C127.205 11.945 127.033 12.1692 126.953 12.3501Z"
            fill="#4C35E6"
          />
          <path
            d="M139.112 17.4168C139.178 17.7495 139.28 17.9846 139.418 18.122C139.688 18.3824 140.009 18.5126 140.381 18.5126C140.752 18.5126 141.07 18.3824 141.332 18.122C141.602 17.8616 141.737 17.5398 141.737 17.1564C141.737 16.7875 141.605 16.4729 141.343 16.2125C141.161 16.0317 140.771 15.7532 140.173 15.3771C139.356 14.9359 138.777 14.5453 138.434 14.2053C137.837 13.6122 137.538 12.8998 137.538 12.068C137.538 11.229 137.837 10.5129 138.434 9.91978C139.032 9.31943 139.754 9.01926 140.599 9.01926C141.445 9.01926 142.148 9.30135 142.71 9.86553C143.111 10.2633 143.366 10.7082 143.475 11.2L141.277 11.8293C141.226 11.6485 141.175 11.5291 141.124 11.4713C140.993 11.3411 140.818 11.276 140.599 11.276C140.381 11.276 140.191 11.3555 140.031 11.5147C139.878 11.6666 139.801 11.851 139.801 12.068C139.801 12.285 139.878 12.4694 140.031 12.6213C140.169 12.7515 140.483 12.9721 140.971 13.2831C141.875 13.775 142.531 14.2234 142.939 14.6285C143.646 15.3373 144 16.18 144 17.1564C144 18.1546 143.646 19.0081 142.939 19.7169C142.24 20.4185 141.387 20.7693 140.381 20.7693C139.382 20.7693 138.529 20.4149 137.822 19.7061C137.334 19.2215 137.013 18.6175 136.86 17.8942L139.112 17.4168Z"
            fill="#4C35E6"
          />
          <path
            d="M38.9816 10.419C38.0469 4.74028 34.2609 0.633477 30.5221 1.24368C30.0761 1.31533 29.6469 1.45529 29.247 1.6501L24.5139 3.76284C25.279 5.12655 25.8485 6.74442 26.1406 8.51343C27.0664 14.1407 24.815 19.188 21.1099 19.7937C20.9998 19.815 20.8852 19.8273 20.774 19.8363L20.7402 19.8407L15.3399 20.5987L14.6265 20.6961C14.7455 20.9503 14.8815 21.1955 15.0174 21.4328C15.4185 22.1214 15.8656 22.7428 16.3498 23.2836C16.8307 23.8199 17.5508 24.0785 18.2653 23.9789L25.4014 22.9869L33.534 21.8516L33.5677 21.8471C33.6778 21.8382 33.7924 21.8258 33.9036 21.8046C37.6425 21.191 39.9163 16.0967 38.9816 10.419ZM33.4531 19.0436C31.0737 19.4287 28.592 16.38 27.9089 12.2261C27.2259 8.0723 28.601 4.39208 30.9771 4.00244C33.3565 3.61281 35.8382 6.66604 36.5213 10.8199C37.201 14.9748 35.8281 18.655 33.4531 19.0436Z"
            fill="#4C35E6"
          />
          <path
            d="M25.9161 9.23682C25.5891 7.2506 24.9128 5.45135 24.0085 3.98576C22.3345 1.25834 19.8877 -0.337133 17.4565 0.0603354C17.0105 0.131992 16.5814 0.271946 16.1814 0.466761L12.1887 2.24585L7.85109 4.18057L2.32712 6.64152C1.60025 6.96733 1.0183 7.56074 0.741936 8.30529C0.0150678 10.2702 -0.209621 12.7088 0.210547 15.2705C0.622851 17.7986 1.60811 20.0211 2.90007 21.6479C3.43146 22.313 4.22124 22.706 5.05371 22.7575H5.07057C5.26605 22.7664 5.46602 22.7575 5.6615 22.7317L12.3359 21.8047L15.0164 21.4318L20.4674 20.6694L20.5011 20.6649C20.6112 20.6559 20.7258 20.6436 20.837 20.6223C24.578 20.0099 26.8508 14.9156 25.9161 9.23682ZM20.3887 17.8625C18.0093 18.2476 15.5276 15.1989 14.8445 11.045C14.6783 10.0329 14.6322 9.05097 14.6996 8.13623C14.8906 5.29461 16.114 3.11805 17.9115 2.82246C19.2496 2.6019 20.6224 3.47409 21.6841 5.0203C22.512 6.2183 23.1546 7.82385 23.4557 9.63989C24.1365 13.7937 22.7637 17.4728 20.3887 17.8625Z"
            fill="#1A17A7"
          />
          <path
            d="M10.5608 5.02823C9.91483 6.97191 10.0126 9.08913 10.2036 11.1347C10.3945 13.1803 10.6664 15.2505 10.3485 17.2792C10.0294 19.308 9.00147 21.3356 7.23429 22.2504C6.5591 22.5975 5.81988 22.7542 5.07166 22.7587H5.05481C4.22234 22.7083 3.43144 22.3142 2.90117 21.6491C1.64404 20.066 0.674505 17.9107 0.245349 15.4587C0.232991 15.3949 0.21951 15.3355 0.211646 15.2728C-0.208522 12.7111 0.0161665 10.2726 0.743035 8.30763C1.0194 7.56195 1.60135 6.96967 2.32821 6.64386L5.95132 5.02823L7.85106 4.18179L12.1887 2.24707C11.4708 3.04649 10.9057 3.99145 10.5608 5.02823Z"
            fill="#3720D2"
          />
          <path
            d="M5.98952 10.0418C5.67046 12.0705 4.64251 14.0982 2.87533 15.0129C2.20014 15.36 1.46092 15.5168 0.712702 15.5212H0.69585C0.543061 15.5123 0.393644 15.4921 0.245349 15.4574C0.232991 15.3936 0.21951 15.3343 0.211646 15.2716C-0.208522 12.7099 0.0161665 10.2713 0.743035 8.30635C1.0194 7.56068 1.60135 6.96839 2.32821 6.64258L5.95132 5.02808C6.11647 6.70528 6.24903 8.38585 5.98952 10.0418Z"
            fill="#4C35E6"
          />
        </svg>

        <div>
          <Link href={"/auth/login"}>
            <a className={styles.o_btn}>Login</a>
          </Link>
          <Link href={"/auth/signup"}>
            <a className={styles.btn}>Sign Up</a>
          </Link>
        </div>
      </nav>
      <div className={styles.p_bg}></div>
      <div className={styles.con}>
        <div className={styles.img_con}>
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

          <div>
            <span className={styles.active}></span>
            <span className={styles.active}></span>
            <span className={styles.active}></span>
          </div>
        </div>

        {error && <p className={styles.errorStatus}>{errorText}</p>}

        {/* Steps */}
        {/* <StepOne />
        <StepTwo />
        <StepThree /> */}

        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="">First name</label>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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

          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required={true}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required={true}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            value={cPassword}
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
            required={true}
          />

          <div className={styles.submit}>
            <input type="submit" value="Sign Up" className={styles.btn} />
          </div>
        </form>

        {/* Steps End */}

        <p className={styles.instead}>
          Have an account?{" "}
          <Link href={"/auth/login"}>
            <a>Login</a>
          </Link>{" "}
          instead
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
