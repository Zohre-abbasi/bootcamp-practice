
const tabs=["Tab 1","Tab 2","Tab 3","Tab 4"]
function Tabs({setActiveTab}) {
  return (
    <div>
      {tabs.map((tab)=>(
        <button key={tab} onClick={()=>setActiveTab(tab)}>{tab}</button>
      )) } 
    </div>
  )
}

export default Tabs