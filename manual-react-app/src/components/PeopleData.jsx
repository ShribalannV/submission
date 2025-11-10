import React, { useState } from "react";
import PeopleDisplay from "./PeopleDisplay";

const PeopleData = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const people = [
    {
      name: "Albert Einstein",
      photo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg",
      details: "Theoretical physicist who developed the theory of relativity.",
      category: "scientist"
    },
    {
      name: "Marie Curie",
      photo: "https://cosmoscience.in/wp-content/uploads/2025/01/Marie-Curie.jpg",
      details: "Pioneering physicist and chemist who conducted groundbreaking work on radioactivity.",
      category: "scientist"
    },
    {
      name: "Mahatma Gandhi",
      photo: "https://e1.pxfuel.com/desktop-wallpaper/114/951/desktop-wallpaper-mahatma-gandhi-png-transparent-gandhi-mobile.jpg",
      details: "Leader of the Indian independence movement against British rule.",
      category: "leader"
    },
    {
      name: "Rosa Parks",
      photo: "https://tse4.mm.bing.net/th/id/OIP.N9mLaZWPVAP7yOW4t_BN6AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      details: "Civil rights activist known for her pivotal role in the Montgomery bus boycott.",
      category: "activist"
    },
    {
      name: "Leonardo da Vinci",
      photo: "https://www.singulart.com/blog/wp-content/uploads/2023/10/Leonardo-Da-Vinci-1140x1140.webp",
      details: "Renaissance polymath known for his works in art, science, and engineering.",
      category: "scientist"
    }
  ];

  return (
    <PeopleDisplay 
      people={people} 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm} 
    />
  );
};

export default PeopleData;
