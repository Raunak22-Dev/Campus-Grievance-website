import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { close } from "../../assets/icons";
import UpdateForm from "../ReuseableComponents/UpdateForm";
import { useComplaintContext } from "../../contextreact/ComplaintContext";

const Status = () => {
  const [currentStatus, setCurrentStatus] = useState("Pending");
  const [showForm, setShowForm] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const { complaints, setComplaints } = useComplaintContext(); // add setComplaints to context if not available

  // Open the form/modal and set the current status
  const openForm = (status) => {
    setCurrentStatus(status);
    setShowForm(true);
  };

  // Close the form/modal and reset state
  const closeForm = () => {
    setShowForm(false);
    setSelectedTaskIndex(null);
  };

  // Delete a complaint
// In the Status Component
const handleDelete = (id) => {
  setComplaints(complaints.filter((task) => task.sr !== id)); // filtering the task out
};
  

  // Filter tasks by status
  const getTasksByStatus = () =>
    complaints.filter((task) => task.status === currentStatus);

  // Get the most recent task for the status
  const getTasksDisplayStatus = () => {
    const filteredTasks = complaints
      .filter((task) => task.status === currentStatus)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return filteredTasks.length > 0 ? [filteredTasks[0]] : [];
  };

  // Truncate long messages
  const truncateMessage = (message, maxLength) =>
    message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;

  // Simulate loading more tasks
  const loadMoreTasks = () => {
    if (complaints.length < 20) {
      const moreTasks = [] // add logic to fetch new tasks here
      setComplaints([...complaints, ...moreTasks]);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      {/* Status Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {["Pending", "In Progress", "Complete"].map((status, index) => (
          <div
            key={index}
            className={`${
              status === "Pending"
                ? "bg-red-50 text-red-600"
                : status === "In Progress"
                ? "bg-yellow-50 text-yellow-600"
                : "bg-green-50 text-green-600"
            } shadow-md rounded-lg p-4 cursor-pointer`}
            onClick={() => openForm(status)}
          >
            <h2 className="text-xl font-semibold mb-3">{status}</h2>
            {status === "Pending" && (
              <ul className="pl-5 space-y-4">
                {getTasksDisplayStatus().length > 0 ? (
                  getTasksDisplayStatus().map((task) => (
                    <li key={task.id}>
                      <div>
                        <span className="text-lg mr-2">{task.sr}.</span>
                        {truncateMessage(task.message, 50)}
                      </div>
                      <span className="text-gray-500 text-xs">
                        | To: {task.recipient} | Type: {task.type} |{" "}
                        {task.createdAt}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No tasks available.</li>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full h-[400px] flex flex-col relative">
            {/* Modal Header */}
            <h2 className="text-2xl font-bold mb-4">{currentStatus} Tasks</h2>

            {/* Task List with Infinite Scroll */}
            <div className="flex-1 overflow-y-auto mb-4">
              <InfiniteScroll
                dataLength={getTasksByStatus().length}
                next={loadMoreTasks}
                hasMore={hasMore}
                endMessage={<p className="text-center">No more tasks to load</p>}
              >
                <ul className="list-disc pl-5 space-y-4">
                  {getTasksByStatus().map((task) => (
                    <li key={task.sr} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <span className="text-lg mr-2">{task.sr}.</span>
                        {truncateMessage(task.message, 50)}
                        <span className="text-gray-500 text-xs">
                          | To: {task.recipient} | Type: {task.type} | {task.createdAt}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedTaskIndex(task.id)}
                          className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500"
                        >
                          Update
                        </button>
                        <button
  onClick={() => handleDelete(task.sr)} // Ensure `task.sr` matches the actual identifier
  className="text-red-500 hover:text-red-700"
>
  Delete
</button>

                      </div>
                    </li>
                  ))}
                </ul>
              </InfiniteScroll>
            </div>

            {/* Update Form */}
            {selectedTaskIndex !== null && (
              <UpdateForm
                selectedTask={complaints[selectedTaskIndex]}
                handleUpdate={(updatedTask) => {
                  const updatedComplaints = complaints.map((task, i) =>
                    i === selectedTaskIndex ? updatedTask : task
                  );
                  setComplaints(updatedComplaints);
                  setSelectedTaskIndex(null);
                }}
                closeForm={closeForm}
              />
            )}

            {/* Close Button */}
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 p-1 text-white rounded hover:bg-red-500"
            >
              <img src={close} alt="Close" className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Status;
