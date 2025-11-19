import React from "react";
 
export default function LandingPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center p-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-16 animate-fadeIn">
        <h1 className="text-6xl font-extrabold text-blue-900 leading-tight drop-shadow-md">
          Banking Made  
          <span className="text-blue-600"> Simple, Smart & Secure</span>
        </h1>
 
        <p className="mt-4 text-xl text-gray-700">
          Manage all your bank accounts in one powerful dashboard.  
          <span className="font-semibold text-blue-700"> Track. Control. Simplify.</span>
        </p>
 
        <p className="mt-2 text-lg italic text-gray-600">
          “Your money. One place. Total clarity.”
        </p>
      </div>
 
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-6">
 
        {/* Card 1 */}
        <div className="bg-white/60 backdrop-blur-xl shadow-xl rounded-2xl p-8 hover:scale-105 transition-transform duration-300 border border-white/40">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Unified Dashboard</h3>
          <p className="text-gray-700">
            Get a 360° view of all your bank accounts in one secure platform.
          </p>
        </div>
 
        {/* Card 2 */}
        <div className="bg-white/60 backdrop-blur-xl shadow-xl rounded-2xl p-8 hover:scale-105 transition-transform duration-300 border border-white/40">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Fast Transactions</h3>
          <p className="text-gray-700">
            Track deposits, withdrawals & transfers in real time without hassle.
          </p>
        </div>
 
        {/* Card 3 */}
        <div className="bg-white/60 backdrop-blur-xl shadow-xl rounded-2xl p-8 hover:scale-105 transition-transform duration-300 border border-white/40">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Top-Tier Security</h3>
          <p className="text-gray-700">
            Bank-level encryption and authentication keeps your data protected.
          </p>
        </div>
      </div>
 
      {/* Bottom tagline */}
      <p className="mt-16 text-lg text-gray-600 font-medium tracking-wide animate-fadeIn">
        “Your Finances. Your Control. Your Freedom.”  
      </p>
    </section>
  );
}