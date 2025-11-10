import React from "react";

const PeopleDisplay = ({ people, searchTerm, setSearchTerm }) => {
  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scientists = filteredPeople.filter(person => person.category === "scientist");
  const others = filteredPeople.filter(person => person.category !== "scientist");

  const renderPeopleList = (peopleList) => (
    peopleList.map((person, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          margin: "10px 0",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
          width: "80%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }}
      >
        <img
          src={person.photo}
          alt={person.name}
          style={{ width: "100px", height: "100px", borderRadius: "50%", marginRight: "20px" }}
        />
        <div>
          <h3 style={{ margin: "0 0 5px 0" }}>{person.name}</h3>
          <p style={{ margin: 0 }}>{person.details}</p>
        </div>
      </div>
    ))
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: "20px 0",
          padding: "10px",
          width: "80%",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />

      <div style={{ 
        fontSize: "18px", 
        fontWeight: "bold", 
        margin: "10px 0",
        color: "#333"
      }}>
        Total Records Found: {filteredPeople.length}
      </div>

      {scientists.length > 0 && (
        <>
          <h2>Scientists</h2>
          {renderPeopleList(scientists)}
        </>
      )}

      {others.length > 0 && (
        <>
          <h2>Others</h2>
          {renderPeopleList(others)}
        </>
      )}

      {filteredPeople.length === 0 && (
        <p>No results found</p>
      )}
    </div>
  );
};

export default PeopleDisplay;
