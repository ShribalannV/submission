import React, { useEffect, useState } from "react";
import "./popup.css"; // Make sure the path is correct

const Popup = ({ show, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(show);
  const [isClosing, setIsClosing] = useState(false);

  // Handle opening/closing animations
  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsClosing(false);
    } else if (isVisible) {
      // Trigger closing animation
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match the CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [show, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`popup-overlay ${isClosing ? "closing" : ""}`}
      onClick={onClose}
    >
      <div
        className={`popup-box ${isClosing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside popup
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
