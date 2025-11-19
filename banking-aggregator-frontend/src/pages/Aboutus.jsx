import React from "react";
 
export default function AboutUs() {
  const team = [
    {
      name: "Sashidhar Jagdishan",
      role: "Chief Executive Officer (CEO)",
      img: "https://tse2.mm.bing.net/th/id/OIP.ipe4eCnJ16O-3W1rZr7fdQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "Ramesh Lakshminarayanan",
      role: "Chief Technology Officer (CTO)",
      img: "https://tse3.mm.bing.net/th/id/OIP.LjgWwJpXtKlEGPEkt_2MZwHaEu?rs=1&pid=ImgDetMain&o=7&rm=3%22",
    },
    {
      name: "V Srinivasa Rangan",
      role: "Chief Financial Officer (CFO)",
      img: "https://boardstewardship.com/wp-content/uploads/2023/11/V.-Srinivasa-Rangan.jpg",
    },
  ];
 
  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">About Us</h1>
 
      <p className="text-center text-lg max-w-3xl mx-auto mb-12">
        We are a modern banking aggregator, providing seamless integration
        between multiple banks, accounts, and financial services. Our leadership
        team ensures innovation, security, and reliability.
      </p>
 
      {/* Team Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {team.map((member, i) => (
          <div
            key={i}
            className="bg-white shadow-lg p-5 rounded-xl text-center hover:scale-105 transition-transform"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
 
 