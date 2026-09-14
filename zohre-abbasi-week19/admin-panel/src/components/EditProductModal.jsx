import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { updateProduct } from "../services/productService";

import * as yup from "yup";

import styles from "./EditProductModal.module.css";

const schema = yup.object({
  name: yup.string().required("نام کالا الزامی هست"),

  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError("قیمت باید عدد باشد")
    .required("قیمت الزامی هست")
    .min(0, "قیمت نمی تواند منفی باشد"),

  quantity: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError("تعداد موجودی باید عدد باشد")
    .required("تعداد موجودی الزامی هست")
    .min(0, "تعداد موجودی نمی تواند منفی باشد"),
});

function EditProductModal({ product, onClose, onProductUpdated }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    },
  });
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      setMessage("");

      await updateProduct(product.id, data);

      await onProductUpdated();

      onClose();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "خطایی در ویرایش محصول رخ داد",
      );
    }
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
        <h2>ویرایش اطلاعات</h2>

        <div className={styles.inputGroup}>
          <label>نام کالا</label>
          <input type="text" placeholder="نام کالا" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>تعداد موجودی</label>
          <input type="number" placeholder="تعداد" {...register("quantity")} />
          {errors.quantity && <span>{errors.quantity.message}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>قیمت</label>
          <input type="number" placeholder="قیمت" {...register("price")} />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.buttons}>
          <button type="submit">ثبت اطلاعات جدید</button>

          <button type="button" onClick={onClose}>
            لغو
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductModal;
