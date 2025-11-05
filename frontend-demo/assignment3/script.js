const colors = [
    "AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque",
    "Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue",
    "Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson",
    "Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen",
    "DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid",
    "DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray",
    "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue",
    "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite",
    "Gold","GoldenRod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed",
    "Indigo","Ivory","Khaki","Lavender","LawnGreen","LemonChiffon","LightBlue",
    "LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGreen",
    "LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray",
    "LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon",
    "MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen",
    "MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed",
    "MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
    "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod",
    "PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff",
    "Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue",
    "SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver",
    "SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan",
    "Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
    "Yellow","YellowGreen"
  ];
  
  const container = document.querySelector(".color-list");
  const showBtn = document.getElementById("showBtn");
  const removeBtn = document.getElementById("removeBtn");
  const darkModeBtn = document.getElementById("darkModeBtn");
  
  let darkMode = false;
  
  // Function to display colors
  function showColors() {
    try {
      container.innerHTML = ""; // Clear if already exists
  
      colors.forEach(color => {
        const box = document.createElement("div");
        box.className = "color-box";
        box.style.backgroundColor = color;
        box.textContent = color;
        container.appendChild(box);
      });
  
    } catch (error) {
      console.error("Error showing colors:", error);
      alert("Something went wrong while displaying colors!");
    }
  }
  
  // Remove colors
  function removeColors() {
    try {
      container.innerHTML = "";
    } catch (error) {
      console.error("Error removing colors:", error);
    }
  }
  
  // Toggle Dark / Light Mode
  function toggleDarkMode() {
    try {
      darkMode = !darkMode;
  
      if (darkMode) {
        document.body.classList.add("dark-mode");
        darkModeBtn.textContent = "Light Mode";
      } else {
        document.body.classList.remove("dark-mode");
        darkModeBtn.textContent = "Dark Mode";
      }
  
    } catch (error) {
      console.error("Theme switch failed:", error);
      alert("Error switching theme");
    }
  }
  
  
  //  Button Events
  showBtn.addEventListener("click", showColors);
  removeBtn.addEventListener("click", removeColors);
  darkModeBtn.addEventListener("click", toggleDarkMode);
  