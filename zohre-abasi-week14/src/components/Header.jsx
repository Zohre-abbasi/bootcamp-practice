import { CgAddR } from "react-icons/cg";
import { CgCheckR } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import styles from "./Header.module.css";
function Header({
  search,
  setSearch,
  openForm,
  toggleSelectionMode,
  isSelectionMode,
  deleteSelectedContacts,
}) {
  return (
    <header className={styles.header}>
      <button onClick={openForm}>
        <CgAddR className={styles.icon} />
      </button>
      {!isSelectionMode ? (
        <button onClick={toggleSelectionMode}>
          <CgCheckR className={styles.icon} />
        </button>
      ) : (
        <>
          <button onClick={deleteSelectedContacts}>
            <FaUser className={styles.icon} />
          </button>
          <button onClick={toggleSelectionMode}>
            <RiArrowGoBackFill className={styles.icon} />
          </button>
        </>
      )}

      <input
        className={styles.input}
        dir="rtl"
        type="text"
        placeholder="جستجو..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <span dir="rtl">جستجو در مخاطبین:</span>
    </header>
  );
}

export default Header;
