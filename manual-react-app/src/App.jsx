import React, { useState } from "react";
import Greeting from "./components/Greeting";
import Welcome from "./components/Welcome";
import Thoughts from "./components/Thoughts";
import WellKnownPeople from "./components/WellKnownPeople";
import FIX_ERROR_01 from "./components/FIX_ERROR_01";
import PeopleData from "./components/PeopleData";
import Popup from "./components/popup/popup.jsx";
// import TimeColorApp from "./components/TimeColorPicker/TimeColorApp.jsx";

const App = () => {
  // 
  const [show, setShow] = useState(false);
  const [popupCounts, setPopupCounts] = useState({ popup1: 0, popup2: 0 });
  const [popupContent, setPopupContent] = useState({ title: "", message: "" });

  //
  const handleOpenPopup = (type) => {
    setPopupCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));

    const content =
      type === "popup1"
        ? {
            title: "Custom Popup 1",
            message: `This popup is using React 🎉\nYou have opened this ${popupCounts.popup1 + 1} times.`,
          }
        : {
            title: "Custom Popup 2",
            message: `This is another message using the same popup component!\nYou have opened this ${popupCounts.popup2 + 1} times.`,
          };

    setPopupContent(content);
    setShow(true);
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
      <PeopleData />
      <FIX_ERROR_01 />

      {/*  Child component is inside the same file */}
      <PopupChild popupCounts={popupCounts} handleOpenPopup={handleOpenPopup} />

      {/* Reusable popup */}
      <Popup
        show={show}
        onClose={() => setShow(false)}
        title={popupContent.title}
      >
        <p style={{ whiteSpace: "pre-line" }}>{popupContent.message}</p>
      </Popup>

      {/* <TimeColorApp /> */}
    </div>
  );
};

export default App;

//
//  Child Component defined inside App.jsx
//
function PopupChild({ popupCounts, handleOpenPopup }) {
  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
    margin: "10px",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>React Popup (Parent–Child in One File)</h1>

      <button style={buttonStyle} onClick={() => handleOpenPopup("popup1")}>
        Open Popup 1
      </button>
      <button style={buttonStyle} onClick={() => handleOpenPopup("popup2")}>
        Open Popup 2
      </button>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <p>Popup 1 opened: <strong>{popupCounts.popup1}</strong> times</p>
        <p>Popup 2 opened: <strong>{popupCounts.popup2}</strong> times</p>
      </div>
    </div>
  );
}
