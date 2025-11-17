// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5 hidden md:block">
      <h2 className="text-2xl font-semibold mb-6">Admin</h2>
      <nav className="flex flex-col gap-3 text-sm">
        <NavLink to="/admin/users" className={({isActive}) => isActive ? 'text-blue-300' : 'hover:text-blue-300'}>Manage Users</NavLink>
        <NavLink to="/admin/banks" className={({isActive}) => isActive ? 'text-blue-300' : 'hover:text-blue-300'}>Manage Banks</NavLink>
      </nav>
    </aside>
  );
}
