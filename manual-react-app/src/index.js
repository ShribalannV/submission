import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import App from "./App";
import FormComponent from "./components/formcomponent.jsx";
import DisplayComponent from "./components/displaycomponent.jsx";
import TimeColorApp from "./components/TimeColorPicker/TimeColorApp.jsx";
import PageNotFound from "./components/pagenotfound.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PopupExamples from "./components/popup/popupexamples.jsx";
import Login from "./components/Login.jsx"; // ✅ Import your Login component

import { Provider } from "react-redux";
import store from "./store.js";

import "./index.css";

const RootComponent = () => {
  return (
    <div className="main-container">
      {/* ✅ Modern Navbar */}
      <nav className="navbar">
        <NavLink to="/dashboard" className="nav-link">🧭 Dashboard</NavLink>
        <NavLink to="/form" className="nav-link">📝 Form</NavLink>
        <NavLink to="/display" className="nav-link">📊 Display</NavLink>
        <NavLink to="/fetchdata" className="nav-link">🌐 Fetch Data</NavLink>
        <NavLink to="/timecolor" className="nav-link">⏰ TimeColor</NavLink>
        <NavLink to="/popup" className="nav-link">💬 Popup Examples</NavLink>
        <NavLink to="/login" className="nav-link">🔑 Login</NavLink>
      </nav>

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Default Home */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<FormComponent />} />
        <Route path="/display" element={<DisplayComponent />} />
        <Route path="/fetchdata" element={<DisplayComponent />} />
        <Route path="/timecolor" element={<TimeColorApp />} />
        <Route path="/popup" element={<PopupExamples />} />
        <Route path="/login" element={<Login />} /> {/* ✅ Login route */}
        
        {/* Catch-all (must be last) */}
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
