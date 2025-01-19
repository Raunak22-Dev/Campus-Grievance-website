import React, { useState, useEffect } from 'react';
import { useComplaintContext } from '../../contextreact/ComplaintContext'; // Import the custom hook to access the context

const UpdateForm = ({ selectedTask, departments, staffMembers }) => {
  // Default state based on selectedTask
  const [updatedMessage, setUpdatedMessage] = useState(selectedTask?.message || '');
  const [complaintTo, setComplaintTo] = useState(selectedTask?.complaintTo || '');
  const [complaintType, setComplaintType] = useState(selectedTask?.complaintType || '');
  const [department, setDepartment] = useState(selectedTask?.department || '');
  const [staffName, setStaffName] = useState(selectedTask?.staffName || '');
  const [recipient, setRecipient] = useState(selectedTask?.recipient || ''); // Default to existing task or empty
  const [type, setType] = useState(selectedTask?.type || ''); // Default to existing type
  const [error, setError] = useState('');
  const [formVisible, setFormVisible] = useState(true); // Handle visibility of the form

  // Access the context function for updating a complaint
  const { updateComplaint } = useComplaintContext();

  const closeForm = () => {
    setFormVisible(false); // Close the form when Cancel is clicked
  };

  useEffect(() => {
    // Reset fields in case selectedTask changes
    if (selectedTask) {
      setUpdatedMessage(selectedTask.message || '');
      setComplaintTo(selectedTask.complaintTo || '');
      setComplaintType(selectedTask.complaintType || '');
      setDepartment(selectedTask.department || '');
      setStaffName(selectedTask.staffName || '');
      setRecipient(selectedTask.recipient || '');
      setType(selectedTask.type || '');
    }
  }, [selectedTask]); // Rerun when selectedTask changes

  // Validate and update
  const handleUpdateSubmit = () => {
    if (updatedMessage.trim().length < 10) {
      setError('The updated message must be at least 10 characters long.');
      return;
    }

    setError(''); // Clear error message

    // Pass all updated fields and update task
    const updatedTask = {
      ...selectedTask,
      message: updatedMessage,
      complaintTo,
      complaintType,
      recipient,
      type,
      department: complaintTo === 'hod' ? department : '', // Update department if complaintTo is HOD
      staffName: complaintTo === 'staff' ? staffName : '', // Update staff if complaintTo is staff
    };

    updateComplaint(updatedTask); // Trigger update from context
    closeForm(); // Close form after submission
  };

  if (!formVisible) return null;

  return (
    <div className="absolute w-full max-w-md p-6 bg-white shadow-lg rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Update Complaint</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex flex-col gap-4">
        <label htmlFor="updateMessage" className="font-medium text-gray-700">
          Update Message
        </label>
        <textarea
          id="updateMessage"
          rows="4"
          value={updatedMessage}
          onChange={(e) => setUpdatedMessage(e.target.value)}
          placeholder="Describe the updated complaint here..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="recipient" className="font-medium text-gray-700">
          To
        </label>
        <select
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>Select recipient</option>
          <option value="staff">Staff</option>
          <option value="hod">Head of Department</option>
          <option value="principal">Principal</option>
          <option value="vicePrincipal">Vice Principal</option>
        </select>

        <label htmlFor="type" className="font-medium text-gray-700">
          Type
        </label>
        <input
          id="type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Enter complaint type"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />

        {complaintTo === 'hod' && (
          <>
            <label htmlFor="department" className="font-medium text-gray-700">
              Select Department
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>Select a department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </>
        )}

        {complaintTo === 'staff' && (
          <>
            <label htmlFor="staffName" className="font-medium text-gray-700">
              Staff Name
            </label>
            <select
              id="staffName"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>Select a staff member</option>
              {staffMembers.map((staff) => (
                <option key={staff} value={staff}>
                  {staff}
                </option>
              ))}
            </select>
          </>
        )}

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleUpdateSubmit}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Update Complaint
          </button>
          <button
            onClick={closeForm}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
