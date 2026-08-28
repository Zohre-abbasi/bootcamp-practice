import * as yup from "yup";


const contactSchema = yup.object({
  fullName: yup.string().required("نام الزامی است"),

  email: yup.string().required("ایمیل الزامی است").email("ایمیل معتبر نیست"),

  job: yup.string().required("شغل الزامی است"),

  phone: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

export default contactSchema;
