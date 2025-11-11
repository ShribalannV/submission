import React, { useEffect, useState } from "react";
import "./popup.css"; // Make sure this path is correct

const Popup = ({ show, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(show);
  const [isClosing, setIsClosing] = useState(false);

  // Handle opening/closing animation states
  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsClosing(false);
    } else if (isVisible) {
      // Trigger fade out
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // match the animation duration
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <div
      className={`popup-overlay ${isClosing ? "closing" : ""}`}
      onClick={onClose}
    >
      <div
        className={`popup-box ${isClosing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="popup-title">{title}</h2>
        <div className="popup-content">{children}</div>
        <button className="popup-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
