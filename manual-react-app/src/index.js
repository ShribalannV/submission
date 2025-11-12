// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import store from "./store.js";

import App from "./App";
import FormComponent from "./components/formcomponent.jsx";
import DisplayComponent from "./components/displaycomponent.jsx";
import TimeColorApp from "./components/TimeColorPicker/TimeColorApp.jsx";

import "./index.css"; // Modern UI styles

const RootComponent = () => {
  return (
    <div className="main-container">
      {/*  Modern Navbar */}
      <nav className="navbar">
        <NavLink to="/" className="nav-link">
          🏠 Home
        </NavLink>
        <NavLink to="/form" className="nav-link">
          📝 Form
        </NavLink>
        <NavLink to="/display" className="nav-link">
          📊 Display
        </NavLink>
        <NavLink to="/timecolor" className="nav-link">
          ⏰ TimeColor
        </NavLink>
      </nav>

      {/* Routes (All Data Comes from Redux) */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<FormComponent />} />
        <Route path="/display" element={<DisplayComponent />} />
        <Route path="/timecolor" element={<TimeColorApp />} />
      </Routes>
    </div>
  );
};


if (window.location.pathname !== "/") {
  window.history.replaceState(null, "", "/");
}

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootComponent />
    </BrowserRouter>
  </Provider>
);
