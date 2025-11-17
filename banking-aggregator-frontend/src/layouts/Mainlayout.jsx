import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  const user = JSON.parse(localStorage.getItem("user")); // later replaced with auth context

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} />

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
