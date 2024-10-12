import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding'; // New onboarding page
import TaskTracker from './pages/TaskTracker';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/tasks" element={<TaskTracker />} />
      <Route path="/onboarding" element={<Onboarding />} /> {/* Add onboarding route */}
    </Routes>
  </Router>
);

export default AppRouter;
