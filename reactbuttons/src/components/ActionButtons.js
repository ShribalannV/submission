import React from "react";

export default function ActionButtons({ onAction }) {
  return (
    <div>
      <button data-testid="btn1" onClick={() => onAction("Button 1")}>
        Action 1
      </button>

      <button data-testid="btn2" onClick={() => onAction("Button 2")}>
        Action 2
      </button>

      <button data-testid="btn3" onClick={() => onAction("Button 3")}>
        Action 3
      </button>
    </div>
  );
}
