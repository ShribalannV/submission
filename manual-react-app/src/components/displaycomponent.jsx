import React from "react";
import { useSelector } from "react-redux";
import "./displaycomponent.css";

export default function DisplayComponent() {
  // ✅ Use the correct key from your formSlice
  const formData = useSelector((state) => state.form.submittedData);

  // ✅ If no form data yet
  if (!formData) {
    return (
      <div className="console-box empty">
        <h3 className="console-title">🖥️ Submitted Data Console</h3>
        <p>No data submitted yet</p>
      </div>
    );
  }

  return (
    <div className="console-box">
      <h3 className="console-title">🖥️ Submitted Data Console</h3>

      <div className="console-content">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="console-line">
            <span className="console-key">{key}:</span>{" "}
            <span className="console-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
