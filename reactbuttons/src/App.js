import React, { useState } from "react";
import {
  fetchData,
  apiWithTimeout,
  apiWithoutTimeout,
  apiWithPromise,
} from "./Api";

import ActionButtons from "./components/ActionButtons";
import ApiButtons from "./components/ApiButtons";
import SummaryTable from "./components/SummaryTable"; //

export default function App() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ NEW: Summary table state (but not removing anything existing)
  const [summary, setSummary] = useState([]);

  // ✅ NEW: Helper to add rows to summary table (does not replace your code)
  const addSummary = (test, expected, actual) => {
    const passed = expected === actual ? "YES" : "NO";

    setSummary((prev) => [
      ...prev,
      { Test: test, Expected: expected, Actual: actual, Passed: passed },
    ]);
  };

  const handleAction = async (type) => {
    setLoading(true);
    const res = await fetchData(type);
    setStatus(res.message);
    setLoading(false);

    // ⭐ NEW summary row (keeps your code untouched)
    addSummary(type, `${type} clicked`, res.message);
  };

  const handleTimeout = async () => {
    setLoading(true);
    const res = await apiWithTimeout();
    setStatus(res);
    setLoading(false);

    // ⭐ summary row
    addSummary("api-timeout", "Timeout API Response", res);
  };

  const handleNoTimeout = () => {
    const res = apiWithoutTimeout();
    setStatus(res);

    // ⭐ summary row
    addSummary("api-no-timeout", "No Timeout API Response", res);
  };

  const handlePromiseAPI = async () => {
    const res = await apiWithPromise();
    setStatus(res);

    // ⭐ summary row
    addSummary("api-promise", "Promise API Response", res);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>React 3 Button Actions</h2>

      <ActionButtons onAction={handleAction} />
      <ApiButtons
        onTimeout={handleTimeout}
        onNoTimeout={handleNoTimeout}
        onPromise={handlePromiseAPI}
      />

      {loading && <p>Loading...</p>}
      {status && <p data-testid="status">{status}</p>}

      {/* ⭐ NEW — UI summary table appears here */}
      <SummaryTable data={summary} />
    </div>
  );
}
