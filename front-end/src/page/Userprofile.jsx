import React, { useState, useEffect } from 'react';
import Avater from '../Components/Avater';
import { useUser } from '../contextreact/UserContext';

const UserProfile = () => {
  const { user, updateUser } = useUser(); // Access user data and update function

  // State initialization as empty object initially
  const [userData, setUserData] = useState({ fullName: '', dob: '', gender: '', year: '', department: '', email: '', studentId: '' });

  useEffect(() => {
    // Get saved data from localStorage if it exists
    const savedData = localStorage.getItem('userDetails');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []); // This will run only once when component is mounted

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSave = () => {
    // Store the user details in localStorage
    localStorage.setItem('userDetails', JSON.stringify(userData));
    updateUser(userData); // Assuming the updateUser updates the context/state
    alert("User details saved successfully!");
  };

  return (
    <div className="mt-2 py-3 pb-20  w-full max-w-4xl mx-auto px-6">
      <div className="flex flex-col items-center space-y-6">
        {/* Avatar at the top */}
        <div className="flex justify-center items-center py-6">
          <Avater />
           {/* Assuming Avater component handles the image properly */}
        </div>

        {/* User details */}
        <div className="w-full space-y-6">
          <div className="space-y-3">
            <label htmlFor="fullName" className="text-lg font-semibold text-gray-800">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={userData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Date of Birth and Gender in one line */}
          <div className="flex space-x-6">
            <div className="w-1/2 space-y-3">
              <label htmlFor="dob" className="text-lg font-semibold text-gray-800">Date of Birth</label>
              <input
                type="date"
                id="dob"
                value={userData.dob}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="w-1/2 space-y-3">
              <label htmlFor="gender" className="text-lg font-semibold text-gray-800">Gender</label>
              <select
                id="gender"
                value={userData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Year and Department Dropdowns in one line */}
          <div className="flex space-x-6">
            <div className="w-1/2 space-y-3">
              <label htmlFor="year" className="text-lg font-semibold text-gray-800">Year</label>
              <select
                id="year"
                value={userData.year}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select your year</option>
                <option value="FE">First Year (FE)</option>
                <option value="SE">Second Year (SE)</option>
                <option value="TE">Third Year (TE)</option>
                <option value="BE">Fourth Year (BE)</option>
              </select>
            </div>

            <div className="w-1/2 space-y-3">
              <label htmlFor="department" className="text-lg font-semibold text-gray-800">Department</label>
              <select
                id="department"
                value={userData.department}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select your department</option>
                <option value="computer">Computer Engineering</option>
                <option value="it">Information Technology</option>
                <option value="electronics">Electronics</option>
                <option value="mechanical">Mechanical Engineering</option>
              </select>
            </div>
          </div>

          {/* Email and Student ID in one line */}
          <div className="flex space-x-6">
            <div className="w-1/2 space-y-3">
              <label htmlFor="email" className="text-lg font-semibold text-gray-800">Email</label>
              <input
                type="email"
                id="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="w-1/2 space-y-3">
              <label htmlFor="studentId" className="text-lg font-semibold text-gray-800">Student ID</label>
              <input
                type="text"
                id="studentId"
                value={userData.studentId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your official ID"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-6">
            <button
              className="w-1/2 bg-green-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
