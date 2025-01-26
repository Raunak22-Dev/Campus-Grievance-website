import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Get the API base URL from the .env file
  const apiBaseUrl = 'http://localhost:7001/api/auth';

  // Check if API URL is valid
  if (!apiBaseUrl) {
    alert("API base URL is missing in the environment variables.");
    return;
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      alert("Please fill in both email and password.");
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);

        // Save the token to localStorage on successful login
        localStorage.setItem('authToken', data.token);

        // Redirect user to the profile page after login
        navigate("/profile");
      } else {
        alert(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-600 to-indigo-900 py-12">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full transition-transform transform hover:scale-105">
        <h2 className="text-center text-3xl font-bold text-indigo-600 mb-8">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="youremail@example.com"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your password"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Don't have an account? */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <span>Don’t have an account? </span>
          <a href="/createuser" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Create one here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
