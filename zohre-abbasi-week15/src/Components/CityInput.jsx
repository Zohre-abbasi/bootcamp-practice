import { useState } from "react";
import Input from "./Input";
import cities from "../cities.json";

const CityInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    
  };

   const filteredCities = inputValue
    ? cities.filter((city) => city.includes(inputValue))
    : [];

  const hint = filteredCities[0] || "";

  return <Input handleChange={handleChange} hint={hint} />;
};

export default CityInput;