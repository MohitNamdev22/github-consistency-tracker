import React from 'react'
import { Button } from "../components/ui/button.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/cards"
import { Progress } from "../components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Bell, Clock, Github, Plus } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const weeklyData = [
  { name: "Mon", hours: 5 },
  { name: "Tue", hours: 7 },
  { name: "Wed", hours: 6 },
  { name: "Thu", hours: 8 },
  { name: "Fri", hours: 7 },
  { name: "Sat", hours: 3 },
  { name: "Sun", hours: 4 },
]

const monthlyData = [
  { name: "Week 1", tasks: 20, hours: 35 },
  { name: "Week 2", tasks: 25, hours: 40 },
  { name: "Week 3", tasks: 18, hours: 32 },
  { name: "Week 4", tasks: 30, hours: 45 },
]

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav className="flex-1 flex items-center space-x-4 sm:space-x-6">
          <div className="font-semibold">
            Github Consistency Tracker
          </div>
          <div className="font-medium">Dashboard</div>
          <div className="font-medium">Tasks</div>
          <div className="font-medium">Leaderboard</div>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage alt="User avatar" src="/placeholder-user.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        {/* Dashboard Cards */}
                {/* Dashboard Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Consistency Streak */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Consistency Streak</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 3 L21 8 L8 21 L3 21 L3 16 L16 3" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 days</div>
              <Progress value={71} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">5 out of 7 days this week</p>
            </CardContent>
          </Card>

          {/* Work Hours */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Work Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23.5 hours</div>
              <p className="text-xs text-muted-foreground mt-2">This week</p>
            </CardContent>
          </Card>

          {/* GitHub Contributions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">GitHub Contributions</CardTitle>
              <Github className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground mt-2">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Weekly Work Hours Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Work Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="tasks" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="hours" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Daily Tip */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              "Break your work into small, manageable tasks. It's easier to stay motivated when you can see progress."
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Dashboard
