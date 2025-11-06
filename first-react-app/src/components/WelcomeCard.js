import React from "react";


function WelcomeCard() {

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // full viewport height
    backgroundColor: "#eaf6ff", // light background for contrast
  };

  const cardStyle = {
    border: "2px solid #fff",
    borderRadius: "12px",
    padding: "20px",
    // margin: "40px auto",
    maxWidth: "350px",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    color: "#20232a",
    fontSize: "1.5rem",
    marginBottom: "10px",
  };

  const subtitleStyle = {
    color: "#61dafb",
    fontSize: "1.1rem",
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>Welcome React</h2>
      <p style={subtitleStyle}>🚀 You’re ready to build awesome UI!</p>
    </div>
  );
}

export default WelcomeCard;
