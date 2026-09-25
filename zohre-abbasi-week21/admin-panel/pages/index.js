import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

import api from "../servises/config";
import styles from "../styles/RegisterPage.module.css";

const schema = yup.object({
  username: yup.string().required("نام کاربری الزامی هست"),

  password: yup
    .string()
    .required("رمز عبور الزامی هست")
    .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),

  confirmPassword: yup
    .string()
    .required("تکرار رمز عبور الزامی هست")
    .oneOf([yup.ref("password")], "رمز عبور و تکرار آن یکسان نیستند"),
});

export default function Register() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setError("");
      setSuccess("");

      await api.post("/auth/register", {
        username: data.username,
        password: data.password,
      });

      setSuccess("ثبت نام با موفقیت انجام شد");
    } catch (error) {
      if (error.response?.status === 400) {
        setError("این نام کاربری قبلاً ثبت شده است");
      } else {
        setError("خطایی در ثبت نام رخ داد");
      }
    }
  };

  return (
    <div className={styles.page}>
      <h1>بوت کمپ بوت استارت</h1>

      <div className={styles.register}>
        <div className={styles.header}>
          <img src="/images/logo.png" alt="logo" />
          <h3>فرم ثبت نام</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputs}>
            <input
              type="text"
              placeholder="نام کاربری"
              {...register("username")}
            />

            <span>{errors.username?.message || " "}</span>

            <input
              type="password"
              placeholder="رمز عبور"
              {...register("password")}
            />

            <span>{errors.password?.message || " "}</span>

            <input
              type="password"
              placeholder="تکرار رمز عبور"
              {...register("confirmPassword")}
            />

            <span>{errors.confirmPassword?.message || " "}</span>
          </div>

          <button type="submit">ثبت نام</button>
        </form>

        {success && <span className={styles.success}>{success}</span>}

        {error && <span className={styles.error}>{error}</span>}

        <p>
          <Link href="/login">حساب کاربری دارید؟</Link>
        </p>
      </div>
    </div>
  );
}
