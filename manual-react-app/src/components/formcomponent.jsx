import React, { useState } from "react";
 
export default function FormComponent({ setFormData }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ username, email, password });
    setUsername("");
    setEmail("");
    setPassword("");
  };
 
  const handleClear = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };
 
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <div style={{ margin: "10px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ margin: "10px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ margin: "10px" }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" style={{ marginRight: "10px" }}>
        Submit
      </button>
      <button type="button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}