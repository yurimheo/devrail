import React from "react";

const PricingButton = ({ children, onClick, className }) => (
  <button
    className={`px-4 py-2 font-semibold rounded-md transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default PricingButton;
