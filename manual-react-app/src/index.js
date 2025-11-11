import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import FormComponent from "./components/formcomponent.jsx";
import DisplayComponent from "./components/displaycomponent.jsx";
import TimeColorApp from "./components/TimeColorPicker/TimeColorApp.jsx";
const RootComponent = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Render your App */}
      <App />

      {/* Form Component */}
      <h1>Form Submission Example</h1>
      <FormComponent setFormData={handleFormSubmit} />

      {/* Display Submitted Data */}
      <DisplayComponent data={submittedData} />

      <div>
        <TimeColorApp />
      </div>
      
    </div>

  );
};

const root = createRoot(document.getElementById("root"));
root.render(<RootComponent />);
