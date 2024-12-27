import React, { useState } from 'react';
import ComplaintForm from '../Components/student/ComplaintForm';
import Status from '../Components/student/Status';

const UserDashboard = () => {
  const [complaint, setComplaint] = useState('');
  const [complaintTo, setComplaintTo] = useState('');
  const [complainType, setComplainType] = useState('');
  const [messageType, setMessageType] = useState('public');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]); // New state for pending tasks

  // Add complaint function
  const addComplaint = (complaint) => {
    setComplaints((prevComplaints) => [...prevComplaints, complaint]);
    addPendingTask(complaint);  // Adding complaint to the pending tasks
  };

  // Add to pending tasks
  const addPendingTask = (task) => {
    setPendingTasks((prevTasks) => [...prevTasks, task]);
  };

  // Handle complaint input
  // const handleComplaintChange = (event) => {
  //   setComplaint(event.target.value);
  // };

  // const handleSelectChange = (setter) => (event) => setter(event.target.value);

  // Handle complaint submission
  const handleComplaintSubmit = () => {
    if (!complaint.trim() || !complaintTo || !complainType) {
      setError("Please fill all fields.");
      return;
    }

    const newComplaint = {
      message: complaint,
      recipient: complaintTo,
      type: complainType,
      status: 'Pending', // You can set this here, too
    };

    addComplaint(newComplaint);

    setIsSubmitted(true);
    setError('');  // Clear any previous error
    console.log("Complaint Submitted: ", { complaint, complaintTo, complainType, messageType });

    // Clear form after submission
    setComplaint('');
    setComplaintTo('');
    setComplainType('');
    setMessageType('public');
  };

  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center  ">
  <div className="w-full lg:w-3/4 p-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Section */}
      <div className="bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Profile</h2>
        <div className="flex items-center space-x-4">
          {/* <Avatar /> */}
          <div>
            <h3 className="text-xl font-medium">John Doe</h3>
            <p className="text-sm text-gray-600">Computer Engineering - 3rd Year</p>
            <p className="text-sm text-gray-600">john.doe@example.com</p>
          </div>
        </div>
      </div>

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








