import React, { useState } from 'react'; 
import ComplaintForm from '../Components/student/ComplaintForm';
import Status from '../Components/student/Status';
import { useComplaintContext } from "../contextreact/ComplaintContext"; // Import the context

const UserDashboard = () => {
  const [error, setError] = useState('');

  // Using useComplaintContext hook for managing complaints from the context
  const { complaints, setComplaints } = useComplaintContext();

  // Add complaint function
  const addComplaint = (complaint) => {
    // Update complaints using the context's setComplaints
    setComplaints((prevComplaints) => [...prevComplaints, complaint]);
  };

  return (
    <div className="min-h-screen bg-slate-50  flex items-center justify-center">
      <div className="w-full lg:w-3/4 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl rounded-lg p-6 col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Status</h2>
            <Status complaints={complaints} setComplaints={setComplaints} />
          </div>
        </div>

        {/* Complaint Section */}
        <ComplaintForm addComplaint={addComplaint} />
      </div>
    </div>
  );
};

export default UserDashboard;
