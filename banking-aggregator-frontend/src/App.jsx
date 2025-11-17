import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AccountsPage from './pages/AccountsPage';
import TransactionsPage from './pages/TransactionsPage';
import { AuthProvider, useAuth } from './services/auth';

function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">Banking Aggregator</Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm">Home</Link>
          {user ? (
            <>
              <Link to="/accounts" className="text-sm">Accounts</Link>
              <Link to="/transactions" className="text-sm">Transactions</Link>
              <button onClick={logout} className="text-sm">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-6 flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
          </Routes>
        </main>
        <footer className="bg-white border-t">
          <div className="container mx-auto px-4 py-4 text-sm text-center">© 2025 Banking Aggregator</div>
        </footer>
      </div>
    </AuthProvider>
  );
}
