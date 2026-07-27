import Tabs from "./components/Tabs";
import { useState } from "react";

function App() {
  const [activeTab,setActiveTab]=useState("Tab 1")
  return (
    <div>
      <h1>Tabs Component with React</h1>
      <Tabs setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
