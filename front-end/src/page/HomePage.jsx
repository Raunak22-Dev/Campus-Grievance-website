import React, { useState } from "react";
import Footer from "../Components/ReuseableComponents/Footer";
import Slider from "../Components/ReuseableComponents/Slider";
import Card from "../Components/ReuseableComponents/Card";


const HomePage = () => {
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
        <Card />
      </section>

    
      {/* Footer */}
      <section>
      <Footer />
      </section>
    </div>
  );
};

export default HomePage;
