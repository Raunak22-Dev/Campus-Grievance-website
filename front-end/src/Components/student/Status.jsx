import React, { useState, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { close } from "../../assets/icons";
import UpdateForm from "../ReuseableComponents/UpdateForm";
import { useComplaintContext } from "../../contextreact/ComplaintContext";

const Status = () => {
  const [currentStatus, setCurrentStatus] = useState("Pending");
  const [showForm, setShowForm] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { complaints, setComplaints } = useComplaintContext();

  // Open the form/modal and set the current status
  const openForm = (status) => {
    setCurrentStatus(status);
    setShowForm(true);
  };

  // Close the form/modal and reset state
  const closeForm = () => {
    setShowForm(false);
    setSelectedTaskId(null);  // Ensure the selected task ID is cleared on close
  };

  // Delete a complaint
  const handleDelete = (taskId) => {
    const updatedComplaints = complaints.filter((task) => task.id !== taskId);
    
    if (updatedComplaints.length < complaints.length) {
      updateSequence(updatedComplaints);
      setComplaints(updatedComplaints);
    } else {
      console.log("No matching task found for deletion.");
    }
  };
  
  
  const updateSequence = (complaintsList) => {
    const updatedComplaints = complaintsList.map((task, index) => ({
      ...task,
      sr: index + 1,
    }));
    setComplaints(updatedComplaints);
  };

  // Filter tasks by status using useMemo for performance optimization
  const filteredTasks = useMemo(() => {
    return complaints
      .filter((task) => task.status === currentStatus)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [complaints, currentStatus]);

  // Get the most recent task for the status
  const getTasksDisplayStatus = () => {
    const sortedTasks = filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sortedTasks.length > 0 ? [sortedTasks[0]] : [];
  };

  // Truncate long messages
  const truncateMessage = (message, maxLength) =>
    message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;

  // Simulate loading more tasks
  const loadMoreTasks = () => {
    if (complaints.length < 20) {
      const moreTasks = [];  // simulate fetching more tasks
      setComplaints([...complaints, ...moreTasks]);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      {/* Status Columns - Responsive Grid */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 2xl:max-w-7xl 2xl:mx-auto bg-gradient-to-br from-blue-50 to-indigo-50" >
        {["Pending", "In Progress", "Complete"].map((status, index) => (
          <div
            key={index}
            className={`relative rounded-xl border-2 p-4 transition-all duration-300 cursor-pointer group
              ${
                status === "Pending"
                  ? "border-red-100 bg-red-50 hover:border-red-200"
                  : status === "In Progress"
                  ? "border-yellow-100 bg-yellow-50 hover:border-yellow-200"
                  : "border-green-100 bg-green-50 hover:border-green-200"
              }`}
            onClick={() => openForm(status)}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
                {status}
              </h2>
              <span className="px-2 py-1 text-sm font-medium rounded-full bg-white/80 backdrop-blur-sm">
                {filteredTasks.length} tasks
              </span>
            </div>

            {/* Task Preview - Responsive Layout */}
            <div className="space-y-3">
              {getTasksDisplayStatus().map((task) => (
                <div 
                  key={task.id}
                  className="p-3 bg-white rounded-lg shadow-xs hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm text-gray-500">#{task.sr}</span>
                    <p className="text-gray-700 line-clamp-2 text-sm sm:text-base">
                      {task.message}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {task.recipient}
                    </span>
                    <span className="text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Responsive Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl lg:max-w-4xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="sticky top-0 p-4 bg-white border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {currentStatus} Tasks
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredTasks.length} items in this category
                </p>
              </div>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <img 
                  src={close} 
                  alt="Close" 
                  className="w-6 h-6 opacity-70 hover:opacity-100"
                />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-4">
              <InfiniteScroll
                dataLength={filteredTasks.length}
                next={loadMoreTasks}
                hasMore={hasMore}
                endMessage={
                  <p className="text-center text-gray-500 py-4 text-sm">
                    No more tasks to display
                  </p>
                }
              >
                <div className="divide-y divide-gray-100">
                  {filteredTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="py-4 group hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Task Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm text-gray-500">#{task.sr}</span>
                            <p className="text-gray-800 text-base truncate">
                              {task.message}
                            </p>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-1 text-xs sm:text-sm rounded-full bg-blue-100 text-blue-800">
                              {task.recipient}
                            </span>
                            <span className="px-2.5 py-1 text-xs sm:text-sm rounded-full bg-purple-100 text-purple-800">
                              {task.type}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500">
                              {task.createdAt}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => setSelectedTaskId(task.id)}
                            className="px-3 py-1.5 text-xs sm:text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="px-3 py-1.5 text-xs sm:text-sm bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>

            {/* Update Form Section */}
            {selectedTaskId && (
              <div className="sticky bottom-0 border-t bg-white p-4">
                <UpdateForm
                  selectedTask={complaints.find((task) => task.id === selectedTaskId)}
                  handleUpdate={(updatedTask) => {
                    const updatedComplaints = complaints.map((task) =>
                      task.id === selectedTaskId ? updatedTask : task
                    );
                    setComplaints(updatedComplaints);
                    setSelectedTaskId(null);
                  }}
                  closeForm={closeForm}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Status;
