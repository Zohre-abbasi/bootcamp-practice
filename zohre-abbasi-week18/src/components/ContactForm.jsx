import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ContactContext } from "../context/ContactContext";
import styles from "./ContactForm.module.css";

function ContactForm({ closeForm, editingContact, showToast }) {
  const { addContact, updateContact } = useContext(ContactContext);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      fullName: editingContact?.fullName || "",
      email: editingContact?.email || "",
      job: editingContact?.job || "",
      phone: editingContact?.phone || "",
    },
  });

  const onSubmit = (data) => {
    if (editingContact) {
      updateContact({
        ...data,
        id: editingContact.id,
      });
      showToast("مخاطب با موفقیت ویرایش شد");
    } else {
      addContact({
        ...data,
        id: Date.now(),
      });
      showToast("مخاطب با موفقیت اضافه شد");
    }

    closeForm();
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>{editingContact ? "ویرایش مخاطب" : "افزودن مخاطب"}</h2>

        <input {...register("fullName")} placeholder="نام و نام خانوادگی" />

        <input {...register("email")} placeholder="ایمیل" />

        <input {...register("job")} placeholder="شغل" />

        <input {...register("phone")} placeholder="تلفن همراه" />

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
