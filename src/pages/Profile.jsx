import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/cards"
import { Input } from "../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { fetchGitHubUserData } from '../api/githubApi'; // Import the GitHub API call

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await fetchGitHubUserData(); // Fetch GitHub data
        setUser(userDetails);
        setBio(userDetails.bio || ''); // Set fetched bio
        setLocation(userDetails.location || ''); // Set fetched location
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="flex items-center h-16 px-4 border-b border-gray-700 shrink-0 md:px-6">
        <nav className="flex-1 flex items-center space-x-4 sm:space-x-6">
          <Link className="flex items-center space-x-2 font-semibold" to="/">
            <span>GitHub Consistency Tracker</span>
          </Link>
          <Link className="font-medium hover:text-purple-400" to="/dashboard">Dashboard</Link>
          <Link className="font-medium hover:text-purple-400" to="/tasks">Tasks</Link>
          <Link className="font-medium hover:text-purple-400" to="/leaderboard">Leaderboard</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage alt="User avatar" src={user?.avatar_url || "/placeholder-user.jpg"} />
            <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button className="bg-slate-50 text-gray-900">Save Changes</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage alt="User avatar" src={user?.avatar_url || "/placeholder-user.jpg"} />
                  <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="border-gray-700 text-black bg-slate-50">
                  Change Avatar
                </Button>
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input id="name" value={user?.name || ''} readOnly className="bg-gray-700" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" value={user?.email || ''} readOnly className="bg-gray-700" />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="bg-gray-700" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle>Work Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="github" className="text-sm font-medium">GitHub Username</label>
                <Input id="github" value={user?.login || ''} readOnly className="bg-gray-700" />
              </div>

              <div className="space-y-2">
                <label htmlFor="skills" className="text-sm font-medium">Skills</label>
                <Input id="skills" placeholder="JavaScript, React, Node.js" className="bg-gray-700" />
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[100px] w-full rounded-md border border-input bg-gray-700 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
