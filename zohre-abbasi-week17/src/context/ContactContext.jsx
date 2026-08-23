import { createContext } from "react";

export const ContactContext = createContext();

function ContactProvider({ children }) {
  return <ContactContext.Provider>{children}</ContactContext.Provider>;
}
export default ContactProvider;
