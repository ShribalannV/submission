/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004aad",      // Axis-like deep blue
        secondary: "#f5f5f5",    // Light background
        accent: "#ffcc00",       // Highlight color
        danger: "#e60000",       // Red for close buttons
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
