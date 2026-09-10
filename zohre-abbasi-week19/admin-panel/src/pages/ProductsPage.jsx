import profile from "../assets/images/profile.png";
import product from "../assets/images/product.png";
import search from "../assets/images/search.png";
import deleted from "../assets/images/deleted.png";
import edit from "../assets/images/edit.png";
import line from "../assets/images/line.png";
 

import styles from "./ProductsPage.module.css";

function ProductsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.search}>
          <img src={search} alt="جستجو" />
          <input type="text" placeholder="جستجوی محصول" />
        </div>
        <div className={styles.profile}>
          <img src={line} alt="ds" />
          <img src={profile} alt="پروفایل"  className={styles.image}/>
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
          <button>افزودن محصول</button>
        </div>
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
              <tr>
                <td>محصول نمونه</td>
                <td>10</td>
                <td>100/000</td>
                <td>12345</td>
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
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <button>قبلی</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>بعدی</button>
        </div>
      </main>
    </div>
  );
}

export default ProductsPage;
