import profile from "../assets/images/profile.png";
import product from "../assets/images/product.png";
import search from "../assets/images/search.png";
import deleted from "../assets/images/deleted.png";
import edit from "../assets/images/edit.png";
import line from "../assets/images/line.png";
import { useEffect, useState } from "react";
import api from "../services/config";
import AddProductModal from "../components/AddProductModal";

import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
 

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchName(searchInput.trim());
      setPage(1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  useEffect(() => {
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

        console.log("Products response:", response.data);

        setProducts(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("Products error:", error);

        setMessage(
          error.response?.data?.message || "خطایی در دریافت محصولات رخ داد",
        );
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page, searchName]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.search}>
          <img src={search} alt="جستجو" />
          <input
            type="text"
            placeholder="جستجوی محصول"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <div className={styles.profile}>
          <img src={line} alt="ds" />
          <img src={profile} alt="پروفایل" className={styles.image} />
          <div className={styles.profileInfo}>
            <span>میلاد عظیمی</span>

            <span>مدیر</span>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.titleSection}>
          <div className={styles.title}>
            <img src={product} alt="" />
            <h2>مدیریت کالا</h2>
          </div>
          <button onClick={() => setShowAddProduct(true)}>افزودن محصول</button>
        </div>
        {loading && <p>در حال دریافت محصولات...</p>}

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.tableContainer}>
          <table>
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
                      <button>
                        <img src={edit} alt="ویرایش" />
                      </button>
                      <button>
                        <img src={deleted} alt="حذف" />
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
        <AddProductModal onClose={() => setShowAddProduct(false)} />
      )}
    </div>
  );
}
{
}

export default ProductsPage;
