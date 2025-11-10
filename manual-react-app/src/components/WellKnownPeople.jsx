// import React, { useState } from "react";
 
// const WellKnownPeople = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const people = [
//     {
//       name: "Albert Einstein",
//       photo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg",
//       details: "Theoretical physicist who developed the theory of relativity.",
//       category: "scientist"
//     },
//     {
//       name: "Marie Curie",
//       photo: "https://cosmoscience.in/wp-content/uploads/2025/01/Marie-Curie.jpg",
//       details: "Pioneering physicist and chemist who conducted groundbreaking work on radioactivity.",
//       category: "scientist"
//     },
//     {
//       name: "Mahatma Gandhi",
//       photo: "https://e1.pxfuel.com/desktop-wallpaper/114/951/desktop-wallpaper-mahatma-gandhi-png-transparent-gandhi-mobile.jpg",
//       details: "Leader of the Indian independence movement against British rule.",
//       category: "leader"
//     },
//     {
//       name: "Rosa Parks",
//       photo: "https://tse4.mm.bing.net/th/id/OIP.N9mLaZWPVAP7yOW4t_BN6AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
//       details: "Civil rights activist known for her pivotal role in the Montgomery bus boycott.",
//       category: "activist"
//     },
//     {
//       name: "Leonardo da Vinci",
//       photo: "https://www.singulart.com/blog/wp-content/uploads/2023/10/Leonardo-Da-Vinci-1140x1140.webp",
//       details: "Renaissance polymath known for his works in art, science, and engineering.",
//       category: "scientist"
//     }
//   ];

//   const filteredPeople = people.filter(person =>
//     person.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const scientists = filteredPeople.filter(person => person.category === "scientist");
//   const others = filteredPeople.filter(person => person.category !== "scientist");

//   const renderPeopleList = (peopleList) => (
//     peopleList.map((person, index) => (
//       <div
//         key={index}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           margin: "10px 0",
//           border: "1px solid #ccc",
//           padding: "10px",
//           borderRadius: "8px",
//           width: "80%",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
//         }}
//       >
//         <img
//           src={person.photo}
//           alt={person.name}
//           style={{ width: "100px", height: "100px", borderRadius: "50%", marginRight: "20px" }}
//         />
//         <div>
//           <h3 style={{ margin: "0 0 5px 0" }}>{person.name}</h3>
//           <p style={{ margin: 0 }}>{person.details}</p>
//         </div>
//       </div>
//     ))
//   );
 
//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//       <input
//         type="text"
//         placeholder="Search by name..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{
//           margin: "20px 0",
//           padding: "10px",
//           width: "80%",
//           borderRadius: "8px",
//           border: "1px solid #ccc",
//           fontSize: "16px"
//         }}
//       />

//       {scientists.length > 0 && (
//         <>
//           <h2>Scientists</h2>
//           {renderPeopleList(scientists)}
//         </>
//       )}

//       {others.length > 0 && (
//         <>
//           <h2>Others</h2>
//           {renderPeopleList(others)}
//         </>
//       )}

//       {filteredPeople.length === 0 && (
//         <p>No results found</p>
//       )}
//     </div>
//   );
// };
 
// export default WellKnownPeople;
