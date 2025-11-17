import React from 'react';

export default function LandingPage(){
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Welcome to Banking Aggregator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Card: Link Banks</div>
        <div className="p-4 bg-white rounded shadow">Card: View Accounts</div>
        <div className="p-4 bg-white rounded shadow">Card: Transactions</div>
      </div>
    </section>
  );
  
}
