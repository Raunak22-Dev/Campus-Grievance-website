import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState('');
  const [complaintTo, setComplaintTo] = useState('');
  const [department, setDepartment] = useState('');
  const [staffName, setStaffName] = useState('');
  const [complainType, setComplainType] = useState('');
  const [messageType, setMessageType] = useState('Public');
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
    localStorage.setItem('complaints', JSON.stringify(complaints));  // Check in the console
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
      id: uuidv4(), // Add unique ID here
      message: complaint,
      recipient: complaintTo,
      department: complaintTo === 'hod' ? department : null,
      staffName: complaintTo === 'staff' ? staffName : null,
      type: complainType,
      status: 'Pending',
      createdAt: formatDateTime(new Date().toISOString()),
      messageType
    };

    try {
      const token = localStorage.getItem('authToken')
     
      const response = await fetch('http://localhost:7001/api/complaints/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newComplaint),
      });
      console.log(localStorage.getItem('authToken'))

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
    setMessageType('Public');
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl rounded-xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Submit Your Concern</h2>
        <p className="text-gray-600">We're here to help resolve your issues promptly</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-red-600">{error}</span>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
            <div className="relative">
              <select
                value={complaintTo}
                onChange={handleInputChange(setComplaintTo)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">Select recipient</option>
                <option value="principal">Principal</option>
                <option value="vicePrincipal">Vice Principal</option>
                <option value="hod">Head of Department (HOD)</option>
                <option value="staff">Staff</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {complaintTo === 'hod' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <div className="relative">
                <select
                  value={department}
                  onChange={handleInputChange(setDepartment)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="">Select department</option>
                  <option value="cse">Computer Science</option>
                  <option value="ece">Electronics</option>
                  <option value="mech">Mechanical</option>
                  <option value="civil">Civil</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {complaintTo === 'staff' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Staff Name</label>
              <input
                type="text"
                value={staffName}
                onChange={handleInputChange(setStaffName)}
                placeholder="Enter staff name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="relative">
              <select
                value={complainType}
                onChange={handleInputChange(setComplainType)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">Select category</option>
                <option value="financial">Financial</option>
                <option value="holiday">Holiday</option>
                <option value="internet issue">Internet Issue</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMessageType('Public')}
                className={`p-3 rounded-lg border ${
                  messageType === 'Public' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                }`}
              >
                Public
              </button>
              <button
                type="button"
                onClick={() => setMessageType('Private')}
                className={`p-3 rounded-lg border ${
                  messageType === 'Private' 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                }`}
              >
                Private
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={complaint}
              onChange={handleInputChange(setComplaint)}
              placeholder="Describe your concern in detail..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
              rows="4"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleComplaintSubmit}
            disabled={isLoading}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Concern'
            )}
          </button>

          {isSubmitted && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-600">Your concern has been submitted successfully!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;












