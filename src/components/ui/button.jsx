import React from 'react';

export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2
    rounded-md
    font-semibold
    text-white
    bg-black
    hover:bg-primary-600
    focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


