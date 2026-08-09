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
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [modalType, setModalType] = useState("");

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
      const newContacts = contacts.filter(
        (item) => item.id !== selectedContact.id,
      );

      setContacts(newContacts);

      localStorage.setItem(
        "contacts",

        JSON.stringify(newContacts),
      );

      showToast("مخاطب با موفقیت حذف شد.");
    } else if (modalType === "multiple") {
      const newContacts = contacts.filter(
        (item) => !selectedContacts.includes(item.id),
      );

      setContacts(newContacts);

      localStorage.setItem(
        "contacts",

        JSON.stringify(newContacts),
      );

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

  const toggleSelect = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((item) => item !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
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
        selectedContacts={selectedContacts}
        toggleSelect={toggleSelect}
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
