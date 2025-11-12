import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import App from "./App";
import FormComponent from "./components/formcomponent.jsx";
import DisplayComponent from "./components/displaycomponent.jsx";
import TimeColorApp from "./components/TimeColorPicker/TimeColorApp.jsx";
import PageNotFound from "./components/pagenotfound.jsx";
import { Provider } from "react-redux";
import store from "./store.js";

import "./index.css";

const RootComponent = () => {
  return (
    <div className="main-container">
      {/* Navbar */}
      <nav className="navbar">
        <NavLink to="/" className="nav-link">🏠 Home</NavLink>
        <NavLink to="/form" className="nav-link">📝 Form</NavLink>
        <NavLink to="/display" className="nav-link">📊 Display</NavLink>
        <NavLink to="/timecolor" className="nav-link">⏰ TimeColor</NavLink>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<FormComponent />} />
        <Route path="/display" element={<DisplayComponent />} />
        <Route path="/timecolor" element={<TimeColorApp />} />

        {/* Catch-all route must be LAST */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootComponent />
    </BrowserRouter>
  </Provider>
);
