import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { close } from "../../assets/icons";
import UpdateForm from "../ReuseableComponents/UpdateForm";

const Status = ({ complaints, setComplaints }) => {
  const [currentStatus, setCurrentStatus] = useState("Pending");
  const [showForm, setShowForm] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // States for controlling the task being updated
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  // Open the form/modal and filter tasks by status
  const openForm = (status) => {
    setCurrentStatus(status);
    setShowForm(true);
  };

  // Close the form/modal
  const closeForm = () => {
    setShowForm(false);
    setUpdatedMessage(""); // Reset message input
    setSelectedTaskIndex(null); // Clear selected index
  };
  

  // Delete a complaint
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedComplaints = complaints.filter((_, i) => i !== index);
      setComplaints(updatedComplaints);
    }
  };
  
 
  
  // Update complaint details (example: update message)
  const handleUpdate = (index) => {
    const updatedComplaints = complaints.map((task, i) =>
      i === index ? { ...task, message: updatedMessage } : task
    );
    setComplaints(updatedComplaints);
    closeForm(); // Reset state here
  };
  

  // Get tasks based on their status
  const getTasksByStatus = () => {
    const filteredTasks = complaints.filter((task) => task.status === currentStatus);
    console.log(filteredTasks); // Debugging: Show filtered tasks
    return filteredTasks;
  };

  //display recent task on the status 
  // Display only the most recent task based on the current status
  const getTasksDisplayStatus = () => {
    // Filter tasks based on currentStatus and sort them by createdAt in descending order
    const filteredTasks = complaints
      .filter((task) => task.status === currentStatus)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
    // Return only the most recent task
    return filteredTasks.length > 0 ? [filteredTasks[0]] : [];
  };
  
  
  const truncateMessage = (message, maxLength) => {
    if (message.length > maxLength) {
      return message.substring(0, maxLength) + '...';
    }
    return message;
  };

  // Simulate loading more tasks
  const loadMoreTasks = () => {
    if (complaints.length < 20) {
    
      setComplaints([...complaints, ...moreTasks]);
    } else {
      setHasMore(false); // No more data to load
    }
  };

  

  return (
    <>
      {/* Status Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
      <div
  className="bg-red-50 shadow-md rounded-lg p-4 cursor-pointer"
  onClick={() => openForm("Pending")}
>
  <h2 className="text-xl font-semibold text-red-600 mb-3">Pending</h2>
  <ul className="pl-5 space-y-4">
  {getTasksDisplayStatus().length > 0 ? (
    getTasksDisplayStatus().map((task, index) => (
      <li key={index} className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-lg mr-2">{task.sr}.</span>
          <p className="mr-2">{truncateMessage(task.message, 50)}</p>
          <span className="text-gray-500 text-xs">
            | To: {task.recipient} | Type: {task.type} | {task.createdAt}
          </span>
        </div>
      </li>
    ))
  ) : (
    <li>No tasks available.</li>
  )}
</ul>

</div>

        <div
          className="bg-yellow-50 shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => openForm("In Progress")}
        >
          <h2 className="text-xl font-semibold text-yellow-600 mb-3">In Progress</h2>
        </div>
        <div
          className="bg-green-50 shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => openForm("Complete")}
        >
          <h2 className="text-xl font-semibold text-green-600 mb-3">Complete</h2>
        </div>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          {/* Modal container */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full h-[400px] flex flex-col relative">
            {/* Heading - Full width */}
            <div className="w-full mb-4">
              <h2 className="text-2xl font-bold">{currentStatus} Tasks</h2>
            </div>

            {/* Task List with Infinite Scroll */}
            <div className="flex-1 overflow-y-auto mb-4">
              <InfiniteScroll
                dataLength={getTasksByStatus().length}
                next={loadMoreTasks}
                hasMore={hasMore}
                
                endMessage={<p className="text-center">No more tasks to load</p>}
              >
                <ul className="list-disc pl-5 space-y-4">
                  {getTasksByStatus().map((task, index) => (
                    <li key={index} className="flex justify-between items-center border-b pb-4">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{task.sr}.</span>
                        <p className="mr-2">{truncateMessage(task.message, 50)}</p>
                        <span className="text-gray-500 text-xs">
                          | To: {task.recipient} | Type: {task.type} | {task.createdAt}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        {/* Trigger to open Update form */}
                        <button
                          onClick={() => {
                            setSelectedTaskIndex(index); // Set the selected task
                            setUpdatedMessage(task.message); // Pre-fill the input
                          }}
                          className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500"
                          title="Update"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleDelete(index)}
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

            {/* Update Form Modal */}
            {selectedTaskIndex !== null && (
  <UpdateForm
    selectedTask={complaints[selectedTaskIndex]} // Pass selected task details
    handleUpdate={(updatedTask) => {
      // Update complaints in the parent component
      const updatedComplaints = complaints.map((task, i) =>
        i === selectedTaskIndex ? updatedTask : task
      );
      setComplaints(updatedComplaints);
      setSelectedTaskIndex(null); // Reset selected index
    }}
    closeForm={closeForm} // Pass the closeForm function
  />
)}

            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={closeForm}
                className="px-4 py-2 text-white rounded hover:bg-red-500"
              >
                <img src={close} alt="Close" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Status;
