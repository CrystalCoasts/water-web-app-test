import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const OxygenLevelCircle = ({ oxygenLevel }) => {
  return (
    <div className="oxygen-level-circle">
      <CircularProgressbar
        value={oxygenLevel}
        text={`${oxygenLevel}%`} // Displays percentage inside circle
        styles={{
          root: { width: "100px", height: "100px" },
        }}
      />
    </div>
  );
};

export default OxygenLevelCircle;
