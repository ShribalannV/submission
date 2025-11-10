import React from "react";
import "./Popup.css"; 
 
export default function Popup({ show, onClose, title, children }) {
  if (!show) return null;
 
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup-title">{title}</h2>
        <div className="popup-content">{children}</div>
        <button className="popup-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}