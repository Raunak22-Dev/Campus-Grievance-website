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

  // Handle complaint input
  const handleComplaintChange = (event) => {
    setComplaint(event.target.value);
  };

  const handleSelectChange = (setter) => (event) => setter(event.target.value);

  // Handle complaint submission
  const handleComplaintSubmit = () => {
    if (!complaint.trim() || !complaintTo || !complainType) {
      setError("Please fill all fields.");
      return;
    }
    
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="lg:w-3/4 w-full p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600 ">Profile</h2>
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
<Status />
          </div>
        </div>

        {/* Complaint Section */}
        <ComplaintForm />
      </div>
    </div>
  );
};

export default UserDashboard;
