import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/cards";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { fetchGitHubUserData } from '../api/githubApi'; // Import the GitHub API call

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await fetchGitHubUserData(token); // Fetch GitHub data
        setUser(userDetails);
        setBio(userDetails.bio || ''); // Set fetched bio
        setLocation(userDetails.location || ''); // Set fetched location
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false); // End loading state
      }
    };
    fetchData();
  }, []);

  const handleSaveChanges = async () => {
    // You would add logic here to update the user's profile information in the backend.
    // For now, this could simply log the updated values.
    console.log('Saving changes:', { bio, location });
    // Implement the save logic, such as calling a Firebase or GitHub API to update user info.
  };

  const handleAvatarChange = (event) => {
    // Handle avatar upload
    const file = event.target.files[0];
    console.log('Avatar file selected:', file);
    // Implement logic to upload the file and update the avatar in the backend
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

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
          <Avatar>
            <AvatarImage alt="User avatar" src={user?.avatar_url || "/placeholder-user.jpg"} />
            <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button className="bg-slate-50 text-gray-900" onClick={handleSaveChanges}>Save Changes</Button>
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
                <label htmlFor="avatar-upload" className="border-gray-700 text-black bg-slate-50 px-4 py-2 rounded-md cursor-pointer">
                  Change Avatar
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    onChange={handleAvatarChange}
                    accept="image/*"
                  />
                </label>
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
