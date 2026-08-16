import { useState } from "react";
import Input from "./Components/Input";

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  return <Input handleChange={handleChange} hint="" />;
}

export default App;
