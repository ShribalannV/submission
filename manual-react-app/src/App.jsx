import React from "react";
import Greeting from "./components/Greeting";
import Welcome from "./components/Welcome";
import Thoughts from "./components/Thoughts";
import WellKnownPeople from "./components/WellKnownPeople";
import FIX_ERROR_01 from "./components/FIX_ERROR_01";
import PeopleData from "./components/PeopleData";
import Popup from "./components/popup/popup.jsx";
import { useState } from "react";
const App = () => {
  const [show, setShow] = useState(false);
  const stylespopupbutton ={
     
    padding: "12px 24px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
 
};

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial",
        marginTop: "50px",
        lineHeight: "1.6",
      }}
    >
      <Greeting />
      <Welcome />
      <Thoughts />
      <PeopleData/>
      <FIX_ERROR_01/>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>React Popup (CSS version)</h1>
      <button
        style={{...stylespopupbutton}}
        onClick={() => setShow(true)}
      >
        Open Popup
      </button>
 
      <Popup show={show} onClose={() => setShow(false)} title="Custom Popup" childere>
        <p>This popup is using React</p>
      </Popup>
    </div>
    </div>
  );
};

export default App;
