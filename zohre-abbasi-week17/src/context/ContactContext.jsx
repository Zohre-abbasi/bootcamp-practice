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

  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactContext.Provider>
  );
}
export default ContactProvider;
