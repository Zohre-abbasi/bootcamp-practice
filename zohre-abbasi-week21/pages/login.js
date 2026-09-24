import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

import styles from "../styles/LoginPage.module.css";

const schema = yup.object({
  username: yup.string().required("نام کاربری الزامی هست"),

  password: yup
    .string()
    .required("رمز عبور الزامی هست")
    .min(6, "رمز عبور باید حداقل 6کاراکتر باشد"),
});

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
  };

  return (
    <div className={styles.page}>
      <h1>بوت کمپ بوت استارت</h1>

      <div className={styles.login}>
        <div className={styles.header}>
          <img src="/images/logo.png" alt="logo" />
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
        </div>

        <button onClick={handleSubmit(onSubmit)}>ورود</button>

        <p>
          <Link href="/">حساب کاربری ندارید؟</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
