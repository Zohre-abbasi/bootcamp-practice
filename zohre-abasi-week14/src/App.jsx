import Header from "./components/Header.jsx";
import ContactTable from "./components/ContactTable.jsx";
import { useState } from "react";
function App() {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      fullName: "سینا",
      email: "sina.gh@gmail.com",
      job: "برنامه نویس",
      phone: "091200000000",
    },
    {
      id: 2,
      fullName: "محمد",
      email: "mohammad1388@mail.com",
      job: "طراح",
      phone: "09120111111",
    },
  ]);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode((prev) => !prev);
  };

  const editContact = (contact) => {
    console.log(contact);
  };

  const deleteContact = (contact) => {
    console.log(contact);
  };

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        openForm={openForm}
        toggleSelectionMode={toggleSelectionMode}
      />
      <ContactTable contacts={contacts} isSelectionMode={isSelectionMode} editContact={editContact} deleteContact={deleteContact} />
    </>
  );
}

export default App;
