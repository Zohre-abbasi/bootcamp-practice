import { useState } from "react";
import styles from "./ContactForm.module.css";

function ContactForm({ addContact, closeForm, editingContact, updateContact }) {
  const [form, setForm] = useState({
    id: editingContact?.id || null,

    fullName: editingContact?.fullName || "",

    email: editingContact?.email || "",

    job: editingContact?.job || "",

    phone: editingContact?.phone || "",
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "نام الزامی است";
    }

    if (!form.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }

    if (!form.job.trim()) {
      newErrors.job = "شغل الزامی است";
    }

    if (!/^09\d{9}$/.test(form.phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editingContact) {
      updateContact(form);
    } else {
      addContact({
        ...form,
        id: Date.now(),
      });
    }

    closeForm();
  };
  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2>{editingContact ? "ویرایش مخاطب" : "افزودن مخاطب"}</h2>
        <input
          name="fullName"
          placeholder="نام و نام خانوادگی"
          value={form.fullName}
          onChange={changeHandler}
        />

        {errors.fullName && <span>{errors.fullName}</span>}

        <input
          name="email"
          placeholder="ایمیل"
          value={form.email}
          onChange={changeHandler}
        />

        {errors.email && <span>{errors.email}</span>}

        <input
          name="job"
          placeholder="شغل"
          value={form.job}
          onChange={changeHandler}
        />

        {errors.job && <span>{errors.job}</span>}

        <input
          name="phone"
          placeholder="تلفن همراه"
          value={form.phone}
          onChange={changeHandler}
        />

        {errors.phone && <span>{errors.phone}</span>}

        <div className={styles.buttons}>
          <button type="button" onClick={closeForm}>
            انصراف
          </button>

          <button>{editingContact ? "اعمال تغییرات" : "ثبت مخاطب"}</button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
