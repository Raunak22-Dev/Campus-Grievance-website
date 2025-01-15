import React, { useState } from "react";
import Footer from "../Components/ReuseableComponents/Footer";
import Slider from "../Components/ReuseableComponents/Slider";


const HomePage = () => {
  const [complaints, setComplaints] = useState([
    { id: 1, title: "Wi-Fi not working in the library", votes: 12 },
    { id: 2, title: "Air conditioning issue in the main hall", votes: 8 },
    { id: 3, title: "Cafeteria food quality needs improvement", votes: 5 },
    { id: 4, title: "Wi-Fi not working in the library", votes: 12 },
    { id: 5, title: "Air conditioning issue in the main hall", votes: 8 },
    { id: 6, title: "Cafeteria food quality needs improvement", votes: 5 },
    { id: 7, title: "Wi-Fi not working in the library", votes: 12 },
    { id: 8, title: "Air conditioning issue in the main hall", votes: 8 },
    { id: 9, title: "Cafeteria food quality needs improvement", votes: 5 },
  ]);

  // Function to handle voting/liking a complaint
  const handleVote = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, votes: complaint.votes + 1 } : complaint
    );
    setComplaints(updatedComplaints);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-600 py-14 text-center text-white">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to the Grievance System</h1>
        <p className="text-lg sm:text-xl mb-8">Easily report grievances, track their status, and make your voice heard.</p>
        <a
          href="/dashboard"
          className="bg-blue-700 hover:bg-blue-800 py-3 px-8 text-lg rounded-md transition-all duration-300"
        >
          Report a Grievance
        </a>
      </section>

<section>
      <Slider />
</section>
      {/* Complaint Display Section */}
      <section className="bg-gray-50 py-14 text-gray-800">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">Browse Complaints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
              >
                <h3 className="text-lg font-semibold mb-2 text-blue-600">{complaint.title}</h3>
                <p className="text-gray-600 mb-4">
                  Votes: <span className="font-medium text-gray-800">{complaint.votes}</span>
                </p>
                <button
                  onClick={() => handleVote(complaint.id)}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-5 py-2 rounded-lg transition-all"
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="bg-blue-50 py-20 px-4">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-3 text-blue-700">Easy Reporting</h3>
            <p className="text-lg text-gray-700">Report any issues or grievances in a simple and straightforward process.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-3 text-blue-700">Track Status</h3>
            <p className="text-lg text-gray-700">Stay updated with the progress of your grievance and resolutions.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-3 text-blue-700">Support Team</h3>
            <p className="text-lg text-gray-700">Our support team is here to assist you with any concerns.</p>
          </div>
        </div>
      </section> */}
      {/* Footer */}
      <Footer />
      {/* <footer className="bg-blue-800 py-6 text-center text-white">
        <p>&copy; 2025 Grievance System | All Rights Reserved</p>
        <div className="space-x-4 mt-4">
          <a href="/contact" className="hover:text-gray-300">
            Contact
          </a>
          <a href="/terms" className="hover:text-gray-300">
            Terms of Use
          </a>
        </div>
      </footer> */}
    </div>
  );
};

export default HomePage;
