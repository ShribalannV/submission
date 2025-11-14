import React from "react";

export default function ApiButtons({
  onTimeout,
  onNoTimeout,
  onPromise,
}) {
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
        data-testid="api-timeout"
        onClick={onTimeout}
        style={{ ...style, background: "#8e44ad" }}
      >
        Timeout API
      </button>

      <button
        data-testid="api-no-timeout"
        onClick={onNoTimeout}
        style={{ ...style, background: "#e67e22" }}
      >
        No Timeout API
      </button>

      <button
        data-testid="api-promise"
        onClick={onPromise}
        style={{ ...style, background: "#16a085" }}
      >
        Promise API
      </button>
    </>
  );
}
