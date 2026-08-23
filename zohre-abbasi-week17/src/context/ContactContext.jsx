import { createContext, useState } from "react";

export const ContactContext = createContext();

function ContactProvider({ children }) {
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
  const [selectedContacts, setSelectedContacts] = useState([]);

  const addContact = (contact) => {
    const newContacts = [...contacts, contact];

    setContacts(newContacts);

    localStorage.setItem("contacts", JSON.stringify(newContacts));
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
  };

  const deleteContact = (contactId) => {
    const newContacts = contacts.filter((contact) => contact.id !== contactId);

    setContacts(newContacts);

    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  const deleteMultipleContacts = (selectedContacts) => {
    const newContacts = contacts.filter(
      (contact) => !selectedContacts.includes(contact.id),
    );

    setContacts(newContacts);

    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  const toggleSelect = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((item) => item !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        deleteMultipleContacts,
        selectedContacts,
        setSelectedContacts,
        toggleSelect
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}
export default ContactProvider;
