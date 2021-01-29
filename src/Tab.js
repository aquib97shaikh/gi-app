import React, { useState } from 'react'
import "./Tab.css"
function Tab(props) {
    const [active, setActive] = useState(0)
    return (
      <div className="tab-container">
        {props.options.map((i,idx) => (
          <span className={active===idx ? "tab active" :"tab"} key={idx} onClick={()=>{setActive(idx);props.tabHandler(idx);}}>{i}</span>
        ))}
      </div>
    );
}

export default Tab