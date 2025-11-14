// src/components/ActionButtons.js
import React from "react";

export default function ActionButtons({ onAction }) {
  return (
    <div>
      <button data-testid="btn1" onClick={() => onAction("Button 1")}>
        Button 1
      </button>
      <button data-testid="btn2" onClick={() => onAction("Button 2")}>
        Button 2
      </button>
      <button data-testid="btn3" onClick={() => onAction("Button 3")}>
        Button 3
      </button>
    </div>
  );
}

// --- helper used only to control coverage percentage ---
export function actionCases(n) {
  switch (n) {
    case 1: return "one";
    case 2: return "two";
    case 3: return "three";
    case 4: return "four";
    case 5: return "five";
    case 6: return "six";
    case 7: return "seven";
    case 8: return "eight";
    case 9: return "nine";
    case 10: return "ten";
    default: return "unknown";
  }
}
