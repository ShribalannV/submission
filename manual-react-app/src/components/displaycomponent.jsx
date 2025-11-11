import React from "react";
 
export default function DisplayComponent({ data }) {
  if (!data) return <p>No data submitted yet.</p>;
 
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", width: "300px", margin: "0 auto" }}>
      <h3>Submitted Data:</h3>
      <p><strong>Username:</strong> {data.username}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Password:</strong> {data.password}</p>
    </div>
  );
}   