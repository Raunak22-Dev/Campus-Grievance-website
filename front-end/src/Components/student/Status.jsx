import React from "react";

const Status = () => {
  const completeTasks = ["", ""];
  const inProgressTasks = ["", ""];
  const pendingTasks = ["", ""];

  return (
   <>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Pending Category */}
        <div className="bg-red-50 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-red-600 mb-3">Pending</h2>
          <ul className="list-disc pl-5">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task, index) => (
                <li key={index} className="text-gray-800 mb-1">
                  
                </li>
              ))
            ) : (
              <p className="text-gray-500">All tasks are either in progress or completed.</p>
            )}
          </ul>
        </div>

        {/* In Progress Category */}
        <div className="bg-yellow-50 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-yellow-600 mb-3">In Progress</h2>
          <ul className="list-disc pl-5">
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map((task, index) => (
                <li key={index} className="text-gray-800 mb-1">
                  {task}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No tasks in progress currently.</p>
            )}
          </ul>
        </div>
        {/* Complete Category */}
        <div className="bg-green-50 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-green-600 mb-3">Complete</h2>
          <ul className="list-disc pl-5">
            {completeTasks.length > 0 ? (
              completeTasks.map((task, index) => (
                <li key={index} className="text-gray-800 mb-1">
                  {task}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No tasks completed yet.</p>
            )}
          </ul>
        </div>

      </div>
   </>
  );
};

export default Status;
