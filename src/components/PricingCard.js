import React from "react";

const PricingCard = ({ children, className, onClick }) => (
  <div
    className={`border rounded-lg p-6 shadow-md transition-all ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export default PricingCard;
