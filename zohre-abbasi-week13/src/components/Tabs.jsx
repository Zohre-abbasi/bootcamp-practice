
const tabs=["Tab 1","Tab 2","Tab 3","Tab 4"]
function Tabs({activeTab,setActiveTab}) {
  return (
    <div className="tabs">
      {tabs.map((tab)=>(
        <button  className="tab"key={tab} onClick={()=>setActiveTab(tab) }>{tab}</button>
      )) } 
    </div>
  )
}

export default Tabs