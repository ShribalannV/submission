import React, { useState } from "react";
import { fetchData, apiWithTimeout, apiWithoutTimeout, apiWithPromise } from "./Api";

import ActionButtons from "./components/ActionButtons";
import ApiButtons from "./components/ApiButtons";

export default function App() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (type) => {
    setLoading(true);
    const res = await fetchData(type);
    setStatus(res.message);
    setLoading(false);
  };

  const handleTimeout = async () => {
    setLoading(true);
    const res = await apiWithTimeout();
    setStatus(res);
    setLoading(false);
  };

  const handleNoTimeout = () => {
    const res = apiWithoutTimeout();
    setStatus(res);
  };

  const handlePromiseAPI = async () => {
    const res = await apiWithPromise();
    setStatus(res);
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
    </div>
  );
}
