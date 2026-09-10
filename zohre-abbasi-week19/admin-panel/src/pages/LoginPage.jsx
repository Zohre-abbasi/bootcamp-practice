import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

import styles from "./LoginPage.module.css"
function LoginPage() {
  return (
    <div className={styles.page}>
      <h1>بوت کمپ بوت استارت</h1>
      <div className={styles.login}>
        <div className={styles.header}>
          <img src={logo} alt="logo" />
          <h3>فرم ورود</h3>
        </div>
        <div className={styles.inputs}>
          <input type="text" placeholder="نام کاربری" />
          <input type="password" placeholder="رمز عبور" />
        </div>
        <button>ورود</button>
        <p>
          <Link to="/register">ایجاد حساب کاربری!</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
