import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactContext } from "../context/ContactContext";
import contactSchema from "../validation/contactSchema";
import styles from "./ContactForm.module.css";

function ContactForm({ closeForm, editingContact, showToast }) {
  const { addContact, updateContact } = useContext(ContactContext);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(contactSchema),
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
        {formErrors.fullName && <span>{formErrors.fullName.message}</span>}

        <input {...register("email")} placeholder="ایمیل" />
        {formErrors.email && <span>{formErrors.email.message}</span>}

        <input {...register("job")} placeholder="شغل" />
        {formErrors.job && <span>{formErrors.job.message}</span>}

        <input {...register("phone")} placeholder="تلفن همراه" />
        {formErrors.phone && <span>{formErrors.phone.message}</span>}

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
