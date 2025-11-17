import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landingpage";
import LoginPage from "./pages/Loginpage";
import AboutUs from "./pages/Aboutus";
import PlansPage from "./pages/planspage";
import AccountsPage from "./pages/Accountspage";
import TransactionsPage from "./pages/Transactionspage";
import ManageUsersPage from "./pages/Manageuserspage";
import ManageBanksPage from "./pages/ManageBankspage";
import ManageBranchesPage from "./pages/ManageBranchesPage";

import MainLayout from "./layouts/Mainlayout";
import AdminLayout from "./layouts/Adminlayout";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>

      {/* Public Website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* User Pages (Protected) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Route>
      </Route>

      {/* Admin Pages (Protected + Admin only) */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/users" element={<ManageUsersPage />} />
          <Route path="/admin/banks" element={<ManageBanksPage />} />
          <Route path="/admin/banks/:bankId" element={<ManageBranchesPage />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
