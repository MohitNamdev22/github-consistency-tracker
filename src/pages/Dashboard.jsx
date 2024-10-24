import React, { useEffect, useState } from 'react';
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/cards";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Bell, Github } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"; // Import Line and LineChart
import { fetchGitHubUserData, fetchGitHubContributions, fetchPullRequests, fetchMonthlyContributions } from "../api/githubApi"; // Make sure fetchMonthlyData is implemented


const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [contributions, setContributions] = useState(0);
  const [pullRequests, setPullRequests] = useState(0);
  const [commits, setCommits] = useState(0);
  const [streak, setStreak] = useState(0);

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

        const contributionData = await fetchGitHubContributions(token, data.login);
        setContributions(contributionData.totalContributions);

        const prData = await fetchPullRequests(token, data.login);
        setPullRequests(prData.pullRequests);

        const weekCommits = contributionData.weeks.reduce((acc, week) => acc + week.contributionCount, 0);
        setCommits(weekCommits);

        const dynamicStreak = contributionData.weeks.reduce((streak, week) => {
          const hasContributions = week.contributionDays.some(day => day.contributionCount > 0);
          return hasContributions ? streak + 1 : streak;
        }, 0);
        setStreak(dynamicStreak);

        setWeeklyData(contributionData.weeks.map(week => ({
          name: week.contributionDays[0].date.slice(5),
          contributions: week.contributionCount
        })));

        const monthlyContributionData = await fetchMonthlyContributions(token, data.login);
        setMonthlyData(monthlyContributionData.map(data => ({
          name: data.month, 
          tasks: data.tasks,
          hours: data.hours 
        })));

        console.log(monthlyContributionData);

      } catch (error) {
        setError("Failed to fetch data from GitHub.");
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-950 via-gray-900 to-purple-950 animate-gradientX text-white">
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

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Welcome back, {userData.name || userData.login}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gray-800/50 backdrop-blur-lg shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-300">Consistency Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{streak} days</div>
              <Progress value={(streak / 7) * 100} className="mt-2" />
              <p className="text-xs text-gray-400 mt-2">{streak} out of 7 days this week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-lg shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-300">Pull Requests</CardTitle>
              <Github className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{pullRequests}</div>
              <p className="text-xs text-gray-400 mt-2">Last 7 days</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-lg shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-300">Commits</CardTitle>
              <Github className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{commits}</div>
              <p className="text-xs text-gray-400 mt-2">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Weekly Contributions Chart */}
          <Card className="bg-gray-800/50 backdrop-blur-lg shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Weekly Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" stroke="#cccccc" />
                  <YAxis stroke="#cccccc" />
                  <Tooltip />
                  <Bar dataKey="contributions" fill="#8884d8" />
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

      </main>
    </div>
  );
};

export default Dashboard;
