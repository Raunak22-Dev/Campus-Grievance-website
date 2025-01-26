import React, { useState } from 'react';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState('');
  const [complaintTo, setComplaintTo] = useState('');
  const [department, setDepartment] = useState('');
  const [staffName, setStaffName] = useState('');
  const [complainType, setComplainType] = useState('');
  const [messageType, setMessageType] = useState('public');
  const [error, setError] = useState('');
  const [taskSrNo, setTaskSrNo] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return '';
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `Date: ${formattedDate} | Time: ${formattedTime}`;
  };

  const saveToLocalStorage = (complaint) => {
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    complaints.push(complaint);
    localStorage.setItem('complaints', JSON.stringify(complaints));
  };

  const handleComplaintSubmit = async () => {
    if (!complaint.trim() || !complaintTo || !complainType) {
      setError('Please fill in all required fields.');
      return;
    }

    if (complaintTo === 'hod' && !department) {
      setError('Please select a department.');
      return;
    }

    if (complaintTo === 'staff' && !staffName.trim()) {
      setError('Please enter the staff name.');
      return;
    }

    if (taskSrNo > 20) {
      setError('Maximum task serial number reached.');
      return;
    }

    setError('');
    setIsLoading(true); // Start loading when the form is submitted

    const newComplaint = {
      message: complaint,
      recipient: complaintTo,
      department: complaintTo === 'hod' ? department : null,
      staffName: complaintTo === 'staff' ? staffName : null,
      type: complainType,
      status: 'Pending',
      createdAt: formatDateTime(new Date().toISOString()),
      messageType,
      sr: taskSrNo,
    };

    try {
      const response = await fetch('http://localhost:7001/api/complaints/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(newComplaint),
      });

      const result = await response.json();
      setIsLoading(false); // Stop loading after response

      if (response.ok) {
        console.log('Complaint submitted successfully!');
        setIsSubmitted(true);
      } else {
        setError(`Failed to submit complaint. Status Code: ${response.status}`);
        console.error(result);
      }
    } catch (error) {
      setError('Error submitting complaint, please try again.');
      console.error('Error:', error);
    }

    saveToLocalStorage(newComplaint);
    setTaskSrNo((prev) => prev + 1);
    setComplaint('');
    setComplaintTo('');
    setDepartment('');
    setStaffName('');
    setComplainType('');
    setMessageType('public');
  };

  return (
    <div className="mt-10 bg-white shadow-xl rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Submit Complaint</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        <li className="bg-gray-100 p-3 rounded-md">
          <label htmlFor="complainTo" className="font-medium">Complaint To</label>
          <select
            id="complainTo"
            value={complaintTo}
            onChange={handleInputChange(setComplaintTo)}
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="principal">Principal</option>
            <option value="vicePrincipal">Vice Principal</option>
            <option value="hod">Head of Department (HOD)</option>
            <option value="staff">Staff</option>
          </select>
        </li>
        {complaintTo === 'hod' && (
          <li className="bg-gray-100 p-3 rounded-md">
            <label htmlFor="department" className="font-medium">Select Department</label>
            <select
              id="department"
              value={department}
              onChange={handleInputChange(setDepartment)}
              className="w-full p-2 border-2 border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="cse">Computer Science</option>
              <option value="ece">Electronics</option>
              <option value="mech">Mechanical</option>
              <option value="civil">Civil</option>
            </select>
          </li>
        )}
        {complaintTo === 'staff' && (
          <li className="bg-gray-100 p-3 rounded-md">
            <label htmlFor="staffName" className="font-medium">Staff Name</label>
            <input
              id="staffName"
              type="text"
              value={staffName}
              onChange={handleInputChange(setStaffName)}
              placeholder="Enter Staff Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </li>
        )}
        <li className="bg-gray-100 p-3 rounded-md">
          <label htmlFor="complainType" className="font-medium">Related To</label>
          <select
            id="complainType"
            value={complainType}
            onChange={handleInputChange(setComplainType)}
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="financial">Financial Status</option>
            <option value="holiday">Holiday</option>
            <option value="internet issue">Internet Issue</option>
          </select>
        </li>
        <li className="bg-gray-100 p-3 rounded-md">
          <label htmlFor="messageType" className="font-medium">Message Type</label>
          <select
            id="messageType"
            value={messageType}
            onChange={handleInputChange(setMessageType)}
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </li>
        <li className="bg-gray-100 p-3 rounded-md">
          <label htmlFor="complaintMessage" className="font-medium">Write Message</label>
          <textarea
            id="complaintMessage"
            value={complaint}
            onChange={handleInputChange(setComplaint)}
            placeholder="Describe your complaint or issue here..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
            rows="4"
          />
          <button
            onClick={handleComplaintSubmit}
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Complaint'}
          </button>
          {isSubmitted && <p className="mt-4 text-green-500">Your complaint has been submitted successfully!</p>}
        </li>
      </ul>
    </div>
  );
};

export default ComplaintForm;
