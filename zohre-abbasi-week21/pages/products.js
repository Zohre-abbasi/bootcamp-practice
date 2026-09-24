import styles from "../styles/ProductsPage.module.css";

function ProductsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.search}>
          <img src="/images/search.png" alt="جستجو" />

          <input type="text" placeholder="جستجوی محصول" />
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
            <img src="/images/product.png" alt="محصول" />
            <h2>مدیریت کالا</h2>
          </div>
          <button>افزودن محصول</button>
        </div>

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
              <tr>
                <td>محصول تست</td>
                <td>20</td>
                <td>500000</td>
                <td className={styles.idCell}>test-id</td>

                <td>
                  <div className={styles.actions}>
                    <button>
                      <img src="/images/edit.png" alt="ویرایش" />
                    </button>

                    <button>
                      <img src="/images/deleted.png" alt="حذف" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button disabled>قبلی</button>

          <button className={styles.activePage}>1</button>

          <button>بعدی</button>
        </div>
      </main>
    </div>
  );
}

export default ProductsPage;
