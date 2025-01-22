import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context for complaints
const ComplaintContext = createContext();

// Provider to wrap the App and provide the complaint state and functions
export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);

  // Load complaints from localStorage on initial render
  useEffect(() => {
    const savedComplaints = localStorage.getItem('complaints');
    if (savedComplaints) {
      setComplaints(JSON.parse(savedComplaints));
    }
  }, []);

  // Save complaints to localStorage whenever the complaints state changes
  useEffect(() => {
    if (complaints.length > 0) {
      localStorage.setItem('complaints', JSON.stringify(complaints));
    }
  }, [complaints]);

  // Function to add a new complaint
  const addComplaint = (complaint) => {
    setComplaints((prevComplaints) => [...prevComplaints, complaint]);
  };

  // Function to update an existing complaint
  const updateComplaint = (updatedComplaint) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.id === updatedComplaint.id ? updatedComplaint : complaint
      )
    );
  };

  return (
    <ComplaintContext.Provider value={{ complaints, setComplaints, addComplaint, updateComplaint }}>
      {children}
    </ComplaintContext.Provider>
  );
};

// Custom hook for easier access to context
export const useComplaintContext = () => useContext(ComplaintContext);
