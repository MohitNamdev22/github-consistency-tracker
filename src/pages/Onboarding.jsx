// Onboarding.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [step, setStep] = useState(1); // Track current step in onboarding
  const navigate = useNavigate(); // Use this to navigate to the dashboard after onboarding

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1); // Move to the next step
    } else {
      navigate('/dashboard'); // Redirect to dashboard after onboarding is done
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900">
      {step === 1 && (
        <div className="p-6 bg-white shadow-md rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to GitHub Consistency Tracker</h1>
          <p className="mb-4">Track your consistency and stay motivated with friendly competition!</p>
          <button 
            onClick={handleNextStep} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="p-6 bg-white shadow-md rounded-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Set Your Daily Goal</h1>
          <p className="mb-4">Define how many tasks you want to complete each day to stay consistent.</p>
          <button 
            onClick={handleNextStep} 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="p-6 bg-white shadow-md rounded-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Ready to Get Started?</h1>
          <p className="mb-4">Let's begin your consistency journey!</p>
          <button 
            onClick={handleNextStep} 
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
