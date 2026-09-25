import { useState } from "react";
import api from "../servises/config";
import styles from "../styles/ProductModal.module.css";

function EditProductModal({ product, onClose, onProductUpdated }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      await api.put(`/products/${product.id}`, {
        name,
        price: Number(price),
        quantity: Number(quantity),
      });

      await onProductUpdated();
    } catch (error) {
      console.log("Edit product error:", error);

      setError(error.response?.data?.message || "خطایی در ویرایش محصول رخ داد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>ویرایش اطلاعات</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="نام محصول"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="قیمت"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="موجودی"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.buttons}>
            <button type="button" onClick={onClose}>
              انصراف
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "در حال ثبت..." : "ثبت اطلاعات جدید"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
