import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";

import styles from "../styles/RegisterPage.module.css";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Register data:", data);
    setRegisterSuccess("اطلاعات فرم با موفقیت ثبت شد");
  };

  return (
    <div className={styles.page}>
      <h1>بوت کمپ بوت استارت</h1>

      <div className={styles.register}>
        <div className={styles.header}>
          <img src="/images/logo.png" alt="logo" />
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

        <p>
          <Link href="/login">حساب کاربری دارید؟</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
