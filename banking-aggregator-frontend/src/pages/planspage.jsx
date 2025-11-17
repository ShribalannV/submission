import React from "react";

export default function PlansPage() {
  const plans = [
    {
      title: "Basic Plan",
      price: "₹499 / month",
      features: [
        "Single Account Aggregation",
        "Basic Transaction History",
        "Email Support",
      ],
      color: "bg-blue-500",
    },
    {
      title: "Premium Plan",
      price: "₹999 / month",
      features: [
        "Multiple Bank Accounts",
        "Advanced Analytics",
        "Priority Email + Chat Support",
        "Daily Reports",
      ],
      color: "bg-purple-600",
    },
    {
      title: "Enterprise Plan",
      price: "₹1999 / month",
      features: [
        "Unlimited Accounts",
        "AI-Powered Insights",
        "Dedicated Account Manager",
        "Custom Integrations",
        "24/7 Support",
      ],
      color: "bg-green-600",
    },
  ];

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">Our Plans</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition-transform border"
          >
            <h2 className="text-2xl font-bold mb-3">{plan.title}</h2>

            <div
              className={`${plan.color} text-white text-lg font-semibold py-3 rounded-lg mb-4`}
            >
              {plan.price}
            </div>

            <ul className="text-gray-700 mb-6 space-y-2">
              {plan.features.map((f, i) => (
                <li key={i}>✓ {f}</li>
              ))}
            </ul>

            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
