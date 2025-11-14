import React from "react";

export default function ActionButtons({ onAction }) {
  const style = {
    padding: "12px 24px",
    margin: "10px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
  };

  return (
    <>
      <button
        data-testid="btn1"
        onClick={() => onAction("Button 1")}
        style={{ ...style, background: "#ff4d4d" }}
      >
        Action 1
      </button>

      <button
        data-testid="btn2"
        onClick={() => onAction("Button 2")}
        style={{ ...style, background: "#3d9df2" }}
      >
        Action 2
      </button>

      <button
        data-testid="btn3"
        onClick={() => onAction("Button 3")}
        style={{ ...style, background: "#00b359" }}
      >
        Action 3
      </button>
    </>
  );
}
