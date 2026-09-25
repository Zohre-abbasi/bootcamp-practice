import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../servises/config";
import styles from "../styles/LoginPage.module.css";

const schema = yup.object({
  username: yup.string().required("نام کاربری الزامی هست"),

  password: yup.string().required("رمز عبور الزامی هست"),
});

export default function Login() {
  const router = useRouter();

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

      const response = await api.post("/auth/login", {
        username: data.username,
        password: data.password,
      });

      localStorage.setItem("token", response.data.token);

      router.push("/products");
    } catch (error) {
      setError(
        error.response?.data?.message || "نام کاربری یا رمز عبور اشتباه است",
      );
    }
  };

  return (
    <div className={styles.page}>
      <h1>بوت کمپ بوت استارت</h1>

      <div className={styles.login}>
        <div className={styles.header}>
          <img src="/images/logo.png" alt="logo" />
          <h3>فرم ورود</h3>
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
          </div>

          <button type="submit">ورود</button>
        </form>

        {error && <span className={styles.error}>{error}</span>}

        <p>
          <Link href="/">حساب کاربری ندارید؟</Link>
        </p>
      </div>
    </div>
  );
}
