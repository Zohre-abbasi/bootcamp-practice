import Header from "./components/Header.jsx";
import ContactTable from "./components/ContactTable.jsx";
import { useState } from "react";
import Modal from "./components/Modal.jsx";
import Toast from "./components/Toast.jsx";
import ContactForm from "./components/ContactForm.jsx";

function App() {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [toast, setToast] = useState("");
  const [editingContact, setEditingContact] = useState(null);

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");

    return savedContacts
      ? JSON.parse(savedContacts)
      : [
          {
            id: 1,
            fullName: "سینا",
            email: "sina.gh@gmail.com",
            job: "برنامه نویس",
            phone: "09120000000",
          },
          {
            id: 2,
            fullName: "محمد",
            email: "mohammad1388@mail.com",
            job: "طراح",
            phone: "09120111111",
          },
        ];
  });
  const openForm = () => {
    setIsFormOpen(true);
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode((prev) => !prev);
  };

  const editContact = (contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const deleteContact = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const confirmDelete = () => {
    const newContacts = contacts.filter(
      (item) => item.id !== selectedContact.id,
    );
    setContacts(newContacts);
    localStorage.setItem("contacts", JSON.stringify(newContacts));
    setShowModal(false);
    setSelectedContact(null);

    showToast("مخاطب با موفقیت حذف شد");
  };

  const closeModal = () => {
    setShowModal(false);

    setSelectedContact(null);
  };

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const addContact = (contact) => {
    const newContacts = [...contacts, contact];

    setContacts(newContacts);

    localStorage.setItem("contacts", JSON.stringify(newContacts));

    showToast("مخاطب با موفقیت اضافه شد.");
  };

  const updateContact = (updatedContact) => {
    const newContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact,
    );

    setContacts(newContacts);

    localStorage.setItem(
      "contacts",

      JSON.stringify(newContacts),
    );

    setEditingContact(null);

    showToast("مخاطب با موفقیت ویرایش شد.");
  };

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        openForm={openForm}
        toggleSelectionMode={toggleSelectionMode}
      />
      <ContactTable
        contacts={contacts}
        isSelectionMode={isSelectionMode}
        editContact={editContact}
        deleteContact={deleteContact}
      />
      {showModal && (
        <Modal
          title="حذف مخاطب"
          message={`آیا از حذف ${selectedContact.fullName} مطمئن هستید؟`}
          onConfirm={confirmDelete}
          onCancel={closeModal}
        />
      )}
      {toast && <Toast message={toast} />}
      {isFormOpen && (
        <ContactForm
          addContact={addContact}
          updateContact={updateContact}
          editingContact={editingContact}
          closeForm={() => {
            setIsFormOpen(false);
            setEditingContact(null);
          }}
        />
      )}
    </>
  );
}

export default App;
