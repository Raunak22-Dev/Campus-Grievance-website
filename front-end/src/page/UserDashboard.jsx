import React, { useState } from 'react';
import ComplaintForm from '../Components/student/ComplaintForm';
import Status from '../Components/student/Status';

const UserDashboard = () => {
  
  const [error, setError] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]); // New state for pending tasks

  // Add complaint function
  const addComplaint = (complaint) => {
    setComplaints((prevComplaints) => [...prevComplaints, complaint]);
    setPendingTasks((prevTasks) => [...prevTasks, complaint]);  // Adding complaint to the pending tasks
  };

  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center  ">
  <div className="w-full lg:w-3/4 p-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      

      {/* Recent Activity Section */}
      <div className="bg-white shadow-xl rounded-lg p-6 col-span-2">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Status</h2>
        {/* Can list recent activity items here */}
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








