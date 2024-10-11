import React from 'react';

const CardContent = ({ children, className = '', ...props }) => {
  const cardContentClasses = `
    p-4
    ${className}
  `;

  return (
    <div className={cardContentClasses} {...props}>
      {children}
    </div>
  );
};

export default CardContent;