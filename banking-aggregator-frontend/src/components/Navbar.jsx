// src/components/Navbar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

export default function Navbar() {
  const { user, logout } = useAuth() || {};
  const nav = useNavigate();

  async function handleLogout() {
    try {
      await logout();
    } catch (e) {
      // ignore
    }
    nav('/login');
  }

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="text-xl font-bold">Banking Aggregator</NavLink>
          <nav className="hidden md:flex gap-3 items-center">
            <NavLink to="/about" className="hover:underline">About</NavLink>
            <NavLink to="/plans" className="hover:underline">Plans</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!user && <NavLink to="/login" className="px-3 py-1 rounded bg-white text-blue-600">Login</NavLink>}

          {user && user.role === 'user' && (
            <>
              <NavLink to="/accounts" className="hover:underline">Accounts</NavLink>
              <NavLink to="/transactions" className="hover:underline">Transactions</NavLink>
            </>
          )}

          {user && (user.role === 'admin' || user.role === 'sysadmin') && (
            <>
              <NavLink to="/admin/users" className="hover:underline">Manage Users</NavLink>
              <NavLink to="/admin/banks" className="hover:underline">Manage Banks</NavLink>
            </>
          )}

          {user && (
            <div className="flex items-center gap-2">
              <span className="text-sm hidden sm:inline">Hi, {user.fullName || user.email || 'User'}</span>
              <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
