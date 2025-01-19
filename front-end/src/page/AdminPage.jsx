import React, { useState } from "react";
import { useUser } from "../contextreact/UserContext"; // Access user context

const GrievanceAdminPage = () => {
  const [openGrievance, setOpenGrievance] = useState(null); // Track which grievance is expanded
  const { users } = useUser(); // Access the users or grievances from the context

  const toggleView = (id) => {
    setOpenGrievance(openGrievance === id ? null : id); // Toggle view on click
  };

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
              {/* Map over users data */}
              {users && users.map((user) => (
                <React.Fragment key={user.id}>
                  <tr>
                    <td className="p-2">{user.Id}</td>
                    <td className="p-2">{user.fullName}</td>
                    <td className="p-2">{user.date}</td>
                    <td className="p-2">{user.issue}</td>
                    <td className="p-2">{user.year}</td>
                    <td className="p-2">{user.type}</td>
                    <td className="p-2">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500"
                        onClick={() => toggleView(user.id)}
                      >
                        {openGrievance === user.id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>

                  {/* Conditionally render the details of the grievance */}
                  {openGrievance === user.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="7" className="p-4">
                        <p>{user.details}</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grievance Actions */}
        {/* <div className="mt-8 flex justify-end gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500">View Details</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-500">Mark Resolved</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500">Escalate Issue</button>
        </div> */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8 text-center">
        <p>© 2025 Grievance Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GrievanceAdminPage;
