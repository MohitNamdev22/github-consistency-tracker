import React from 'react';

// The Input component
export function Input({ id, type = "text", placeholder, className, ...props }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-purple-600 focus:outline-none focus:ring focus:ring-purple-600 focus:ring-opacity-50 ${className}`}
      {...props}
    />
  );
}
