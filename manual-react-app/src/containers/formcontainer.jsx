// src/components/FormContainer.jsx
import React from "react";
import FormComponent from "./formcomponent";
import DisplayComponent from "./displaycomponent";
import "./formcontainer.css";

export default function FormContainer() {
  return (
    <div className="dashboard-container">
      <div className="form-section">
        <h2 className="dashboard-title">🧾 Redux Smart Form</h2>
        <FormComponent />
      </div>

      <div className="console-section">
        <DisplayComponent />
      </div>
    </div>
  );
}
