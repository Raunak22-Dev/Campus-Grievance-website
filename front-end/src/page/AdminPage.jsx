import React, { useState, useEffect } from "react";
import { useUser } from "../contextreact/UserContext";
import { useComplaintContext } from "../contextreact/ComplaintContext";

const AdminPage = () => {
  const [openGrievance, setOpenGrievance] = useState(null);
  const { users = []  } = useUser();
  const { complaints = [], setComplaints } = useComplaintContext();

// Get all user details from localStorage
const getAllUserDetails = () => {
  const allUsers = [];
  const keys = Object.keys(localStorage);
  
  keys.forEach(key => {
    if (key.startsWith('userDetails')) {
      const userData = JSON.parse(localStorage.getItem(key));
      allUsers.push(userData);
    }
  });
  
  return allUsers;
};

  useEffect(() => {
    const storedComplaints = localStorage.getItem('complaints');
    if (storedComplaints) {
      setComplaints(JSON.parse(storedComplaints));
    }
  }, [setComplaints]);

  const toggleView = (id) => {
    setOpenGrievance(openGrievance === id ? null : id);
  };

  // Calculate statistics
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="p-6 flex-1">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold">Total Complaints</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{complaints.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{pending}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold">Resolved</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{resolved}</p>
          </div>
        </div>

        {/* Recent Grievances */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-6">Recent Grievances</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Student ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
              {complaints.map((complaint) => {
  const localStorageUsers = getAllUserDetails();

  // If not found in context, check localStorage users
  const localStorageUser = localStorageUsers.find(u => 
    u.studentId === complaint.studentId || 
    u.studentID === complaint.studentId
  );

  // Use whichever user is found first
  const user =  localStorageUser;
                  return (
                    <React.Fragment key={complaint.id}>
                      <tr className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">
                          {user?.studentId || "N/A"}
                        </td>
                        <td className="px-4 py-3">{complaint.createdAt}</td>
                        <td className="px-4 py-3">{complaint.type}</td>
                        <td className="px-4 py-3">{complaint.department || 'N/A'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-sm 
                            ${complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleView(complaint.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                          >
                            {openGrievance === complaint.id ? 'Hide' : 'View'}
                          </button>
                        </td>
                      </tr>
                      {openGrievance === complaint.id && (
                        <tr className="bg-gray-50">
                          <td colSpan="6" className="px-4 py-3">
                            <div className="mb-2 font-medium">Complaint Details:</div>
                            <p className="bg-white p-4 rounded-lg shadow-inner">
                              {complaint.message}
                            </p>
                            <div className="mt-4 flex gap-4">
                              <button className="text-sm text-green-600 hover:text-green-700">
                                Mark Resolved
                              </button>
                              <button className="text-sm text-red-600 hover:text-red-700">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-8 text-center">
        <p>© 2024 Grievance Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;