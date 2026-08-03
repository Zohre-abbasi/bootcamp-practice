import Header from "./components/Header.jsx";
import { useState } from "react";
function App() {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
    
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode((prev) => !prev);
    
  };
  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        openForm={openForm}
        toggleSelectionMode={toggleSelectionMode}
      />
    </>
  );
}

export default App;
