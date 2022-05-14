import React, { useState, useEffect } from "react";
import styles from "../../styles/auth/Auth.module.css";
import Link from "next/link";
import { signIn, getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  let created = router.query;

  try {
    if (created.status) {
      created = true;
    } else {
      created = false;
    }
  } catch (error) {
    created = false;
  }

  let url = "";

  useEffect(() => {
    url = `${window.location.origin}/dashboard`;
    if (session) {
      router.push(url);
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}/dashboard`,
    });
    console.log(res);
    if (res.url) router.push(res.url);
  };

  const handleChange = (e) => {
    return e.target.value;
  };

  if (!session) {
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
                d="M112.445 61.1793C110.186 47.4555 101.037 37.5306 92.0011 39.0053C90.9233 39.1785 89.8861 39.5167 88.9196 39.9875L77.4813 45.0933C79.3302 48.389 80.7067 52.2989 81.4126 56.574C83.6498 70.1734 78.2089 82.3711 69.2548 83.8349C68.9887 83.8863 68.7118 83.9161 68.443 83.9377L68.3615 83.9486L55.3105 85.7804L53.5864 86.0158C53.8742 86.63 54.2027 87.2226 54.5312 87.7962C55.5005 89.4603 56.5811 90.962 57.7513 92.2689C58.9133 93.565 60.6536 94.19 62.3804 93.9492L79.6261 91.5519L99.2801 88.8082L99.3615 88.7974C99.6276 88.7757 99.9045 88.7459 100.173 88.6945C109.209 87.2118 114.704 74.9004 112.445 61.1793ZM99.0846 82.022C93.3342 82.9528 87.3367 75.585 85.686 65.5465C84.0353 55.508 87.3585 46.614 93.1007 45.6724C98.8511 44.7308 104.849 52.1095 106.499 62.148C108.142 72.1892 104.824 81.0831 99.0846 82.022Z"
                fill="#4C35E6"
              />
              <path
                d="M80.8698 58.3223C80.0797 53.5222 78.4453 49.174 76.2597 45.6321C72.2143 39.0408 66.301 35.185 60.4258 36.1456C59.3479 36.3187 58.3108 36.657 57.3442 37.1278L47.6951 41.4273L37.2124 46.1029L23.8627 52.0502C22.1061 52.8376 20.6997 54.2717 20.0318 56.071C18.2752 60.8197 17.7322 66.7129 18.7476 72.9038C19.744 79.0135 22.1251 84.3845 25.2473 88.316C26.5315 89.9233 28.4402 90.873 30.452 90.9975H30.4927C30.9652 91.0191 31.4484 90.9975 31.9208 90.9352L48.0507 88.6948L54.5287 87.7938L67.702 85.9511L67.7834 85.9403C68.0495 85.9187 68.3264 85.8889 68.5952 85.8375C77.6362 84.3574 83.1287 72.0461 80.8698 58.3223ZM67.5119 79.1677C61.7615 80.0985 55.7641 72.7306 54.1133 62.6921C53.7115 60.2461 53.6002 57.8731 53.7631 55.6625C54.2247 48.7952 57.1813 43.5351 61.5253 42.8208C64.7589 42.2877 68.0767 44.3955 70.6423 48.1322C72.6433 51.0274 74.1963 54.9076 74.9239 59.2964C76.5692 69.3349 73.2515 78.2261 67.5119 79.1677Z"
                fill="#1A17A7"
              />
              <path
                d="M43.7605 48.1514C42.1994 52.8486 42.4356 57.9653 42.8971 62.9088C43.3587 67.8523 44.0157 72.8553 43.2473 77.7582C42.4763 82.6611 39.992 87.5613 35.7213 89.7719C34.0896 90.6107 32.3031 90.9895 30.4949 91.0003H30.4542C28.4424 90.8786 26.531 89.9261 25.2495 88.3189C22.2114 84.4929 19.8684 79.2842 18.8312 73.3586C18.8014 73.2043 18.7688 73.0609 18.7498 72.9094C17.7344 66.7185 18.2774 60.8253 20.034 56.0766C20.7019 54.2746 22.1083 52.8432 23.8649 52.0558L32.6208 48.1514L37.2119 46.1058L47.6945 41.4302C45.9596 43.3621 44.594 45.6458 43.7605 48.1514Z"
                fill="#3720D2"
              />
              <path
                d="M32.7131 60.2677C31.942 65.1706 29.4578 70.0708 25.1871 72.2814C23.5554 73.1202 21.7689 73.499 19.9607 73.5098H19.92C19.5507 73.4882 19.1896 73.4395 18.8312 73.3556C18.8014 73.2014 18.7688 73.058 18.7498 72.9064C17.7344 66.7156 18.2774 60.8224 20.034 56.0737C20.7019 54.2716 22.1083 52.8403 23.8649 52.0529L32.6208 48.1511C33.0199 52.2044 33.3403 56.2658 32.7131 60.2677Z"
                fill="#4C35E6"
              />
            </svg>

            {/* <div>
            <span></span>
            <span></span>
            <span></span>
          </div> */}
          </div>
          <h1>Welcome Back!</h1>
          {created ? (
            <p className={`${styles.subtitle} ${styles.success}`}>
              Your account has been created successfully, please login
            </p>
          ) : (
            <p className={styles.subtitle}>Login to continue using Foliolens</p>
          )}

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(handleChange(e));
              }}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(handleChange(e));
              }}
            />

            <div className={styles.submit}>
              <input type="submit" value="Login" className={styles.btn} />
            </div>
          </form>

          <p className={styles.instead}>
            Have an account?{" "}
            <Link href={"/auth/signup"}>
              <a>Sign up</a>
            </Link>{" "}
            instead
          </p>
        </div>
      </div>
    );
  }
  return <div></div>;
  //
}
