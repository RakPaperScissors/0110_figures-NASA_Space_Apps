import React from "react";

const GlassContainer = ({ children }) => {
  return (
    <div
      className="p-4 grid grid-cols-2 gap-4 "
    >
      {children}
    </div>
  );
};

export default GlassContainer;
