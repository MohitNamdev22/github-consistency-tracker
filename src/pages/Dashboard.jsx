import React, { useEffect, useState } from 'react';
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/cards";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Bell, Clock, Github, Plus } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { fetchGitHubUserData } from "../api/githubApi"; // Updated import to fetch user data

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]); // Assuming you have data for charts
  const [monthlyData, setMonthlyData] = useState([]); // Assuming you have data for charts

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("githubAccessToken"); // Retrieve token from local storage
      if (!token) {
        setError("User not authenticated.");
        return;
      }
      
      try {
        const data = await fetchGitHubUserData(token); // Fetch GitHub user data
        setUserData(data);
      } catch (error) {
        setError("Failed to fetch data from GitHub.");
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>; // Handle errors gracefully

  if (!userData) return <div>Loading...</div>; // Show loading state

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-950 via-gray-900 to-purple-950 animate-gradientX text-white">
      {/* Header Section */}
      <header className="flex items-center h-16 px-4 border-b border-gray-800 shrink-0 md:px-6">
        <nav className="flex-1 flex items-center space-x-4 sm:space-x-6 text-gray-300">
          <div className="font-semibold text-white">Github Consistency Tracker</div>
          <div className="font-medium">Dashboard</div>
          <div className="font-medium">Tasks</div>
          <div className="font-medium">Leaderboard</div>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage alt="User avatar" src={userData.avatar_url} />
            <AvatarFallback>{userData.login.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button className="text-black bg-slate-50 text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Consistency Streak */}
          <Card className="bg-gray-800/50 backdrop-blur-lg shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-300">Consistency Streak</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-gray-400"
              >
                <path d="M16 3 L21 8 L8 21 L3 21 L3 16 L16 3" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">5 days</div>
              <Progress value={71} className="mt-2" />
              <p className="text-xs text-gray-400 mt-2">5 out of 7 days this week</p>
            </CardContent>
          </Card>

          {/* Work Hours */}
          <Card className="bg-gray-800/50 backdrop-blur-lg shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-300">Work Hours</CardTitle>
              <Clock className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">23.5 hours</div>
              <p className="text-xs text-gray-400 mt-2">This week</p>
            </CardContent>
          </Card>

          {/* GitHub Contributions */}
          <Card className="bg-gray-800/50 backdrop-blur-lg shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-300">GitHub Contributions</CardTitle>
              <Github className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">47</div>
              <p className="text-xs text-gray-400 mt-2">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Weekly Work Hours Chart */}
          <Card className="bg-gray-800/50 backdrop-blur-lg shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Weekly Work Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" stroke="#cccccc" />
                  <YAxis stroke="#cccccc" />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Progress Chart */}
          <Card className="bg-gray-800/50 backdrop-blur-lg shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <XAxis dataKey="name" stroke="#cccccc" />
                  <YAxis stroke="#cccccc" />
                  <Tooltip />
                  <Line type="monotone" dataKey="tasks" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="hours" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Daily Tip */}
        <Card className="bg-gray-800/50 backdrop-blur-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Daily Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              "Break your work into small, manageable tasks. It's easier to stay motivated when you can see progress."
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
