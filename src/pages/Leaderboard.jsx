import React from 'react';

const Leaderboard = () => {
  const users = [
    { name: 'Alice', streak: 10, hours: 50 },
    { name: 'Bob', streak: 8, hours: 40 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">Leaderboard</h1>
      {users.map((user, index) => (
        <div key={index} className="bg-gray-800 shadow-md rounded-lg p-4 mb-4">
          <p className="font-bold text-white">{index + 1}. {user.name}</p>
          <p className="text-gray-300">Streak: {user.streak} days</p>
          <p className="text-gray-300">Hours Worked: {user.hours}</p>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
