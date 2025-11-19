import React from "react";
import {
  ShieldCheck,
  PiggyBank,
  CalendarClock,
  Banknote,
} from "lucide-react"; // icons

export default function PlansPage() {
  const plans = [
    {
      title: "Policy Protection Plan",
      price: "Starting from ₹299 / month",
      features: [
        "Life Coverage up to ₹10 Lakhs",
        "Accidental Coverage",
        "Tax Benefits under Sec 80C",
        "Instant Claim Support",
      ],
      icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      title: "Term Insurance Plan",
      price: "Starting from ₹499 / month",
      features: [
        "High Coverage up to ₹1 Crore",
        "Low Premium",
        "Financial Security for Family",
        "Flexible Tenure Options",
      ],
      icon: <Banknote className="w-12 h-12 text-purple-700" />,
      gradient: "from-purple-500 to-purple-700",
    },
    {
      title: "Recurring Deposit Plan",
      price: "Flexible Monthly Deposits",
      features: [
        "Interest Rate up to 7.5%",
        "Auto-Debit Facility",
        "Tenure: 6 months to 10 years",
        "Safe & Secure Return",
      ],
      icon: <CalendarClock className="w-12 h-12 text-green-600" />,
      gradient: "from-green-500 to-green-700",
    },
    {
      title: "Fixed Deposit Plan",
      price: "Interest up to 8.2%",
      features: [
        "Guaranteed Returns",
        "Flexible Tenure",
        "Premature Withdrawal Options",
        "Tax-Saver FD Available",
      ],
      icon: <PiggyBank className="w-12 h-12 text-orange-600" />,
      gradient: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#3A2A75]">
        Banking Aggregator – Investment & Insurance Plans
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border hover:shadow-2xl hover:-translate-y-2 transition-all p-6 flex flex-col items-center text-center"
          >
            <div className="mb-4">{plan.icon}</div>

            <h2 className="text-xl font-bold mb-2">{plan.title}</h2>

            <p
              className={`text-white font-semibold py-2 px-4 rounded-full bg-gradient-to-r ${plan.gradient} mb-5`}
            >
              {plan.price}
            </p>

            <ul className="text-gray-700 space-y-2 mb-6">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center justify-center gap-2">
                  <span className="text-green-600 font-bold">✓</span> {f}
                </li>
              ))}
            </ul>

            <button className="px-6 py-2 bg-[#3A2A75] text-white rounded-lg hover:bg-[#2a1d57] transition">
              Know More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
