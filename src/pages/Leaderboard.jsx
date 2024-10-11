
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/cards"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Bell, Trophy } from "lucide-react"

const leaderboardData = [
  { id: 1, name: "Alice Johnson", score: 2500, avatar: "/placeholder-user.jpg" },
  { id: 2, name: "Bob Smith", score: 2300, avatar: "/placeholder-user.jpg" },
  { id: 3, name: "Charlie Brown", score: 2100, avatar: "/placeholder-user.jpg" },
  { id: 4, name: "Diana Prince", score: 2000, avatar: "/placeholder-user.jpg" },
  { id: 5, name: "Ethan Hunt", score: 1900, avatar: "/placeholder-user.jpg" },
]

export default function Leaderboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="flex items-center h-16 px-4 border-b border-gray-700 shrink-0 md:px-6">
        <nav className="flex-1 flex items-center space-x-4 sm:space-x-6">
          <Link className="flex items-center space-x-2 font-semibold" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span>GitHub Consistency Tracker</span>
          </Link>
          <Link className="font-medium hover:text-purple-400" href="#">
            Dashboard
          </Link>
          <Link className="font-medium hover:text-purple-400" href="#">
            Tasks
          </Link>
          <Link className="font-medium hover:text-purple-400" href="#">
            Leaderboard
          </Link>
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
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
        </div>
        <Card className="bg-gray-800 border border-gray-700">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {leaderboardData.map((user, index) => (
                <div key={user.id} className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 mr-4">
                    {index === 0 ? (
                      <Trophy className="h-4 w-4 text-yellow-300" />
                    ) : (
                      <span className="font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage alt={user.name} src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-sm text-gray-400">Score: {user.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
