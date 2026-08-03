import styles from "./ContactTable.module.css";

function ContactTable({
  contacts,
  isSelectionMode,
}) {
  return (
    <table className={styles.table}>

      <thead >

        <tr >

          {isSelectionMode && <th></th>}

          <th>نام</th>

          <th>ایمیل</th>

          <th></th>

        </tr>

      </thead>

      <tbody>

        {contacts.map((contact) => (

          <tr key={contact.id}>

            {isSelectionMode && (

              <td>

                <input type="checkbox" />

              </td>

            )}

            <td>

              {contact.fullName}

            </td>

            <td>

              {contact.email}

            </td>

            <td>

              <button>

                ⋮

              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default ContactTable;