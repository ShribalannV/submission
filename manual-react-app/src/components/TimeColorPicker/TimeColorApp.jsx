import React, { useState, useEffect } from "react";
import './TimeColor.css';
 
export default function ClockWithColorPicker() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [bgColor, setBgColor] = useState("blue");
 
  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
 
  // Handle dropdown color change
  const handleColorChange = (event) => {
    setBgColor(event.target.value);
  };
 
  return (
    <div className="container">
      {/* Clock Display */}
      <div
        className="clock-card"
        style={{
          backgroundColor: bgColor,
          color: bgColor === "yellow" ? "black" : "white",
        }}
      >
        {time}
      </div>
 
      {/* Color Dropdown */}
      <div className="dropdown-section">
        <label htmlFor="colorPicker" className="dropdown-label">
          Choose Background Color:
        </label>
        <select
          id="colorPicker"
          value={bgColor}
          onChange={handleColorChange}
          className="dropdown-select"
        >
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="white">White</option>
        </select>
      </div>
    </div>
  );
}