import React, { createContext, useState, useContext } from 'react';

// Create the context for complaints
const ComplaintContext = createContext();

// Provider to wrap the App and provide the complaint state and functions
export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);

  // Function to add a new complaint
  const addComplaint = (complaint) => {
    setComplaints((prevComplaints) => [...prevComplaints, complaint]);
  };

  return (
    <ComplaintContext.Provider value={{ complaints, setComplaints, addComplaint }}>
      {children}
    </ComplaintContext.Provider>
  );
};

// Custom hook for easier access to context
export const useComplaintContext = () => useContext(ComplaintContext);
