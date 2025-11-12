// src/components/PageNotFound.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PageNotFound.css"; // simple styles

const PageNotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="pnf-container">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <p>
        The requested URL <code>{location.pathname}</code> was not found.
      </p>
      <button className="pnf-home-btn" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default PageNotFound;
