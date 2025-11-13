import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // ✅ Token validation
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // redirect if no token
        return;
      }

      try {
        const res = await fetch("http://localhost:5279/api/Auth/validate", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok || !data.valid) {
          navigate("/login"); // redirect if invalid token
        }
      } catch (error) {
        console.error("Token validation error:", error);
        navigate("/login"); // redirect if server error
      }
    };

    validateToken();
  }, [navigate]);

  const cards = [
    {
      title: "📝 Modern Redux Form",
      description: "Fill out a Redux-managed form with real-time state sync.",
      button: "Go to Form",
      route: "/form",
      color: "#3b82f6",
    },
    {
      title: "📊 Display Console",
      description: "View submitted Redux form data in a modern console UI.",
      button: "View Display",
      route: "/display",
      color: "#10b981",
    },
    {
      title: "🌐 API Fetch Data",
      description: "See live API data fetched using async/await & hooks.",
      button: "Open Fetch Data",
      route: "/fetchdata",
      color: "#8b5cf6",
    },
    {
      title: "💡 Popup Examples",
      description: "Reusable popup system with smooth animations.",
      button: "Open Popups",
      route: "/popup",
      color: "#f59e0b",
    },
    {
      title: "⏰ Time Color Picker",
      description: "Dynamic UI that changes color based on the time of day.",
      button: "Try It",
      route: "/timecolor",
      color: "#ef4444",
    },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📋 Project Dashboard</h1>
      <p className="dashboard-subtitle">
        Welcome to your all-in-one control center — navigate through all modules easily.
      </p>

      <div className="dashboard-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="dashboard-card"
            style={{ borderTop: `5px solid ${card.color}` }}
          >
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <button
              style={{ backgroundColor: card.color }}
              onClick={() => navigate(card.route)}
            >
              {card.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
