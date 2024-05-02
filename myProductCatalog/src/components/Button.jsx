import React from "react";

export const Button = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={`text-gray-900  font-semibold px-4 py-2 rounded-xl bg-bgimage hover:shadow-lg shadow-shadowSupport active:shadow-lg transform hover:scale-96 uppercase text-center cursor-pointer transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};
