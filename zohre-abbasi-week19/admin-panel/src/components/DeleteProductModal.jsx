import { useState } from "react";
import close from "../assets/images/close.png";
import api from "../services/config";

import styles from "./DeleteProductModal.module.css";

function DeleteProductModal({ product, onClose, onProductDeleted }) {
  const [message, setMessage] = useState("");
  
  const handleDelete = async () => {
    try {
      setMessage("");

      await api.delete(`/products/${product.id}`);

      await onProductDeleted();

      onClose();
    } catch (error) {
      console.log("Delete product error:", error);

      setMessage(error.response?.data?.message || "خطایی در حذف محصول رخ داد");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img src={close} alt="logo" />
        <p>آیا از حذف محصول «{product.name}» مطمئن هستید؟</p>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.buttons}>
          <button type="button" onClick={handleDelete}>
            حذف
          </button>

          <button type="button" onClick={onClose}>
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
