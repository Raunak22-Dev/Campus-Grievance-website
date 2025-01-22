import React, { useState, useEffect } from "react";
import { useUser } from "../contextreact/UserContext"; // Access user context
import { useComplaintContext } from "../contextreact/ComplaintContext";

const AdminPage = () => {
  const [openGrievance, setOpenGrievance] = useState(null); // Track which grievance is expanded
  const { users = [], updateUser } = useUser(); // Changed setUser to updateUser
  const { complaints = [], setComplaints } = useComplaintContext(); // Provide default fallback for complaints

  // UseEffect to fetch data from localStorage
  useEffect(() => {
    const storedComplaints = localStorage.getItem('complaints');
    const storedUsers = localStorage.getItem('userDetails');

    if (storedComplaints) {
      setComplaints(JSON.parse(storedComplaints));
    } else {
      console.log("No complaints in localStorage");
    }

    if (storedUsers) {
      updateUser(JSON.parse(storedUsers)); // Changed setUser to updateUser
    } else {
      console.log("No user data in localStorage");
    }
  }, []); // update dependency to updateUser

  const toggleView = (id) => {
    setOpenGrievance(openGrievance === id ? null : id); // Toggle view on click
  };

  console.log("Users:", users);
  console.log("Complaints:", complaints);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Content */}
      <main className="p-6 flex-1">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold">Pending</h3>
            <p className="text-gray-600 mt-2">35 Issues</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold">Resolved</h3>
            <p className="text-gray-600 mt-2">120 Issues</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold">Completed</h3>
            <p className="text-gray-600 mt-2">5 Issues</p>
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="bg-white shadow rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-4">Grievance Trends</h3>
          <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart Placeholder</p>
          </div>
        </div>

        {/* Recent Grievances */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Grievances</h3>
          <table className="w-full text-left bg-white shadow rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="p-2">Student ID</th>
                <th className="p-2">User Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Complaint related to</th>
                <th className="p-2">Academy Year</th>
                <th className="p-2">Type</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const complaint = complaints.find((comp) => comp.studentId === user.studentId) || {}; // Correct key for matching complaint and user
                return (
                  <React.Fragment key={user.studentId}> {/* Changed from user.id to user.studentId */}
                    <tr>
                      <td className="p-2">{user.studentId}</td>
                      <td className="p-2">{user.fullName}</td>
                      <td className="p-2">{complaint.createdAt || "N/A"}</td>
                      <td className="p-2">{complaint ? complaint.type : "N/A"}</td>
                      <td className="p-2">{user.year || "N/A"}</td>
                      <td className="p-2">{complaint?.type || "N/A"}</td>
                      <td className="p-2">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500"
                          onClick={() => toggleView(user.studentId)} // Toggling view per user ID
                        >
                          {openGrievance === user.studentId ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>
                    {openGrievance === user.studentId && complaint && (
                      <tr>
                        <td colSpan="7" className="p-4">
                          <p>{complaint.message || "No message provided"}</p>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8 text-center">
        <p>© 2025 Grievance Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;
