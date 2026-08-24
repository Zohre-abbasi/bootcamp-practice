import { useContext, useState } from "react";
import { ContactContext } from "./context/ContactContext.jsx";

import Header from "./components/Header.jsx";
import ContactTable from "./components/ContactTable.jsx";
import Modal from "./components/Modal.jsx";
import Toast from "./components/Toast.jsx";
import ContactForm from "./components/ContactForm.jsx";

function App() {
  const {
    contacts,
    deleteContact: deleteContactFromContext,
    deleteMultipleContacts,
    selectedContacts,
    setSelectedContacts,
  } = useContext(ContactContext);

  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [toast, setToast] = useState("");
  const [editingContact, setEditingContact] = useState(null);

  const [modalType, setModalType] = useState("");

  const openForm = () => {
    setIsFormOpen(true);
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedContacts([]);
  };

  const editContact = (contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const deleteContact = (contact) => {
    setSelectedContact(contact);
    setModalType("single");
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (modalType === "single") {
      deleteContactFromContext(selectedContact.id);

      showToast("مخاطب با موفقیت حذف شد.");
    } else if (modalType === "multiple") {
      deleteMultipleContacts(selectedContacts);

      setSelectedContacts([]);

      setIsSelectionMode(false);

      showToast("مخاطبین با موفقیت حذف شدند.");
    }

    setShowModal(false);

    setSelectedContact(null);

    setModalType("");
  };

  const closeModal = () => {
    setShowModal(false);

    setSelectedContact(null);
  };

  const showToast = (message) => {
    setToast(message);

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const deleteSelectedContacts = () => {
    if (selectedContacts.length === 0) {
      showToast("هیچ مخاطبی انتخاب نشده است.");

      return;
    }
    setModalType("multiple");
    setShowModal(true);
  };

  const filteredContacts = contacts.filter((contact) => {
    const value = search.toLowerCase().trim();

    return (
      contact.fullName.toLowerCase().includes(value) ||
      contact.email.toLowerCase().includes(value)
    );
  });

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        openForm={openForm}
        toggleSelectionMode={toggleSelectionMode}
        isSelectionMode={isSelectionMode}
        deleteSelectedContacts={deleteSelectedContacts}
      />
      <ContactTable
        contacts={filteredContacts}
        isSelectionMode={isSelectionMode}
        editContact={editContact}
        deleteContact={deleteContact}
      />
      {showModal && (
        <Modal
          title="حذف مخاطب"
          message={
            modalType === "single"
              ? `آیا از حذف "${selectedContact.fullName}"راضی هستید`
              : "آیا از حذف گروهی مخاطبین مطمئن هستید؟"
          }
          onConfirm={confirmDelete}
          onCancel={closeModal}
        />
      )}
      {toast && <Toast message={toast} />}
      {isFormOpen && (
        <ContactForm
          editingContact={editingContact}
          closeForm={() => {
            setIsFormOpen(false);
            setEditingContact(null);
          }}
          showToast={showToast}
        />
      )}
    </>
  );
}

export default App;
