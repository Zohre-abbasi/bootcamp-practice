import { useState } from "react";
import api from "../servises/config";
import styles from "../styles/ProductModal.module.css"

function DeleteProductModal({ product, onClose, onProductDeleted }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setError("");
      setLoading(true);

      await api.delete(`/products/${product.id}`);

      await onProductDeleted();
    } catch (error) {
      console.log("Delete product error:", error);

      setError(error.response?.data?.message || "خطایی در حذف محصول رخ داد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>حذف محصول</h2>

        <p>آیا از حذف محصول «{product.name}» مطمئن هستید؟</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttons}>
          <button type="button" onClick={onClose}>
            انصراف
          </button>

          <button type="button" onClick={handleDelete} disabled={loading}>
            {loading ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
