import React, { useState, useEffect } from "react";
import "./fetchdatacomponent.css"; //  new CSS file for modern styling

const FetchDataComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with any API you want
  const API_URL = "https://jsonplaceholder.typicode.com/users";

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- original logic preserved above ---
  // --- added below: modern UI look & refresh button ---

  if (loading)
    return (
      <div className="fetch-container">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );

  if (error)
    return (
      <div className="fetch-container">
        <p className="error-message">Error: {error}</p>
        <button onClick={fetchData} className="refresh-btn">
          Try Again 🔁
        </button>
      </div>
    );

  return (
    <div className="fetch-container">
      <h2 className="fetch-title">📦 User Data from API</h2>
      <button onClick={fetchData} className="refresh-btn">
        Refresh Data 🔄
      </button>

      <ul className="user-list">
        {data.map((user) => (
          <li key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>📧 {user.email}</p>
            <p>🏙️ {user.address.city}</p>
            <p>🌐 {user.website}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchDataComponent;
