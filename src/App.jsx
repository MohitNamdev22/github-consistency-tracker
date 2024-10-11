import React from 'react';
import AppRouter from './Router';
import './App.css'; // Import global CSS
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
