import React from "react";

const Heading = ({ heading }) => {
  return (
    <div
      style={{
        padding: "10px",
        display: "grid",
        justifyContent: "center",
      }}
    >
      <h1>{heading}</h1>
    </div>
  );
};

export default Heading;
