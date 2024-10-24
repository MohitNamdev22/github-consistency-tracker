import React, { useEffect, useState } from 'react';
import { Button } from "../components/ui/button.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Bell } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { fetchGitHubUserData } from "../api/githubApi"; 

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("githubAccessToken");
      if (!token) {
        setError("User not authenticated.");
        return;
      }

      try {
        const data = await fetchGitHubUserData(token);
        setUserData(data);
      } catch (error) {
        setError("Failed to fetch user data.");
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <header className="flex items-center h-16 px-4 border-b border-gray-800 shrink-0 md:px-6">
      <nav className="flex-1 flex items-center space-x-4 sm:space-x-6 text-gray-300">
        <div className="font-semibold text-white" onClick={() => navigate("/dashboard")}>Github Consistency Tracker</div>
        <div className="font-medium cursor-pointer" onClick={() => navigate("/dashboard")}>Dashboard</div>
        <div className="font-medium cursor-pointer" onClick={() => navigate("/tasks")}>Tasks</div>
        <div className="font-medium cursor-pointer" onClick={() => navigate("/leaderboard")}>Leaderboard</div>
      </nav>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-gray-400" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Avatar className="!cursor-pointer" onClick={() => navigate("/profile")}>
          <AvatarImage alt="User avatar" className="!cursor-pointer" src={userData.avatar_url} />
          <AvatarFallback>{userData.login.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Navbar;
