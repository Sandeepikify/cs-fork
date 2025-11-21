import React from "react";
// Assuming Registration component is in './Registration.jsx' or './components/Registration.jsx'
import Registration from "./components/Registration";
function App() {
  const appContainerStyle = {
    // Gradient Background: Blue to Light Orange/Peach
    background:
      "linear-gradient(135deg, #6dd5ed 0%, #2193b0 50%, #f7bb97 100%)", // Blue to a peachy orange
    minHeight: "100vh", // Ensure it covers the full viewport height
    display: "flex", // Use flexbox to center content
    flexDirection: "column", // Stack children vertically
    alignItems: "center", // Center horizontally
    justifyContent: "flex-start", // Align content to the top
    padding: "40px 20px", // Padding around the content
    fontFamily: "'Inter', sans-serif", // Modern, clean font
    color: "#343a40", // Dark grey for good contrast on the gradient
  };

  const headerStyle = {
    fontSize: "2.8rem", // Larger, more prominent heading
    fontWeight: "800", // Extra bold
    color: "#fff", // White color for the heading to stand out on the gradient
    marginBottom: "40px", // More space below the header
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
    letterSpacing: "1px", // Slightly spaced letters for elegance
  };

  return (
    <div style={appContainerStyle}>
      <h1 style={headerStyle}>User Registration</h1>
      <Registration />
    </div>
  );
}

export default App;
