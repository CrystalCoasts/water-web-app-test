import React from "react";
import "./PHScale.css";

const PHCircle = ({ pH }) => {
  // Determine the background color based on the pH score
  const getColor = (pH) => {
    if (pH < 6) {
      return "red"; // acidic
    } else if (pH > 8) {
      return "blue"; // alkaline
    } else {
      return "green"; //neutral
    }
  };

  return (
    <div className="ph-circle" style={{ backgroundColor: getColor(pH) }}>
      <span>{pH}</span>
    </div>
  );
};

export default PHCircle;
