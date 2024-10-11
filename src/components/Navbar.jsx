import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between">
        <Link to="/" className="text-white font-bold">Home</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
          <Link to="/leaderboard" className="text-gray-300 hover:text-white">Leaderboard</Link>
          <Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
