import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import api from "../services/config";

import styles from "./LoginPage.module.css";

const schema = yup.object({
  username: yup.string().required("نام کاربری الزامی است"),
  password: yup.string().required("رمز عبور الزامی است"),
});

function LoginPage() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setLoginError("");
      const response = await api.post("auth/login", {
        username: data.username,
        password: data.password,
      });
      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/products");
    } catch (error) {
      console.log("Login error:", error);

      if (error.response?.status === 400) {
        setLoginError("نام کاربری یا رمز عبور اشتباه هست");
      } else {
        navigate("خطایی در ورود رخ داد");
      }
    }
  };

  return (
    <div className={styles.page}>
      <h1>بوت کمپ بوت استارت</h1>
      <div className={styles.login}>
        <div className={styles.header}>
          <img src={logo} alt="logo" />
          <h3>فرم ورود</h3>
        </div>
        <div className={styles.inputs}>
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username")}
          />
          {errors.username && <span>{errors.username.message}</span>}
          <input
            type="password"
            placeholder="رمز عبور"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
          {loginError && <span>{loginError}</span>}
        </div>
        <button onClick={handleSubmit(onSubmit)}>ورود</button>
        <p>
          <Link to="/register">ایجاد حساب کاربری!</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
