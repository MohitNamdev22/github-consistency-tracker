// src/components/ui/progress.jsx
import React from 'react';

export const Progress = ({ value }) => {
  return (
    <div className="relative w-full h-2 bg-gray-700 rounded">
      <div
        className="absolute h-2 bg-green-500 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
