import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

export default function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState(null);

  async function submit(e){
    e.preventDefault();
    try {
      await login(email, password);
      nav('/accounts');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow">
        {error && <div className="bg-red-100 text-red-700 p-2 mb-3">{error}</div>}
        <label className="block mb-2">Email
          <input className="w-full border p-2 rounded mt-1" value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <label className="block mb-4">Password
          <input type="password" className="w-full border p-2 rounded mt-1" value={password} onChange={e=>setPassword(e.target.value)} />
        </label>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}
