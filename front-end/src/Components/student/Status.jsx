import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { close } from "../../assets/icons";

const Status = ({ complaints, setComplaints }) => {
  const [currentStatus, setCurrentStatus] = useState("Pending");
  const [showForm, setShowForm] = useState(false);
  const [hasMore, setHasMore] = useState(true);
 

  // Open the form/modal and filter tasks by status
  const openForm = (status) => {
    setCurrentStatus(status);
    setShowForm(true);
  };

  // Close the form/modal
  const closeForm = () => {
    setShowForm(false);
    setCurrentStatus(null);
  };

  // Delete a complaint
  const handleDelete = (index) => {
    const updatedComplaints = complaints.filter((_, i) => i !== index);
    setComplaints(updatedComplaints);
  };

  // Update complaint details (example: update message)
  const handleUpdate = (index, updatedMessage) => {
    const updatedComplaints = complaints.map((task, i) =>
      i === index ? { ...task, message: updatedMessage } : task
    );
    setComplaints(updatedComplaints);
  };

  // Transition the task status
  const handleStatusChange = (index, newStatus) => {
    const updatedComplaints = complaints.map((task, i) =>
      i === index ? { ...task, status: newStatus } : task
    );
    setComplaints(updatedComplaints);
  };

  // Get tasks based on their status
  const getTasksByStatus = () => {
    return complaints.filter((task) => task.status === currentStatus);
  };

  // Simulate loading more tasks (e.g., fetching from an API)
  const loadMoreTasks = () => {
    if (complaints.length < 50) {  // Adjust based on your logic for loading more
      const moreTasks = []; // Add your logic here to fetch more tasks
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
      
      {/* Task List with Infinite Scroll - Scrollable Section */}
      <div className="flex-1 overflow-y-auto mb-4">
        <InfiniteScroll
          dataLength={getTasksByStatus().length}
          next={loadMoreTasks}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p className="text-center">No more tasks to load</p>}
        >
          <ul className="list-disc pl-5 space-y-4">
  {getTasksByStatus().map((task, index) => (
    <li key={index} className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center"> 
        <span className="text-lg mr-2">{task.sr}.</span> 
        <p className="mr-2">{task.message}</p> 
        <span className="text-gray-500 text-xs">
          | To: {task.recipient} | Type: {task.type}
        </span>
      </div>

      <div className="flex space-x-2">
        <button className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500">
          Update
        </button>

        <button 
          onClick={handleDelete} 
          className="text-red-500 hover:text-red-700">
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>

        </InfiniteScroll>
      </div>
      
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
