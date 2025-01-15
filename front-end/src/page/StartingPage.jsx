import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StartingPage = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisited', 'true');
    } else {
      navigate('/login'); // Redirect to the login page for returning users
    }
  }, [navigate]);

  if (!isFirstVisit) {
    return null; // Avoid rendering this page for returning users
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Welcome to the Grievance System</h1>
        <p className="text-lg text-gray-600">
          Easily submit and manage your concerns. We're here to help you!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/new-user')}
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default StartingPage;
