import React, { useState } from "react";
import Popup from "./popup.jsx";

const PopupExamples = () => {
  const [show, setShow] = useState(false);
  const [popupCounts, setPopupCounts] = useState({ popup1: 0, popup2: 0 });
  const [popupContent, setPopupContent] = useState({ title: "", message: "" });

  const handleOpenPopup = (type) => {
    setPopupCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));

    const content =
      type === "popup1"
        ? {
            title: "Custom Popup 1",
            message: `You opened Popup 1 ${popupCounts.popup1 + 1} times.`,
          }
        : {
            title: "Custom Popup 2",
            message: `You opened Popup 2 ${popupCounts.popup2 + 1} times.`,
          };

    setPopupContent(content);
    setShow(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", lineHeight: "1.6" }}>
      <h1>Popup Examples</h1>

      <button
        onClick={() => handleOpenPopup("popup1")}
        style={buttonStyle}
      >
        Open Popup 1
      </button>

      <button
        onClick={() => handleOpenPopup("popup2")}
        style={{ ...buttonStyle, backgroundColor: "#007bff" }}
      >
        Open Popup 2
      </button>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <p>Popup 1 opened: <strong>{popupCounts.popup1}</strong> times</p>
        <p>Popup 2 opened: <strong>{popupCounts.popup2}</strong> times</p>
      </div>

      <Popup show={show} onClose={() => setShow(false)} title={popupContent.title}>
        <p style={{ whiteSpace: "pre-line" }}>{popupContent.message}</p>
      </Popup>
    </div>
  );
};

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

export default PopupExamples;
