import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight * 0.4) {
        setShowCard(true);
      } else {
        setShowCard(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      {/* First full section */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* Normal flow (not fixed) card section */}
      <section className="scroll-section">
        <div className={`welcome-card ${showCard ? "visible" : ""}`}>
          <h2>Welcome to the Page 🎉</h2>
          <p>Enjoy smooth scroll transitions and card hover effects!</p>
        </div>
      </section>
    </div>
  );
}

export default App;
