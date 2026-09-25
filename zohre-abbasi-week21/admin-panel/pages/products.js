import { useEffect, useState } from "react";

import api from "../servises/config";

import AddProductModal from "../components/AddProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import EditProductModal from "../components/EditProductModal";

import styles from "../styles/ProductsPage.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [searchName, setSearchName] = useState("");

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const [productMessage, setProductMessage] = useState("");

  const getProducts = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.get("/products", {
        params: {
          page,
          limit: 2,
          ...(searchName && { name: searchName }),
        },
      });

      setProducts(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      setMessage(
        error.response?.data?.message || "خطایی در دریافت محصولات رخ داد",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      getProducts();
    }
  }, [page, searchName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchName(searchInput.trim());
      setPage(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const showMessage = (text) => {
    setProductMessage(text);

    setTimeout(() => {
      setProductMessage("");
    }, 3000);
  };

  const handleProductAdded = async () => {
    await getProducts();
    setShowAddProduct(false)
    showMessage("محصول با موفقیت اضافه شد");
  };
  const handleProductDeleted = async () => {
    if (page > 1 && products.length === 1) {
      setPage(page - 1);
    } else {
      await getProducts();
    }
    setDeleteProduct(null)
    showMessage("محصول با موفقیت حذف شد");
  };

  const handleProductUpdated = async () => {
    await getProducts();
    setEditProduct(null)
    showMessage("محصول با موفقیت ویرایش شد");
  };
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.search}>
          <img src="/images/search.png" alt="جستجو" />

          <input
            type="text"
            placeholder="جستجوی محصول"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <div className={styles.profile}>
          <img src="/images/line.png" alt="" />

          <img
            src="/images/profile.png"
            alt="پروفایل"
            className={styles.image}
          />

          <div className={styles.profileInfo}>
            <span>میلاد عظیمی</span>
            <span>مدیر</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.titleSection}>
          <div className={styles.title}>
            <img src="/images/product.png" alt="" />
            <h2>مدیریت کالا</h2>
          </div>

          <button onClick={() => setShowAddProduct(true)}>افزودن محصول</button>
        </div>

        {productMessage && (
          <p className={styles.successMessage}>{productMessage}</p>
        )}

        {loading && <p className={styles.message}>در حال دریافت محصولات...</p>}

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>نام کالا</th>
                <th>موجودی</th>
                <th>قیمت</th>
                <th>شناسه کالا</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>

                  <td className={styles.idCell}>{item.id}</td>

                  <td>
                    <div className={styles.actions}>
                      <button onClick={() => setEditProduct(item)}>
                        <img src="/images/edit.png" alt="ویرایش" />
                      </button>

                      <button onClick={() => setDeleteProduct(item)}>
                        <img src="/images/deleted.png" alt="حذف" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            قبلی
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              className={page === index + 1 ? styles.activePage : ""}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            بعدی
          </button>
        </div>
      </main>

      {showAddProduct && (
        <AddProductModal
          onClose={() => setShowAddProduct(false)}
          onProductAdded={handleProductAdded}
        />
      )}

      {deleteProduct && (
        <DeleteProductModal
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onProductDeleted={handleProductDeleted}
        />
      )}

      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
}
