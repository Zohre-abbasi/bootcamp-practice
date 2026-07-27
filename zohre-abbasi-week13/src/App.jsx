import Tabs from "./components/Tabs";
import { useState } from "react";
import TabContent from "./components/TabContent";

const tabContents={"Tab 1":{title:"content 1",text:"This section contains the information for Tab 1"},"Tab 2":{title:"content 2",text:"This section contains the information for Tab 2"},"Tab 3":{title:"content 3",text:"This section contains the information for Tab 3"},"Tab 4":{title:"content 4",text:"This section contains the information for Tab 4"}}

function App() {
  const [activeTab, setActiveTab] = useState("Tab 1");
  return (
    <div>
      <h1>Tabs Component with React</h1>
      <Tabs setActiveTab={setActiveTab} />
      <TabContent content={tabContents[activeTab]} />
    </div>
  );
}

export default App;
