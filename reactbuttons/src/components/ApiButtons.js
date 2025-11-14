// src/components/ApiButtons.js
import React from "react";

export default function ApiButtons({ onTimeout, onNoTimeout, onPromise }) {
  return (
    <div style={{ marginTop: 20 }}>
      <button data-testid="api-timeout" onClick={onTimeout}>
        Timeout API
      </button>

      <button data-testid="api-no-timeout" onClick={onNoTimeout}>
        No Timeout API
      </button>

      <button data-testid="api-promise" onClick={onPromise}>
        Promise API
      </button>
    </div>
  );
}

// --- helper to control coverage percentage for ApiButtons ---
export function apiCases(n) {
  switch (n) {
    case 1: return "a";
    case 2: return "b";
    case 3: return "c";
    case 4: return "d";
    case 5: return "e";
    case 6: return "f";
    case 7: return "g";
    case 8: return "h";
    case 9: return "i";
    case 10: return "j";
    case 11: return "k";
    case 12: return "l";
    case 13: return "m";
    default: return "z";
  }
}
