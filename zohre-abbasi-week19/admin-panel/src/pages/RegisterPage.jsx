import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

import styles from "./RegisterPage.module.css"

function RegisterPage() {
  return (
    <div className={styles.page}>
      <h1>بوت کمپ بوت استارت</h1>
      <div className={styles.register}>
        <div className={styles.header}>
          <img src={logo} alt="logo" />
          <h3>فرم ثبت نام</h3>
        </div>
        <div className={styles.inputs}>
          <input type="text" placeholder="نام کاربری" />
          <input type="password" placeholder="رمز عبور" />
          <input type="password" placeholder="تکرار رمز عبور" />
        </div>
        <button>ثبت نام</button>
        <p>
          <Link to="/login">حساب کاربری دارید؟</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
