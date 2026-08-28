import styles from "./Modal.module.css";
function Modal({ title, message, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>

        <p>{message}</p>

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>
            انصراف
          </button>

          <button className={styles.delete} onClick={onConfirm}>
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
