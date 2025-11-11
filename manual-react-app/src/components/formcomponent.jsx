import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField, submitForm, resetForm } from "../features/formSlice.js"; // ✅ fixed path
import "./formcomponent.css";


export default function FormComponent() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const generateToken = () => {
    return "TOK-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingToken = token || generateToken(); // reuse token if already exists
    setToken(existingToken);

    const data = { username, email, password, token: existingToken };
    dispatch(submitForm(data));

    // optional clear fields
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleClear = () => {
    dispatch(resetForm());
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">User Submission Form</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="button-group">
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClear}>
          Reset
        </button>
      </div>

      {token && (
        <p className="token-display">
          🪪 Your Token: <strong>{token}</strong>
        </p>
      )}
    </form>
  );
}
