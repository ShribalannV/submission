import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar user={user} />

        <main className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
