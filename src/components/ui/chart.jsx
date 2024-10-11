// src/components/ui/chart.jsx
import React from 'react';

export const ChartContainer = ({ config, children, className }) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

export const ChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 text-white p-2 rounded shadow">
        <p>{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export const ChartTooltipContent = ({ label, payload }) => {
  if (payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded text-white">
        <p>{label}</p>
        <p>{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
