import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/images/logo.png";
import api from "../services/config";

import styles from "./RegisterPage.module.css";

const schema = yup.object({
  username: yup.string().required("نام کاربری الزامی هست"),
  password: yup
    .string()
    .required("رمز عبور الزامی هست")
    .min(6, "رمز عبور باید حداقل 6کاراکتر باشد"),
  confirmPassword: yup
    .string()
    .required("تکرار رمز عبور الزامی هست")
    .oneOf([yup.ref("password")], "رمز عبور و تکرار آن یکسان نیستند"),
});

function RegisterPage() {
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerError, setRegisterError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const onSubmit = async (data) => {
  //   console.log("form:", data);
  //   try {
  //     const response = await api.post("/auth/register", {
  //       username: data.username,
  //       password: data.password,
  //     });

  //     console.log("Register response:", response.data);

  //     alert("ثبت نام با موفقیت انجام شد");
  //   } catch (error) {
  //     console.log("Register error:", error);

  //     if (error.response?.status === 400) {
  //       alert("این نام کاربری قبلاً ثبت شده است");
  //     } else {
  //       alert("خطایی در ثبت نام رخ داد");
  //     }
  //   }
  // };
  // const onSubmit=(data)=>{
  //   console.log("data:",data)
  // }
  const onSubmit = async (data) => {
    try {
      setRegisterError("");
      setRegisterSuccess("");
      const response = await api.post("/auth/register", {
        username: data.username,
        password: data.password,
      });

      console.log("Register response:", response.data);

      setRegisterSuccess("ثبت نام با موفقیت انجام شد");
    } catch (error) {
      console.log("Register error:", error);

      if (error.response?.status === 400) {
        setRegisterError("این نام کاربری قبلاً ثبت شده است");
      } else {
        setRegisterError("خطایی در ثبت نام رخ داد");
      }
    }
  };
  // const onError = (errors) => {
  //   console.log("Validation errors:", errors);

  //   if (errors.username) {
  //     alert(errors.username.message);
  //     return;
  //   }

  //   if (errors.password) {
  //     alert(errors.password.message);
  //     return;
  //   }

  //   if (errors.confirmPassword) {
  //     alert(errors.confirmPassword.message);
  //   }
  // };

  return (
    <div className={styles.page}>
      <h1>بوت کمپ بوت استارت</h1>
      <div className={styles.register}>
        <div className={styles.header}>
          <img src={logo} alt="logo" />
          <h3>فرم ثبت نام</h3>
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

          <input
            type="password"
            placeholder="تکرار رمز عبور"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button onClick={handleSubmit(onSubmit)}>ثبت نام</button>
        {registerSuccess && (
          <span className={styles.success}>{registerSuccess}</span>
        )}
        {registerError && <span className={styles.error}>{registerError}</span>}
        <p>
          <Link to="/login">حساب کاربری دارید؟</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
