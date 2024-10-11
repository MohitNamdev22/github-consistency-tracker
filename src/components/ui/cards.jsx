export const Card = ({ children }) => {
  return (
    <div className="bg-gray-800 bg-opacity-40 border !border-gray-800 border-opacity-5 shadow-lg rounded-lg py-4 px-6">
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};
export const CardTitle = ({ children }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};
