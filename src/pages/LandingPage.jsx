import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate here
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent } from "../components/ui/cards";
import { Github } from "lucide-react";
import { signInWithPopup, GithubAuthProvider, getAuth } from "firebase/auth";
import { app } from "../firebaseConfig"; // Import the firebase config
import { fetchGitHubUserData } from '../api/githubApi.js';

const LandingPage = () => {
  const navigate = useNavigate(); // Call useNavigate inside the component

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const provider = new GithubAuthProvider(); // Declare provider inside the component
  const auth = getAuth(app); // Initialize Firebase Auth with the app instance inside the component

  const handleGithubSignUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in:", user);
  
        // Retrieve the access token
        const credential = GithubAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
  
        // Store the access token in local storage or context
        localStorage.setItem('githubAccessToken', accessToken);
  
        // Now you can fetch user data using the token
        fetchGitHubUserData(accessToken).then((userData) => {
          console.log("GitHub User Data:", userData);
        });
  
        // Redirect to the dashboard
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-950 via-gray-900 to-purple-950 animate-gradientX text-white flex flex-col">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="#">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span className="text-white mx-3 text-md">Github Consistency Tracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            Contact
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-30 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Stay Consistent with Your Work
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Track your progress, compete with friends, and boost your productivity with our GitHub-integrated work consistency tracker.
                </p>
              </div>
              <div className="space-x-4 flex items-center justify-center">
                <Button className="inline-flex items-center justify-center !bg-[#24292e]" onClick={handleGithubSignUp}>
                  <Github className="mr-2 h-4 w-4" />
                  Sign up with GitHub
                </Button>
                <Button variant="outline" className='inline-flex items-center justify-center !text-[#24292e] bg-slate-50' onClick={handleLogin}>
                  Log in
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl pb-4 font-bold tracking-tighter sm:text-3xl md:text-3xl text-center mb-8">
              Why Choose Our Tracker?
            </h2>
            <div className="grid gap-10 mx-2 sm:grid-cols-2 md:grid-cols-3">
              {/* Feature Cards */}
              <Card className="bg-white bg-opacity-10 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <svg 
                      className="h-10 w-10 text-purple-400" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white">Track Your Progress</h3>
                    <p className="text-md text-gray-400">
                      Visualize your work consistency and see your productivity improve over time.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white bg-opacity-10 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <svg 
                      className="h-10 w-10 text-purple-400" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white">Compete with Friends</h3>
                    <p className="text-md text-gray-400">
                      Join leaderboards and engage in friendly competition to stay motivated.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white bg-opacity-10 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <svg 
                      className="h-10 w-10 text-purple-400" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M12 20v-6M6 20V10M18 20V4" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white">Boost Productivity</h3>
                    <p className="!text-md text-gray-400">
                      Get personalized tips and techniques to enhance your work efficiency.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold sm:text-3xl md:text-3xl lg:text-4xl">Ready to Get Started?</h2>
                <p className="max-w-[700px] text-gray-300 md:text-lg">
                  Join the community and take the first step towards improving your work consistency today!
                </p>
              </div>
              <Button className="inline-flex items-center justify-center !bg-[#24292e]" onClick={handleGithubSignUp}>
                <Github className="mr-2 h-4 w-4" />
                Sign up with GitHub
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} GitHub Consistency Tracker. All rights reserved.
            </p>
            <nav className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </footer>
    </div>
  );
};

export default LandingPage;
