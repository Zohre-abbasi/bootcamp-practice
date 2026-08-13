import { useState } from "react";
import styles from "./ContactTable.module.css";

function ContactTable({
  contacts,
  isSelectionMode,
  editContact,
  deleteContact,
  selectedContacts,
  toggleSelect,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {isSelectionMode && <th></th>}

          <th>نام</th>

          <th>ایمیل</th>

          <th></th>
        </tr>
      </thead>

      <tbody>
        {contacts.length === 0 ? (
          <tr>
            <td colSpan="4">مخاطبی وجود ندارد</td>
          </tr>
        ) : (
          contacts.map((contact) => (
            <tr key={contact.id}>
              {isSelectionMode && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => toggleSelect(contact.id)}
                  />
                </td>
              )}

              <td>{contact.fullName}</td>

              <td>{contact.email}</td>

              <td>
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === contact.id ? null : contact.id)
                  }
                >
                  ⋮
                </button>
                {openMenu === contact.id && (
                  <div className={styles.menu}>
                    <button
                      onClick={() => {
                        editContact(contact);
                        setOpenMenu(null);
                      }}
                    >
                      ویرایش
                    </button>

                    <button
                      onClick={() => {
                        deleteContact(contact);
                        setOpenMenu(null);
                      }}
                    >
                      حذف
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ContactTable;
