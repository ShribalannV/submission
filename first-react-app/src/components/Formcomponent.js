import React, { useState } from "react";
import "../App.css";



function FormComponent() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You entered: ${inputValue}`);
  };

  const handleReset = () => {
    setInputValue("");
  };

  return (
    <div className="form-container">
      <h3>Simple Form</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="form-input"
        />
        <div className="button-group">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default FormComponent;
