import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import FormComponent from "./components/formcomponent.jsx";
import DisplayComponent from "./components/displaycomponent.jsx";
import TimeColorApp from "./components/TimeColorPicker/TimeColorApp.jsx";
import store from "./store.js";
import "./index.css"; // ✅ for layout styling

const RootComponent = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <Provider store={store}>
      <div className="main-container">
        <App />
        <h1 className="main-title">Form Submission Example</h1>

        <div className="form-display-wrapper">
          {/* Left - Form */}
          <div className="form-section">
            <FormComponent onSubmit={handleFormSubmit} />
          </div>

          {/* Right - Display Console */}
          <div className="display-section">
            <DisplayComponent data={submittedData} />
          </div>
        </div>

        <div className="extra-section">
          <TimeColorApp />
        </div>
      </div>
    </Provider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<RootComponent />);
