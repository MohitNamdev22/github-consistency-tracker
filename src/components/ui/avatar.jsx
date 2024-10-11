// src/components/ui/avatar.jsx
import React from 'react';

export const Avatar = ({ children }) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt }) => {
  return <img className="w-full h-full object-cover" src={src} alt={alt} />;
};

export const AvatarFallback = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center text-white">
      {children}
    </div>
  );
};
