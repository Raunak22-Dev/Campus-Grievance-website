import React from 'react';
// import { profile } from "../assets/icons";
import Avater from '../Components/Avater';

const Userprofile = () => {
  return (
    <div className="mt-18 py-12 w-full max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column: form labels and inputs */}
        <div className="space-y-6">
          <div className="w-96">
            <label htmlFor="name" className="block text-lg font-semibold">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              placeholder="Enter your name"
            />
          </div>

          <div className="w-96">
            <label htmlFor="DOB" className="block text-lg font-semibold">Date of Birth</label>
            <input
              type="date"
              id="DOB"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
            />
          </div>

          {/* Gender dropdown */}
          <div className="w-96">
            <label htmlFor="gender" className="block text-lg font-semibold">Gender</label>
            <select
              id="gender"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Year input */}
          <div className="w-96">
            <label htmlFor="year" className="block text-lg font-semibold">Year</label>
            <select
              id="year"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
            >
              <option value="">Current Year</option>
              <option value="computer">First Year (FE)</option>
              <option value="it">Second Year (SE)</option>
              <option value="electronics">Third Year (TE)</option>
              <option value="mechanical">Fourth Year (BE)</option>
            </select>
          </div>

          {/* Department dropdown */}
          <div className="w-96">
            <label htmlFor="department" className="block text-lg font-semibold">Department</label>
            <select
              id="department"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
            >
              <option value="">Select department</option>
              <option value="computer">Computer Engineering</option>
              <option value="it">Information Technology</option>
              <option value="electronics">Electronics</option>
              <option value="mechanical">Mechanical Engineering</option>
            </select>
          </div>

          <div className="w-96">
            <label htmlFor="email" className="block text-lg font-semibold">E-mail</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Right column: Profile image */}
        <div className="flex justify-center items-start py-1  min-h-[600px]">
        <Avater />
          {/* <img src={profile} alt="Profile" width={220} height={220} className="rounded-full" /> */}
        </div>
      </div>

 


    </div>

  );
};

export default Userprofile;
