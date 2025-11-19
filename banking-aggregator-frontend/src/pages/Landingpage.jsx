import React from 'react';
import { FaUniversity, FaWallet, FaExchangeAlt } from 'react-icons/fa';
 
export default function LandingPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-10 text-center">
        Welcome to <span className="text-blue-600">Banking Aggregator</span>
      </h1>
 
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
       
        {/* Card 1 */}
        <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center border border-gray-200 hover:border-blue-500">
          <FaUniversity className="text-blue-600 text-6xl mb-6" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Link Banks</h2>
          <p className="text-gray-600 text-sm">Connect your bank accounts securely in one place.</p>
        </div>
 
        {/* Card 2 */}
        <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center border border-gray-200 hover:border-green-500">
          <FaWallet className="text-green-600 text-6xl mb-6" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">View Accounts</h2>
          <p className="text-gray-600 text-sm">Check balances and details of all your linked accounts.</p>
        </div>
 
        {/* Card 3 */}
        <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center border border-gray-200 hover:border-purple-500">
          <FaExchangeAlt className="text-purple-600 text-6xl mb-6" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Transactions</h2>
          <p className="text-gray-600 text-sm">Deposit, withdraw, and view transaction history easily.</p>
        </div>
      </div>
    </section>
  );
};